<template>
  <div class="sky-page">
    <div class="table-wrapper">
      <DataTable
        :columns="tableColumns"
        :data="skyData"
        :loading="loading"
        :selectable="false"
        row-key="id"
        :maxHeight="'100%'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { request } from "@/utils/request";
import DataTable, { type TableColumn } from "@/components/common/DataTable.vue";

const loading = ref(false);
const skyData = ref<Record<string, unknown>[]>([]);

// 테이블 컬럼 설정 (API 응답에 따라 동적으로 생성)
const tableColumns = ref<TableColumn[]>([]);

// API 호출 함수
const loadSkyData = async () => {
  loading.value = true;
  try {
    const result = await request("/api/test/sky1", undefined, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (result && result.success && result.response) {
      // 응답 데이터가 배열인 경우
      const data = Array.isArray(result.response)
        ? result.response
        : result.response.data || result.response.items || [];

      skyData.value = data;

      // 데이터가 있으면 첫 번째 항목의 키를 기반으로 컬럼 생성
      if (data.length > 0) {
        const firstItem = data[0];
        const keys = Object.keys(firstItem);

        tableColumns.value = keys.map((key) => ({
          key: key,
          title: key,
          width: "150px",
          sortable: true,
        }));
      }
    }
  } catch (error) {
    console.error("데이터 로드 실패:", error);
    alert("데이터를 불러오는데 실패했습니다.");
  } finally {
    loading.value = false;
  }
};

// 컴포넌트 마운트 시 데이터 로드
onMounted(() => {
  loadSkyData();
});
</script>

<style scoped lang="scss">
.sky-page {
  padding: $spacing-xl;
  height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.table-wrapper {
  flex: 1;
  overflow: auto;
}
</style>

