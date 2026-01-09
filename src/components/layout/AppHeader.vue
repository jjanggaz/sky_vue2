<template>
  <header class="app-header" :style="{ left: headerLeft, display: 'none' }">
    <div class="header-content">
      <!-- Page Title -->
      <div class="page-title-section">
        <h1 class="page-title">{{ currentPageTitle }}</h1>
      </div>

      <!-- Tab Navigation -->
      <div class="navigation-section">
        <TabNavigation v-if="currentTabs.length > 1" :tabs="currentTabs" />
      </div>

      <!-- User Section -->
      <div class="user-section">
        <!-- <Date /> -->
        <span class="user-id">
          <span class="user-name">{{ userName }}</span
          ><br />
          <span class="user-info">{{ userRole ? ` (${userRole})` : "" }}</span>
        </span>
        <!-- 로그아웃 버튼 숨김 -->
        <!-- <button class="logout-btn" @click="handleLogout">
          {{ t("common.logout") }}
        </button> -->
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import Vue from "vue";
import TabNavigation from "@/components/common/TabNavigation.vue";
import type { TabItem } from "@/components/common/TabNavigation.vue";
import Date from "../../utils/headerDate.vue";
import store from "@/store";

export default Vue.extend({
  name: "AppHeader",
  components: {
    TabNavigation,
  },
  data() {
    return {
      isSidebarClosed: false,
    };
  },
  computed: {
    headerLeft(): string {
      return this.isSidebarClosed ? "0px" : "130px";
    },
    userName(): string | undefined {
      return store.getters["auth/user"]?.fullName;
    },
    userRole(): string | undefined {
      return store.getters["auth/user"]?.roleName;
    },
    sectionTabs() {
      return {
        model: [
          {
            name: "RevitManagement",
            label: this.$t("tabs.model.revitManagement"),
            to: "/model/revit",
          },
          {
            name: "StandardPlacement",
            label: this.$t("tabs.model.standardPlacement"),
            to: "/model/standard",
          },
          {
            name: "3D Asset",
            label: this.$t("tabs.model.asset3d"),
            to: "/model/3dAsset",
          },
        ],
        asset: [
          { name: "Inflow", label: this.$t("tabs.asset.inflow"), to: "/asset/inflow" },
          { name: "Outflow", label: this.$t("tabs.asset.outflow"), to: "/asset/outflow" },
        ],
        process: [
          {
            name: "Process",
            label: this.$t("tabs.process.process"),
            to: "/process/process",
          },
        ],
        project: [
          {
            name: "Project",
            label: this.$t("tabs.project.project"),
            to: "/project/project",
          },
          {
            name: "ApprovalPending",
            label: this.$t("tabs.project.approvalPending"),
            to: "/project/approvalPending",
          },
          {
            name: "RecommendedProject",
            label: this.$t("tabs.project.recommendedProject"),
            to: "/project/recommendedProject",
          },
        ],
        machine: [
          {
            name: "Structure",
            label: this.$t("tabs.machine.structure"),
            to: "/machine/structure",
          },
          {
            name: "Machine",
            label: this.$t("tabs.machine.machine"),
            to: "/machine/machine",
          },
          {
            name: "Pipe",
            label: this.$t("tabs.machine.pipe"),
            to: "/machine/pipe",
          },
          {
            name: "Electrical",
            label: this.$t("tabs.machine.electrical"),
            to: "/machine/electrical",
          },
          {
            name: "Measurement",
            label: this.$t("tabs.machine.measurement"),
            to: "/machine/measurement",
          },
          {
            name: "Asset3D",
            label: this.$t("tabs.machine.3dAsset"),
            to: "/machine/asset3D",
          },
        ],
        user: [
          {
            name: "AccountManagement",
            label: this.$t("tabs.user.account"),
            to: "/user/account",
          },
          { name: "RoleManagement", label: this.$t("tabs.user.role"), to: "/user/role" },
          { name: "MenuManagement", label: this.$t("tabs.user.menu"), to: "/user/menu" },
        ],
      };
    },
    currentTabs(): TabItem[] {
      const currentPath = this.$route.path;

      if (currentPath.startsWith("/model")) {
        return this.sectionTabs.model;
      } else if (currentPath.startsWith("/asset")) {
        return this.sectionTabs.asset;
      } else if (currentPath.startsWith("/process")) {
        return this.sectionTabs.process;
      } else if (currentPath.startsWith("/project")) {
        return this.sectionTabs.project;
      } else if (currentPath.startsWith("/machine")) {
        return this.sectionTabs.machine;
      } else if (currentPath.startsWith("/user")) {
        return this.sectionTabs.user;
      }

      return [];
    },
    currentPageTitle(): string {
      return this.$t("pageTitles.default") as string;
    },
  },
  mounted() {
    window.addEventListener("sidebar-toggle", this.handleSidebarToggle as EventListener);
  },
  beforeDestroy() {
    window.removeEventListener("sidebar-toggle", this.handleSidebarToggle as EventListener);
  },
  methods: {
    handleSidebarToggle(event: CustomEvent) {
      this.isSidebarClosed = event.detail.isClosed;
    },
    async handleLogout() {
      console.log("[AppHeader.vue] handleLogout()");
      await store.dispatch("auth/logout");
      this.$router.push("/login");
    },
  },
});
</script>

<style scoped lang="scss">
.user-id {
  color: #333333;
  font-size: $font-size-sm;
}

.app-header {
  position: fixed;
  top: 0;
  right: 0;
  height: 70px;
  background-color: #ffffff;
  border-bottom: 1px solid $border-form;
  z-index: 90;
  transition: left .3s ease;
}

:deep(.sidebar) {
  background-color: red !important;
}

.header-content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 $spacing-xxl;
  gap: 20px;
  
  @media (max-width: 768px) {
    padding: 0 16px;
  }
}

.page-title-section {
  .page-title {
    font-size: $font-size-xl;
    font-weight: 600;
    color: $text-color;
    margin: 0;
    white-space: nowrap;

    @media (max-width: 768px) {
      font-size: 20px;
    }
  }
}

.navigation-section {
  display: flex;
  align-items: center;
  flex: 1;
  overflow-x: auto;

  :deep(.tab-navigation) {
    border-bottom: none;
    background: transparent;
    width: 100%;

    .tab-item {
      height: 69px;
      border-bottom: 4px solid transparent;
      border-radius: 0;
      padding: 0 20px;
      font-size: $font-size-sm;
      color: #555555;

      &:hover:not(.disabled) {
        background: $background-light;
      }

      &.active {
        border-bottom-color: $text-sky;
        background: transparent;
        color: #000000;
        font-weight: 600;
      }

      &:not(.active) {
        color: #555555;
        border-bottom-color: transparent;
      }
    }
  }
}

.user-section {
  display: flex;
  align-items: center;
  gap: 30px;

  .user-id {
    font-size: $font-size-sm;
    font-weight: 600;

    .user-name {
      color: #333333;
      font-size: 14px;
      font-weight: 500;
    }

    .user-info {
      color: #484848;
      font-size: 12px;
      font-weight: 400;
    }
  }

  .logout-btn {
    min-width: 72px;
    height: 32px;
    padding: 0 $spacing-xs;
    background-color: transparent;
    border: 1px solid #333333;
    border-radius: 5px;
    color: #333333;
    font-size: 15px;
    font-weight: 600;

    &:hover {
      border-color: #279bd8;
      color: #279bd8;
    }
  }
}

@media (max-width: $breakpoint-lg) {
  .app-header {
    left: 0;
  }
}
</style>
