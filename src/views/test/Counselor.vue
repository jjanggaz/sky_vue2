<template>
  <div class="counselor-page">
    <div class="page-layout" :class="{ 'detail-open': isDetailOpen && (activeTab === 'campaign' || activeTab === 'campaignEdit') }">
      <div class="main-content-area">
    <!-- 상단 헤더 -->
    <div class="top-header">
      <div class="header-left">
        <div class="logo">kt skylife</div>
        <div class="search-section">
          <input type="text" class="search-input" placeholder="Q 화면번호" />
          <input type="text" class="search-input" placeholder="성명/생년월일" />
        </div>
      </div>
      <div class="status-boxes">
        <div class="status-box">
          <div class="status-label">금일처리</div>
          <div class="status-value">0건</div>
        </div>
        <div class="status-box">
          <div class="status-label">미처리</div>
          <div class="status-value">0건</div>
        </div>
        <div class="status-box">
          <div class="status-label">O/B 스케줄</div>
          <div class="status-value">0건</div>
        </div>
      </div>
    </div>

    <div class="main-layout">
      <!-- 좌측 사이드바 -->
      <div class="left-sidebar">
        <div class="user-section">
          <div class="user-name">오지</div>
          <div class="user-actions">
            <span class="icon">+</span>
            <span class="icon">×</span>
          </div>
          <div class="user-full-name">오지현 [외]</div>
        </div>
        <div class="nav-icons">
          <div class="nav-icon" title="Home">🏠</div>
          <div class="nav-icon" title="Assist">💬</div>
          <div class="nav-icon" title="Chat">💭</div>
          <div class="nav-icon" title="KMS">📝</div>
          <div class="nav-icon" title="Note">📄</div>
          <div class="nav-icon" title="Notice">🔔</div>
          <div class="nav-icon" title="SCIS">🔍</div>
          <div class="nav-icon" title="Settings">⚙️</div>
        </div>
      </div>

      <!-- 메인 콘텐츠 영역 -->
      <div class="main-content">
        <!-- 고객 정보 섹션 -->
        <div class="customer-info-section">
          <div class="customer-info-grid">
            <div class="info-row">
              <div class="info-group">
                <label>고객명</label>
                <input type="text" />
                <button class="btn-interest">관심</button>
              </div>
              <div class="info-group">
                <label>전화</label>
                <input type="text" />
              </div>
              <div class="info-group">
                <label>생년월일</label>
                <input type="text" />
                <button class="btn-small">CI추가</button>
              </div>
              <div class="info-group">
                <label>고객구분</label>
                <input type="text" value="개인" />
              </div>
            </div>
            <div class="info-row">
              <div class="info-group">
                <button class="btn-service">TV/인터넷/결함</button>
              </div>
              <div class="info-group">
                <label>회사전화</label>
                <input type="text" />
              </div>
              <div class="info-group">
                <label>이메일</label>
                <input type="text" />
              </div>
            </div>
            <div class="info-row">
              <div class="info-group">
                <label>AS미처 유통 요금클레리</label>
                <div class="as-status">
                  <span>0</span>
                  <span>0</span>
                  <span>0</span>
                </div>
              </div>
              <div class="info-group wide">
                <label>고객분류/인센티브</label>
                <input type="text" value="0709_전일AS완료 문자발송고객" />
              </div>
              <div class="info-group">
                <label>등록일자</label>
                <input type="text" value="2024-11-08" />
              </div>
            </div>
            <div class="info-row">
              <div class="info-group">
                <label>고객성향</label>
                <input type="text" />
                <button class="btn-small">성향내용</button>
              </div>
              <div class="info-group wide">
                <label>고객유형 메모</label>
                <input type="text" />
              </div>
              <div class="info-group">
                <button class="btn-save">저장</button>
              </div>
            </div>
            <div class="info-row">
              <div class="consent-group">
                <label><input type="checkbox" checked /> TM동의여부</label>
                <label><input type="checkbox" checked /> SMS동의여부</label>
                <label><input type="checkbox" checked /> 이메일동의여부</label>
              </div>
            </div>
            <div class="info-row">
              <div class="info-group">
                <label>우편번호</label>
                <input type="text" value="03926" />
              </div>
              <div class="info-group wide">
                <label>주소1</label>
                <input type="text" value="서울 마포구 매봉산로 75 DDMC 8층 스카이라이프" />
                <span class="refresh-icon">🔄</span>
              </div>
            </div>
            <div class="info-row">
              <div class="info-group">
                <label>헤지스코어</label>
                <input type="text" value="0" />
              </div>
              <div class="info-group">
                <label>앱사용여부</label>
                <input type="text" value="Y" />
              </div>
              <div class="info-group">
                <label>목소리인증 동의</label>
                <input type="text" value="N" />
              </div>
              <div class="info-group">
                <label>목소리인증 등록</label>
                <input type="text" value="N" />
              </div>
              <div class="info-group">
                <label>목소리인증 진행상태</label>
                <input type="text" />
              </div>
              <div class="info-group">
                <button class="btn-small">모바일 FAX</button>
              </div>
            </div>
          </div>
        </div>

        <!-- 탭페이지와 테스트 텍스트 DIV를 나란히 배치하는 영역 -->
        <div class="bottom-section">
          <!-- 왼쪽: 서비스 카테고리 -->
          <div class="middle-spacer">
            <div class="service-categories">
              <div class="category-section">
                <div class="category-header expanded">
                  <span>TV (1/1)</span>
                  <span>▼</span>
                </div>
                <div class="category-content">
                  <div class="service-item">
                    <div class="service-detail">정 0017329341/오지*/0007635104/152040638489/DCS/일반</div>
                    <div class="service-fields">
                      <div><label>가입계약번호:</label> <span>0017329341</span></div>
                      <div><label>가입계약명:</label> <span>오지*</span></div>
                      <div><label>청구계정번호:</label> <span>0007635104</span></div>
                      <div><label>SC_ID:</label> <span>152040638489</span></div>
                      <div><label>수신방식:</label> <span>DCS</span></div>
                      <div><label>가입유형:</label> <span>일반</span></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="category-section">
                <div class="category-header">
                  <span>인터넷 (1/1)</span>
                  <span>▶</span>
                </div>
              </div>
              <div class="category-section">
                <div class="category-header">
                  <span>결합 (1/1)</span>
                  <span>▶</span>
                </div>
              </div>
              <div class="category-section">
                <div class="category-header">
                  <span>가전결합 (0/0)</span>
                  <span>▶</span>
                </div>
              </div>
              <div class="category-section">
                <div class="category-header">
                  <span>MVNO (0/5)</span>
                  <span>▶</span>
                </div>
              </div>
              <div class="category-section">
                <div class="category-header">
                  <span>AI스포츠 (0/0)</span>
                  <span>▶</span>
                </div>
              </div>
              
              <!-- 청구 정보 -->
              <div class="billing-info">
                <div class="billing-item">
                  <label>당원청구</label>
                  <div class="billing-amount">31,898 원</div>
                </div>
                <div class="billing-item">
                  <label>총미납액</label>
                  <div class="billing-amount">0원</div>
                </div>
                <div class="billing-item">
                  <label>실시간요금</label>
                  <div class="billing-row">
                    <span>0원</span>
                    <button class="btn-fetch">가져오기</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- 탭 및 서비스 정보 섹션 -->
          <div class="service-section">
          <!-- 탭 -->
          <div class="tabs">
            <div class="tab" :class="{ active: activeTab === 'contract' }" @click="activeTab = 'contract'">계약기본정보</div>
            <div class="tab" :class="{ active: activeTab === 'campaign' }" @click="activeTab = 'campaign'">캠페인</div>
            <div class="tab" :class="{ active: activeTab === 'campaignEdit' }" @click="activeTab = 'campaignEdit'">캠페인(수정)</div>
            <div class="tab" :class="{ active: activeTab === 'address' }" @click="activeTab = 'address'">실주소 <span class="badge">2</span></div>
            <div class="tab" :class="{ active: activeTab === 'billing' }" @click="activeTab = 'billing'">청구이력 <span class="badge">3</span></div>
            <div class="tab" :class="{ active: activeTab === 'reception' }" @click="activeTab = 'reception'">접수이력</div>
            <div class="tab" :class="{ active: activeTab === 'as' }" @click="activeTab = 'as'">A/S접수이력</div>
            <div class="tab" :class="{ active: activeTab === 'order' }" @click="activeTab = 'order'">설치오더정보</div>
          </div>

          <div class="tab-content">
            <!-- 왼쪽 공백 영역 (캠페인 탭 제외) -->
            <div class="tab-left-spacer" v-if="activeTab !== 'campaign' && activeTab !== 'campaignEdit'"></div>

            <!-- 계약기본정보 탭 -->
            <div v-if="activeTab === 'contract'" class="tab-panel contract-tab">
              <div class="center-text">계약기본정보 출력</div>
            </div>

            <!-- 캠페인 탭 -->
            <template v-else-if="activeTab === 'campaign'">
            <!-- 캠페인 테이블 -->
            <div class="campaign-table-section" :class="{ 'with-detail': isDetailOpen }">
              <table class="campaign-table">
                <thead>
                  <tr>
                    <th>시행일</th>
                    <th>캠페인명</th>
                    <th>말할거리</th>
                    <th colspan="5">직전 이력</th>
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
                    <td>20250717</td>
                    <td>
                      전일 TV AS 완료
                      <button class="btn-view-msg">받은 문자 보기</button>
                    </td>
                    <td class="talking-points">폭우, 폭설 날씨 궂어도 끄떡없이 깔끔하게 TV 보세요 하나카드 두 달 간 실적 없이도 13,000원 할인, 26,000원 챙겨가세요</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td class="checked">✓</td>
                  </tr>
                  <tr>
                    <td>20250701</td>
                    <td>
                      전월 TV 단독 설치
                      <button class="btn-view-msg">받은 문자 보기</button>
                    </td>
                    <td class="talking-points">TV 하나만 보시던 가격보다 저렴하게 인터넷+기가와이파이까지 하나카드 두 달 간 실적 없이도 13,000원 할인, 26,000원 챙겨가세요</td>
                    <td></td>
                    <td></td>
                    <td class="checked">✓</td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>20250623</td>
                    <td>
                      대구 경북 지역 타깃
                      <button class="btn-view-msg">받은 문자 보기</button>
                    </td>
                    <td class="talking-points">계신 지역이 너무 좋은 지역이라서, 안테나 없이 TV 보세요 하나카드 두 달 간 실적 없이도 13,000원 할인, 26,000원 챙겨가세요</td>
                    <td class="checked">✓</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
            </template>

            <!-- 캠페인(수정) 탭 -->
            <template v-else-if="activeTab === 'campaignEdit'">
            <!-- 캠페인 테이블 -->
            <div class="campaign-table-section" :class="{ 'with-detail': isDetailOpen }">
              <table class="campaign-table campaign-edit-table">
                <thead>
                  <tr>
                    <th class="text-center">시행일</th>
                    <th>캠페인명</th>
                    <th class="equal-width">말할거리</th>
                    <th class="equal-width">받은문자내용</th>
                    <th class="text-center">직전이력</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="text-center">20250717</td>
                    <td>전일 TV AS 완료</td>
                    <td class="talking-points">폭우, 폭설 날씨 궂어도 끄떡없이 깔끔하게 TV 보세요 하나카드 두 달 간 실적 없이도 13,000원 할인, 26,000원 챙겨가세요</td>
                    <td class="sms-content">안녕하세요. 스카이라이프입니다. 전일 TV AS 완료 관련하여 연락드립니다. 추가 문의사항이 있으시면 고객센터로 연락주시기 바랍니다.</td>
                    <td class="text-center">권유못함</td>
                  </tr>
                  <tr>
                    <td class="text-center">20250701</td>
                    <td>전월 TV 단독 설치</td>
                    <td class="talking-points">TV 하나만 보시던 가격보다 저렴하게 인터넷+기가와이파이까지 하나카드 두 달 간 실적 없이도 13,000원 할인, 26,000원 챙겨가세요</td>
                    <td class="sms-content">스카이라이프 고객님께 안내드립니다. 전월 TV 단독 설치 고객님을 위한 특별 혜택이 준비되어 있습니다. 자세한 내용은 고객센터로 문의해주세요.</td>
                    <td class="text-center">보류</td>
                  </tr>
                  <tr>
                    <td class="text-center">20250623</td>
                    <td>대구 경북 지역 타깃</td>
                    <td class="talking-points">계신 지역이 너무 좋은 지역이라서, 안테나 없이 TV 보세요 하나카드 두 달 간 실적 없이도 13,000원 할인, 26,000원 챙겨가세요</td>
                    <td class="sms-content">대구 경북 지역 고객님께 특별한 혜택을 안내드립니다. 안테나 없이도 깨끗한 TV 시청이 가능합니다. 하나카드 할인 혜택도 함께 제공됩니다.</td>
                    <td class="text-center">성공</td>
                  </tr>
                </tbody>
              </table>
            </div>
            </template>
          </div>
        </div>
          </div>
        </div>
      </div>
    </div>

      <!-- 우측 상세 패널 (Pipe.vue 스타일) -->
      <div v-if="(activeTab === 'campaign' || activeTab === 'campaignEdit') && isDetailOpen" class="detail-panel">
        <div class="detail-panel-body">
          <CounselorDetail />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import CounselorDetail from "./CounselorDetail.vue";

const activeTab = ref("contract");
const isDetailOpen = ref(false);

// 캠페인 탭 선택 시 패널 자동 열기
watch(activeTab, (newTab) => {
  if (newTab === "campaign" || newTab === "campaignEdit") {
    isDetailOpen.value = true;
  } else {
    isDetailOpen.value = false;
  }
});
</script>

<style scoped lang="scss">
.counselor-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
}

.top-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background: #ffffff;
  border-bottom: 1px solid #ddd;

  .header-left {
    display: flex;
    align-items: center;
    gap: 20px;

    .logo {
      font-size: 18px;
      font-weight: bold;
      color: #333;
    }

    .search-section {
      display: flex;
      gap: 10px;

      .search-input {
        padding: 6px 12px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 14px;
        width: 150px;
      }
    }
  }

  .status-boxes {
    display: flex;
    gap: 15px;

    .status-box {
      padding: 8px 15px;
      border: 1px solid #ddd;
      border-radius: 4px;
      text-align: center;

      .status-label {
        font-size: 12px;
        color: #666;
      }

      .status-value {
        font-size: 14px;
        font-weight: bold;
        color: #333;
      }
    }
  }
}

.main-layout {
  display: flex;
  flex: 1;
  overflow: hidden;
  position: relative;
}

.bottom-section {
  display: flex;
  flex: 1;
  overflow: hidden;
  min-height: 0;
}

.middle-spacer {
  width: 350px;
  flex-shrink: 0;
  background: #f8f9fa;
  border-right: 1px solid #ddd;
  overflow-y: auto;
  position: relative;
  z-index: 1;

  .service-categories {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    background: #f8f9fa;
  }
}

.left-sidebar {
  width: 80px;
  background: #2c3e50;
  color: #fff;
  padding: 20px 10px;

  .user-section {
    text-align: center;
    margin-bottom: 30px;

    .user-name {
      font-size: 18px;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .user-actions {
      display: flex;
      justify-content: center;
      gap: 10px;
      margin-bottom: 10px;

      .icon {
        cursor: pointer;
        font-size: 20px;
      }
    }

    .user-full-name {
      font-size: 12px;
      color: #bbb;
    }
  }

  .nav-icons {
    display: flex;
    flex-direction: column;
    gap: 15px;

    .nav-icon {
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #34495e;
      border-radius: 8px;
      cursor: pointer;
      font-size: 24px;

      &:hover {
        background: #4a5f7f;
      }
    }
  }
}

.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

.customer-info-section {
  background: #fff;
  padding: 15px;
  border-bottom: 2px solid #ddd;
}

.customer-info-grid {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .info-row {
    display: flex;
    gap: 15px;
    align-items: center;
    flex-wrap: wrap;

    .info-group {
      display: flex;
      align-items: center;
      gap: 8px;

      label {
        font-size: 13px;
        font-weight: 500;
        white-space: nowrap;
        min-width: 80px;
      }

      input {
        padding: 5px 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 13px;
        min-width: 120px;
      }

      &.wide {
        flex: 1;
        min-width: 200px;
      }
    }

    .btn-interest,
    .btn-service,
    .btn-save {
      padding: 6px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 13px;
    }

    .btn-interest {
      background: #ff6b6b;
      color: #fff;
    }

    .btn-service {
      background: #4ecdc4;
      color: #fff;
    }

    .btn-save {
      background: #3498db;
      color: #fff;
    }

    .btn-small {
      padding: 4px 10px;
      font-size: 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: #fff;
      cursor: pointer;
    }

    .consent-group {
      display: flex;
      gap: 20px;

      label {
        display: flex;
        align-items: center;
        gap: 5px;
        font-size: 13px;
      }
    }

    .as-status {
      display: flex;
      gap: 10px;

      span {
        padding: 4px 8px;
        background: #f0f0f0;
        border-radius: 4px;
        font-size: 13px;
      }
    }

    .refresh-icon {
      cursor: pointer;
      font-size: 16px;
    }
  }
}

.service-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #fff;
}

.tabs {
  display: flex;
  border-bottom: 2px solid #3498db;
  background: #f8f9fa;

  .tab {
    padding: 12px 20px;
    cursor: pointer;
    border-bottom: 3px solid transparent;
    font-size: 14px;
    position: relative;

    &.active {
      background: #fff;
      border-bottom-color: #3498db;
      font-weight: 600;
    }

    .badge {
      display: inline-block;
      background: #e74c3c;
      color: #fff;
      border-radius: 10px;
      padding: 2px 6px;
      font-size: 11px;
      margin-left: 5px;
    }
  }
}

.tab-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.tab-left-spacer {
  width: 80px;
  flex-shrink: 0;
  background: #fff;
}

.service-categories {
  width: 350px;
  border-right: 1px solid #ddd;
  overflow-y: auto;
  background: #f8f9fa;
}

.category-section {
  border-bottom: 1px solid #ddd;

  .category-header {
    padding: 12px 15px;
    background: #e9ecef;
    display: flex;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    font-weight: 600;
    font-size: 14px;

    &.expanded {
      background: #dee2e6;
    }
  }

  .category-content {
    padding: 10px 15px;
    background: #fff;

    .service-item {
      .service-detail {
        font-size: 12px;
        color: #666;
        margin-bottom: 8px;
      }

      .service-fields {
        display: flex;
        flex-direction: column;
        gap: 5px;
        font-size: 12px;

        label {
          font-weight: 600;
          margin-right: 5px;
        }
      }
    }
  }
}

.billing-info {
  padding: 15px;
  background: #fff;
  border-top: 2px solid #ddd;

  .billing-item {
    margin-bottom: 10px;

    label {
      font-size: 13px;
      font-weight: 600;
      display: block;
      margin-bottom: 5px;
    }

    .billing-amount {
      font-size: 16px;
      font-weight: bold;
      color: #333;
    }

    .billing-row {
      display: flex;
      align-items: center;
      gap: 10px;

      .btn-fetch {
        padding: 4px 10px;
        font-size: 12px;
        border: 1px solid #3498db;
        border-radius: 4px;
        background: #fff;
        color: #3498db;
        cursor: pointer;
      }
    }
  }
}

.campaign-table-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.search-bar {
  padding: 10px 15px;
  border-bottom: 1px solid #ddd;
  display: flex;
  align-items: center;
  gap: 15px;

  .home-link {
    font-size: 14px;
    color: #3498db;
    cursor: pointer;
  }

  .integrated-search {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;

    .logo-small {
      font-size: 12px;
      color: #666;
    }

    input {
      flex: 1;
      border: none;
      outline: none;
      font-size: 13px;
    }

    .search-icons {
      display: flex;
      gap: 8px;
      cursor: pointer;
    }
  }
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
          text-align: center;
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
        padding: 12px 10px;
        border: 1px solid #ddd;
        vertical-align: top;

        &.talking-points {
          max-width: 400px;
          line-height: 1.5;
        }

        &.sms-content {
          line-height: 1.5;
        }

        &.checked {
          text-align: center;
          color: #27ae60;
          font-weight: bold;
        }
      }
    }
  }

  &.campaign-edit-table {
    th.equal-width {
      width: 25%;
    }

    th.text-center,
    td.text-center {
      text-align: center;
    }

    td.talking-points,
    td.sms-content {
      width: 25%;
      max-width: none;
    }
  }

  .btn-view-msg {
    margin-left: 10px;
    padding: 4px 10px;
    font-size: 11px;
    border: 1px solid #3498db;
    border-radius: 4px;
    background: #fff;
    color: #3498db;
    cursor: pointer;
  }
}

.contract-tab {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;

  .center-text {
    font-size: 24px;
    font-weight: 600;
    color: #333;
  }
}

.campaign-table-section {
  transition: margin-right 0.3s ease;
}

// Pipe.vue 스타일 상세 패널
.page-layout {
  display: grid;
  height: 100%;
  width: 100%;
  overflow: hidden;
  gap: 10px;
  grid-template-columns: 1fr;
  transition: grid-template-columns 0.3s ease;

  &.detail-open {
    grid-template-columns: 1.2fr 0.8fr; // 캠페인 탭 내용이 더 넓게 표시
  }
}

.main-content-area {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-width: 0;
}

.detail-panel {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-left: 1px solid #e7e6ed;
  overflow: hidden;

  .detail-panel-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px 20px;
    border-bottom: 2px solid #3498db;
    background: #f8f9fa;
    flex-shrink: 0;

    .detail-panel-head {
      display: flex;
      align-items: center;
      gap: 12px;

      h3 {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
        color: #333;
      }
    }

    .btn-close {
      width: 32px;
      height: 32px;
      border: none;
      background: transparent;
      cursor: pointer;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 4px;
      transition: background 0.2s;

      &:hover {
        background: #e9ecef;
      }

      &::before,
      &::after {
        content: "";
        position: absolute;
        width: 16px;
        height: 2px;
        background: #666;
        border-radius: 1px;
      }

      &::before {
        transform: rotate(45deg);
      }

      &::after {
        transform: rotate(-45deg);
      }
    }
  }

  .detail-panel-body {
    flex: 1;
    overflow: auto;
  }
}
</style>
