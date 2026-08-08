"use client";

import * as React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../brand/button";
import { Input } from "../brand/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Card, CardContent } from "../brand/card";
import { WeekdayPicker, type WeekdayOption, type WeekdayValue } from "./weekday-picker";

export type RuleCardMode = "view" | "edit" | "delete" | "create";

export interface RuleCardProps {
  mode: RuleCardMode;
  name: string;
  enabled: boolean;
  weekdays: WeekdayValue[];
  weekdaysOptions: WeekdayOption[];
  nameLabel: string;
  enabledLabel: string;
  saveLabel: string;
  cancelLabel: string;
  deleteLabel: string;
  editLabel: string;
  confirmDeleteLabel: string;
  onNameChange?: (name: string) => void;
  onEnabledChange?: (enabled: boolean) => void;
  onWeekdaysChange?: (weekdays: WeekdayValue[]) => void;
  onSave?: () => void;
  onCancel?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
}

export function RuleCard({
  mode,
  name,
  enabled,
  weekdays,
  weekdaysOptions,
  nameLabel,
  enabledLabel,
  saveLabel,
  cancelLabel,
  deleteLabel,
  editLabel,
  confirmDeleteLabel,
  onNameChange,
  onEnabledChange,
  onWeekdaysChange,
  onSave,
  onCancel,
  onEdit,
  onDelete,
  className,
}: RuleCardProps) {
  const isEditing = mode === "edit" || mode === "create";
  const isDeleting = mode === "delete";

  return (
    <Card className={cn(className)}>
      <CardContent className="space-y-4 p-5">
        {isDeleting ? (
          <div className="space-y-4">
            <p className="text-body-16 text-foreground">{confirmDeleteLabel}</p>
            <div className="flex flex-wrap gap-2">
              <Button variant="destructive" onClick={onDelete}>
                {deleteLabel}
              </Button>
              <Button variant="secondary-lilac" onClick={onCancel}>
                {cancelLabel}
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1 space-y-2">
                <Label htmlFor={`rule-name-${name}`}>{nameLabel}</Label>
                {isEditing ? (
                  <Input
                    id={`rule-name-${name}`}
                    value={name}
                    onChange={(e) => onNameChange?.(e.target.value)}
                  />
                ) : (
                  <p className="text-body-18-semibold text-foreground">{name}</p>
                )}
              </div>
              {mode === "view" ? (
                <div className="flex shrink-0 gap-2">
                  <Button variant="ghost" size="icon" aria-label={editLabel} onClick={onEdit}>
                    <Pencil />
                  </Button>
                  <Button variant="ghost" size="icon" aria-label={deleteLabel} onClick={onDelete}>
                    <Trash2 />
                  </Button>
                </div>
              ) : null}
            </div>

            <section
              aria-label={enabledLabel}
              className="rounded-[10px] border border-border-soft bg-muted/30 px-4 py-3"
            >
              <div className="flex items-center justify-between gap-4">
                <Label htmlFor={`rule-enabled-${name}`} className="text-body-16-semibold">
                  {enabledLabel}
                </Label>
                <Switch
                  id={`rule-enabled-${name}`}
                  checked={enabled}
                  onCheckedChange={isEditing ? onEnabledChange : undefined}
                  className={cn(mode === "view" && "pointer-events-none")}
                  aria-readonly={mode === "view" ? true : undefined}
                />
              </div>
            </section>

            <section aria-label="Schedule days">
              <WeekdayPicker
                value={weekdays}
                onChange={(value) => onWeekdaysChange?.(value)}
                weekdays={weekdaysOptions}
                disabled={mode === "view"}
              />
            </section>

            {isEditing ? (
              <div className="flex flex-wrap gap-2 pt-2">
                <Button variant="primary" onClick={onSave}>
                  {saveLabel}
                </Button>
                <Button variant="secondary-lilac" onClick={onCancel}>
                  {cancelLabel}
                </Button>
              </div>
            ) : null}
          </>
        )}
      </CardContent>
    </Card>
  );
}
