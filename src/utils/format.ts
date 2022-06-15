import { ossUrl } from "./constants";

export const percentage = (value: number) => `${(value * 100).toFixed(2)}%`;
export const fixed = (num: number) => (value: number) =>
  `${value.toFixed(num)}`;

export const dateStrToAge = (dateStr: string) => {
  if (!dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
    return "未公开";
  }
  const date = new Date(dateStr);
  const now = new Date();
  const age = now.getFullYear() - date.getFullYear();
  return age;
};

export const proAvatarUrl = (proId: number) => `${ossUrl}/avatars/${proId}.png`;

export const teamAvatarUrl = (teamId: number) =>
  `${ossUrl}/teams/${teamId}.${[8, 1].includes(teamId) ? "png" : "svg"}`;
