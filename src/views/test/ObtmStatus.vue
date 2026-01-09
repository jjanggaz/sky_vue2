<template>
  <div class="obtm-status-page">
    <div class="page-header">
      <h2 class="page-title">센터별 OBTM 현황</h2>
    </div>

    <div class="table-wrapper">
      <DataTable
        :columns="tableColumns"
        :data="obtmData"
        :loading="loading"
        :selectable="false"
        row-key="category"
        :maxHeight="'auto'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import DataTable, { type TableColumn } from "@/components/common/DataTable.vue";

const loading = ref(false);
const obtmData = ref<Record<string, unknown>[]>([]);

// 테이블 컬럼 설정
const tableColumns: TableColumn[] = [
  {
    key: "category",
    title: "구분",
    width: "200px",
    sortable: false,
    align: "center",
  },
  {
    key: "gwangju",
    title: "광주센터",
    width: "150px",
    sortable: false,
    align: "center",
  },
  {
    key: "suwon",
    title: "수원센터",
    width: "150px",
    sortable: false,
    align: "center",
  },
  {
    key: "gwanak",
    title: "관악센터",
    width: "150px",
    sortable: false,
    align: "center",
  },
];

// 임의 숫자 생성 함수
const generateRandomNumber = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// 데이터 생성
const generateObtmData = () => {
  const categories = [
    "DB 할당 수(A+B+C)",
    "진행 건수(A+B)",
    "통화성공건수(A)",
    "무응 건수(B)",
    "재통화 건수(D)",
    "미진행 건수(C)",
  ];

  const data: Record<string, unknown>[] = categories.map((category) => {
    // 카테고리에 따라 숫자 범위 조정
    let min = 0;
    let max = 0;

    if (category.includes("DB 할당 수")) {
      min = 5000;
      max = 10000;
    } else if (category.includes("진행 건수")) {
      min = 3000;
      max = 8000;
    } else if (category.includes("통화성공건수")) {
      min = 1000;
      max = 5000;
    } else if (category.includes("무응 건수")) {
      min = 500;
      max = 3000;
    } else if (category.includes("재통화 건수")) {
      min = 100;
      max = 1000;
    } else if (category.includes("미진행 건수")) {
      min = 200;
      max = 2000;
    }

    return {
      category: category,
      gwangju: generateRandomNumber(min, max).toLocaleString(),
      suwon: generateRandomNumber(min, max).toLocaleString(),
      gwanak: generateRandomNumber(min, max).toLocaleString(),
    };
  });

  return data;
};

// 데이터 로드
const loadData = () => {
  loading.value = true;
  setTimeout(() => {
    obtmData.value = generateObtmData();
    loading.value = false;
  }, 300);
};

onMounted(() => {
  loadData();
});
</script>

<style scoped lang="scss">
.obtm-status-page {
  padding: $spacing-xl;
  height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.page-header {
  margin-bottom: $spacing-lg;
}

.page-title {
  font-size: $font-size-xl;
  font-weight: bold;
  color: $text-color;
  margin: 0;
}

.table-wrapper {
  flex: 0 0 auto;
  background: #ffffff;
  border: 1px solid $border-color;
  border-radius: $border-radius-sm;
  
  :deep(.data-table-container) {
    max-height: none;
  }
  
  :deep(.data-table tbody) {
    tr:last-child {
      border-bottom: none;
    }
  }
}
</style>
