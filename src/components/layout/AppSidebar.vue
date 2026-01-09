<template>
  <div>
    <!-- 숨기기 버튼 (항상 보이도록 사이드바 외부에 배치) -->
    <div class="sidebar-toggle" :class="{ closed: isClosed }">
      <button class="toggle-btn" @click="toggleSidebar" :title="isClosed ? '메뉴 보이기' : '메뉴 숨기기'">
        <span class="toggle-icon">{{ isClosed ? '▶' : '◀' }}</span>
      </button>
    </div>

    <aside class="sidebar" :class="{ closed: isClosed }">
      <div class="sidebar-content">
        <!-- Navigation Menu -->
        <nav class="nav-menu">
          <!-- (구)SCIS 버튼 (최상단) -->
          <router-link to="/scis" class="nav-item campaign-item">
            <span class="nav-text">(구)SCIS</span>
          </router-link>
          <br />
          <br />

          <!-- 캠페인 상담화면 버튼 -->
          <router-link to="/counselor" class="nav-item campaign-item">
            <span class="nav-text">(신)SCIS</span>
          </router-link>

          <!-- 권한에 따른 메뉴 동적 표시 -->
          <router-link
            v-for="menuItem in availableMenus"
            :key="menuItem.path"
            :to="menuItem.path"
            class="nav-item"
          >
            <span class="nav-text">{{ $t(menuItem.titleKey) }}</span>
          </router-link>

          <!-- <router-link to="/test" class="nav-item">
            <span class="nav-icon">🧪</span>
            <span class="nav-text">{{ t("sidebar.test") }}</span>
          </router-link> -->
        </nav>
      </div>

      <!-- <div class="side-btn"> --> <!-- :class="{ on : !isclosed }" -->
        <!-- <button></button> --> <!-- @click="toggleSideBar" -->
      <!-- </div> -->
    </aside>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { computed, ref } from "vue";
import store from "@/store";

export default Vue.extend({
  setup() {
    const isClosed = ref(false);

    const toggleSidebar = () => {
      isClosed.value = !isClosed.value;
      window.dispatchEvent(
        new CustomEvent("sidebar-toggle", { detail: { isClosed: isClosed.value } })
      );
    };

    const availableMenus = computed(() => {
      const userCodes = store.getters["auth/user"]?.codes;
      const codeBasedMenus: Record<string, any> = {};

      if (!userCodes || userCodes.length === 0) {
        return [];
      }

      return userCodes
        .map((code: string) => codeBasedMenus[code])
        .filter(Boolean);
    });

    return {
      isClosed,
      toggleSidebar,
      availableMenus,
    };
  },
});
</script>

<style scoped lang="scss">
.sidebar {
  position: relative;
  left: 0;
  top: 0;
  width: 130px;
  height: 100vh;
  background-color: #4A90E2;
  z-index: 100;
  transform: translateX(0);
  transition: transform .3s ease, width .3s ease;

  &.closed {
    transform: translateX(-100%);
    width: 0;
    overflow: hidden;
  }

  .sidebar-content {
    height: 100%;
    display: flex;
    flex-direction: column;
    position: relative;
  }

  &.closed {
    transform: translateX(-100%);
    width: 0;
    overflow: hidden;
  }
}

.sidebar-toggle {
  position: fixed;
  top: 10px;
  left: 130px;
  z-index: 101;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: left .3s ease;

  &.closed {
    left: 0;
  }

  .toggle-btn {
    width: 30px;
    height: 40px;
    background-color: #4A90E2;
    border: 1px solid rgba($text-white, 0.2);
    border-left: none;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s;

    &:hover {
      background-color: rgba($text-white, 0.1);
    }

    .toggle-icon {
      color: $text-white;
      font-size: 14px;
      font-weight: 600;
    }
  }

  .nav-menu {
    flex: 1;
    padding: 20px 0;

    .nav-item {
      display: block;
      align-items: center;
      padding: 12px 16px;
      color: $text-white;
      text-decoration: none;
      cursor: pointer;
      transition: $transition-base;
      margin-bottom: 8px;
      width: 100%;
      box-sizing: border-box;

      &:hover {
        background: rgba(39, 155, 216, 0.15);
        color: $text-white;
      }

      &.router-link-active {
        background-color: rgba($text-sky, 1);
        color: $text-white;
        border-left-color: $primary-color;

        .nav-icon {
          color: $primary-color;
        }
      }

      .nav-icon {
        font-size: 18px;
        margin-right: $spacing-sm;
        width: 24px;
        height: 60px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;

        .campaign-icon {
          font-size: 20px;
        }
      }

      .nav-text {
        font-size: 14px;
        font-weight: 600;
        line-height: 20px;
        letter-spacing: -0.2px;
        white-space: normal;
        word-break: break-word;
        display: block;
        width: 100%;
      }

      &.campaign-item {
        border-bottom: 1px solid rgba($text-white, 0.1);
        margin-bottom: 12px;
        padding-bottom: 12px;

        &.campaign-item-first {
          margin-bottom: 32px;
          padding-bottom: 20px;
        }
      }
    }
  }

  // .side-btn {
  //   position: fixed;
  //   top: 49.75%;
  //   right: -35px;
  //   transform: translateY(-50%);
  //   width: 35px;
  //   height: 35px;

  //   button {
  //     position: relative;
  //     width: 30px;
  //     height: 60px;
  //     background-color: #1f2937;
  //     border-radius: 0 20px 20px 0;

  //     &:hover {
  //       background: #394a61;
  //     }

  //     &::after {
  //       content: "";
  //       position: absolute;
  //       top: 50%;
  //       left: 50%;
  //       margin: -6px -8px;
  //       width: 12px;
  //       height: 12px;
  //       background: url(../../assets/icons/ico_detail-arrow.svg) no-repeat center / 12px auto;
  //       transform: rotate(-90deg);
  //     }
  //   }
  // }

  // .side-btn.on {
  //   button {
  //     &::after {
  //       transform: rotate(90deg);
  //     }
  //   }
  // }
}

// .sidebar.closed .app-header {
//   left: 0;
// }

@media (max-width: $breakpoint-lg) {
  .sidebar {
    overflow: hidden;
    width: 0;
    //transform: translateX(-100%);
    transition: width .3s ease;

    // &:not(.closed) {
    //   transform: translateX(0);
    // }
  }
}
</style>
