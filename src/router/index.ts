import VueRouter from "vue-router";
import type { RouteConfig } from "vue-router";
import Vue from "vue";
import i18n from "@/i18n";

Vue.use(VueRouter);

// Sky 페이지
const Sky = () => import("@/views/test/Sky.vue");

// Main 페이지
const Main = () => import("@/views/test/Main.vue");

// 에러 페이지
const NotFound = () => import("@/views/error/NotFound.vue");

// 각 화면별 라우트 import
import { testRoute, campaignRoute, campaignPriorityRoute, obtmStatusRoute, scisRoute, obtmRoute, obtmAssignRoute, obtmAssignCenterRoute, counselorRoute } from "./routes/test";

import store from "../store";

// 기본 라우트 (모든 사용자에게 공통)
const baseRoutes: RouteConfig[] = [
  {
    path: "/",
    name: "Main",
    component: Main,
    meta: {
      requiresAuth: false,
      titleKey: "pageTitles.default",
    },
  },
  {
    path: "/sky",
    name: "Sky",
    component: Sky,
    meta: {
      requiresAuth: false, // 필요에 따라 true/false
      titleKey: "pageTitles.sky", // 없으면 생략 가능
    },
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFound,
  },
  testRoute,
  campaignRoute,
  campaignPriorityRoute,
  obtmStatusRoute,
  scisRoute,
  obtmRoute,
  obtmAssignRoute,
  obtmAssignCenterRoute,
  counselorRoute,
];

// 코드별 라우트 매핑
const codeBasedRoutes: Record<string, RouteConfig | null> = {
  WEB01: null,
};

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: baseRoutes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
});

// 코드 기반 라우트 동적 추가 함수
export const addRoleBasedRoutes = (userCodes: string[]) => {
  if (!userCodes || userCodes.length === 0) {
    console.warn("[Router] 사용자 코드가 없습니다.");
    return;
  }

  // 코드 기반으로 라우트 추가
  const roleRoutes = userCodes
    .map((code) => codeBasedRoutes[code])
    .filter((route): route is RouteConfig => route !== null); // null 값 제거 및 타입 가드

  if (roleRoutes.length > 0) {
    // Vue Router 3에서는 addRoutes 사용
    roleRoutes.forEach((route) => {
      try {
        router.addRoutes([route]);
      } catch (error) {
        console.error(`[Router] 라우트 추가 실패: ${route.path}`, error);
      }
    });

    console.log(
      `[Router] 사용자 코드 기반 라우트 추가 완료 (${roleRoutes.length}개)`
    );
  } else {
    console.warn(
      `[Router] 유효한 라우트 코드가 없습니다: ${userCodes.join(", ")}`
    );
  }
};

// 네비게이션 가드
router.beforeEach(async (to, _from, next) => {
  const isLoggedIn = store.getters["auth/isLoggedIn"];
  const userName = store.getters["auth/user"]?.username;

  const requiresAuth = to.meta.requiresAuth !== undefined ? to.meta.requiresAuth : true;

  console.log(
    "[router/index.ts] isLoggedIn: ",
    isLoggedIn,
    ", userName: ",
    userName,
    ", requiresAuth: ",
    requiresAuth
  );

  // ✅ 세션 관리 기능 임시 비활성화
  // // ✅ 새창에서 로그인 상태 확인 (sessionStorage가 비어있을 수 있음)
  // // 단, 로그인 페이지에서는 토큰 검증 스킵
  // if (!isLoggedIn && to.path !== "/login") {
  //   console.log("로그인 상태가 false, 토큰 유효성 확인 시도...");
  //   await store.dispatch("auth/checkTokenValidity");
  //   const newIsLoggedIn = store.getters["auth/isLoggedIn"];
  //   console.log("토큰 유효성 확인 후 isLoggedIn 상태:", newIsLoggedIn);
  // }

  // // ✅ 인증 필요하지만 로그인 안 한 경우 → 로그인 페이지로
  // if (requiresAuth && !isLoggedIn) {
  //   console.log("인증 필요하지만 로그인 안 한 경우 → 로그인 페이지로 >> ");
  //   return next("/login");
  // }

  // // ✅ 로그인된 사용자의 기본 정보 확인
  // if (requiresAuth && isLoggedIn) {
  //   // localStorage에서 사용자 정보 확인
  //   const authName = localStorage.getItem("authName");
  //   const authUsername = localStorage.getItem("authUsername");
  //   const authCodes = localStorage.getItem("authCodes");

  //   if (!authName || !authUsername || !authCodes) {
  //     console.log(
  //       "localStorage에 사용자 정보가 없음, 로그아웃 처리 후 로그인 페이지로 >> "
  //     );
  //     await store.dispatch("auth/logout");
  //     return next("/login");
  //   }
  // }

  // // ✅ 이미 로그인된 사용자가 로그인 페이지 접근 시 → 코드관리 페이지로
  // if (to.path === "/login" && isLoggedIn) {
  //   console.log(
  //     "이미 로그인된 사용자가 로그인 페이지 접근 → 코드관리 페이지로 >> "
  //   );
  //   return next("/code");
  // }

  // ✅ 문제 없으면 통과
  next();
});

// 페이지 타이틀 설정
router.afterEach((to) => {
  const titleKey = to.meta.titleKey as string;
  if (titleKey) {
    const translatedTitle = i18n.t(titleKey);
    document.title = `${translatedTitle} - SKY TEST`;
  } else {
    document.title = i18n.t("pageTitles.default");
  }
});

export default router;
