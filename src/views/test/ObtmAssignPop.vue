<template>
  <div class="obtm-assign-pop">
    <table class="assign-table">
      <thead>
        <tr>
          <th colspan="2" class="table-header">센터/부서 배정</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="label-cell">DB 수</td>
          <td class="value-cell">{{ dbCount }}건</td>
        </tr>
        <tr>
          <td class="label-cell">고객센터</td>
          <td class="value-cell">
            <div class="radio-group">
              <label class="radio-label">
                <input
                  type="radio"
                  name="center"
                  value="광주"
                  v-model="selectedCenter"
                  class="radio-input"
                />
                <span>광주</span>
              </label>
              <label class="radio-label">
                <input
                  type="radio"
                  name="center"
                  value="수원"
                  v-model="selectedCenter"
                  class="radio-input"
                />
                <span>수원</span>
              </label>
              <label class="radio-label">
                <input
                  type="radio"
                  name="center"
                  value="관악"
                  v-model="selectedCenter"
                  class="radio-input"
                />
                <span>관악</span>
              </label>
            </div>
          </td>
        </tr>
        <tr>
          <td class="label-cell">부서</td>
          <td class="value-cell">
            <div class="radio-group">
              <label class="radio-label">
                <input
                  type="radio"
                  name="department"
                  value="CS"
                  v-model="selectedDepartment"
                  class="radio-input"
                />
                <span>CS</span>
              </label>
              <label class="radio-label">
                <input
                  type="radio"
                  name="department"
                  value="AS"
                  v-model="selectedDepartment"
                  class="radio-input"
                />
                <span>AS</span>
              </label>
              <label class="radio-label">
                <input
                  type="radio"
                  name="department"
                  value="이전"
                  v-model="selectedDepartment"
                  class="radio-input"
                />
                <span>이전</span>
              </label>
              <label class="radio-label">
                <input
                  type="radio"
                  name="department"
                  value="SMC"
                  v-model="selectedDepartment"
                  class="radio-input"
                />
                <span>SMC</span>
              </label>
              <label class="radio-label">
                <input
                  type="radio"
                  name="department"
                  value="DSMC"
                  v-model="selectedDepartment"
                  class="radio-input"
                />
                <span>DSMC</span>
              </label>
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
  assign: [data: { centers: string[]; departments: string[]; dbCount: number }];
}>();

const selectedCenter = ref<string>("");
const selectedDepartment = ref<string>("");

const dbCount = computed(() => {
  return props.selectedItems?.length || 0;
});

const handleAssign = () => {
  if (!selectedCenter.value || !selectedDepartment.value) {
    alert("고객센터와 부서를 선택해주세요.");
    return;
  }

  emit("assign", {
    centers: [selectedCenter.value],
    departments: [selectedDepartment.value],
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

.radio-group {
  display: flex;
  align-items: center;
  gap: $spacing-md;
  flex-wrap: wrap;

  .radio-label {
    display: flex;
    align-items: center;
    gap: $spacing-xs;
    cursor: pointer;

    .radio-input {
      cursor: pointer;
    }

    span {
      user-select: none;
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
