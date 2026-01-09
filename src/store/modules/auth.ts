import { removeUserInfo } from "../../utils/cookies";
import { request } from "../../utils/request";
import { addRoleBasedRoutes } from "../../router";
import {
  startAutoRefresh,
  stopAutoRefresh,
  isCurrentTokenValid,
} from "../../utils/tokenManager";

interface User {
  username: string;
  fullName: string;
  roleName: string;
  codes: string[];
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
}

export const auth = {
  namespaced: true,
  state: (): AuthState => ({
    isLoggedIn: false,
    user: null,
  }),
  getters: {
    isLoggedIn: (state: AuthState) => state.isLoggedIn,
    user: (state: AuthState) => state.user,
  },
  mutations: {
    SET_LOGGED_IN(state: AuthState, value: boolean) {
      state.isLoggedIn = value;
    },
    SET_USER(state: AuthState, user: User | null) {
      state.user = user;
    },
  },
  actions: {
    // 로그인 처리
    async login(
      { commit }: any,
      {
        username,
        password,
        selectedLang,
      }: { username: string; password: string; selectedLang?: string }
    ) {
      try {
        // 로그인 API 호출 (request 함수 사용)
        const result = await request("/api/main/login", undefined, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
            system_code: process.env.VITE_SYSTEM_CODE,
            language: selectedLang || "ko",
          }),
        });

        if (result) {
          // 로그인 성공 시
          if (result.success && result.response) {
            const responseData = result.response;

            // WAI_WEB_ADMIN 시스템 코드의 메뉴들 필터링 START =======================
            const waiWebAdminMenus =
              responseData.menus?.filter(
                (menu: any) => menu.system_code === "WAI_WEB_ADMIN"
              ) || [];
            const menuCodes = waiWebAdminMenus
              .map((menu: any) => menu.menu_code)
              .filter((code: string) => code.startsWith("WEB"));
            // WAI_WEB_ADMIN 시스템 코드의 메뉴들 필터링 END =======================

            // 메뉴 접근 권한 확인
            if (menuCodes.length === 0) {
              throw new Error("messages.error.noMenuAccess");
            }

            // 로그인 응답에서 사용자 정보 처리
            if (responseData.user_info) {
              // 역할 정보 추출
              const roleName =
                responseData.user_info.roles?.[0]?.role_name || "";

              const userInfo: User = {
                username: responseData.user_info.username,
                fullName: responseData.user_info.full_name,
                roleName: roleName,
                codes: menuCodes || [],
              };

              // LocalStorage에 사용자 정보 저장 (새창 공유용)
              localStorage.setItem("authName", userInfo.fullName);
              localStorage.setItem("authUsername", userInfo.username);
              localStorage.setItem("authRoleName", userInfo.roleName);
              localStorage.setItem("authCodes", JSON.stringify(userInfo.codes));
              localStorage.setItem(
                "authUserId",
                responseData.user_info.user_id
              );
              localStorage.setItem(
                "authSuper",
                String(responseData.user_info.is_superuser || false)
              );

              // 스토어 상태 업데이트
              commit("SET_LOGGED_IN", true);
              commit("SET_USER", userInfo);

              // 코드 기반 라우트 동적 추가
              addRoleBasedRoutes(userInfo.codes);

              // 자동 토큰 갱신 시작
              startAutoRefresh();
            }
          } else {
            // 로그인 실패 시 - 상태 코드별 에러 처리
            if (result.status === 401) {
              throw new Error("messages.error.loginFail");
            } else if (result.status === 403) {
              throw new Error("messages.error.noMenuAccess");
            } else {
              throw new Error("messages.error.loginFailed");
            }
          }
        } else {
          throw new Error("messages.error.noServerResponse");
        }
      } catch (error: any) {
        console.error("로그인 실패:", error);
        if (error && typeof error === "object" && "status" in error) {
          if (error.status === 401) {
            throw new Error("messages.error.loginFail");
          } else if (error.status === 403) {
            throw new Error("messages.error.noMenuAccess");
          } else {
            throw new Error("messages.error.loginFailed");
          }
        }
        if (error instanceof Error) {
          throw error;
        }
        throw new Error("messages.error.loginFailed");
      }
    },

    // 로그아웃 처리
    async logout({ commit }: any) {
      try {
        console.log("서버에 토큰 무효화 요청 중...");
        await request("/api/main/logout", undefined, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            system_code: process.env.VITE_SYSTEM_CODE,
          }),
        });
        console.log("서버 토큰 무효화 완료");
      } catch (error) {
        console.warn(
          "서버 토큰 무효화 실패, 클라이언트 측 정리만 진행:",
          error
        );
      } finally {
        // 클라이언트 측 정리
        commit("SET_LOGGED_IN", false);
        commit("SET_USER", null);

        // 사용자 정보 쿠키 제거
        removeUserInfo();

        // LocalStorage에서 사용자 정보 제거
        localStorage.removeItem("authName");
        localStorage.removeItem("authUsername");
        localStorage.removeItem("authRoleName");
        localStorage.removeItem("authCodes");
        localStorage.removeItem("authUserId");
        localStorage.removeItem("authSuper");

        // 자동 토큰 갱신 중지
        stopAutoRefresh();

        console.log("클라이언트 측 로그아웃 정리 완료");
      }
    },

    // 새로고침 대비: 저장된 사용자 정보로 로그인 상태 복구
    async loadStoredToken({ commit }: any) {
      const authName = localStorage.getItem("authName");
      const authCodesStr = localStorage.getItem("authCodes");
      const authRoleName = localStorage.getItem("authRoleName");
      const authUsername = localStorage.getItem("authUsername");

      if (authName && authCodesStr) {
        const authCodes = JSON.parse(authCodesStr);

        commit("SET_LOGGED_IN", true);
        commit("SET_USER", {
          username: authUsername || authName,
          fullName: authName,
          roleName: authRoleName || "",
          codes: authCodes,
        });

        // 코드 기반 라우트 동적 추가
        addRoleBasedRoutes(authCodes);

        // 자동 토큰 갱신 시작
        startAutoRefresh();

        console.log("저장된 사용자 정보로 로그인 상태 복구 성공");
      }
    },

    // 토큰 유효성 확인
    async checkTokenValidity({ commit, dispatch, getters }: any): Promise<boolean> {
      try {
        console.log("토큰 유효성 확인 시작...");
        const isValid = await isCurrentTokenValid();
        console.log("토큰 유효성 확인 결과:", isValid);

        if (isValid) {
          console.log("토큰이 유효하므로 사용자 정보 복구 시도...");
          await dispatch("loadStoredToken", {}, { root: false });
          console.log("사용자 정보 복구 완료");
        } else {
          console.log(
            "토큰이 무효하므로 로그인 상태를 false로 설정하고 localStorage 정리"
          );
          commit("SET_LOGGED_IN", false);
          commit("SET_USER", null);

          localStorage.removeItem("authName");
          localStorage.removeItem("authUsername");
          localStorage.removeItem("authRoleName");
          localStorage.removeItem("authCodes");
          localStorage.removeItem("authUserId");
          localStorage.removeItem("authSuper");
        }
        return getters.isLoggedIn;
      } catch (error) {
        console.error("토큰 유효성 확인 실패:", error);
        commit("SET_LOGGED_IN", false);
        commit("SET_USER", null);

        localStorage.removeItem("authName");
        localStorage.removeItem("authUsername");
        localStorage.removeItem("authRoleName");
        localStorage.removeItem("authCodes");
        localStorage.removeItem("authUserId");
        localStorage.removeItem("authSuper");

        return false;
      }
    },
  },
};
