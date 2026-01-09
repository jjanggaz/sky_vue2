<template>
  <div class="counselor-detail-page">
    <!-- 상단 탭 네비게이션 -->
    <div class="top-tabs">
      <div class="tab-item active">캠페인 상담이력</div>
      <div class="tab-item">채팅상담이력</div>
      <div class="tab-item">OB접수이력</div>
      <div class="tab-item">OB스케줄이력</div>
      <div class="tab-item">SMS 발송이력</div>
      <div class="tab-arrow">▶</div>
    </div>

    <!-- 검색/필터 섹션 -->
    <div class="search-section">
      <div class="date-range">
        <label>START</label>
        <input type="date" value="2022-07-09" />
        <label>END</label>
        <input type="date" value="2025-07-08" />
      </div>
      <div class="filter-dropdown">
        <select>
          <option>고객접점채널</option>
        </select>
      </div>
      <button class="btn-search">Q</button>
      <button class="btn-excel" type="button" aria-label="엑셀 다운로드">엑셀</button>
    </div>

    <div class="main-layout">
      <!-- 메인 콘텐츠 영역 -->
      <div class="content-area">
        <!-- 상단: 캠페인 상담이력 테이블 -->
        <div class="history-table-section">
          <table class="history-table">
            <thead>
              <tr>
                <th>상담구분</th>
                <th>상담일자</th>
                <th>상담시간</th>
                <th>상담고객</th>
                <th>상담원</th>
                <th>고객분류</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in historyRows"
                :key="row.id"
                class="history-row"
                :data-row-id="row.id"
                @dblclick="handleHistoryRowDblClick"
              >
                <td>{{ row.type }}</td>
                <td>{{ row.date }}</td>
                <td>{{ row.time }}</td>
                <td>{{ row.customer }}</td>
                <td>{{ row.counselor }}</td>
                <td>{{ row.customerType }}</td>
              </tr>
            </tbody>
          </table>
          <div class="table-summary">13 중 1-13</div>
        </div>

        <!-- 메인 콘텐츠 탭 -->
        <div class="content-tabs">
          <button class="btn-add">+</button>
          <div class="tab-item">메인상담</div>
          <div class="tab-item active">캠페인</div>
        </div>

        <!-- 캠페인 상세 테이블 -->
        <div class="campaign-details-section">
          <table class="campaign-table">
            <thead>
              <tr>
                <th>캠페인ID</th>
                <th>시행일</th>
                <th>캠페인명</th>
                <th colspan="5">지금 입력</th>
              </tr>
              <tr class="sub-header">
                <th></th>
                <th></th>
                <th></th>
                <th>성공</th>
                <th>긍정반응</th>
                <th>보류</th>
                <th>실패</th>
                <th>권유못함</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>C0000000</td>
                <td>20250717</td>
                <td>전일 TV AS 완료</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>C0000001</td>
                <td>20250701</td>
                <td>전월 TV 단독 설치</td>
                <td></td>
                <td class="checked">✓</td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td>C0000002</td>
                <td>20250623</td>
                <td>대구 경북 지역 타깃</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- 캠페인 입력 폼 -->
        <div class="campaign-form-section">
          <div class="form-row narrow-row">
            <div class="form-group narrow">
              <label>상담고객명</label>
              <input type="text" value="오지현" />
            </div>
            <div class="form-group narrow">
              <label>아웃바운드</label>
              <select>
                <option>아웃바운드</option>
              </select>
            </div>
            <div class="form-group narrow">
              <label>상담고객분류</label>
              <select>
                <option>01 본인</option>
              </select>
            </div>
            <div class="form-spacer"></div>
          </div>

          <div class="form-row">
            <div class="form-group">
              <label>고객접점채널</label>
              <select>
                <option>28 캠페인</option>
              </select>
            </div>
            <div class="form-group">
              <label>접수번호</label>
              <div class="input-with-clear">
                <input type="text" />
                <button class="btn-clear">×</button>
              </div>
            </div>
          </div>

          <div class="breadcrumb">
            캠페인 - 3002 > 긍정반응 > 가족과 상의
          </div>

          <div class="form-row narrow-row">
            <div class="form-group narrow">
              <label>상담유형(대)</label>
              <select>
                <option>캠페인 - 3002</option>
              </select>
            </div>
            <div class="form-group narrow">
              <label>상담유형(중)</label>
              <select>
                <option>긍정반응</option>
              </select>
            </div>
            <div class="form-group narrow">
              <label>상담유형(소)</label>
              <select>
                <option>가족과 상의</option>
              </select>
            </div>
            <div class="form-spacer"></div>
          </div>

          <div class="form-group full-width">
            <label>상담내용</label>
            <textarea rows="6"></textarea>
          </div>
        </div>

        <!-- 하단 액션 버튼들 -->
        <div class="action-buttons">
          <button class="btn-gray">초기화</button>
          <button class="btn-blue-light">O/B스케줄</button>
          <button class="btn-blue">OB등록</button>
          <button class="btn-blue">추가등록</button>
          <button class="btn-gray">미처리</button>
          <button class="btn-gray">완료저장</button>
        </div>
      </div>

      <!-- 우측 세로 네비게이션 바 -->
      <div class="right-nav-bar">
        <div class="nav-item" @click="openCampaignObModal">
          <div class="nav-icon">📋</div>
          <div class="nav-label">캠페인O/B</div>
        </div>
        <div class="nav-item">
          <div class="nav-icon">✓</div>
          <div class="nav-label">미대응</div>
        </div>
        <div class="nav-item">
          <div class="nav-icon">✉</div>
          <div class="nav-label">이메일</div>
        </div>
        <div class="nav-item">
          <div class="nav-icon">📞</div>
          <div class="nav-label">O/B</div>
        </div>
        <div class="nav-item">
          <div class="nav-icon">↩</div>
          <div class="nav-label">콜백</div>
        </div>
        <div class="nav-item">
          <div class="nav-icon">📄</div>
          <div class="nav-label">고지</div>
        </div>
        <div class="nav-item">
          <div class="nav-icon">💬</div>
          <div class="nav-label">SMS</div>
        </div>
        <div class="nav-item">
          <div class="nav-icon">📲</div>
          <div class="nav-label">알림톡</div>
        </div>
        <div class="nav-item">
          <div class="nav-icon">📠</div>
          <div class="nav-label">FAX</div>
        </div>
      </div>
    </div>

    <!-- 캠페인O/B 모달 -->
    <div v-if="isCampaignObModalOpen" class="modal-overlay" @click.self="closeCampaignObModal">
      <div class="modal-container campaign-ob-modal">
        <div class="modal-body">
          <CampaignOb @close="closeCampaignObModal" />
        </div>
      </div>
    </div>

    <!-- 캠페인 상담이력 팝업 -->
    <div
      v-if="isCampaignHistoryModalOpen"
      class="modal-overlay"
      @click.self="closeCampaignHistoryModal"
    >
      <div class="modal-container campaign-history-modal">
        <CampaignHistory @close="closeCampaignHistoryModal" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CampaignOb from "./CampaignOb.vue";
import CampaignHistory from "./CampaignHistory.vue";

const isCampaignObModalOpen = ref(false);

const openCampaignObModal = () => {
  isCampaignObModalOpen.value = true;
};

const closeCampaignObModal = () => {
  isCampaignObModalOpen.value = false;
};

type HistoryRow = {
  id: string;
  type: string;
  date: string;
  time: string;
  customer: string;
  counselor: string;
  customerType: string;
};

const historyRows = ref<HistoryRow[]>([
  {
    id: "h-20250502-115214",
    type: "캠페인",
    date: "2025-05-02",
    time: "11:52:14",
    customer: "오지*",
    counselor: "ARS사용자 (99998)",
    customerType: "",
  },
  {
    id: "h-20250214-173351",
    type: "캠페인",
    date: "2025-02-14",
    time: "17:33:51",
    customer: "오지*",
    counselor: "문도현 (600753)",
    customerType: "본인",
  },
  {
    id: "h-20250214-162227",
    type: "캠페인",
    date: "2025-02-14",
    time: "16:22:27",
    customer: "오지*",
    counselor: "문도현 (600753)",
    customerType: "본인",
  },
  {
    id: "h-20250207-133138",
    type: "캠페인",
    date: "2025-02-07",
    time: "13:31:38",
    customer: "오지*",
    counselor: "정호인[CRG] (600353)",
    customerType: "미확인",
  },
]);

const isCampaignHistoryModalOpen = ref(false);
const selectedHistoryRowId = ref<string | null>(null);

const openCampaignHistoryModal = () => {
  isCampaignHistoryModalOpen.value = true;
};

const closeCampaignHistoryModal = () => {
  isCampaignHistoryModalOpen.value = false;
  selectedHistoryRowId.value = null;
};

const handleHistoryRowDblClick = (event: MouseEvent) => {
  const el = event.currentTarget as HTMLElement | null;
  const rowId = el?.dataset?.rowId || null;
  selectedHistoryRowId.value = rowId;
  openCampaignHistoryModal();
};
</script>

<style scoped lang="scss">
.counselor-detail-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
}

.top-tabs {
  display: flex;
  background: #fff;
  border-bottom: 2px solid #3498db;
  padding: 0 20px;

  .tab-item {
    padding: 12px 20px;
    cursor: pointer;
    border-bottom: 3px solid transparent;
    font-size: 14px;

    &.active {
      background: #fff;
      border-bottom-color: #3498db;
      font-weight: 600;
      color: #3498db;
    }
  }

  .tab-arrow {
    margin-left: auto;
    padding: 12px 10px;
    color: #666;
  }
}

.search-section {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 15px 20px;
  background: #fff;
  border-bottom: 1px solid #ddd;

  .date-range {
    display: flex;
    align-items: center;
    gap: 10px;

    label {
      font-size: 13px;
      font-weight: 600;
    }

    input {
      padding: 6px 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 13px;
      width: 120px; // 20% 증가
    }
  }

  .filter-dropdown {
    select {
      padding: 6px 30px 6px 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 13px;
      width: 120px; // 50% 축소
    }
  }

  .btn-search {
    padding: 6px 15px;
    background: #3498db;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 600;
  }

  .btn-action {
    padding: 6px 12px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
  }

  .btn-excel {
    padding: 6px 12px;
    background: #16a34a;
    border: 1px solid #15803d;
    border-radius: 4px;
    cursor: pointer;
    color: #fff;
    font-weight: 700;
    font-size: 13px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }

  .btn-excel::before {
    content: "⬇";
    font-size: 12px;
    line-height: 1;
  }
}

.main-layout {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.content-area {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.history-table-section {
  flex: 0 0 auto;
  background: #fff;
  border-bottom: 2px solid #ddd;
  margin-bottom: 10px;
}

.history-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;

  thead {
    background: #f8f9fa;

    th {
      padding: 10px;
      text-align: center;
      border: 1px solid #ddd;
      font-weight: 600;
    }
  }

  tbody {
    tr {
      &:hover {
        background: #f8f9fa;
      }

      td {
        padding: 10px;
        text-align: center;
        border: 1px solid #ddd;
      }
    }
  }
}

.history-row {
  cursor: pointer;
}

.table-summary {
  padding: 8px 15px;
  text-align: right;
  font-size: 12px;
  color: #666;
  background: #f8f9fa;
}

.content-tabs {
  display: flex;
  align-items: center;
  gap: 5px;
  padding: 10px 15px;
  background: #fff;
  border-bottom: 1px solid #ddd;

  .btn-add {
    padding: 6px 12px;
    background: #27ae60;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 18px;
    font-weight: bold;
  }

  .tab-item {
    padding: 8px 20px;
    cursor: pointer;
    border-bottom: 3px solid transparent;
    font-size: 14px;

    &.active {
      border-bottom-color: #ff9800;
      font-weight: 600;
      color: #ff9800;
    }
  }
}

.campaign-details-section {
  flex: 0 0 auto;
  background: #fff;
  margin-bottom: 10px;
  overflow-x: auto;
}

.campaign-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;

  thead {
    background: #f8f9fa;

    tr {
      th {
        padding: 10px;
        text-align: center;
        border: 1px solid #ddd;
        font-weight: 600;
      }

      &.sub-header {
        background: #e9ecef;

        th {
          padding: 6px 10px;
          font-size: 12px;
        }
      }
    }
  }

  tbody {
    tr {
      &:hover {
        background: #f8f9fa;
      }

      td {
        padding: 10px;
        text-align: center;
        border: 1px solid #ddd;

        &.checked {
          color: #27ae60;
          font-weight: bold;
        }
      }
    }
  }
}

.campaign-form-section {
  flex: 1;
  background: #fff;
  padding: 20px;
  overflow-y: auto;
}

.form-row {
  display: flex;
  gap: 15px;
  margin-bottom: 15px;
  align-items: flex-end;
}

.form-spacer {
  flex: 1;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;

  label {
    font-size: 13px;
    font-weight: 600;
    color: #333;
  }

  input,
  select,
  textarea {
    padding: 6px 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 13px;
    min-width: 150px;
  }

  textarea {
    min-height: 120px;
    resize: vertical;
  }

  &.narrow {
    flex: 0 0 auto;
    max-width: 180px;

    input,
    select {
      min-width: 120px;
      max-width: 180px;
    }
  }

  &.full-width {
    width: 100%;

    textarea {
      width: 100%;
    }
  }
}

.input-with-clear {
  display: flex;
  align-items: center;
  position: relative;

  input {
    flex: 1;
    padding-right: 30px;
  }

  .btn-clear {
    position: absolute;
    right: 5px;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 18px;
    color: #999;
    padding: 0 5px;
  }
}

.breadcrumb {
  padding: 10px 15px;
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 15px;
  font-size: 13px;
  color: #666;
}

.action-buttons {
  display: flex;
  gap: 10px;
  padding: 15px 20px;
  background: #fff;
  border-top: 1px solid #ddd;

  button {
    padding: 8px 20px;
    border: none;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }

  .btn-gray {
    background: #95a5a6;
    color: #fff;
  }

  .btn-blue {
    background: #3498db;
    color: #fff;
  }

  .btn-blue-light {
    background: #5dade2;
    color: #fff;
  }
}

.right-nav-bar {
  width: 80px;
  background: #34495e;
  display: flex;
  flex-direction: column;
  padding: 20px 10px;
  gap: 20px;

  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    padding: 10px;
    border-radius: 8px;
    transition: background 0.2s;

    &:hover {
      background: #4a5f7f;
    }

    .nav-icon {
      font-size: 24px;
      margin-bottom: 5px;
      color: #fff;
    }

    .nav-label {
      font-size: 11px;
      color: #fff;
      text-align: center;
    }
  }
}

// 캠페인O/B 모달 스타일
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .campaign-ob-modal {
    width: 90%;
    max-width: 1200px;
    height: 85%;
    max-height: 900px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    overflow: hidden;

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 15px 20px;
      border-bottom: 1px solid #e0e0e0;
      background: #f8f9fa;

      h3 {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        color: #333;
      }

      .btn-close {
        width: 32px;
        height: 32px;
        border: none;
        background: transparent;
        color: #666;
        font-size: 28px;
        font-weight: 300;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        transition: color 0.2s;

        &:hover {
          color: #333;
        }
      }
    }

    .modal-body {
      flex: 1;
      overflow: hidden;

      :deep(.campaign-ob-page) {
        height: 100%;
        border-radius: 0;
      }
    }
  }

  .campaign-history-modal {
    width: 56%; // 80%의 70% = 56% (30% 축소)
    max-width: 630px; // 900px의 70% = 630px
    height: auto; // 내용에 맞게 높이 조절
    max-height: 90vh; // 최대 높이 제한
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    box-sizing: border-box;
  }
}

.modal-floating-close {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 32px;
  height: 32px;
  border: 1px solid #d1d5db;
  background: #fff;
  border-radius: 6px;
  cursor: pointer;
  font-size: 20px;
  line-height: 28px;
  color: #111827;
}
</style>
