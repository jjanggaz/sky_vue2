<template>
  <div class="campaign-detail-page">
    <div class="form-container">
      <!-- 캠페인 정보 섹션 -->
      <div class="form-section">
        <dl class="form-grid">
          <dt>캠페인명</dt>
          <dd class="quarter-width">
            <input
              v-model="formData.campaignName"
              type="text"
              class="form-input edit"
              placeholder="캠페인명을 입력하세요"
            />
          </dd>

          <dt>캠페인ID</dt>
          <dd>
            <span class="auto-issue">자동발급</span>
          </dd>

          <dt>담당자 소속</dt>
          <dd class="quarter-width">
            <select v-model="formData.managerAffiliation" class="form-select">
              <option value="">선택하세요</option>
              <option value="dept1">부서1</option>
              <option value="dept2">부서2</option>
              <option value="dept3">부서3</option>
            </select>
          </dd>

          <dt>담당자명</dt>
          <dd class="quarter-width">
            <div class="input-with-icon">
              <input
                v-model="formData.managerName"
                type="text"
                class="form-input"
                placeholder="담당자명을 입력하세요"
              />
              <button class="search-icon-btn" type="button" @click="handleManagerSearch">
                <img :src="searchIcon" alt="검색" />
              </button>
            </div>
          </dd>

          <dt>시작일</dt>
          <dd class="quarter-width">
            <div class="input-with-icon">
              <input
                v-model="formData.startDate"
                type="date"
                class="form-input"
              />
              <button class="calendar-icon-btn" type="button">📅</button>
            </div>
          </dd>

          <dt>종료일</dt>
          <dd class="quarter-width">
            <div class="input-with-icon">
              <input
                v-model="formData.endDate"
                type="date"
                class="form-input"
              />
              <button class="calendar-icon-btn" type="button">📅</button>
            </div>
          </dd>
        </dl>
      </div>

      <!-- 타깃 고객군 설정 섹션 -->
      <div class="form-section">
        <h3 class="section-title">타깃 고객군 설정</h3>
        <dl class="category-grid">
          <div class="category-item">
            <dt>대분류</dt>
            <dd>
              <select v-model="formData.majorCategory" class="form-select category-select">
                <option value="">선택하세요</option>
                <option value="cat1">대분류1</option>
                <option value="cat2">대분류2</option>
                <option value="cat3">대분류3</option>
              </select>
            </dd>
          </div>

          <div class="category-item">
            <dt>중분류</dt>
            <dd>
              <select v-model="formData.middleCategory" class="form-select category-select">
                <option value="">선택하세요</option>
                <option value="subcat1">중분류1</option>
                <option value="subcat2">중분류2</option>
                <option value="subcat3">중분류3</option>
              </select>
            </dd>
          </div>

          <div class="category-item">
            <dt>소분류</dt>
            <dd>
              <select v-model="formData.minorCategory" class="form-select category-select">
                <option value="">선택하세요</option>
                <option value="detail1">소분류1</option>
                <option value="detail2">소분류2</option>
                <option value="detail3">소분류3</option>
              </select>
            </dd>
          </div>
        </dl>
      </div>

      <!-- 텍스트 영역 섹션 -->
      <div class="form-section">
        <dl class="form-grid textarea-grid">
          <dt>발송 메시지 입력</dt>
          <dd>
            <textarea
              v-model="formData.sendMessage"
              class="form-textarea"
              placeholder="발송 메시지를 입력하세요"
              rows="10"
            ></textarea>
          </dd>

          <dt>
            <div class="label-with-button-vertical">
              <span>고객번호 리스트 입력</span>
              <button class="btn btn-upload-icon" type="button" @click="handleFileUpload" title="파일 업로드">
                <svg class="ico-upload" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <!-- 문서 아이콘 -->
                  <path d="M6 2C5.44772 2 5 2.44772 5 3V21C5 21.5523 5.44772 22 6 22H18C18.5523 22 19 21.5523 19 21V8L14 3H6Z" fill="black"/>
                  <path d="M14 3V8H19" stroke="white" stroke-width="1" stroke-linecap="round" stroke-linejoin="round"/>
                  <!-- 문서 내부 선들 -->
                  <line x1="8" y1="11" x2="16" y2="11" stroke="white" stroke-width="1"/>
                  <line x1="8" y1="13" x2="16" y2="13" stroke="white" stroke-width="1"/>
                  <line x1="8" y1="15" x2="14" y2="15" stroke="white" stroke-width="1"/>
                  <line x1="8" y1="17" x2="12" y2="17" stroke="white" stroke-width="1"/>
                  <!-- 접힌 모서리 -->
                  <path d="M14 3L19 8H14V3Z" fill="white"/>
                  <!-- 오른쪽 하단 원과 화살표 -->
                  <circle cx="17" cy="19" r="3" fill="black"/>
                  <path d="M17 16.5V19M17 19L15.5 17.5M17 19L18.5 17.5" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </dt>
          <dd>
            <textarea
              v-model="formData.customerNumberList"
              class="form-textarea"
              placeholder="고객번호 리스트를 입력하세요"
              rows="10"
            ></textarea>
          </dd>

          <dt>문자내용 입력(선택입력)</dt>
          <dd>
            <textarea
              v-model="formData.textContent"
              class="form-textarea"
              placeholder="문자내용을 입력하세요 (선택사항)"
              rows="10"
            ></textarea>
          </dd>
        </dl>
      </div>

      <!-- 저장 버튼 -->
      <div class="save-button-container">
        <button class="btn-save" @click="handleSave">등록</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import searchIcon from "@/assets/images/common/ico_search.svg";

const formData = ref({
  campaignName: "",
  campaignId: "",
  managerAffiliation: "",
  managerName: "",
  startDate: "",
  endDate: "",
  majorCategory: "",
  middleCategory: "",
  minorCategory: "",
  sendMessage: "",
  customerNumberList: "",
  textContent: "",
});

const handleManagerSearch = () => {
  // TODO: 담당자 검색 로직 구현
  console.log("담당자 검색");
};

const handleFileUpload = () => {
  // TODO: 파일 업로드 로직 구현
  console.log("파일 업로드");
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".txt,.csv";
  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        formData.value.customerNumberList = content;
      };
      reader.readAsText(file);
    }
  };
  input.click();
};

const handleSave = () => {
  // TODO: 저장 로직 구현
  console.log("저장", formData.value);
  alert("저장되었습니다.");
};
</script>

<style scoped lang="scss">
.campaign-detail-page {
  padding: $spacing-xl;
  height: calc(100vh - 70px);
  overflow-y: auto;
  background: #ffffff;
}

.form-container {
  max-width: 100%;
  margin: 0;
  background: transparent;
  padding: 0;
  border: none;
  border-radius: 0;
}

.form-section {
  margin-bottom: $spacing-xxl;

  &:last-of-type {
    margin-bottom: 0;
  }

  .section-title {
    font-size: $font-size-lg;
    font-weight: 600;
    color: $text-color;
    margin-bottom: $spacing-lg;
  }
}

.form-grid {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: $spacing-md $spacing-lg;
  align-items: center;

  &.textarea-grid {
    align-items: start;

    dt {
      padding-top: $spacing-sm;
    }
  }

  dt {
    font-size: $font-size-base;
    font-weight: 600;
    color: $text-color;
    white-space: nowrap;

    .label-with-button {
      display: flex;
      align-items: center;
      gap: $spacing-xs;
      justify-content: space-between;
    }

    .label-with-button-vertical {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: $spacing-xs;
    }
  }

  dd {
    display: flex;
    align-items: center;
    gap: $spacing-xs;

    &.quarter-width {
      width: 25%;
      max-width: 25%;
    }
  }
}

.category-grid {
  display: flex;
  gap: $spacing-md;
  align-items: flex-start;

  .category-item {
    flex: 0 0 20%;
    display: flex;
    flex-direction: column;
    gap: $spacing-xs;

    dt {
      font-size: $font-size-base;
      font-weight: 600;
      color: $text-color;
      white-space: nowrap;
    }

    dd {
      display: flex;
      align-items: center;
      width: 100%;
    }
  }

  .category-select {
    width: 100%;
    flex: none;
  }
}

.form-input {
  flex: 1;
  width: 100%;
  height: 40px;
  padding: 0 $spacing-sm;
  border: 1px solid $border-form;
  border-radius: 4px;
  font-size: $font-size-base;
  background: #ffffff;
  outline: none;
  transition: border 0.1s linear;

  &:focus {
    border: 1px solid #279bd8;
  }

  &::placeholder {
    color: #767676;
  }
}

.form-select {
  flex: 1;
  width: 100%;
  height: 40px;
  padding: 0 32px 0 $spacing-sm;
  border: 1px solid $border-form;
  border-radius: 4px;
  font-size: $font-size-base;
  background: #ffffff;
  background-image: url(../../assets/icons/ico_select-down.svg);
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 12px auto;
  outline: none;
  cursor: pointer;
  appearance: none;
  transition: border 0.1s linear;

  &:focus {
    border: 1px solid #279bd8;
    background-image: url(../../assets/icons/ico_select-up.svg);
  }
}

.form-textarea {
  width: 100%;
  min-height: 200px;
  padding: $spacing-sm;
  border: 1px solid $border-form;
  border-radius: 4px;
  font-size: $font-size-base;
  background: #ffffff;
  outline: none;
  resize: vertical;
  transition: border 0.1s linear;
  font-family: inherit;

  &:focus {
    border: 1px solid #279bd8;
  }

  &::placeholder {
    color: #767676;
  }
}

.input-with-dropdown {
  display: flex;
  align-items: center;
  flex: 1;
  position: relative;

  .form-input {
    padding-right: 40px;
  }

  .dropdown-btn {
    position: absolute;
    right: 8px;
    width: 24px;
    height: 24px;
    border: none;
    background: transparent;
    color: #767676;
    font-size: 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.input-with-icon {
  display: flex;
  align-items: center;
  flex: 1;
  position: relative;

  .form-input {
    padding-right: 40px;
  }

  .search-icon-btn,
  .calendar-icon-btn {
    position: absolute;
    right: 8px;
    width: 24px;
    height: 24px;
    border: none;
    background: transparent;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;

    img {
      width: 16px;
      height: 16px;
    }
  }
}

.auto-issue {
  font-size: $font-size-base;
  color: $text-light;
  font-weight: 500;
}

.btn-upload-icon {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 32px;
  padding: 4px 8px;
  font-size: 12px;
  background-color: #3e435e;
  border: none;
  cursor: pointer;

  .ico-upload {
    width: 24px;
    height: 24px;
    display: block;
  }

  &:hover {
    background-color: #3c4973;
  }
}

.save-button-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 0;
  padding-top: 0;
}

.btn-save {
  padding: $spacing-sm $spacing-xxl;
  background-color: #555555;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: $font-size-base;
  font-weight: 600;
  cursor: pointer;
  min-width: 100px;
  height: 40px;
  transition: background-color 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  &:hover {
    background-color: #444444;
  }

  &:active {
    background-color: #333333;
  }
}
</style>
