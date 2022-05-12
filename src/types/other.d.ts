type Rankable = {
  key: string;
  label: string;
  asc?: boolean;
  format?: (value: number) => string;
  description?: string;
};
