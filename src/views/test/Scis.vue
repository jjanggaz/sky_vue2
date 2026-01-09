<template>
  <div class="scis-page">
    <!-- 상단 글로벌 탑바 -->
    <div class="topbar">
      <div class="brand">kt skylife</div>
      <div class="nav">
        <span class="nav-item">고객관리</span>
        <span class="nav-item">상품관리</span>
        <span class="nav-item active">마케팅관리</span>
        <span class="nav-item">요금관리</span>
        <span class="nav-item">OTS관리</span>
        <span class="nav-item">업무지원</span>
        <span class="nav-item">고객센터 현장지원</span>
      </div>
    </div>

    <!-- 페이지 내 상단 보조 메뉴 (본사/지사 + 우측 가로 메뉴) -->
    <div class="sub-inline-menu">
      <div class="sub-title">본사/지사</div>
      <div class="inline-menu">
        <span class="item" :class="{ active: secondNav === '상품/서비스관리' }" @click="onSecondNavClick('상품/서비스관리')">상품/서비스관리</span>
        <span class="item" :class="{ active: secondNav === '유통망관리' }" @click="onSecondNavClick('유통망관리')">유통망관리</span>
        <span class="item" :class="{ active: secondNav === '수신설비유통관리' }" @click="onSecondNavClick('수신설비유통관리')">수신설비유통관리</span>
        <span class="item" :class="{ active: secondNav === '마케팅정보관리' }" @click="onSecondNavClick('마케팅정보관리')">마케팅정보관리</span>
        <span class="item" :class="{ active: secondNav === '건물관리' }" @click="onSecondNavClick('건물관리')">건물관리</span>
        <span class="item" :class="{ active: secondNav === '시장정보관리' }" @click="onSecondNavClick('시장정보관리')">시장정보관리</span>
        <span class="item" :class="{ active: secondNav === '공통관리' }" @click="onSecondNavClick('공통관리')">공통관리</span>
        <span class="item" :class="{ active: secondNav === '캠페인관리' }" @click="onSecondNavClick('캠페인관리')">캠페인관리</span>
      </div>
    </div>

    <div class="page-body">
       <!-- 좌측 사이드 메뉴 -->
       <aside class="sidebar">
         <ul class="menu">
           <li
             v-for="(item, idx) in leftMenuItems"
             :key="`side-${idx}`"
             class="menu-item"
             :class="{ active: activeMenuItem?.label === item.label }"
             @click="handleSidebarItemClick(item)"
           >
             {{ item.label }}
           </li>
         </ul>
       </aside>

       <!-- 메인 콘텐츠 -->
       <main class="content">
         <!-- 동적 컴포넌트 렌더링 영역 -->
         <component v-if="activeComponent" :is="componentMap[activeComponent]" />
         
         <!-- 기본 콘텐츠 (컴포넌트가 없을 때) -->
         <template v-else>
           <!-- 제목 영역 -->
           <div class="content-title">
             <span class="caret">▷</span>
             <span>모집점 실적 조회</span>
           </div>

           <!-- 조회 조건 영역 (연두색 톤) -->
           <section class="filter-panel">
          <div class="filter-row">
            <div class="filter-item">
              <label>조회기간</label>
              <select v-model="startYear">
                <option v-for="y in years" :key="`sy-${y}`" :value="y">{{ y }}</option>
              </select>
              <select v-model="startMonth">
                <option v-for="m in months" :key="`sm-${m}`" :value="m">{{ pad2(m) }}</option>
              </select>
              <select v-model="startDay">
                <option v-for="d in days" :key="`sd-${d}`" :value="d">{{ pad2(d) }}</option>
              </select>
              <span class="tilde">~</span>
              <select v-model="endYear">
                <option v-for="y in years" :key="`ey-${y}`" :value="y">{{ y }}</option>
              </select>
              <select v-model="endMonth">
                <option v-for="m in months" :key="`em-${m}`" :value="m">{{ pad2(m) }}</option>
              </select>
              <select v-model="endDay">
                <option v-for="d in days" :key="`ed-${d}`" :value="d">{{ pad2(d) }}</option>
              </select>
            </div>

            <div class="filter-item">
              <label>지사</label>
              <select v-model="branch">
                <option v-for="b in branches" :key="b.value" :value="b.value">{{ b.label }}</option>
              </select>
            </div>

            <div class="filter-item">
              <label>유통망</label>
              <select v-model="channel">
                <option v-for="c in channels" :key="c.value" :value="c.value">{{ c.label }}</option>
              </select>
            </div>

            <div class="actions">
              <button class="btn search" @click="onQuickSearch">검색</button>
              <button class="btn query" @click="onQuery">조회</button>
            </div>
          </div>
        </section>

        <!-- 결과 테이블 -->
        <section class="table-section">
          <div class="table-wrapper">
            <table class="result-table">
              <thead>
                <tr>
                  <th rowspan="2" class="sticky-col">지사</th>
                  <th rowspan="2" class="sticky-col">센터</th>
                  <th rowspan="2" class="sticky-col">모집점</th>
                  <th colspan="3">TV</th>
                  <th colspan="3">인터넷</th>
                </tr>
                <tr>
                  <th>접수</th>
                  <th>개통</th>
                  <th>해지</th>
                  <th>접수</th>
                  <th>개통</th>
                  <th>해지</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, idx) in rows" :key="idx">
                  <td class="sticky-col">본사</td>
                  <td class="sticky-col">{{ row.center }}</td>
                  <td class="sticky-col">{{ row.outlet }}</td>
                  <td class="num">{{ row.tvReceive }}</td>
                  <td class="num">{{ row.tvOpen }}</td>
                  <td class="num">{{ row.tvCancel }}</td>
                  <td class="num">{{ row.netReceive }}</td>
                  <td class="num">{{ row.netOpen }}</td>
                  <td class="num">{{ row.netCancel }}</td>
                </tr>
              </tbody>
              <tfoot>
                <tr class="summary">
                  <td class="sticky-col" colspan="3">합계</td>
                  <td class="num">{{ totals.tvReceive }}</td>
                  <td class="num">{{ totals.tvOpen }}</td>
                  <td class="num">{{ totals.tvCancel }}</td>
                  <td class="num">{{ totals.netReceive }}</td>
                  <td class="num">{{ totals.netOpen }}</td>
                  <td class="num">{{ totals.netCancel }}</td>
                </tr>
              </tfoot>
            </table>
          </div>

           <div class="table-actions">
             <button class="btn print" @click="onPrint">출력</button>
           </div>
         </section>
         </template>
       </main>
    </div>
  </div>
  </template>

<script setup lang="ts">
import { computed, ref, defineAsyncComponent, onMounted } from "vue";

const now = new Date();
const thisYear = now.getFullYear();
const years = Array.from({ length: 6 }, (_, i) => thisYear - 2 + i);
const months = Array.from({ length: 12 }, (_, i) => i + 1);
const days = Array.from({ length: 31 }, (_, i) => i + 1);

const startYear = ref(thisYear);
const startMonth = ref(now.getMonth() + 1);
const startDay = ref(1);
const endYear = ref(thisYear);
const endMonth = ref(now.getMonth() + 1);
const endDay = ref(now.getDate());

const branch = ref("10001");
const branches = [
  { value: "10001", label: "10001 본사" },
  { value: "10002", label: "10002 광주" },
  { value: "10003", label: "10003 수원" },
];

const channel = ref("all");
const channels = [
  { value: "all", label: "전체" },
  { value: "tv", label: "TV" },
  { value: "internet", label: "인터넷" },
];

type Row = {
  center: string;
  outlet: string;
  tvReceive: number;
  tvOpen: number;
  tvCancel: number;
  netReceive: number;
  netOpen: number;
  netCancel: number;
};

const rows = ref<Row[]>(generateRows());

// 2번째 가로 라인 메뉴 상태
const secondNav = ref<string>("캠페인관리");

// 동적 콘텐츠 로딩을 위한 컴포넌트 맵
const componentMap: Record<string, any> = {
  Campaign: defineAsyncComponent(() => import("@/views/test/Campaign.vue")),
  CampaignPriority: defineAsyncComponent(() => import("@/views/test/CampaignPriority.vue")),
  ObtmStatus: defineAsyncComponent(() => import("@/views/test/ObtmStatus.vue")),
  Obtm: defineAsyncComponent(() => import("@/views/test/Obtm.vue")),
  ObtmAssign: defineAsyncComponent(() => import("@/views/test/ObtmAssign.vue")),
  ObtmAssignCenter: defineAsyncComponent(() => import("@/views/test/ObtmAssignCenter.vue")),
};

type LeftMenuItem = { label: string; component?: keyof typeof componentMap };

// 현재 선택된 좌측 메뉴가 렌더링할 컴포넌트 키
const activeComponent = ref<keyof typeof componentMap | null>(null);
// 현재 선택된 메뉴 아이템 (시각적 표시용)
const activeMenuItem = ref<LeftMenuItem | null>(null);

const defaultLeftMenus: LeftMenuItem[] = [
  { label: "가입통계현황" },
  { label: "실시간증감모니터링" },
  { label: "일일가입자현황" },
  { label: "마케팅일보(개편)" },
  { label: "OTS일일보고" },
  { label: "마케팅일일보고" },
  { label: "일일종합실적(개편)" },
  { label: "지사/센터별 실적조회" },
  { label: "지사/센터별 실적조회(설치)" },
  { label: "지사/센터별 실적조회(인터넷)" },
  { label: "지사/센터별 실적조회(OTS)" },
  { label: "모집점 실적 조회" },
  { label: "UHD실적조회" },
  { label: "안드로이드 실적조회" },
  { label: "VC작업실적조회" },
  { label: "VC작업관리" },
];

const campaignLeftMenus: LeftMenuItem[] = [
  { label: "캠페인 등록", component: "Campaign" },
  { label: "캠페인 조회.수정", component: "CampaignPriority" },
  { label: "센터별 OBTM 현황", component: "ObtmStatus" },
  { label: "OBTM DB 등록", component: "Obtm" },
  { label: "OBTM DB 현황 및 배정 (본사 관리자)", component: "ObtmAssign" },
  { label: "OBTM DB 현황 및 배정 (고객센터 관리자)", component: "ObtmAssignCenter" },
];

const leftMenuItems = computed<LeftMenuItem[]>(() => {
  return secondNav.value === "캠페인관리" ? campaignLeftMenus : defaultLeftMenus;
});

function onSecondNavClick(name: string) {
  secondNav.value = name;
  // 캠페인관리 선택 해제 시 기본 콘텐츠로 복귀
  if (name !== "캠페인관리") {
    activeComponent.value = null;
    activeMenuItem.value = null;
  }
}

function handleSidebarItemClick(item: LeftMenuItem) {
  activeMenuItem.value = item;
  if (item.component) {
    activeComponent.value = item.component;
  } else {
    activeComponent.value = null;
  }
}

// 화면 로드 시 '캠페인 등록' 메뉴 선택
onMounted(() => {
  if (secondNav.value === "캠페인관리" && campaignLeftMenus.length > 0) {
    const firstItem = campaignLeftMenus[0]; // '캠페인 등록'
    activeMenuItem.value = firstItem;
    if (firstItem.component) {
      activeComponent.value = firstItem.component;
    }
  }
});

function pad2(n: number) {
  return String(n).padStart(2, "0");
}

function generateRows(): Row[] {
  const centers = ["고객센터(광주)", "고객센터(수원)", "고객센터(관악)"];
  const outlets = [
    "CS_호전환",
    "Shop_대표번호",
    "Shop_간편상담",
    "셀프청약",
    "채팅상담",
    "OBTM",
    "재영업(빠른상담)",
    "이전설치_가입",
    "AS_가입",
    "CS_기획전",
  ];
  const data: Row[] = [];
  for (let i = 0; i < 12; i += 1) {
    data.push({
      center: centers[i % centers.length],
      outlet: outlets[i % outlets.length],
      tvReceive: rand(0, 30),
      tvOpen: rand(0, 25),
      tvCancel: rand(0, 10),
      netReceive: rand(0, 40),
      netOpen: rand(0, 30),
      netCancel: rand(0, 12),
    });
  }
  return data;
}

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const totals = computed(() => {
  return rows.value.reduce(
    (acc, cur) => {
      acc.tvReceive += cur.tvReceive;
      acc.tvOpen += cur.tvOpen;
      acc.tvCancel += cur.tvCancel;
      acc.netReceive += cur.netReceive;
      acc.netOpen += cur.netOpen;
      acc.netCancel += cur.netCancel;
      return acc;
    },
    {
      tvReceive: 0,
      tvOpen: 0,
      tvCancel: 0,
      netReceive: 0,
      netOpen: 0,
      netCancel: 0,
    }
  );
});

function onQuickSearch() {
  // 검색 버튼: 보조 액션 (현재는 동일 동작)
  rows.value = generateRows();
}

function onQuery() {
  // 조회 버튼: 조건 기반 조회라고 가정하고 새 데이터 생성
  rows.value = generateRows();
}

function onPrint() {
  // 간단히 브라우저 인쇄 호출
  window.print();
}
</script>

<style scoped lang="scss">
.scis-page {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  background: #f4f5f7;
}

.topbar {
  display: flex;
  align-items: center;
  gap: 24px;
  background: #3a3f45;
  color: #fff;
  padding: 10px 16px;

  .brand {
    font-weight: 700;
    color: #ff4444;
  }

  .nav {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;

    .nav-item {
      font-size: 13px;
      opacity: 0.85;
      &.active {
        color: #ffd54f;
        font-weight: 700;
        opacity: 1;
      }
    }
  }
}

.page-body {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 12px;
  padding: 12px;
  height: calc(100vh - 50px);
  box-sizing: border-box;
}

.sidebar {
  background: #f7f7f7;
  border: 1px solid #e1e1e1;
  display: flex;
  flex-direction: column;

  .sidebar-title {
    padding: 10px;
    background: #e9ecef;
    font-weight: 600;
    border-bottom: 1px solid #ddd;
  }

  .menu {
    list-style: none;
    margin: 0;
    padding: 0;
    li {
      padding: 10px 12px;
      font-size: 13px;
      cursor: pointer;
      border-bottom: 1px solid #eee;
      transition: background 0.2s, color 0.2s;
      &.active {
        background: #4a90e2;
        color: #fff;
        font-weight: 600;
        border-left: 4px solid #2c5aa0;
        padding-left: 8px;
      }
      &:hover {
        background: #f0f0f0;
        &.active {
          background: #5ba0f2;
        }
      }
    }
  }
}

.content {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

/* 페이지 내 상단 보조 메뉴 */
.sub-inline-menu {
  position: relative;
  display: flex;
  align-items: center;
  height: 32px;
  background: #f3f4f6;
  border-bottom: 1px solid #e5e7eb;
}

.sub-inline-menu .sub-title {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 220px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #9acd32;
  color: #1f2937;
  font-weight: 700;
  font-size: 13px;
}

.sub-inline-menu .inline-menu {
  margin-left: 220px;
  display: flex;
  align-items: center;
  gap: 18px;
  padding: 0 12px;
}

.sub-inline-menu .item {
  font-size: 13px;
  color: #111827;
}

.sub-inline-menu .item.active {
  font-weight: 700;
  color: #c0392b;
  border-bottom: 2px solid #c0392b;
  padding-bottom: 4px;
}
.content-title {
  background: #fff;
  border: 1px solid #e0e0e0;
  padding: 10px 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 8px;

  .caret {
    color: #d35400;
  }
}

.filter-panel {
  background: #d9ead3; /* 연두색 톤 */
  border: 1px solid #c3d6bd;
  padding: 10px 12px;
  margin-bottom: 10px;

  .filter-row {
    display: flex;
    align-items: center;
    gap: 14px;
    flex-wrap: wrap;
  }

  .filter-item {
    display: inline-flex;
    align-items: center;
    gap: 6px;

    label {
      font-size: 13px;
      font-weight: 600;
      color: #333;
      white-space: nowrap;
    }

    select {
      padding: 4px 8px;
      border: 1px solid #c7c7c7;
      background: #fff;
      border-radius: 3px;
      font-size: 13px;
    }

    .tilde {
      padding: 0 4px;
      color: #555;
    }
  }

  .actions {
    display: inline-flex;
    align-items: center;
    gap: 8px;

    .btn {
      padding: 6px 12px;
      border-radius: 4px;
      border: 1px solid #bdbdbd;
      cursor: pointer;
      font-size: 13px;
      background: #e9ecef;
      &.search {
        background: #b8d9ff;
        border-color: #98c4ff;
      }
      &.query {
        background: #d0d0d0;
        border-color: #bfbfbf;
      }
    }
  }
}

.table-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #fff;
  border: 1px solid #e0e0e0;
  padding: 10px;
}

.table-wrapper {
  overflow: auto;
  max-height: 60vh;
  border: 1px solid #e5e7eb;
}

.result-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;

  thead tr:first-child {
    background: #f1f5f9;
  }

  thead th {
    border: 1px solid #dfe3e8;
    padding: 8px 6px;
    text-align: center;
    white-space: nowrap;
  }

  tbody td,
  tfoot td {
    border: 1px solid #e5e7eb;
    padding: 8px 6px;
    text-align: center;
  }

  .num {
    text-align: right;
    padding-right: 10px;
  }

  .sticky-col {
    position: sticky;
    left: 0;
    background: #fff;
    z-index: 1;
  }
  .sticky-col:nth-child(2) {
    left: 70px;
  }
  .sticky-col:nth-child(3) {
    left: 170px;
  }

  tfoot .summary {
    background: #f8fafc;
    font-weight: 600;
  }
}

.table-actions {
  display: flex;
  justify-content: center;
  padding: 6px 0 2px;

  .btn.print {
    padding: 6px 22px;
    border-radius: 4px;
    border: 1px solid #c7c7c7;
    background: #e9ecef;
    cursor: pointer;
    font-weight: 600;
  }
}
</style>
