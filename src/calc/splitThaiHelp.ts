import { round2 } from "./round";

export const THAI_HELP_DAILY_CAP = 200;
export const DAILY_LIMIT = THAI_HELP_DAILY_CAP;

export interface ThaiHelpResult {
  govShare: number;
  userShare: number;
  newRemaining: number;
}

export function splitThaiHelp(total: number, remaining: number): ThaiHelpResult {
  const govShare = round2(Math.min(round2(total * 0.6), remaining));
  return {
    govShare,
    userShare: round2(total - govShare),
    newRemaining: round2(remaining - govShare),
  };
}