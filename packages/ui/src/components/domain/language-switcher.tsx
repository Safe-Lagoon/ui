"use client";

import * as React from "react";
import { Globe } from "lucide-react";
import { cn } from "../../lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export interface LanguageOption {
  value: string;
  label: string;
}

export interface LanguageSwitcherProps {
  value: string;
  onChange: (value: string) => void;
  languages: LanguageOption[];
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
}

export function LanguageSwitcher({
  value,
  onChange,
  languages,
  placeholder,
  ariaLabel = "Language",
  className,
}: LanguageSwitcherProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={cn("w-[180px]", className)} aria-label={ariaLabel}>
        <Globe className="size-4 shrink-0 text-muted-foreground" />
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.value} value={lang.value}>
            {lang.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
