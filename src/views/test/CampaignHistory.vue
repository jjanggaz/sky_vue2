<template>
  <div class="campaign-history-page">
    <!-- 헤더 -->
    <div class="modal-header">
      <h3>상담이력상세</h3>
      <button class="btn-close" @click="handleClose">×</button>
    </div>

    <!-- 컨텐츠 영역 -->
    <div class="modal-content">
      <!-- 상담 분류 섹션 -->
      <div class="section">
        <div class="form-row single-line">
          <div class="form-group inline">
            <label>고객접점채널</label>
            <div class="display-box">캠페인</div>
          </div>
          <div class="form-group inline wide">
            <div class="display-box">전월 TV 단독 설치</div>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group third-width">
            <label>상담유형(대)</label>
            <div class="display-box">캠페인 - 3002</div>
          </div>
          <div class="form-group third-width">
            <label>상담중분류</label>
            <div class="display-box">긍정반응</div>
          </div>
          <div class="form-group third-width">
            <label>상담소분류</label>
            <div class="display-box">가족과 상의</div>
          </div>
        </div>
      </div>

      <!-- 상담내용 섹션 -->
      <div class="section">
        <div class="form-group full-width">
          <label>상담내용</label>
          <textarea class="display-textarea" readonly></textarea>
        </div>
      </div>

      <!-- 고객 및 상담원 정보 섹션 -->
      <div class="section">
        <div class="form-row">
          <div class="form-group">
            <label>상담고객분류</label>
            <div class="display-box">본인</div>
          </div>
          <div class="form-group">
            <label>상담고객명</label>
            <div class="display-box">오지현</div>
          </div>
          <div class="form-group checkbox-group">
            <input type="checkbox" id="special-note" disabled />
            <label for="special-note">특이사항</label>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>상담고객 전화번호</label>
            <div class="display-box">010-</div>
          </div>
          <div class="form-group">
            <label>상담일시</label>
            <div class="display-box">2025-02-14 17:33</div>
          </div>
          <div class="form-group checkbox-group">
            <input type="checkbox" id="discount-refund" disabled />
            <label for="discount-refund">감액환불</label>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <label>접수센터명</label>
            <div class="display-box">고객센터(수원)</div>
          </div>
          <div class="form-group">
            <label>상담원명</label>
            <div class="display-box">문도현 (600753)</div>
          </div>
        </div>

        <div class="form-row">
          <div class="form-group">
            <div class="display-box empty"></div>
          </div>
          <div class="form-group">
            <div class="display-box empty"></div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(["close"]);

const handleClose = () => {
  emit("close");
};
</script>

<style scoped lang="scss">
.campaign-history-page {
  display: flex;
  flex-direction: column;
  height: auto; // 내용에 맞게 높이 조절
  max-height: 100%;
  background: #fff;
  overflow: hidden;
  width: 100%;
  box-sizing: border-box;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background: #4fd1c7; // 밝은 청록색
  border-bottom: none;
  flex-shrink: 0;
  box-sizing: border-box;

  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: 600;
    color: #fff;
  }

  .btn-close {
    width: 32px;
    height: 32px;
    border: none;
    background: transparent;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
      border-radius: 4px;
    }
  }
}

.modal-content {
  flex: 0 1 auto; // 내용에 맞게 크기 조절
  padding: 20px;
  overflow-y: auto;
  max-height: calc(90vh - 120px); // 헤더와 푸터 공간 제외
}

.section {
  margin-bottom: 20px;

  &:last-child {
    margin-bottom: 0;
  }
}

.form-row {
  display: flex;
  gap: 15px;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }
}

.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;

  &.wide {
    flex: 2;
  }

  &.full-width {
    width: 100%;
  }

  &.half-width {
    flex: 0 0 calc(50% - 7.5px); // 50% 폭, gap 고려
    max-width: calc(50% - 7.5px);
  }

  &.third-width {
    flex: 0 0 calc(33.333% - 10px); // 3개를 1라인에, gap 고려
    max-width: calc(33.333% - 10px);
  }

  &.inline {
    flex-direction: row;
    align-items: center;
    gap: 10px;

    label {
      white-space: nowrap;
      margin: 0;
    }

    .display-box {
      flex: 1;
    }
  }

  &.checkbox-group {
    flex-direction: row;
    align-items: center;
    gap: 8px;

    input[type="checkbox"] {
      width: 16px;
      height: 16px;
      cursor: not-allowed;
    }

    label {
      margin: 0;
      font-size: 13px;
      font-weight: 500;
      color: #333;
      cursor: not-allowed;
    }
  }

  label {
    font-size: 13px;
    font-weight: 600;
    color: #333;
  }

  .display-box {
    padding: 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: #f9f9f9;
    font-size: 13px;
    color: #333;
    min-height: 36px;
    display: flex;
    align-items: center;

    &.empty {
      background: #fff;
    }
  }

  .display-textarea {
    padding: 10px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    background: #f9f9f9;
    font-size: 13px;
    color: #333;
    min-height: 120px;
    resize: vertical;
    font-family: inherit;
    line-height: 1.5;
  }
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;
  border-top: none;
  background: #fff;
  flex-shrink: 0;
  box-sizing: border-box;

  .btn-close-footer {
    padding: 8px 20px;
    background: #e5e7eb;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    font-size: 13px;
    font-weight: 500;
    color: #333;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: #d1d5db;
    }
  }
}
</style>
