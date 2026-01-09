// 테스트 페이지
const Test = () => import("@/views/test/Test.vue");
const Campaign = () => import("@/views/test/Campaign.vue");
const CampaignPriority = () => import("@/views/test/CampaignPriority.vue");
const ObtmStatus = () => import("@/views/test/ObtmStatus.vue");
const Scis = () => import("@/views/test/Scis.vue");
const Obtm = () => import("@/views/test/Obtm.vue");
const ObtmAssign = () => import("@/views/test/ObtmAssign.vue");
const ObtmAssignCenter = () => import("@/views/test/ObtmAssignCenter.vue");
const Counselor = () => import("@/views/test/Counselor.vue");

export const testRoute = {
  path: "/test",
  name: "Test",
  component: Test,
  meta: {
    requiresAuth: true,
    titleKey: "pageTitles.test",
    icon: "test",
  },
};

export const campaignRoute = {
  path: "/campaign",
  name: "Campaign",
  component: Campaign,
  meta: {
    requiresAuth: false,
    titleKey: "pageTitles.default",
    icon: "campaign",
  },
};

export const campaignPriorityRoute = {
  path: "/campaign-priority",
  name: "CampaignPriority",
  component: CampaignPriority,
  meta: {
    requiresAuth: false,
    titleKey: "pageTitles.default",
    icon: "campaignPriority",
  },
};

export const obtmStatusRoute = {
  path: "/obtm-status",
  name: "ObtmStatus",
  component: ObtmStatus,
  meta: {
    requiresAuth: false,
    titleKey: "pageTitles.default",
    icon: "obtmStatus",
  },
};

export const scisRoute = {
  path: "/scis",
  name: "Scis",
  component: Scis,
  meta: {
    requiresAuth: false,
    titleKey: "pageTitles.default",
    icon: "scis",
  },
};

export const obtmRoute = {
  path: "/obtm",
  name: "Obtm",
  component: Obtm,
  meta: {
    requiresAuth: false,
    titleKey: "pageTitles.default",
    icon: "obtm",
  },
};

export const obtmAssignRoute = {
  path: "/obtm-assign",
  name: "ObtmAssign",
  component: ObtmAssign,
  meta: {
    requiresAuth: false,
    titleKey: "pageTitles.default",
    icon: "obtmAssign",
  },
};

export const obtmAssignCenterRoute = {
  path: "/obtm-assign-center",
  name: "ObtmAssignCenter",
  component: ObtmAssignCenter,
  meta: {
    requiresAuth: false,
    titleKey: "pageTitles.default",
    icon: "obtmAssignCenter",
  },
};

export const counselorRoute = {
  path: "/counselor",
  name: "Counselor",
  component: Counselor,
  meta: {
    requiresAuth: false,
    titleKey: "pageTitles.default",
    icon: "counselor",
  },
};
