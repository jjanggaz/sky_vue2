<template>
  <div class="campaign-ob-page">
    <!-- 탭 네비게이션 -->
    <div class="tab-navigation">
      <div class="tab-left">
        <div
          class="tab-item"
          :class="{ active: activeTab === '내 OBTM 현황' }"
          @click="activeTab = '내 OBTM 현황'"
        >
          내 OBTM 현황
        </div>
        <div
          class="tab-item"
          :class="{ active: activeTab === '내 OBTM 리스트' }"
          @click="activeTab = '내 OBTM 리스트'"
        >
          내 OBTM 리스트
        </div>
      </div>
      <button class="btn-close" type="button" @click="handleClose" aria-label="닫기">X</button>
    </div>

    <!-- 메인 콘텐츠 영역 -->
    <div class="content-area">
      <!-- 내 OBTM 현황 탭 -->
      <div v-if="activeTab === '내 OBTM 현황'" class="status-grid-section">
        <table class="status-table">
          <thead>
            <tr>
              <th>받은 DB(A)</th>
              <th>통화성공건(B)</th>
              <th>통화실패건(무응답)(C)</th>
              <th>미수행건(D)</th>
              <th>진행률(B/A)</th>
              <th>접수성공건(E)</th>
              <th>접수성공률(E/B)</th>
              <th>내 성공률 랭킹</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in statusData" :key="index">
              <td>{{ item.receivedDb }}</td>
              <td>{{ item.successfulCalls }}</td>
              <td>{{ item.failedCalls }}</td>
              <td>{{ item.unperformed }}</td>
              <td>{{ item.progressRate }}%</td>
              <td>{{ item.successfulRegistrations }}</td>
              <td>{{ item.registrationRate }}%</td>
              <td>총 {{ item.totalRank }}중 {{ item.myRank }}위</td>
            </tr>
          </tbody>
        </table>
        <!-- 내 OBTM 현황 페이징 -->
        <div class="pagination-container">
          <div class="total-count">
            {{
              $t("common.totalCount", {
                count: statusTotalCount || 0,
              })
            }}
          </div>
          <div class="pagination-center">
            <Pagination
              :current-page="statusCurrentPage"
              :total-pages="statusTotalPages"
              @page-change="handleStatusPageChange"
            />
          </div>
        </div>
      </div>

      <!-- 내 OBTM 리스트 탭 -->
      <div v-if="activeTab === '내 OBTM 리스트'" class="list-grid-section">
        <table class="list-table">
          <thead>
            <tr>
              <th>선택</th>
              <th>고객번호</th>
              <th>캠페인명</th>
              <th>캠페인 ID</th>
              <th>배정일</th>
              <th>통화성공여부</th>
              <th>직전 캠페인 결과</th>
              <th>스페셜 DB 여부</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(item, index) in listData" 
              :key="index"
              :class="{ 'selected': selectedRowIndex === index }"
            >
              <td>
                <input 
                  type="radio" 
                  :name="'obtm-select'"
                  :value="index"
                  v-model="selectedRowIndex"
                  @change="handleRowSelect(index)"
                />
              </td>
              <td>{{ item.customerNumber }}</td>
              <td>{{ item.campaignName }}</td>
              <td>{{ item.campaignId }}</td>
              <td>{{ item.assignmentDate }}</td>
              <td>{{ item.callSuccess }}</td>
              <td>{{ item.previousResult }}</td>
              <td>{{ item.specialDb }}</td>
            </tr>
          </tbody>
        </table>
        <!-- 내 OBTM 리스트 페이징 -->
        <div class="pagination-container">
          <div class="total-count">
            {{
              $t("common.totalCount", {
                count: listTotalCount || 0,
              })
            }}
          </div>
          <div class="pagination-center">
            <Pagination
              :current-page="listCurrentPage"
              :total-pages="listTotalPages"
              @page-change="handleListPageChange"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- 좌측 하단 O/B 상태 표시 (내 OBTM 리스트 탭 선택 시에만, 행 선택 시 활성화) -->
    <div 
      v-if="activeTab === '내 OBTM 리스트'" 
      class="ob-status"
      :class="{ 'active': selectedRowIndex !== null }"
    >
      <div class="ob-icon">📞↻</div>
      <div class="ob-label">O/B</div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Pagination from "@/components/common/Pagination.vue";

export default Vue.extend({
  name: "CampaignOb",
  components: {
    Pagination,
  },
  data() {
    // 더미 데이터 생성 함수
    const generateDummyData = () => {
      const data = [];
      for (let i = 0; i < 2; i++) {
        const receivedDb = Math.floor(Math.random() * 500) + 100;
        const successfulCalls = Math.floor(receivedDb * (0.3 + Math.random() * 0.4));
        const failedCalls = Math.floor(receivedDb * (0.1 + Math.random() * 0.2));
        const unperformed = receivedDb - successfulCalls - failedCalls;
        const progressRate = ((successfulCalls / receivedDb) * 100).toFixed(1);
        const successfulRegistrations = Math.floor(successfulCalls * (0.2 + Math.random() * 0.3));
        const registrationRate = ((successfulRegistrations / successfulCalls) * 100).toFixed(1);
        const totalRank = Math.floor(Math.random() * 50) + 50;
        const myRank = Math.floor(Math.random() * totalRank) + 1;

        data.push({
          receivedDb,
          successfulCalls,
          failedCalls,
          unperformed,
          progressRate,
          successfulRegistrations,
          registrationRate,
          totalRank,
          myRank,
        });
      }
      return data;
    };

    // 내 OBTM 리스트 더미 데이터 생성 함수
    const generateListData = () => {
      const callSuccessOptions = ["긍정반응", "권유못함", "미수행", "보류", "성공"];
      const previousResultOptions = [
        "재통화 약속",
        "무응답/통화거부",
        "",
        "가족과 상의",
        "접수성공",
      ];
      const specialDbOptions = ["우선", "일반"];
      const campaignNames = [
        "전일 TV AS 완료",
        "전월 TV 단독 설치",
        "대구 경북 지역 타깃",
        "신규 가입 프로모션",
        "기존 고객 우대 캠페인",
      ];
      const campaignIds = ["CAM001", "CAM002", "CAM003", "CAM004", "CAM005"];
      
      const generateDate = (daysAgo: number) => {
        const date = new Date();
        date.setDate(date.getDate() - daysAgo);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };

      const data = [];
      for (let i = 0; i < 5; i++) {
        data.push({
          customerNumber: "0001234567",
          campaignName: campaignNames[i % campaignNames.length],
          campaignId: campaignIds[i % campaignIds.length],
          assignmentDate: generateDate(Math.floor(Math.random() * 30)),
          callSuccess: callSuccessOptions[Math.floor(Math.random() * callSuccessOptions.length)],
          previousResult: previousResultOptions[Math.floor(Math.random() * previousResultOptions.length)],
          specialDb: specialDbOptions[Math.floor(Math.random() * specialDbOptions.length)],
        });
      }
      return data;
    };

    const statusData = generateDummyData();
    const listData = generateListData();

    return {
      activeTab: "내 OBTM 현황",
      selectedRowIndex: null as number | null,
      statusData,
      statusTotalCount: statusData.length,
      statusCurrentPage: 1,
      statusItemsPerPage: 10,
      listData,
      listTotalCount: listData.length,
      listCurrentPage: 1,
      listItemsPerPage: 10,
    };
  },
  computed: {
    statusTotalPages(): number {
      return Math.ceil(this.statusTotalCount / this.statusItemsPerPage);
    },
    listTotalPages(): number {
      return Math.ceil(this.listTotalCount / this.listItemsPerPage);
    },
  },
  methods: {
    handleClose() {
      this.$emit("close");
    },
    handleRowSelect(index: number) {
      this.selectedRowIndex = index;
    },
    handleStatusPageChange(page: number) {
      this.statusCurrentPage = page;
    },
    handleListPageChange(page: number) {
      this.listCurrentPage = page;
    },
  },
});
</script>

<style scoped lang="scss">
.campaign-ob-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background: #fff;
  position: relative;
}

.tab-navigation {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #4fd1c7; // 밝은 청록색
  border-bottom: 1px solid #38b2ac;

  .tab-left {
    display: flex;
    align-items: center;
    min-width: 0;
  }

  .tab-item {
    padding: 12px 24px;
    font-size: 14px;
    color: #2d3748;
    cursor: pointer;
    transition: background 0.2s;
    border-right: 1px solid #38b2ac;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }

    &.active {
      background: rgba(255, 255, 255, 0.2);
      font-weight: 600;
    }
  }

  .btn-close {
    margin-right: 10px;
    width: 32px;
    height: 32px;
    border: none;
    background: rgba(255, 255, 255, 0.15);
    color: #fff;
    font-size: 16px;
    font-weight: 800;
    cursor: pointer;
    border-radius: 6px;

    &:hover {
      background: rgba(255, 255, 255, 0.25);
    }
  }
}

.action-section {
  padding: 15px 20px;
  background: #fff;

  .btn-add {
    width: 32px;
    height: 32px;
    background: #20b2aa;
    border: none;
    border-radius: 4px;
    color: #fff;
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;

    &:hover {
      background: #1a9b94;
    }
  }
}

.content-area {
  flex: 1;
  background: #fff;
  overflow: auto;
  padding: 20px;
}

.status-grid-section {
  width: 100%;
  overflow-x: auto;
}

.status-table,
.list-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;

  thead {
    background: #1e3a8a; // dark blue
    color: #fff;

    th {
      padding: 12px 8px;
      text-align: center;
      font-weight: 600;
      border: 1px solid #3b82f6;
      white-space: nowrap;
    }
  }

  tbody {
    tr {
      background: #fff;

      &:nth-child(even) {
        background: #f9fafb;
      }

      td {
        padding: 10px 8px;
        text-align: center;
        border: 1px solid #e5e7eb;
        color: #1f2937;
      }
    }
  }
}

.list-table {
  tbody {
    tr {
      cursor: pointer;

      &.selected {
        background: #dbeafe !important; // light blue
      }

      &:hover {
        background: #f3f4f6;
      }
    }

    td {
      input[type="radio"] {
        cursor: pointer;
      }
    }
  }
}

.list-grid-section {
  width: 100%;
  overflow-x: auto;
}

.ob-status {
  position: absolute;
  bottom: 20px;
  left: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  opacity: 0.5;
  transition: opacity 0.2s;

  .ob-icon {
    font-size: 24px;
    color: #4fd1c7;
    transition: color 0.2s;
  }

  .ob-label {
    font-size: 12px;
    color: #4fd1c7;
    font-weight: 500;
    transition: color 0.2s;
  }

  &.active {
    opacity: 1;

    .ob-icon {
      color: #20b2aa;
    }

    .ob-label {
      color: #20b2aa;
      font-weight: 600;
    }
  }
}
</style>
