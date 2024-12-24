export type ColorName = keyof typeof Colors;

export const Colors = {
  yellow: 'yellow',
  red: 'red',
  green: 'green',
  blue: 'blue',
  purple: 'purple',
  gray: 'gray',
  orange: 'orange',
  pink: 'pink',
  indigo: 'indigo',
  teal: 'teal',
  cyan: 'cyan',
  lime: 'lime',
  amber: 'amber',
} as const;

export const randomColor = (): ColorName => {
  const values = Object.values(Colors);
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex] as ColorName;
}
