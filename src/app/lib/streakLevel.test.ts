import { describe, it, expect } from "vitest";
import {
  calculateLevel,
  calculateStreak,
  recordCompletionDate,
  toLocalDateString,
} from "./streakLevel";

describe("calculateLevel", () => {
  it("0포인트는 레벨 1, 진행도 0", () => {
    expect(calculateLevel(0)).toEqual({
      level: 1,
      pointsIntoLevel: 0,
      pointsForNextLevel: 100,
      progress: 0,
    });
  });

  it("99포인트는 레벨 1 유지, 진행도 0.99", () => {
    const info = calculateLevel(99);
    expect(info.level).toBe(1);
    expect(info.pointsIntoLevel).toBe(99);
    expect(info.progress).toBeCloseTo(0.99);
  });

  it("100포인트는 레벨 2로 전환, 진행도 0", () => {
    const info = calculateLevel(100);
    expect(info.level).toBe(2);
    expect(info.pointsIntoLevel).toBe(0);
    expect(info.progress).toBe(0);
  });

  it("250포인트는 레벨 3, 진행도 0.5", () => {
    const info = calculateLevel(250);
    expect(info.level).toBe(3);
    expect(info.pointsIntoLevel).toBe(50);
    expect(info.progress).toBeCloseTo(0.5);
  });
});

describe("recordCompletionDate", () => {
  const day = new Date(2026, 6, 15);

  it("같은 날짜를 중복 기록하지 않는다", () => {
    const once = recordCompletionDate([], day);
    const twice = recordCompletionDate(once, day);
    expect(twice).toEqual([toLocalDateString(day)]);
  });

  it("다른 날짜는 추가된다", () => {
    const nextDay = new Date(2026, 6, 16);
    const result = recordCompletionDate(
      recordCompletionDate([], day),
      nextDay,
    );
    expect(result).toEqual([toLocalDateString(day), toLocalDateString(nextDay)]);
  });
});

describe("calculateStreak", () => {
  const today = new Date(2026, 6, 15);
  const dateStr = (offsetDays: number) => {
    const d = new Date(today);
    d.setDate(d.getDate() - offsetDays);
    return toLocalDateString(d);
  };

  it("기록이 없으면 0", () => {
    expect(calculateStreak([], today)).toBe(0);
  });

  it("오늘만 기록되어 있으면 1", () => {
    expect(calculateStreak([dateStr(0)], today)).toBe(1);
  });

  it("오늘까지 3일 연속이면 3", () => {
    expect(calculateStreak([dateStr(0), dateStr(1), dateStr(2)], today)).toBe(3);
  });

  it("오늘 기록이 없고 어제까지 연속이면 그레이스 기간으로 인정", () => {
    expect(calculateStreak([dateStr(1), dateStr(2)], today)).toBe(2);
  });

  it("오늘과 어제 모두 기록이 없으면 0 (스트릭 끊김)", () => {
    expect(calculateStreak([dateStr(2)], today)).toBe(0);
  });

  it("중간에 끊긴 날짜가 있으면 끊긴 지점까지만 센다", () => {
    expect(calculateStreak([dateStr(0), dateStr(1), dateStr(3)], today)).toBe(2);
  });

  it("입력 순서나 중복과 무관하게 동일한 결과", () => {
    const unordered = [dateStr(2), dateStr(0), dateStr(1), dateStr(0)];
    expect(calculateStreak(unordered, today)).toBe(3);
  });
});
