// prettier-ignore
export const I18nKeys = [
  "title","description.part1","description.part2"
] as const;

export type I18nKey = typeof I18nKeys[number];
