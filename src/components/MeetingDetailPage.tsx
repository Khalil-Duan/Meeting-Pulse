import React, { useMemo } from "react";
import {
  getMeetingDetailMock,
  getMeetingsMock,
  type Meeting,
  type TenantId,
} from "../mock/meetings";

function Avatar({ name }: { name: string }) {
  const initial = (name.trim()[0] ?? "?").toUpperCase();
  const hue = useMemo(() => {
    let hash = 0;
    for (let i = 0; i < name.length; i++)
      hash = (hash * 31 + name.charCodeAt(i)) % 360;
    return hash;
  }, [name]);

  return (
    <div
      className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-semibold select-none"
      style={{ backgroundColor: `hsl(${hue} 70% 45%)` }}
      aria-label={name}
      title={name}
    >
      {initial}
    </div>
  );
}

function RingProgress({
  value,
  label,
  colorClass,
}: {
  value: number;
  label: string;
  colorClass: string; // tailwind text color class, e.g. "text-indigo-600"
}) {
  const progress = Math.max(0, Math.min(100, Number.isFinite(value) ? value : 0));
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress / 100);

  return (
    <div className="flex items-center gap-4">
      <div className="relative w-14 h-14 flex-shrink-0">
        <svg className="w-14 h-14" viewBox="0 0 48 48" role="img" aria-label={`${label} ${progress}%`}>
          <circle
            cx="24"
            cy="24"
            r={radius}
            strokeWidth="6"
            className="text-gray-200"
            stroke="currentColor"
            fill="none"
          />
          <circle
            cx="24"
            cy="24"
            r={radius}
            strokeWidth="6"
            className={colorClass}
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            transform="rotate(-90 24 24)"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-xs font-semibold text-gray-900">
            {Math.round(progress)}
            <span className="text-[10px] font-medium text-gray-500">%</span>
          </div>
        </div>
      </div>

      <div className="min-w-0">
        <div className="text-sm font-semibold text-gray-900">{label}</div>
        <div className="text-xs text-gray-500 mt-1">Mock 指标</div>
      </div>
    </div>
  );
}

function MeetingInfoHeader({
  meeting,
  participants,
}: {
  meeting: Meeting;
  participants: Array<{ id: string; name: string }>;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
        <div className="min-w-0">
          <h2 className="text-2xl font-semibold text-gray-900 truncate">{meeting.name}</h2>
          <div className="mt-2 flex items-center gap-3 text-sm text-gray-700 flex-wrap">
            <div className="inline-flex items-center gap-2">
              <span className="text-gray-500">时间：</span>
              <span className="font-semibold">{meeting.date}</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <span className="text-gray-500">参会人数：</span>
              <span className="font-semibold">{meeting.attendees} 人</span>
            </div>
          </div>
        </div>

        <div className="min-w-0 lg:max-w-lg">
          <div className="text-sm font-semibold text-gray-900">参会人</div>
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {participants.map((p) => (
              <div key={p.id} className="flex items-center gap-2 min-w-0">
                <Avatar name={p.name} />
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-gray-900 truncate">
                    {p.name}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function MeetingDetailPage({
  meetingId,
  tenantId,
  onBack,
}: {
  meetingId: number;
  tenantId: TenantId;
  onBack: () => void;
}) {
  const meetings = useMemo(() => getMeetingsMock(tenantId), [tenantId]);
  const meeting = useMemo(() => {
    return meetings.find((m) => m.id === meetingId) ?? meetings[0];
  }, [meetings, meetingId]);
  const detail = useMemo(
    () => getMeetingDetailMock(tenantId, meetingId),
    [tenantId, meetingId],
  );

  if (!meeting) {
    return (
      <section className="bg-white border rounded-2xl h-full">
        <div className="p-4 sm:p-6 border-b">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
            未找到会议
          </h2>
          <p className="mt-2 text-gray-600 text-sm">请返回列表重试。</p>
        </div>
        <div className="p-4 sm:p-6">
          <button
            type="button"
            onClick={onBack}
            className="h-10 px-4 rounded-xl border border-gray-200 bg-white text-gray-700 font-semibold shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            返回列表
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white border rounded-2xl h-full">
      <div className="p-4 sm:p-6 border-b flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900">
            会议详情
          </h2>
          <div className="mt-1 text-sm text-gray-600">查看会议摘要、决策与待办（Mock 数据）。</div>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="h-10 px-4 rounded-xl border border-gray-200 bg-white text-gray-700 font-semibold shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          返回列表
        </button>
      </div>

      <div className="p-4 sm:p-6 space-y-5">
        <MeetingInfoHeader meeting={meeting} participants={detail.participants} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-3 rounded-2xl border border-gray-200 bg-white p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">效率评分仪表盘</h3>
              <span className="text-xs text-gray-500">3 个环形进度条</span>
            </div>

            <div className="mt-4 space-y-4">
              <RingProgress
                value={detail.metrics.decisionEfficiency}
                label="决策效率"
                colorClass="text-indigo-600"
              />
              <RingProgress
                value={detail.metrics.engagement}
                label="参与度"
                colorClass="text-amber-500"
              />
              <RingProgress
                value={detail.metrics.timeUtilization}
                label="时间利用率"
                colorClass="text-emerald-600"
              />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-5">
          <div className="text-sm font-semibold text-indigo-900">智能摘要</div>
          <div className="mt-2 text-gray-800 leading-relaxed">
            {detail.smartSummary}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:col-span-1">
            <h3 className="text-base font-semibold text-gray-900">决策清单</h3>
            <div className="mt-3 space-y-3">
              {detail.decisions.map((d) => (
                <label key={d.id} className="flex items-start gap-3 cursor-default">
                  <input
                    type="checkbox"
                    checked={d.selected}
                    disabled
                    readOnly
                    className="mt-1 accent-indigo-600"
                  />
                  <div className="text-sm text-gray-800 leading-snug">{d.text}</div>
                </label>
              ))}
              {detail.decisions.length === 0 ? (
                <div className="text-sm text-gray-500">暂无决策（示例占位）。</div>
              ) : null}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">待办事项</h3>
              <span className="text-xs text-gray-500">任务、负责人、截止日期</span>
            </div>

            <div className="mt-3 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500 border-b">
                    <th className="py-3 pr-3 font-semibold">任务</th>
                    <th className="py-3 pr-3 font-semibold">负责人</th>
                    <th className="py-3 pr-3 font-semibold">截止日期</th>
                  </tr>
                </thead>
                <tbody>
                  {detail.tasks.map((t) => (
                    <tr key={t.id} className="border-b last:border-b-0">
                      <td className="py-3 pr-3 text-gray-900">{t.task}</td>
                      <td className="py-3 pr-3 text-gray-700">{t.owner}</td>
                      <td className="py-3 pr-3 text-gray-700 whitespace-nowrap">{t.due}</td>
                    </tr>
                  ))}
                  {detail.tasks.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="py-10 text-center text-gray-500">
                        暂无待办（示例占位）
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={() => alert(`导出报告：${meeting.name}`)}
            className="h-11 px-6 rounded-xl bg-indigo-600 text-white font-semibold shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            导出报告
          </button>
        </div>
      </div>
    </section>
  );
}

