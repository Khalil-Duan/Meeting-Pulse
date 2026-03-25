import React, { useEffect, useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getDashboardMock } from "../mock/dashboard";
import type { TenantId } from "../mock/meetings";

function KpiCard({
  title,
  value,
  sub,
}: {
  title: string;
  value: string;
  sub: string;
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="mt-2 flex items-end justify-between gap-3">
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        <div className="text-xs text-gray-500 pb-1">{sub}</div>
      </div>
    </div>
  );
}

function formatEfficiency(v: number) {
  return Number.isFinite(v) ? v.toFixed(1) : "0.0";
}

export default function DashboardPage({ tenantId }: { tenantId: TenantId }) {
  const mock = useMemo(() => getDashboardMock(tenantId), [tenantId]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = window.setTimeout(() => setLoading(false), 600);
    return () => window.clearTimeout(t);
  }, [tenantId]);

  return (
    <section className="bg-white border rounded-2xl p-4 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
            数据看板
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            展示会议效率与团队参与情况（Mock 数据）。
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
        {loading ? (
          new Array(3).fill(0).map((_, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-gray-200 bg-white p-5 animate-pulse"
            >
              <div className="h-4 bg-gray-200 rounded w-2/3" />
              <div className="mt-3 h-8 bg-gray-200 rounded w-1/2" />
              <div className="mt-2 h-3 bg-gray-200 rounded w-1/3" />
            </div>
          ))
        ) : (
          <>
            <KpiCard
              title="本月会议数"
              value={String(mock.kpis.meetingCountThisMonth)}
              sub="单位：场"
            />
            <KpiCard
              title="平均效率评分"
              value={formatEfficiency(mock.kpis.avgEfficiencyThisMonth)}
              sub="0 - 5"
            />
            <KpiCard
              title="总节省时间"
              value={`${mock.kpis.savedHoursThisMonth}`}
              sub="单位：小时"
            />
          </>
        )}
      </div>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h3 className="text-base font-semibold text-gray-900">
            近 6 个月会议效率趋势
          </h3>
          <span className="text-xs text-gray-500">折线图（Recharts）</span>
        </div>

        {loading ? (
          <div className="mt-4 h-56 sm:h-[260px] rounded-xl bg-gray-50 border border-gray-200 animate-pulse" />
        ) : mock.trend.length === 0 ? (
          <div className="mt-4 py-12 text-center text-gray-500">暂无会议</div>
        ) : (
          <div className="mt-4 h-56 sm:h-[260px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={mock.trend}
                margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="monthLabel" />
                <YAxis
                  domain={[0, 5]}
                  tickFormatter={(v: any) => Number(v).toFixed(1)}
                />
                <Tooltip
                  formatter={(value: unknown) =>
                    typeof value === "number" ? value.toFixed(1) : value
                  }
                  labelFormatter={(label: any) => String(label)}
                />
                <Line
                  type="monotone"
                  dataKey="avgEfficiency"
                  name="效率评分"
                  stroke="#4f46e5"
                  strokeWidth={3}
                  dot={{
                    r: 3,
                    strokeWidth: 2,
                    stroke: "#4f46e5",
                    fill: "#fff",
                  }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-5">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h3 className="text-base font-semibold text-gray-900">团队贡献排行榜</h3>
          <span className="text-xs text-gray-500">按参与会议次数降序</span>
        </div>

        <div className="mt-3 overflow-x-auto">
          {loading ? (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b">
                  <th className="py-3 pr-3 font-semibold">成员姓名</th>
                  <th className="py-3 pr-3 font-semibold">参与会议次数</th>
                </tr>
              </thead>
              <tbody>
                {new Array(5).fill(0).map((_, idx) => (
                  <tr key={idx} className="border-b last:border-b-0">
                    <td className="py-3 pr-3">
                      <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
                    </td>
                    <td className="py-3 pr-3">
                      <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : mock.leaderboard.length === 0 ? (
            <div className="py-12 text-center text-gray-500">暂无会议</div>
          ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b">
                <th className="py-3 pr-3 font-semibold">成员姓名</th>
                <th className="py-3 pr-3 font-semibold">参与会议次数</th>
              </tr>
            </thead>
            <tbody>
              {mock.leaderboard.map((row) => (
                <tr key={row.name} className="border-b last:border-b-0">
                  <td className="py-3 pr-3 text-gray-900 font-medium">{row.name}</td>
                  <td className="py-3 pr-3 text-gray-700 whitespace-nowrap">
                    {row.meetingCount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          )}
        </div>
      </div>
    </section>
  );
}

