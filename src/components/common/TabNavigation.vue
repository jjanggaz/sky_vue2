<template>
  <div class="tab-navigation">
    <router-link
      v-for="tab in tabs"
      :key="tab.name"
      :to="tab.to"
      class="tab-item"
      :class="{
        active: isActiveTab(tab),
        disabled: tab.disabled,
      }"
      @click="handleTabClick(tab)"
    >
      <span v-if="tab.icon" class="tab-icon">{{ tab.icon }}</span>
      <span class="tab-text">{{ tab.label }}</span>
      <span v-if="tab.badge" class="tab-badge">{{ tab.badge }}</span>
    </router-link>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { getCurrentInstance } from "vue";

export interface TabItem {
  name: string;
  label: string;
  to: string;
  icon?: string;
  badge?: string | number;
  disabled?: boolean;
}

interface Props {
  tabs: TabItem[];
  activeByRoute?: boolean;
  activeTab?: string;
}

export default Vue.extend({
  name: "TabNavigation",
  props: {
    tabs: {
      type: Array as () => TabItem[],
      required: true,
    },
    activeByRoute: {
      type: Boolean,
      default: true,
    },
    activeTab: {
      type: String,
      default: undefined,
    },
  },
  methods: {
    isActiveTab(tab: TabItem): boolean {
      if (this.activeByRoute) {
        return this.$route.path === tab.to;
      } else {
        return this.activeTab === tab.name;
      }
    },
    handleTabClick(tab: TabItem) {
      if (!tab.disabled) {
        this.$emit("tab-click", tab);
      }
    },
  },
});
</script>

<style scoped lang="scss">
.tab-navigation {
  display: flex;
  border-bottom: 1px solid $border-color;
  overflow-x: auto;
  scrollbar-width: none; // Firefox

  &::-webkit-scrollbar {
    // Chrome, Safari
    display: none;
  }

  .tab-item {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: $spacing-xs;
    min-width: 140px;
    padding: $spacing-md $spacing-lg;
    text-decoration: none;
    color: $text-light;
    border-bottom: 2px solid transparent;
    transition: $transition-base;
    font-weight: $font-weight-md;
    white-space: nowrap;
    position: relative;

    &:hover:not(.disabled) {
      color: $primary-color;
      background-color: rgba($primary-color, 0.05);
    }

    &.active {
      color: #000000;
      border-bottom-color: $primary-color;
      background-color: rgba($primary-color, 0.08);
    }

    &.disabled {
      color: $text-light;
      opacity: 0.5;
      cursor: not-allowed;

      &:hover {
        color: $text-light;
        background-color: transparent;
      }
    }

    .tab-icon {
      font-size: $font-size-base;
    }

    .tab-text {
      font-size: $font-size-lg;
      font-weight: 600;
    }

    .tab-badge {
      background-color: $primary-color;
      color: white;
      font-size: 11px;
      padding: 2px 6px;
      border-radius: 10px;
      min-width: 18px;
      height: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: $font-weight-bold;
    }

    @media (max-width: $breakpoint-md) {
      min-width: 80px;
    }
  }
}

// 반응형 처리
@media (max-width: $breakpoint-md) {
  .tab-navigation {
    .tab-item {
      padding: $spacing-sm $spacing-md;

      .tab-text {
        font-size: 16px;
      }
    }
  }
}

// 다크 모드 지원
@media (prefers-color-scheme: dark) {
  .tab-navigation {
    border-bottom-color: rgba(255, 255, 255, 0.1);

    .tab-item {
      color: rgba(56, 56, 56, 0.7);

      &:hover:not(.disabled) {
        color: $primary-color;
        background-color: rgba($primary-color, 0.1);
      }

      &.active {
        color: $primary-color;
        background-color: rgba($primary-color, 0.15);
      }
    }
  }
}
</style>
