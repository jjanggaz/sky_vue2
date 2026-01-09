<template>
  <div class="campaign-page">
    <!-- Top Section - Search/Filter Controls -->
    <div class="search-section">
      <div class="search-filters">
        <select v-model="filterValue" class="filter-select">
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
      </div>
    </div>

    <!-- Main Content Section -->
    <div class="main-content">
      <div class="section-header">
        <div class="section-title">지난 캠페인</div>
        <button class="btn btn-save" @click="handleGridSave">저장</button>
      </div>

      <div class="table-wrapper">
        <DataTable
          :columns="tableColumnsWithoutPriority"
          :data="paginatedCampaignList"
          :loading="loading"
          :selectable="false"
          :draggable="false"
          row-key="campaign_id"
          :maxHeight="'100%'"
        >
          <template #cell-action="{ item }">
            <button class="btn-detail" @click="openDetailModal(item)">상세정보</button>
          </template>
        </DataTable>
      </div>

      <div class="pagination-container">
        <div class="total-count">
          {{
            $t("common.totalCount", {
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

    <!-- 진행중 캠페인 Section -->
    <div class="main-content">
      <div class="section-header">
        <div class="section-title">진행중 캠페인</div>
        <button class="btn btn-save" @click="handleOngoingGridSave">저장</button>
      </div>

      <div class="table-wrapper">
        <DataTable
          :columns="tableColumns"
          :data="paginatedOngoingCampaignList"
          :loading="loading"
          :selectable="false"
          :draggable="true"
          row-key="campaign_id"
          :maxHeight="'100%'"
          @drop="handleOngoingRowDrop"
        >
          <template #cell-priority="{ item, index }">
            <div
              class="priority-cell"
              :draggable="true"
              @dragstart="handleOngoingPriorityDragStart($event, item, index)"
              @dragover.prevent
              @drop.prevent="handleOngoingPriorityDrop($event, item, index)"
            >
              {{ item.priority }}
            </div>
          </template>
          <template #cell-action="{ item }">
            <button class="btn-detail" @click="openDetailModal(item)">상세정보</button>
          </template>
        </DataTable>
      </div>

      <div class="pagination-container">
        <div class="total-count">
          {{
            $t("common.totalCount", {
              count: ongoingTotalCount || 0,
            })
          }}
        </div>
        <div class="pagination-center">
          <Pagination
            :current-page="ongoingCurrentPage"
            :total-pages="ongoingTotalPages"
            @page-change="handleOngoingPageChange"
          />
        </div>
      </div>
    </div>

    <!-- 예정된 캠페인 Section -->
    <div class="main-content">
      <div class="section-header">
        <div class="section-title">예정된 캠페인</div>
        <button class="btn btn-save" @click="handleScheduledGridSave">저장</button>
      </div>

      <div class="table-wrapper">
        <DataTable
          :columns="tableColumnsWithoutPriority"
          :data="paginatedScheduledCampaignList"
          :loading="loading"
          :selectable="false"
          :draggable="false"
          row-key="campaign_id"
          :maxHeight="'100%'"
        >
          <template #cell-action="{ item }">
            <button class="btn-detail" @click="openDetailModal(item)">상세정보</button>
          </template>
        </DataTable>
      </div>

      <div class="pagination-container">
        <div class="total-count">
          {{
            $t("common.totalCount", {
              count: scheduledTotalCount || 0,
            })
          }}
        </div>
        <div class="pagination-center">
          <Pagination
            :current-page="scheduledCurrentPage"
            :total-pages="scheduledTotalPages"
            @page-change="handleScheduledPageChange"
          />
        </div>
      </div>
    </div>

    <!-- 캠페인 등록 모달 -->
    <div v-if="isRegisterModalOpen" class="modal-overlay" @click="closeRegisterModal">
      <div class="modal-container-large" @click.stop>
        <div class="modal-header">
          <h3>{{ selectedCampaignItem ? '캠페인 상세정보' : '캠페인 등록' }}</h3>
          <button class="close-btn" @click="closeRegisterModal"></button>
        </div>
        <div class="modal-body">
          <CampaignDetail ref="campaignDetailRef" :campaign-item="selectedCampaignItem" />
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
import DataTable from "@/components/common/DataTable.vue";
import type { TableColumn } from "@/components/common/DataTable.vue";
import CampaignDetail from "./CampaignDetail.vue";
import Pagination from "@/components/common/Pagination.vue";
import searchIcon from "@/assets/images/common/ico_search.svg";

const loading = ref(false);
const filterValue = ref("campaign_id");
const searchValue = ref("");
const startDate = ref("2025-07-10");
const endDate = ref("2025-07-10");
const campaignList = ref<Record<string, unknown>[]>([]);
const totalCount = ref(0);
const ongoingCampaignList = ref<Record<string, unknown>[]>([]);
const ongoingTotalCount = ref(0);
const scheduledCampaignList = ref<Record<string, unknown>[]>([]);
const scheduledTotalCount = ref(0);
const isRegisterModalOpen = ref(false);

// 페이징 관련 state
const currentPage = ref(1);
const itemsPerPage = ref(10);
const ongoingCurrentPage = ref(1);
const scheduledCurrentPage = ref(1);

// 페이징 계산
const totalPages = computed(() => {
  return Math.ceil(totalCount.value / itemsPerPage.value);
});

const paginatedCampaignList = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return campaignList.value.slice(start, end);
});

const ongoingTotalPages = computed(() => {
  return Math.ceil(ongoingTotalCount.value / itemsPerPage.value);
});

const paginatedOngoingCampaignList = computed(() => {
  const start = (ongoingCurrentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return ongoingCampaignList.value.slice(start, end);
});

const scheduledTotalPages = computed(() => {
  return Math.ceil(scheduledTotalCount.value / itemsPerPage.value);
});

const paginatedScheduledCampaignList = computed(() => {
  const start = (scheduledCurrentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return scheduledCampaignList.value.slice(start, end);
});
const campaignDetailRef = ref<any>(null);
const selectedCampaignItem = ref<Record<string, unknown> | null>(null);

// 테이블 컬럼 설정 (진행중 캠페인용 - 우선순위 포함)
const tableColumns: TableColumn[] = [
  {
    key: "priority",
    title: "우선순위",
    width: "100px",
    sortable: false,
  },
  {
    key: "campaign_id",
    title: "캠페인 ID",
    width: "120px",
    sortable: false,
  },
  {
    key: "campaign_name",
    title: "캠페인명",
    width: "200px",
    sortable: false,
  },
  {
    key: "start_date",
    title: "시작일",
    width: "120px",
    sortable: false,
    dateFormat: "YYYY-MM-DD",
  },
  {
    key: "end_date",
    title: "종료일",
    width: "120px",
    sortable: false,
    dateFormat: "YYYY-MM-DD",
  },
  {
    key: "manager_affiliation",
    title: "담당자 소속",
    width: "150px",
    sortable: false,
  },
  {
    key: "manager_name",
    title: "담당자명",
    width: "120px",
    sortable: false,
  },
  {
    key: "sms_send_date",
    title: "문자발송일",
    width: "120px",
    sortable: false,
    dateFormat: "YYYY-MM-DD",
  },
  {
    key: "action",
    title: "상세정보",
    width: "100px",
    sortable: false,
  },
];

// 테이블 컬럼 설정 (지난 캠페인, 예정된 캠페인용 - 우선순위 제외)
const tableColumnsWithoutPriority: TableColumn[] = [
  {
    key: "campaign_id",
    title: "캠페인 ID",
    width: "120px",
    sortable: false,
  },
  {
    key: "campaign_name",
    title: "캠페인명",
    width: "200px",
    sortable: false,
  },
  {
    key: "start_date",
    title: "시작일",
    width: "120px",
    sortable: false,
    dateFormat: "YYYY-MM-DD",
  },
  {
    key: "end_date",
    title: "종료일",
    width: "120px",
    sortable: false,
    dateFormat: "YYYY-MM-DD",
  },
  {
    key: "manager_affiliation",
    title: "담당자 소속",
    width: "150px",
    sortable: false,
  },
  {
    key: "manager_name",
    title: "담당자명",
    width: "120px",
    sortable: false,
  },
  {
    key: "sms_send_date",
    title: "문자발송일",
    width: "120px",
    sortable: false,
    dateFormat: "YYYY-MM-DD",
  },
  {
    key: "action",
    title: "상세정보",
    width: "100px",
    sortable: false,
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
  const affiliations = ["마케팅팀", "영업팀", "고객서비스팀", "기획팀"];
  const managerNames = ["김철수", "이영희", "박민수", "정수진", "최지영"];

  for (let i = 1; i <= 10; i++) {
    const startDate = new Date(2025, 6, 10 + i);
    const endDate = new Date(2025, 6, 20 + i);
    const smsDate = new Date(2025, 6, 15 + i);

    dummyData.push({
      priority: i,
      campaign_id: `CAMP${String(i).padStart(5, "0")}`,
      campaign_name: campaignNames[i - 1],
      start_date: startDate.toISOString().split("T")[0],
      end_date: endDate.toISOString().split("T")[0],
      manager_affiliation: affiliations[i % affiliations.length],
      manager_name: managerNames[i % managerNames.length],
      sms_send_date: smsDate.toISOString().split("T")[0],
    });
  }

  return dummyData;
};

// 진행중 캠페인 더미 데이터 생성
const generateOngoingDummyData = () => {
  const dummyData: Record<string, unknown>[] = [];
  const campaignNames = [
    "신규 회원 가입 캠페인",
    "추천 이벤트 캠페인",
    "할인 쿠폰 발급 캠페인",
    "생일 축하 캠페인",
    "특가 상품 안내 캠페인",
    "신제품 출시 알림",
    "VIP 회원 혜택 안내",
    "시즌 오프 세일",
    "추천인 보상 이벤트",
    "연말 감사 이벤트"
  ];
  const affiliations = ["마케팅팀", "영업팀", "고객서비스팀", "기획팀"];
  const managerNames = ["김철수", "이영희", "박민수", "정수진", "최지영"];

  for (let i = 1; i <= 10; i++) {
    const startDate = new Date(2025, 7, 1 + i);
    const endDate = new Date(2025, 7, 15 + i);
    const smsDate = new Date(2025, 7, 5 + i);

    dummyData.push({
      priority: i,
      campaign_id: `ONGOING${String(i).padStart(5, "0")}`,
      campaign_name: campaignNames[i - 1],
      start_date: startDate.toISOString().split("T")[0],
      end_date: endDate.toISOString().split("T")[0],
      manager_affiliation: affiliations[i % affiliations.length],
      manager_name: managerNames[i % managerNames.length],
      sms_send_date: smsDate.toISOString().split("T")[0],
    });
  }

  return dummyData;
};

// 예정된 캠페인 더미 데이터 생성
const generateScheduledDummyData = () => {
  const dummyData: Record<string, unknown>[] = [];
  const campaignNames = [
    "신년 이벤트 캠페인",
    "봄맞이 프로모션",
    "신규 상품 출시 안내",
    "회원 등급 업그레이드",
    "특별 할인 이벤트",
    "신제품 프리뷰",
    "골드 회원 특별 혜택",
    "봄 시즌 세일",
    "친구 초대 이벤트",
    "신규 가입 환영"
  ];
  const affiliations = ["마케팅팀", "영업팀", "고객서비스팀", "기획팀"];
  const managerNames = ["김철수", "이영희", "박민수", "정수진", "최지영"];

  for (let i = 1; i <= 10; i++) {
    const startDate = new Date(2025, 8, 1 + i);
    const endDate = new Date(2025, 8, 20 + i);
    const smsDate = new Date(2025, 8, 10 + i);

    dummyData.push({
      priority: i,
      campaign_id: `SCHEDULED${String(i).padStart(5, "0")}`,
      campaign_name: campaignNames[i - 1],
      start_date: startDate.toISOString().split("T")[0],
      end_date: endDate.toISOString().split("T")[0],
      manager_affiliation: affiliations[i % affiliations.length],
      manager_name: managerNames[i % managerNames.length],
      sms_send_date: smsDate.toISOString().split("T")[0],
    });
  }

  return dummyData;
};

// 검색 처리
const handleSearch = () => {
  loading.value = true;
  currentPage.value = 1; // 검색 시 첫 페이지로
  ongoingCurrentPage.value = 1; // 검색 시 첫 페이지로
  scheduledCurrentPage.value = 1; // 검색 시 첫 페이지로
  // TODO: API 호출 로직 구현
  setTimeout(() => {
    campaignList.value = generateDummyData();
    totalCount.value = campaignList.value.length;
    ongoingCampaignList.value = generateOngoingDummyData();
    ongoingTotalCount.value = ongoingCampaignList.value.length;
    scheduledCampaignList.value = generateScheduledDummyData();
    scheduledTotalCount.value = scheduledCampaignList.value.length;
    loading.value = false;
  }, 500);
};

// 페이지 변경 처리
const handlePageChange = (page: number) => {
  currentPage.value = page;
};

// 진행중 캠페인 페이지 변경 처리
const handleOngoingPageChange = (page: number) => {
  ongoingCurrentPage.value = page;
};

// 예정된 캠페인 페이지 변경 처리
const handleScheduledPageChange = (page: number) => {
  scheduledCurrentPage.value = page;
};

// 상세정보 모달 열기
const openDetailModal = (item: Record<string, unknown>) => {
  selectedCampaignItem.value = item;
  isRegisterModalOpen.value = true;
};

// 모달 닫기
const closeRegisterModal = () => {
  isRegisterModalOpen.value = false;
  selectedCampaignItem.value = null;
};

// 진행중 캠페인 우선순위 셀 드래그 시작
const handleOngoingPriorityDragStart = (event: DragEvent, item: Record<string, unknown>, index: number) => {
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/plain", String(index));
    // 전역 상태에 저장 (DataTable의 drag & drop과 호환)
    (window as any).__draggedRowIndex = index;
    (window as any).__draggedRowItem = item;
    (window as any).__draggedListType = "ongoing";
  }
  // 드래그 중인 행 표시
  const rowElement = (event.currentTarget as HTMLElement).closest("tr");
  if (rowElement) {
    rowElement.classList.add("dragging");
  }
};

// 진행중 캠페인 우선순위 셀 드롭 처리
const handleOngoingPriorityDrop = (event: DragEvent, targetItem: Record<string, unknown>, targetIndex: number) => {
  event.preventDefault();
  event.stopPropagation();
  
  const draggedIndex = parseInt(event.dataTransfer?.getData("text/plain") || "-1");
  if (draggedIndex === -1 || draggedIndex === targetIndex) return;

  // 페이징된 리스트의 인덱스를 전체 리스트 인덱스로 변환
  const start = (ongoingCurrentPage.value - 1) * itemsPerPage.value;
  const actualDraggedIndex = start + draggedIndex;
  const actualTargetIndex = start + targetIndex;

  // 배열에서 항목 이동
  const newList = [...ongoingCampaignList.value];
  const [draggedItem] = newList.splice(actualDraggedIndex, 1);
  newList.splice(actualTargetIndex, 0, draggedItem);

  // 우선순위 재설정
  newList.forEach((item, index) => {
    item.priority = index + 1;
  });

  ongoingCampaignList.value = newList;
  ongoingTotalCount.value = newList.length;

  // 전역 상태 정리
  (window as any).__draggedRowIndex = undefined;
  (window as any).__draggedRowItem = undefined;
  (window as any).__draggedListType = undefined;
};

// 진행중 캠페인 행 드롭 처리 (DataTable의 drop 이벤트)
const handleOngoingRowDrop = (
  draggedItem: Record<string, unknown>,
  draggedIndex: number,
  targetItem: Record<string, unknown>,
  targetIndex: number
) => {
  // 페이징된 리스트의 인덱스를 전체 리스트 인덱스로 변환
  const start = (ongoingCurrentPage.value - 1) * itemsPerPage.value;
  const actualDraggedIndex = start + draggedIndex;
  const actualTargetIndex = start + targetIndex;

  // 배열에서 항목 이동
  const newList = [...ongoingCampaignList.value];
  const [movedItem] = newList.splice(actualDraggedIndex, 1);
  newList.splice(actualTargetIndex, 0, movedItem);

  // 우선순위 재설정
  newList.forEach((item, index) => {
    item.priority = index + 1;
  });

  ongoingCampaignList.value = newList;
  ongoingTotalCount.value = newList.length;
};

// 진행중 캠페인 그리드 저장 처리
const handleOngoingGridSave = () => {
  // TODO: 진행중 캠페인 그리드 데이터 저장 로직 구현
  console.log("진행중 캠페인 그리드 데이터 저장", ongoingCampaignList.value);
  alert("저장되었습니다!");
};


// 예정된 캠페인 그리드 저장 처리
const handleScheduledGridSave = () => {
  // TODO: 예정된 캠페인 그리드 데이터 저장 로직 구현
  console.log("예정된 캠페인 그리드 데이터 저장", scheduledCampaignList.value);
  alert("저장되었습니다!");
};

// 저장 처리
const handleSave = () => {
  // TODO: 저장 로직 구현
  if (campaignDetailRef.value) {
    campaignDetailRef.value.handleSave();
  }
  console.log("캠페인 저장");
  closeRegisterModal();
  handleSearch(); // 목록 새로고침
};

// 그리드 저장 처리
const handleGridSave = () => {
  // TODO: 그리드 데이터 저장 로직 구현
  console.log("그리드 데이터 저장", campaignList.value);
  alert("저장되었습니다!");
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
  overflow-y: auto;
  overflow-x: hidden;
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
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid $border-color;
  border-radius: $border-radius-sm;
  padding: $spacing-lg;
  margin-bottom: $spacing-lg;
  min-height: 500px;

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: $spacing-md;
  }

  .section-title {
    font-size: $font-size-lg;
    font-weight: 600;
    color: $text-color;
  }

  .btn-save {
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

  .table-wrapper {
    flex: 1;
    overflow: auto;
    margin-bottom: $spacing-md;
    min-height: 400px;
    max-height: 500px;
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

.priority-cell {
  cursor: move;
  user-select: none;
  padding: $spacing-xs;
  display: inline-block;
  min-width: 40px;
  text-align: center;

  &:hover {
    background-color: rgba(39, 155, 216, 0.1);
    border-radius: $border-radius-sm;
  }

  &:active {
    cursor: grabbing;
  }
}

.priority-input {
  width: 60px;
  padding: $spacing-xs $spacing-sm;
  border: 1px solid $border-color;
  border-radius: $border-radius-sm;
  font-size: $font-size-sm;
  text-align: center;

  &:focus {
    outline: none;
    border-color: #279bd8;
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
</style>

