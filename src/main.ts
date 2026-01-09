import Vue from "vue";
import router from "./router";
import "./style.scss";
import App from "./App.vue";
import store from "./store";
import i18n from "./i18n";
import { createPinia } from "pinia";

const pinia = createPinia();

Vue.config.productionTip = false;

// ✅ 세션 관리 기능 임시 비활성화
// // 로그인 정보 체크 (토큰 유효성 검사 포함)
// // 사용자 정보 복구 및 기본 정보 확인
// (async () => {
//   await store.dispatch("auth/loadStoredToken");

//   // localStorage에 사용자 정보가 있는지 확인 (토큰은 httpOnly 쿠키에 저장됨)
//   if (store.getters["auth/isLoggedIn"]) {
//     const authName = localStorage.getItem("authName");
//     const authUsername = localStorage.getItem("authUsername");
//     const authCodes = localStorage.getItem("authCodes");

//     if (!authName || !authUsername || !authCodes) {
//       console.log("localStorage에 사용자 정보가 없음, 로그아웃 처리");
//       await store.dispatch("auth/logout");
//     }
//   }
// })();

// ✅ 세션 관리 기능 임시 비활성화
// // 토큰 만료 이벤트 리스너 추가
// window.addEventListener("token-expired", async () => {
//   await store.dispatch("auth/logout");
//   router.push("/login");
// });

new Vue({
  router,
  store,
  pinia,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
