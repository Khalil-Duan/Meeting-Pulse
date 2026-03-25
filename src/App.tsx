import React, { useEffect, useMemo, useState } from "react";
import MeetingDetailPage from "./components/MeetingDetailPage";
import DashboardPage from "./components/DashboardPage";
import { getMeetingsMock, type Meeting, type TenantId } from "./mock/meetings";

type Tenant = { id: string; name: string };
type MenuKey = "meetings" | "dashboard";

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function StarRating({ value }: { value: number }) {
  const safe = Number.isFinite(value) ? value : 0;
  const clamped = Math.max(0, Math.min(5, safe));

  let fullStars = Math.floor(clamped);
  const remainder = clamped - fullStars;
  const showHalf = remainder >= 0.25 && remainder < 0.75;
  if (remainder >= 0.75) fullStars = Math.min(5, fullStars + 1);

  return (
    <div
      className="flex items-center gap-1"
      role="img"
      aria-label={`效率评分 ${clamped.toFixed(1)} / 5`}
    >
      {Array.from({ length: 5 }).map((_, idx) => {
        const isFull = idx < fullStars;
        const isHalf = !isFull && showHalf && idx === fullStars;

        return (
          <span key={idx} className="inline-flex w-4 h-4 relative">
            <svg
              viewBox="0 0 24 24"
              className={cn("absolute inset-0 text-gray-200")}
              fill="currentColor"
            >
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>

            {isFull ? (
              <svg
                viewBox="0 0 24 24"
                className="absolute inset-0 text-indigo-500"
                fill="currentColor"
              >
                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
              </svg>
            ) : isHalf ? (
              <span className="absolute inset-0 overflow-hidden w-1/2">
                <svg
                  viewBox="0 0 24 24"
                  className="absolute inset-0 text-indigo-500"
                  fill="currentColor"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              </span>
            ) : null}
          </span>
        );
      })}
    </div>
  );
}

export default function App() {
  const tenants: Tenant[] = useMemo(
    () => [
      { id: "product", name: "产品团队" },
      { id: "research", name: "研发团队" },
    ],
    [],
  );

  const [activeTenantId, setActiveTenantId] = useState<TenantId>(
    (tenants[0]?.id as TenantId) ?? "product",
  );
  const [activeMenu, setActiveMenu] = useState<MenuKey>("meetings");
  const [selectedMeetingId, setSelectedMeetingId] = useState<number | null>(
    null,
  );

  const meetings = useMemo(
    () => getMeetingsMock(activeTenantId),
    [activeTenantId],
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-20 bg-white border-b">
        <div className="h-16 px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white font-bold flex items-center justify-center select-none">
              MP
            </div>
            <div className="leading-tight">
              <div className="text-sm text-gray-500">Meeting Pulse</div>
              <div className="text-base font-semibold text-gray-900">会议效率分析</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">团队</span>
              <select
                className="h-9 px-3 rounded-lg border border-gray-200 bg-white text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={activeTenantId}
                onChange={(e: any) => {
                  setActiveTenantId(e.target.value as TenantId);
                  setSelectedMeetingId(null);
                }}
                aria-label="租户切换"
              >
                {tenants.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-700 font-semibold"
              aria-label="用户"
              type="button"
            >
              U
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 border-r bg-white">
          <div className="p-4">
            <div className="text-xs uppercase tracking-wide text-gray-500 mb-3">
              菜单
            </div>
            <nav className="space-y-2">
              <button
                type="button"
                onClick={() => {
                  setActiveMenu("meetings");
                  setSelectedMeetingId(null);
                }}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-xl border flex items-center gap-2 transition",
                  activeMenu === "meetings"
                    ? "bg-indigo-50 border-indigo-200 text-indigo-800"
                    : "bg-white border-transparent text-gray-700 hover:bg-gray-50 hover:border-gray-200",
                )}
              >
                <span className="inline-flex w-8 h-8 rounded-lg bg-indigo-100 items-center justify-center text-indigo-700">
                  M
                </span>
                <span className="font-medium">会议列表</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveMenu("dashboard");
                  setSelectedMeetingId(null);
                }}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-xl border flex items-center gap-2 transition",
                  activeMenu === "dashboard"
                    ? "bg-indigo-50 border-indigo-200 text-indigo-800"
                    : "bg-white border-transparent text-gray-700 hover:bg-gray-50 hover:border-gray-200",
                )}
              >
                <span className="inline-flex w-8 h-8 rounded-lg bg-indigo-100 items-center justify-center text-indigo-700">
                  D
                </span>
                <span className="font-medium">数据看板</span>
              </button>
            </nav>

            <div className="mt-6 text-xs text-gray-500">
              当前租户：{" "}
              <span className="text-gray-900 font-medium">
                {tenants.find((t) => t.id === activeTenantId)?.name ?? "-"}
              </span>
            </div>
          </div>
        </aside>

        <main className="flex-1 p-4 sm:p-6">
          {activeMenu === "meetings" ? (
            selectedMeetingId !== null ? (
              <MeetingDetailPage
                meetingId={selectedMeetingId}
                tenantId={activeTenantId}
                onBack={() => setSelectedMeetingId(null)}
              />
            ) : (
              <MeetingsListPage
                meetings={meetings}
                onSelect={(id) => setSelectedMeetingId(id)}
              />
            )
          ) : (
            <DashboardPage tenantId={activeTenantId} />
          )}
        </main>
      </div>
    </div>
  );
}

function MeetingsListPage({
  meetings,
  onSelect,
}: {
  meetings: Meeting[];
  onSelect: (id: number) => void;
}) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const t = window.setTimeout(() => setLoading(false), 600);
    return () => window.clearTimeout(t);
  }, [meetings]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return meetings;
    return meetings.filter((m) => m.name.toLowerCase().includes(q));
  }, [meetings, query]);

  return (
    <section className="bg-white border rounded-2xl">
      <div className="p-4 sm:p-6 border-b">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            会议列表
          </h2>
          <p className="mt-1 text-gray-600 text-sm">
            顶部支持搜索，点击条目跳转到会议详情（示例数据）。
          </p>
        </div>

        <div className="mt-5">
          <label className="block text-xs text-gray-500 mb-2">搜索</label>
          <input
            value={query}
            onChange={(e: any) => setQuery(e.target.value)}
            placeholder="例如：Q1、产品、评审..."
            className="w-full h-10 px-3 rounded-xl border border-gray-200 bg-white text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {loading ? (
          <div className="space-y-3">
            {new Array(3).fill(0).map((_, idx) => (
              <div
                key={idx}
                className="w-full text-left rounded-2xl border border-gray-200 bg-white p-4 animate-pulse"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
                  <div className="min-w-0">
                    <div className="h-4 bg-gray-200 rounded w-3/4" />
                    <div className="mt-2 h-3 bg-gray-200 rounded w-1/2" />
                  </div>
                  <div>
                    <div className="h-3 bg-gray-200 rounded w-24" />
                    <div className="mt-2 h-4 bg-gray-200 rounded w-20" />
                  </div>
                  <div>
                    <div className="h-3 bg-gray-200 rounded w-24" />
                    <div className="mt-2 h-4 bg-gray-200 rounded w-32" />
                  </div>
                  <div className="text-xs text-gray-500 text-right lg:text-left">
                    <div className="h-3 bg-gray-200 rounded w-28 ml-auto" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-10 text-center text-gray-500">暂无会议</div>
        ) : (
          <div className="space-y-3">
            {filtered.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => onSelect(m.id)}
                className="w-full text-left rounded-2xl border border-gray-200 bg-white p-4 hover:bg-gray-50 transition focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
                  <div className="min-w-0">
                    <div className="font-semibold text-gray-900 truncate">
                      {m.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{m.date}</div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500">参会人数</div>
                    <div className="text-sm font-semibold text-gray-900">
                      {m.attendees} 人
                    </div>
                  </div>

                  <div>
                    <div className="text-xs text-gray-500">效率评分</div>
                    <div className="flex items-center gap-2">
                      <StarRating value={m.score} />
                      <span className="text-sm font-semibold text-gray-900">
                        {m.score.toFixed(1)}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500 text-right lg:text-left">
                    点击查看详情
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

