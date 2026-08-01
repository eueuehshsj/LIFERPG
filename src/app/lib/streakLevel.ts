export const POINTS_PER_LEVEL = 100;

export function toLocalDateString(date: Date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function recordCompletionDate(
  completedDates: string[],
  date: Date = new Date(),
): string[] {
  const today = toLocalDateString(date);
  return completedDates.includes(today)
    ? completedDates
    : [...completedDates, today];
}

export function calculateStreak(
  completedDates: string[],
  today: Date = new Date(),
): number {
  const set = new Set(completedDates);
  const cursor = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  );

  if (!set.has(toLocalDateString(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
    if (!set.has(toLocalDateString(cursor))) return 0;
  }

  let streak = 0;
  while (set.has(toLocalDateString(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

export interface LevelInfo {
  level: number;
  pointsIntoLevel: number;
  pointsForNextLevel: number;
  progress: number;
}

export function calculateLevel(earnedPoints: number): LevelInfo {
  const safePoints = Math.max(0, earnedPoints);
  const level = Math.floor(safePoints / POINTS_PER_LEVEL) + 1;
  const pointsIntoLevel = safePoints % POINTS_PER_LEVEL;
  return {
    level,
    pointsIntoLevel,
    pointsForNextLevel: POINTS_PER_LEVEL,
    progress: pointsIntoLevel / POINTS_PER_LEVEL,
  };
}
