<template>
  <div class="obtm-assign-pop">
    <table class="assign-table">
      <thead>
        <tr>
          <th colspan="2" class="table-header">상담사 배정</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="label-cell">DB 수</td>
          <td class="value-cell">{{ dbCount }}건</td>
        </tr>
        <tr>
          <td class="label-cell">상담사</td>
          <td class="value-cell">
            <div class="input-with-search">
              <input
                v-model="selectedCounselor"
                type="text"
                class="counselor-input"
                placeholder="상담사를 선택하세요"
              />
              <button class="search-btn" @click="handleSearchCounselor" title="상담사 찾기">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  <path d="M14 14L11.1 11.1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </td>
        </tr>
        <tr>
          <td colspan="2" class="button-cell">
            <button class="btn-assign-now" @click="handleAssign">지금 배정</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

interface Props {
  selectedItems?: Record<string, unknown>[] | null;
}

const props = withDefaults(defineProps<Props>(), {
  selectedItems: null,
});

const emit = defineEmits<{
  close: [];
  assign: [data: { counselor: string; dbCount: number }];
}>();

const selectedCounselor = ref<string>("");

const dbCount = computed(() => {
  return props.selectedItems?.length || 0;
});

const handleSearchCounselor = () => {
  // TODO: 상담사 찾기 로직 구현
  alert("상담사 찾기 기능을 구현해주세요.");
};

const handleAssign = () => {
  if (!selectedCounselor.value) {
    alert("상담사를 입력해주세요.");
    return;
  }

  emit("assign", {
    counselor: selectedCounselor.value,
    dbCount: dbCount.value,
  });

  emit("close");
};
</script>

<style scoped lang="scss">
.obtm-assign-pop {
  padding: 0;
  background: #ffffff;
}

.assign-table {
  width: auto;
  min-width: 400px;
  border-collapse: collapse;
  border: 1px solid #000000;

  thead {
    .table-header {
      background-color: #ffffff;
      padding: $spacing-md;
      font-size: $font-size-lg;
      font-weight: bold;
      text-align: center;
      border: 1px solid #000000;
    }
  }

  tbody {
    tr {
      border: 1px solid #000000;

      .label-cell {
        padding: $spacing-md;
        font-weight: bold;
        text-align: left;
        border: 1px solid #000000;
        background-color: #ffffff;
        width: 120px;
        white-space: nowrap;
      }

      .value-cell {
        padding: $spacing-md;
        text-align: left;
        border: 1px solid #000000;
        background-color: #ffffff;
      }

      .button-cell {
        padding: $spacing-md;
        text-align: right;
        border: 1px solid #000000;
        background-color: #ffffff;
      }
    }
  }
}

.input-with-search {
  display: flex;
  align-items: center;
  position: relative;

  .counselor-input {
    flex: 1;
    padding: $spacing-xs $spacing-sm;
    padding-right: 40px;
    border: 1px solid $border-color;
    border-radius: $border-radius-sm;
    font-size: $font-size-sm;
    background: #ffffff;
    height: 32px;
    outline: none;
    transition: border 0.1s linear;

    &:focus {
      border: 1px solid #279bd8;
    }

    &::placeholder {
      color: #767676;
    }
  }

  .search-btn {
    position: absolute;
    right: 8px;
    width: 24px;
    height: 24px;
    border: none;
    background: transparent;
    color: #666;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    transition: color 0.2s;

    &:hover {
      color: #279bd8;
    }

    svg {
      width: 16px;
      height: 16px;
    }
  }
}

.btn-assign-now {
  padding: $spacing-sm $spacing-lg;
  background-color: #0066cc;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: $font-size-base;
  font-weight: 600;
  cursor: pointer;
  min-width: 120px;
  height: 40px;

  &:hover {
    background-color: #0052a3;
  }

  &:active {
    background-color: #004080;
  }
}
</style>
