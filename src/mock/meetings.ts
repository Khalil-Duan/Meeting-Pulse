export type Meeting = {
  id: number;
  name: string;
  date: string; // e.g. 2026-03-20
  attendees: number;
  score: number; // 0 - 5
};

export type TenantId = "product" | "research";

export type MeetingParticipant = { id: string; name: string };

export type MeetingMetrics = {
  decisionEfficiency: number; // 0 - 100
  engagement: number; // 0 - 100
  timeUtilization: number; // 0 - 100
};

export type MeetingDecision = { id: string; text: string; selected: boolean };

export type MeetingTask = {
  id: string;
  task: string;
  owner: string;
  due: string; // e.g. 2026-03-28
};

export type MeetingDetailMock = {
  participants: MeetingParticipant[];
  metrics: MeetingMetrics;
  smartSummary: string;
  decisions: MeetingDecision[];
  tasks: MeetingTask[];
};

const mockMeetingsByTenant: Record<TenantId, Meeting[]> = {
  product: [
    {
      id: 1,
      name: "Q1 产品规划会",
      date: "2026-03-20",
      attendees: 8,
      score: 4.5,
    },
    {
      id: 2,
      name: "技术方案评审",
      date: "2026-03-18",
      attendees: 5,
      score: 3.8,
    },
  ],
  research: [
    {
      id: 1,
      name: "研发路线对齐会",
      date: "2026-03-21",
      attendees: 9,
      score: 4.1,
    },
    {
      id: 2,
      name: "安全与性能评审",
      date: "2026-03-16",
      attendees: 6,
      score: 3.6,
    },
  ],
};

const mockMeetingDetailsByTenant: Record<
  TenantId,
  Record<number, MeetingDetailMock>
> = {
  product: {
    1: {
      participants: [
        { id: "p1", name: "李晓东" },
        { id: "p2", name: "王丽" },
        { id: "p3", name: "张伟" },
        { id: "p4", name: "陈思" },
        { id: "p5", name: "赵磊" },
        { id: "p6", name: "孙敏" },
        { id: "p7", name: "周航" },
        { id: "p8", name: "吴凡" },
      ],
      metrics: {
        decisionEfficiency: 86,
        engagement: 74,
        timeUtilization: 92,
      },
      smartSummary:
        "本次会议确定了 Q2 产品路线图，讨论了技术方案选型，最终决定采用微服务架构。",
      decisions: [
        {
          id: "d1",
          text: "Q2 重点交付：会议日程智能化 + 数据看板 V1",
          selected: true,
        },
        {
          id: "d2",
          text: "技术方案：采用微服务架构以提升可扩展性",
          selected: true,
        },
        {
          id: "d3",
          text: "里程碑：4 月底完成原型评审与风险清单收口",
          selected: false,
        },
      ],
      tasks: [
        {
          id: "t1",
          task: "拆解 Q2 路线图并产出需求 PRD",
          owner: "李晓东",
          due: "2026-03-27",
        },
        {
          id: "t2",
          task: "完成微服务架构与接口规范草案",
          owner: "陈思",
          due: "2026-03-29",
        },
        {
          id: "t3",
          task: "搭建数据看板原型并进行用户验证",
          owner: "王丽",
          due: "2026-03-31",
        },
        {
          id: "t4",
          task: "整理风险清单并给出缓解方案",
          owner: "赵磊",
          due: "2026-04-02",
        },
      ],
    },
    2: {
      participants: [
        { id: "p1", name: "郑凯" },
        { id: "p2", name: "邓佳" },
        { id: "p3", name: "高翔" },
        { id: "p4", name: "沈琳" },
        { id: "p5", name: "许晴" },
      ],
      metrics: {
        decisionEfficiency: 78,
        engagement: 65,
        timeUtilization: 83,
      },
      smartSummary:
        "本次会议对技术方案进行了对比评审，明确了关键约束条件；通过讨论取舍，最终选择以可观测性优先的工程路线落地。",
      decisions: [
        {
          id: "d1",
          text: "选择：核心链路优先实现可观测性与告警体系",
          selected: true,
        },
        {
          id: "d2",
          text: "弃用：复杂缓存策略作为初期方案（先简后优）",
          selected: true,
        },
      ],
      tasks: [
        {
          id: "t1",
          task: "输出方案差异对照表与评审结论",
          owner: "郑凯",
          due: "2026-03-20",
        },
        {
          id: "t2",
          task: "补充性能基准与压测计划",
          owner: "高翔",
          due: "2026-03-22",
        },
        {
          id: "t3",
          task: "定义监控指标与告警阈值",
          owner: "沈琳",
          due: "2026-03-25",
        },
      ],
    },
  },
  research: {
    1: {
      participants: [
        { id: "p1", name: "周航" },
        { id: "p2", name: "吴凡" },
        { id: "p3", name: "赵磊" },
        { id: "p4", name: "王丽" },
        { id: "p5", name: "孙敏" },
        { id: "p6", name: "郭明" },
        { id: "p7", name: "刘晨" },
        { id: "p8", name: "陈思" },
        { id: "p9", name: "李晓东" },
      ],
      metrics: {
        decisionEfficiency: 82,
        engagement: 70,
        timeUtilization: 88,
      },
      smartSummary:
        "本次会议围绕研发路线的关键约束条件展开讨论，明确了接口稳定性与验证节奏；最终形成以可验证性优先的工程落地路径。",
      decisions: [
        {
          id: "d1",
          text: "路线优先：以可验证性与交付节奏为核心的分层里程碑",
          selected: true,
        },
        {
          id: "d2",
          text: "架构取舍：保留事件驱动骨架，先简化数据管道",
          selected: true,
        },
        {
          id: "d3",
          text: "风险控制：新增性能基线与压测门禁作为放行条件",
          selected: false,
        },
      ],
      tasks: [
        {
          id: "t1",
          task: "输出分层里程碑与验收标准（V1/V2）",
          owner: "周航",
          due: "2026-03-24",
        },
        {
          id: "t2",
          task: "完成事件驱动骨架的接口草案与示例",
          owner: "吴凡",
          due: "2026-03-26",
        },
        {
          id: "t3",
          task: "补充性能基线目标与压测计划",
          owner: "赵磊",
          due: "2026-03-29",
        },
      ],
    },
    2: {
      participants: [
        { id: "p1", name: "高翔" },
        { id: "p2", name: "沈琳" },
        { id: "p3", name: "许晴" },
        { id: "p4", name: "郑凯" },
        { id: "p5", name: "刘晨" },
        { id: "p6", name: "郭明" },
      ],
      metrics: {
        decisionEfficiency: 74,
        engagement: 61,
        timeUtilization: 79,
      },
      smartSummary:
        "会议完成了安全与性能的联合评审：在可接受风险范围内，优先保证关键链路的稳定性；并决定先做基线压测再逐步加固。",
      decisions: [
        {
          id: "d1",
          text: "安全策略：关键链路引入限流与告警分级",
          selected: true,
        },
        {
          id: "d2",
          text: "性能策略：先建立压测基线，再迭代优化",
          selected: true,
        },
      ],
      tasks: [
        {
          id: "t1",
          task: "制定限流策略与告警分级清单",
          owner: "沈琳",
          due: "2026-03-18",
        },
        {
          id: "t2",
          task: "补充关键链路的性能基线与压测脚本",
          owner: "高翔",
          due: "2026-03-22",
        },
      ],
    },
  },
};

export function getMeetingsMock(tenantId: TenantId): Meeting[] {
  return mockMeetingsByTenant[tenantId];
}

export function getMeetingDetailMock(
  tenantId: TenantId,
  meetingId: number,
): MeetingDetailMock {
  return (
    mockMeetingDetailsByTenant[tenantId]?.[meetingId] ?? {
      participants: [],
      metrics: { decisionEfficiency: 0, engagement: 0, timeUtilization: 0 },
      smartSummary: "暂无会议摘要（示例占位）。",
      decisions: [],
      tasks: [],
    }
  );
}


