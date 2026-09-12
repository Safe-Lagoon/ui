"use client";

import * as React from "react";
import { Button } from "../brand/button";
import { Input } from "../brand/input";
import { ChoiceRow, type ChoiceOption } from "./choice-row";
import { EmojiAvatarPicker } from "./emoji-avatar-picker";
import { DangerAction, FormCard, LabeledField } from "./form-surface";

export type ChildGender = "M" | "F";
export type ChildAgeCategory = "0" | "1" | "2" | "3" | "4";
export type ChildDeviceOs = "android" | "ios";

export const CHILD_GENDER_OPTIONS: ChoiceOption[] = [
  { id: "M", label: "Boy" },
  { id: "F", label: "Girl" },
];

export const CHILD_AGE_OPTIONS: ChoiceOption[] = [
  { id: "0", label: "Under 6" },
  { id: "1", label: "6–8" },
  { id: "2", label: "9–12" },
  { id: "3", label: "13–15" },
  { id: "4", label: "16–17" },
];

export const CHILD_OS_OPTIONS: ChoiceOption[] = [
  { id: "android", label: "Android" },
  { id: "ios", label: "iOS" },
];

export type ChildProfileValue = {
  name: string;
  avatarId: string;
  gender: ChildGender;
  age: ChildAgeCategory;
  os: ChildDeviceOs;
};

export interface ChildProfileFormProps {
  value: ChildProfileValue;
  onChange?: (next: ChildProfileValue) => void;
  onSubmit?: () => void;
  onDelete?: () => void;
  submitLabel?: string;
  deleteLabel?: string;
  nameLabel?: string;
  avatarLabel?: string;
  genderLabel?: string;
  ageLabel?: string;
  osLabel?: string;
  namePlaceholder?: string;
}

export function ChildProfileForm({
  value,
  onChange,
  onSubmit,
  onDelete,
  submitLabel = "Save",
  deleteLabel = "Delete profile",
  nameLabel = "Name",
  avatarLabel = "Avatar",
  genderLabel = "Gender",
  ageLabel = "Age category",
  osLabel = "Device type",
  namePlaceholder = "Name",
}: ChildProfileFormProps) {
  const patch = (partial: Partial<ChildProfileValue>) => onChange?.({ ...value, ...partial });

  return (
    <FormCard data-slot="child-profile-form" className="space-y-4">
      <LabeledField label={avatarLabel}>
        <EmojiAvatarPicker
          label={avatarLabel}
          value={value.avatarId}
          onValueChange={(avatarId) => patch({ avatarId })}
        />
      </LabeledField>
      <LabeledField label={nameLabel} htmlFor="child-name">
        <Input
          id="child-name"
          inputSize="portal"
          value={value.name}
          placeholder={namePlaceholder}
          onChange={(event) => patch({ name: event.target.value })}
        />
      </LabeledField>
      <LabeledField label={genderLabel}>
        <ChoiceRow
          label={genderLabel}
          items={CHILD_GENDER_OPTIONS}
          value={value.gender}
          onValueChange={(id) => patch({ gender: id as ChildGender })}
        />
      </LabeledField>
      <LabeledField label={ageLabel}>
        <ChoiceRow
          label={ageLabel}
          items={CHILD_AGE_OPTIONS}
          value={value.age}
          onValueChange={(id) => patch({ age: id as ChildAgeCategory })}
        />
      </LabeledField>
      <LabeledField label={osLabel}>
        <ChoiceRow
          label={osLabel}
          items={CHILD_OS_OPTIONS}
          value={value.os}
          onValueChange={(id) => patch({ os: id as ChildDeviceOs })}
        />
      </LabeledField>
      <Button variant="primary" size="portal" onClick={onSubmit}>
        {submitLabel}
      </Button>
      {onDelete ? <DangerAction onClick={onDelete}>{deleteLabel}</DangerAction> : null}
    </FormCard>
  );
}
