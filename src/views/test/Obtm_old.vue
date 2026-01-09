<template>
  <div class="campaign-page">
    <!-- Top Section - Search/Filter Controls -->
    <div class="search-section">
      <div class="search-filters">
        <select v-model="filterValue" class="filter-select">
          <option value="campaign_name">캠페인 명</option>
          <option value="campaign_id">캠페인 ID</option>
          <option value="manager_name">사용자명</option>
        </select>

        <div class="search-input-wrapper">
          <input
            v-model="searchValue"
            type="text"
            class="search-input"
            placeholder="검색"
          />
          <button
            v-if="searchValue"
            class="clear-btn"
            @click="searchValue = ''"
          >
            ×
          </button>
          <button class="search-btn" @click="handleSearch">
            <img :src="searchIcon" alt="검색" />
          </button>
        </div>

        <span class="period-label">기간으로 조회</span>

        <div class="date-range">
          <input
            v-model="startDate"
            type="date"
            class="date-input"
          />
          <span class="date-separator">~</span>
          <input
            v-model="endDate"
            type="date"
            class="date-input"
          />
        </div>

        <button class="btn btn-search" @click="handleSearch">조회</button>
        <button class="btn btn-delete" @click="handleDelete" :disabled="selectedItems.length === 0">삭제</button>
        <button class="btn btn-register" @click="openRegisterModal">등록</button>
      </div>
    </div>

    <!-- Main Content Section -->
    <div class="main-content">
      <div class="section-title">OBTM DB 목록</div>

      <div class="table-wrapper">
        <DataTable
          :columns="tableColumns"
          :data="paginatedCampaignList"
          :loading="loading"
          :selectable="true"
          :selected-items="selectedItems"
          row-key="id"
          :maxHeight="'100%'"
          @selection-change="handleSelectionChange"
        >
          <template #cell-action="{ item }">
            <button class="btn-detail" @click="openDetailModal(item)">상세정보</button>
          </template>
        </DataTable>
      </div>

      <div class="pagination-container">
        <div class="total-count">
          {{
            t("common.totalCount", {
              count: totalCount || 0,
            })
          }}
        </div>
        <div class="pagination-center">
          <Pagination
            :current-page="currentPage"
            :total-pages="totalPages"
            @page-change="handlePageChange"
          />
        </div>
      </div>
    </div>

    <!-- OBTM DB 등록 모달 -->
    <div v-if="isRegisterModalOpen" class="modal-overlay" @click="closeRegisterModal">
      <div class="modal-container-large" @click.stop>
        <div class="modal-header">
          <h3>{{ selectedObtmItem ? 'OBTM DB 상세정보' : 'OBTM DB 등록' }}</h3>
          <button class="close-btn" @click="closeRegisterModal"></button>
        </div>
        <div class="modal-body">
          <ObtmDetail ref="obtmDetailRef" :obtm-item="selectedObtmItem" />
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" @click="handleSave">저장</button>
          <button class="btn btn-secondary" @click="closeRegisterModal">취소</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useI18n } from "vue-i18n";
import DataTable, { type TableColumn } from "@/components/common/DataTable.vue";
import ObtmDetail from "./ObtmDetail.vue";
import Pagination from "@/components/common/Pagination.vue";
import searchIcon from "@/assets/images/common/ico_search.svg";

const { t } = useI18n();

const loading = ref(false);
const filterValue = ref("campaign_id");
const searchValue = ref("");
const startDate = ref("2025-07-10");
const endDate = ref("2025-07-10");
const campaignList = ref<Record<string, unknown>[]>([]);
const totalCount = ref(0);
const isRegisterModalOpen = ref(false);

// 페이징 관련 state
const currentPage = ref(1);
const itemsPerPage = ref(10);

// 페이징 계산
const totalPages = computed(() => {
  return Math.ceil(totalCount.value / itemsPerPage.value);
});

const paginatedCampaignList = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return campaignList.value.slice(start, end);
});
const obtmDetailRef = ref<InstanceType<typeof ObtmDetail> | null>(null);
const selectedItems = ref<Record<string, unknown>[]>([]);
const selectedObtmItem = ref<Record<string, unknown> | null>(null);

// 테이블 컬럼 설정
const tableColumns: TableColumn[] = [
  {
    key: "sequence",
    title: "순번",
    width: "80px",
    sortable: false,
    align: "center",
  },
  {
    key: "campaign_id",
    title: "캠페인 ID",
    width: "120px",
    sortable: false,
    align: "center",
  },
  {
    key: "campaign_name",
    title: "캠페인명",
    width: "150px",
    sortable: false,
    align: "center",
  },
  {
    key: "special_db_status",
    title: "SMS 그룹 추가여부",
    width: "130px",
    sortable: false,
    align: "center",
  },
  {
    key: "assignment_date",
    title: "등록일",
    width: "120px",
    sortable: false,
    align: "center",
    dateFormat: "YYYY-MM-DD",
  },
  {
    key: "action",
    title: "상세정보",
    width: "100px",
    sortable: false,
    align: "center",
  },
];

// 더미 데이터 생성
const generateDummyData = () => {
  const dummyData: Record<string, unknown>[] = [];
  const campaignNames = [
    "신규 고객 유치 캠페인",
    "여름 프로모션 캠페인",
    "회원 재방문 유도 캠페인",
    "생일 축하 캠페인",
    "할인 이벤트 캠페인",
    "신제품 출시 캠페인",
    "VIP 고객 특별 혜택",
    "시즌 오프 세일 캠페인",
    "추천인 보상 캠페인",
    "연말 감사 이벤트"
  ];
  const campaignIds = [
    "CAMP001",
    "CAMP002",
    "CAMP003",
    "CAMP004",
    "CAMP005",
    "CAMP006",
    "CAMP007",
    "CAMP008",
    "CAMP009",
    "CAMP010"
  ];
  const smsGroupStatuses = ["추가", "미추가", "추가", "미추가", "미추가", "추가", "미추가", "미추가", "추가", "추가"];

  // 임의 날짜 생성 함수 (최근 30일 이내)
  const getRandomDate = () => {
    const today = new Date();
    const daysAgo = Math.floor(Math.random() * 30);
    const randomDate = new Date(today);
    randomDate.setDate(today.getDate() - daysAgo);
    
    const year = randomDate.getFullYear();
    const month = String(randomDate.getMonth() + 1).padStart(2, "0");
    const day = String(randomDate.getDate()).padStart(2, "0");
    
    return `${year}-${month}-${day}`;
  };

  for (let i = 1; i <= 10; i++) {
    dummyData.push({
      id: `OBTM${String(i).padStart(5, "0")}`,
      sequence: i,
      campaign_name: campaignNames[i - 1],
      campaign_id: campaignIds[i - 1],
      special_db_status: smsGroupStatuses[i - 1],
      assignment_date: getRandomDate(),
    });
  }

  return dummyData;
};

// 검색 처리
const handleSearch = () => {
  loading.value = true;
  currentPage.value = 1; // 검색 시 첫 페이지로
  // TODO: API 호출 로직 구현
  setTimeout(() => {
    campaignList.value = generateDummyData();
    totalCount.value = campaignList.value.length;
    loading.value = false;
  }, 500);
};

// 페이지 변경 처리
const handlePageChange = (page: number) => {
  currentPage.value = page;
};

// 모달 열기
const openRegisterModal = () => {
  selectedObtmItem.value = null;
  isRegisterModalOpen.value = true;
};

// 상세정보 모달 열기
const openDetailModal = (item: Record<string, unknown>) => {
  selectedObtmItem.value = item;
  isRegisterModalOpen.value = true;
};

// 모달 닫기
const closeRegisterModal = () => {
  isRegisterModalOpen.value = false;
  selectedObtmItem.value = null;
};

// 선택 변경 처리
const handleSelectionChange = (selected: Record<string, unknown>[]) => {
  selectedItems.value = selected;
};

// 삭제 처리
const handleDelete = () => {
  if (selectedItems.value.length === 0) {
    alert("삭제할 항목을 선택해주세요.");
    return;
  }

  const deleteCount = selectedItems.value.length;
  const confirmMessage =
    deleteCount === 1
      ? "선택한 항목을 삭제하시겠습니까?"
      : `선택한 ${deleteCount}개의 항목을 삭제하시겠습니까?`;

  if (confirm(confirmMessage)) {
    // TODO: 삭제 API 호출 로직 구현
    console.log("삭제할 항목:", selectedItems.value);
    selectedItems.value = [];
    handleSearch(); // 목록 새로고침
    alert("삭제되었습니다.");
  }
};

// 저장 처리
const handleSave = () => {
  // TODO: 저장 로직 구현
  if (obtmDetailRef.value) {
    obtmDetailRef.value.handleSave();
  }
  console.log("OBTM DB 저장");
  closeRegisterModal();
  handleSearch(); // 목록 새로고침
};

// 컴포넌트 마운트 시 초기화
onMounted(() => {
  handleSearch();
});
</script>

<style scoped lang="scss">
.campaign-page {
  padding: $spacing-xl;
  height: calc(100vh - 70px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.search-section {
  flex-shrink: 0;
  margin-bottom: $spacing-lg;
  background: #ffffff;
  padding: $spacing-md;
  border: 1px solid $border-color;
  border-radius: $border-radius-sm;

  .search-filters {
    display: flex;
    align-items: center;
    gap: $spacing-md;
    flex-wrap: wrap;

    .filter-select {
      padding: $spacing-xs $spacing-sm;
      border: 1px solid $border-color;
      border-radius: $border-radius-sm;
      font-size: $font-size-sm;
      background: #ffffff;
      min-width: 120px;
      height: 32px;
    }

    .search-input-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      border: 1px solid $border-color;
      border-radius: $border-radius-sm;
      background: #ffffff;
      padding: 0 $spacing-xs;

      .search-input {
        border: none;
        outline: none;
        padding: $spacing-xs $spacing-sm;
        font-size: $font-size-sm;
        flex: 1;
        min-width: 200px;
        height: 30px;
      }

      .clear-btn {
        border: none;
        background: transparent;
        color: #999;
        font-size: 20px;
        cursor: pointer;
        padding: 0 $spacing-xs;
        line-height: 1;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          color: #333;
        }
      }

      .search-btn {
        border: none;
        background: transparent;
        cursor: pointer;
        padding: $spacing-xs;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;

        img {
          width: 16px;
          height: 16px;
        }
      }
    }

    .period-label {
      font-size: $font-size-sm;
      color: $text-color;
      white-space: nowrap;
    }

    .date-range {
      display: flex;
      align-items: center;
      gap: $spacing-xs;

      .date-input {
        padding: $spacing-xs $spacing-sm;
        border: 1px solid $border-color;
        border-radius: $border-radius-sm;
        font-size: $font-size-sm;
        background: #ffffff;
        height: 32px;
        width: 140px;
      }

      .date-separator {
        color: $text-color;
        font-size: $font-size-sm;
      }
    }

    .btn-search {
      padding: $spacing-xs calc($spacing-lg * 1.1);
      background-color: #555555;
      color: #ffffff;
      border: none;
      border-radius: $border-radius-sm;
      font-size: $font-size-sm;
      font-weight: 600;
      cursor: pointer;
      height: 32px;
      white-space: nowrap;
      min-width: 110px;

      &:hover {
        background-color: #444444;
      }
    }

    .btn-delete {
      padding: $spacing-xs calc($spacing-lg * 1.1);
      background-color: #dc3545;
      color: #ffffff;
      border: none;
      border-radius: $border-radius-sm;
      font-size: $font-size-sm;
      font-weight: 600;
      cursor: pointer;
      height: 32px;
      white-space: nowrap;
      min-width: 110px;

      &:hover:not(:disabled) {
        background-color: #c82333;
      }

      &:disabled {
        background-color: #6c757d;
        cursor: not-allowed;
        opacity: 0.6;
      }
    }

    .btn-register {
      padding: $spacing-xs calc($spacing-lg * 1.1);
      background-color: #279bd8;
      color: #ffffff;
      border: none;
      border-radius: $border-radius-sm;
      font-size: $font-size-sm;
      font-weight: 600;
      cursor: pointer;
      height: 32px;
      white-space: nowrap;
      min-width: 110px;

      &:hover {
        background-color: #2196c4;
      }
    }
  }
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid $border-color;
  border-radius: $border-radius-sm;
  padding: $spacing-lg;

  .section-title {
    font-size: $font-size-lg;
    font-weight: 600;
    color: $text-color;
    margin-bottom: $spacing-md;
  }

  .table-wrapper {
    flex: 1;
    overflow: auto;
    margin-bottom: $spacing-md;
  }

  .pagination-container {
    flex-shrink: 0;
    margin-top: $spacing-md;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: $spacing-sm $spacing-md;
    border-top: 1px solid $border-color;
  }

  .total-count {
    position: absolute;
    left: $spacing-md;
    font-size: $font-size-sm;
    color: $text-light;
  }

  .pagination-center {
    display: flex;
    justify-content: center;
    flex: 1;
  }
}

.btn-detail {
  padding: $spacing-xs $spacing-md;
  background-color: #279bd8;
  color: #ffffff;
  border: none;
  border-radius: $border-radius-sm;
  font-size: $font-size-sm;
  font-weight: 600;
  cursor: pointer;
  height: 28px;
  white-space: nowrap;
  transition: background-color 0.2s;

  &:hover {
    background-color: #2196c4;
  }
}

:deep(.modal-container-large) {
  width: 98% !important;
  max-width: 95vw !important;
}
</style>

