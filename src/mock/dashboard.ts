import type { TenantId } from "./meetings";

export type MonthlyTrendPoint = {
  monthLabel: string; // e.g. "3月"
  avgEfficiency: number; // 0 - 5
  meetingCount: number;
  savedHours: number;
};

export type TeamLeaderboardEntry = { name: string; meetingCount: number };

export function getDashboardMock(
  tenantId: TenantId,
  now = new Date(),
): {
  kpis: {
    meetingCountThisMonth: number;
    avgEfficiencyThisMonth: number;
    savedHoursThisMonth: number;
  };
  trend: MonthlyTrendPoint[];
  leaderboard: TeamLeaderboardEntry[];
} {
  const productMeetingCountSeries = [6, 8, 7, 5, 9, 6];
  const productAvgEfficiencySeries = [3.9, 4.2, 4.0, 3.6, 4.4, 4.1];
  const productSavedHoursSeries = [120, 150, 138, 110, 175, 160];

  const researchMeetingCountSeries = [4, 6, 5, 8, 7, 6];
  const researchAvgEfficiencySeries = [3.5, 3.2, 3.8, 4.0, 3.9, 3.6];
  const researchSavedHoursSeries = [80, 95, 90, 120, 110, 105];

  const meetingCountSeries =
    tenantId === "product" ? productMeetingCountSeries : researchMeetingCountSeries;
  const avgEfficiencySeries =
    tenantId === "product" ? productAvgEfficiencySeries : researchAvgEfficiencySeries;
  const savedHoursSeries =
    tenantId === "product" ? productSavedHoursSeries : researchSavedHoursSeries;

  const trend: MonthlyTrendPoint[] = [];
  for (let i = 5; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthLabel = `${d.getMonth() + 1}月`;
    const idx = 5 - i;
    trend.push({
      monthLabel,
      avgEfficiency: avgEfficiencySeries[idx],
      meetingCount: meetingCountSeries[idx],
      savedHours: savedHoursSeries[idx],
    });
  }

  const thisMonth = trend[trend.length - 1];

  const leaderboard: TeamLeaderboardEntry[] =
    tenantId === "product"
      ? [
          { name: "李晓东", meetingCount: 12 },
          { name: "王丽", meetingCount: 10 },
          { name: "张伟", meetingCount: 8 },
          { name: "陈思", meetingCount: 7 },
          { name: "赵磊", meetingCount: 6 },
          { name: "孙敏", meetingCount: 5 },
        ].sort((a, b) => b.meetingCount - a.meetingCount)
      : [
          { name: "郑凯", meetingCount: 11 },
          { name: "高翔", meetingCount: 9 },
          { name: "沈琳", meetingCount: 8 },
          { name: "许晴", meetingCount: 7 },
          { name: "刘晨", meetingCount: 6 },
          { name: "郭明", meetingCount: 5 },
        ].sort((a, b) => b.meetingCount - a.meetingCount);

  return {
    kpis: {
      meetingCountThisMonth: thisMonth.meetingCount,
      avgEfficiencyThisMonth: thisMonth.avgEfficiency,
      savedHoursThisMonth: thisMonth.savedHours,
    },
    trend,
    leaderboard,
  };
}

