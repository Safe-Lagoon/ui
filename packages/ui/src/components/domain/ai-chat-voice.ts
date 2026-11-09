"use client";

import * as React from "react";

const MAX_RECORDING_MS = 60_000;
const MIN_RECORDING_MS = 700;
const MIME_TYPES = [
  "audio/webm;codecs=opus",
  "audio/webm",
  "audio/mp4",
  "audio/ogg;codecs=opus",
];

export type AiChatVoiceCopy = {
  listening?: string;
  live?: string;
  transcribing?: string;
  turning?: string;
  tooShort?: string;
  missed?: string;
  micBlocked?: string;
  micFailed?: string;
  unsupported?: string;
  transcribeFailed?: string;
};

export const DEFAULT_AI_CHAT_VOICE_COPY = {
  listening: "Listening",
  live: "Speak now — I’m listening",
  transcribing: "Transcribing",
  turning: "Turning that into a prompt…",
  tooShort: "That was too short — hold the mic and speak.",
  missed: "Didn't catch that. Try again?",
  micBlocked: "Microphone permission is blocked.",
  micFailed: "Could not open the microphone.",
  unsupported: "This browser cannot record audio.",
  transcribeFailed: "Could not transcribe that audio.",
} satisfies Required<AiChatVoiceCopy>;

type VoiceCopyKey = keyof typeof DEFAULT_AI_CHAT_VOICE_COPY;

type RecordingSession = {
  dead: boolean;
  finalizing: boolean;
  chunks: Blob[];
  stream: MediaStream;
  recorder: MediaRecorder;
  audioCtx: AudioContext | null;
  analyser: AnalyserNode | null;
  time: Uint8Array | null;
  raf: number;
  clock: number;
  startedAt: number;
};

function pickMimeType() {
  if (typeof MediaRecorder === "undefined" || !MediaRecorder.isTypeSupported) return "";
  return MIME_TYPES.find((type) => MediaRecorder.isTypeSupported(type)) ?? "";
}

export function canRecordAiChatVoice() {
  if (typeof window === "undefined" || typeof navigator === "undefined") return false;
  return !!(
    (window.isSecureContext || window.location.hostname === "localhost") &&
    typeof navigator.mediaDevices?.getUserMedia === "function" &&
    typeof MediaRecorder !== "undefined" &&
    pickMimeType()
  );
}

function joinTranscript(existing: string, next: string) {
  const left = existing.replace(/\s+$/, "");
  const right = next.replace(/^\s+/, "");
  if (!right) return left;
  return left ? `${left} ${right}` : right;
}

export function formatAiChatVoiceTimer(elapsedMs: number) {
  const total = Math.floor(elapsedMs / 1000);
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

type UseAiChatVoiceArgs = {
  enabled: boolean;
  input: string;
  onTranscribe?: (audio: Blob) => Promise<string>;
  onSubmit: (text: string) => void;
  copy?: AiChatVoiceCopy;
};

export function useAiChatVoice({
  enabled,
  input,
  onTranscribe,
  onSubmit,
  copy,
}: UseAiChatVoiceArgs) {
  const copyRef = React.useRef(copy);
  copyRef.current = copy;

  const label = React.useCallback(
    (key: VoiceCopyKey) => copyRef.current?.[key] || DEFAULT_AI_CHAT_VOICE_COPY[key],
    [],
  );

  const [supported, setSupported] = React.useState(false);
  const [recording, setRecording] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [status, setStatus] = React.useState(label("listening"));
  const [timer, setTimer] = React.useState("0:00");
  const [live, setLive] = React.useState(label("live"));
  const [error, setError] = React.useState("");
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const sessionRef = React.useRef<RecordingSession | null>(null);
  const inputRef = React.useRef(input);
  inputRef.current = input;

  React.useEffect(() => {
    setSupported(!!onTranscribe && canRecordAiChatVoice());
  }, [onTranscribe]);

  const cancel = React.useCallback((keepError = false) => {
    const session = sessionRef.current;
    sessionRef.current = null;
    if (session) {
      session.dead = true;
      if (session.raf) cancelAnimationFrame(session.raf);
      if (session.clock) window.clearInterval(session.clock);
      if (session.recorder.state !== "inactive") {
        try {
          session.recorder.stop();
        } catch {
          /* already stopped */
        }
      }
      session.stream.getTracks().forEach((track) => track.stop());
      void session.audioCtx?.close().catch(() => undefined);
    }
    setRecording(false);
    setBusy(false);
    if (!keepError) setError("");
  }, []);

  React.useEffect(() => () => cancel(), [cancel]);

  const drawWaveform = React.useCallback((session: RecordingSession) => {
    const canvas = canvasRef.current;
    const analyser = session.analyser;
    const time = session.time;
    if (!canvas || !analyser || !time) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const tick = () => {
      if (session.dead) return;
      const ratio = window.devicePixelRatio || 1;
      const width = Math.max(1, canvas.clientWidth);
      const height = Math.max(1, canvas.clientHeight);
      if (canvas.width !== Math.floor(width * ratio) || canvas.height !== Math.floor(height * ratio)) {
        canvas.width = Math.floor(width * ratio);
        canvas.height = Math.floor(height * ratio);
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      }

      analyser.getByteTimeDomainData(time as unknown as Uint8Array<ArrayBuffer>);
      ctx.clearRect(0, 0, width, height);
      ctx.beginPath();
      ctx.strokeStyle = "rgba(99, 102, 241, 0.85)";
      ctx.lineWidth = 2;
      for (let index = 0; index < time.length; index += 1) {
        const x = (index / (time.length - 1)) * width;
        const y = ((time[index]! - 128) / 128) * (height * 0.38) + height / 2;
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      session.raf = requestAnimationFrame(tick);
    };

    session.raf = requestAnimationFrame(tick);
  }, []);

  const stopAndSubmit = React.useCallback(async () => {
    const session = sessionRef.current;
    if (!session || session.finalizing || session.dead || !onTranscribe) return;

    session.finalizing = true;
    setBusy(true);
    setStatus(label("transcribing"));
    setLive(label("turning"));

    await new Promise<void>((resolve) => {
      if (session.recorder.state === "inactive") {
        resolve();
        return;
      }
      session.recorder.addEventListener("stop", () => resolve(), { once: true });
      try {
        session.recorder.stop();
      } catch {
        resolve();
      }
    });

    if (session.dead) return;

    const elapsed = Date.now() - session.startedAt;
    const blob = session.chunks.length ? new Blob(session.chunks, { type: pickMimeType() }) : null;
    if (elapsed < MIN_RECORDING_MS || !blob || blob.size < 800) {
      cancel(true);
      setError(label("tooShort"));
      return;
    }

    try {
      const transcript = (await onTranscribe(blob)).trim();
      if (session.dead) return;
      if (!transcript) {
        cancel(true);
        setError(label("missed"));
        return;
      }
      const next = joinTranscript(inputRef.current, transcript);
      cancel();
      onSubmit(next);
    } catch (caught) {
      cancel(true);
      setError(caught instanceof Error ? caught.message : label("transcribeFailed"));
    }
  }, [cancel, label, onSubmit, onTranscribe]);

  const start = React.useCallback(async () => {
    if (!enabled || !onTranscribe || sessionRef.current) return;
    setError("");

    const mimeType = pickMimeType();
    let stream: MediaStream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true },
      });
    } catch (caught) {
      const blocked =
        caught instanceof DOMException &&
        (caught.name === "NotAllowedError" || caught.name === "SecurityError");
      setError(label(blocked ? "micBlocked" : "micFailed"));
      return;
    }

    const AudioContextCtor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    const audioCtx = AudioContextCtor ? new AudioContextCtor() : null;
    if (audioCtx?.state === "suspended") {
      await audioCtx.resume().catch(() => undefined);
    }

    let analyser: AnalyserNode | null = null;
    if (audioCtx) {
      analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.72;
      audioCtx.createMediaStreamSource(stream).connect(analyser);
    }

    let recorder: MediaRecorder;
    try {
      recorder = new MediaRecorder(stream, { mimeType });
    } catch {
      stream.getTracks().forEach((track) => track.stop());
      await audioCtx?.close().catch(() => undefined);
      setError(label("unsupported"));
      return;
    }

    const session: RecordingSession = {
      dead: false,
      finalizing: false,
      chunks: [],
      stream,
      recorder,
      audioCtx,
      analyser,
      time: analyser ? new Uint8Array(analyser.fftSize) : null,
      raf: 0,
      clock: 0,
      startedAt: Date.now(),
    };

    recorder.addEventListener("dataavailable", (event) => {
      if (event.data?.size) session.chunks.push(event.data);
    });

    sessionRef.current = session;
    setRecording(true);
    setStatus(label("listening"));
    setLive(label("live"));
    setTimer("0:00");
    session.clock = window.setInterval(() => {
      if (session.dead) return;
      const elapsed = Date.now() - session.startedAt;
      setTimer(formatAiChatVoiceTimer(elapsed));
      if (elapsed >= MAX_RECORDING_MS) void stopAndSubmit();
    }, 200);
    recorder.start(200);
    if (analyser) drawWaveform(session);
  }, [drawWaveform, enabled, label, onTranscribe, stopAndSubmit]);

  const toggle = React.useCallback(() => {
    if (sessionRef.current) {
      if (!sessionRef.current.finalizing) void stopAndSubmit();
      return;
    }
    void start();
  }, [start, stopAndSubmit]);

  return {
    supported,
    recording,
    busy,
    status,
    timer,
    live,
    error,
    canvasRef,
    toggle,
    cancel,
  };
}
