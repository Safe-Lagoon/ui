const DAY_ALIASES: Record<string, number> = {
  sunday: 0,
  sun: 0,
  monday: 1,
  mon: 1,
  tuesday: 2,
  tue: 2,
  tues: 2,
  wednesday: 3,
  wed: 3,
  thursday: 4,
  thu: 4,
  thur: 4,
  thurs: 4,
  friday: 5,
  fri: 5,
  saturday: 6,
  sat: 6,
};

/** Localized weekday name for a JS day index (0 = Sunday), matching the 0.4.0 vendor helper. */
export function formatAiChatDayName(dayIndex: number, locale?: string) {
  const date = new Date(Date.UTC(2024, 0, 7 + (((dayIndex % 7) + 7) % 7)));
  return new Intl.DateTimeFormat(locale, { weekday: "long", timeZone: "UTC" }).format(date);
}

export function parseAiChatDayToken(token: string) {
  const normalized = token.trim().toLowerCase().replace(/\./g, "");
  return Object.prototype.hasOwnProperty.call(DAY_ALIASES, normalized)
    ? DAY_ALIASES[normalized]
    : undefined;
}

export function formatAiChatDayNames(dayIndexes: number[], locale?: string) {
  return [...new Set(dayIndexes)]
    .filter((day) => day >= 0 && day <= 6)
    .sort((a, b) => a - b)
    .map((day) => formatAiChatDayName(day, locale));
}
