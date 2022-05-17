export const percentage = (value: number) => `${(value * 100).toFixed(2)}%`;
export const fixed = (num: number) => (value: number) =>
  `${value.toFixed(num)}`;
