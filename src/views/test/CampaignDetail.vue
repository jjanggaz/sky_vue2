<template>
  <div class="campaign-detail-page">
    <div class="form-container">
      <!-- 캠페인 정보 섹션 -->
      <div class="form-section">
        <dl class="form-grid">
          <dt>캠페인명</dt>
          <dd class="quarter-width">
            <div class="input-with-dropdown">
              <input
                v-model="formData.campaignName"
                type="text"
                class="form-input"
                placeholder="캠페인명을 입력하세요"
              />
              <button class="dropdown-btn" type="button">▼</button>
            </div>
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

          <dt>고객번호 리스트 입력</dt>
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

      <!-- 저장 버튼은 모달에서 제거 (모달 footer에서 처리) -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import searchIcon from "@/assets/images/common/ico_search.svg";

interface Props {
  campaignItem?: Record<string, unknown> | null;
}

const props = withDefaults(defineProps<Props>(), {
  campaignItem: null,
});

const emit = defineEmits<{
  save: [];
  close: [];
}>();

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

// 선택된 캠페인 항목이 있으면 폼 데이터에 채우기
watch(
  () => props.campaignItem,
  (item) => {
    if (item) {
      formData.value = {
        campaignName: (item.campaign_name as string) || "",
        campaignId: (item.campaign_id as string) || "",
        managerAffiliation: (item.manager_affiliation as string) || "",
        managerName: (item.manager_name as string) || "",
        startDate: (item.start_date as string) || "",
        endDate: (item.end_date as string) || "",
        majorCategory: "",
        middleCategory: "",
        minorCategory: "",
        sendMessage: "",
        customerNumberList: "",
        textContent: "",
      };
    } else {
      // 등록 모드일 때 폼 초기화
      formData.value = {
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
      };
    }
  },
  { immediate: true }
);

const handleSave = () => {
  // TODO: 저장 로직 구현
  console.log("저장", formData.value);
  emit("save");
};

// 부모 컴포넌트에서 접근 가능하도록 expose
defineExpose({
  handleSave,
  formData,
});
</script>

<style scoped lang="scss">
.campaign-detail-page {
  padding: 0;
  height: auto;
  overflow-y: visible;
  background: transparent;
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

.form-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: $spacing-xxl;
  padding-top: $spacing-lg;
  border-top: 1px solid $border-color;
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

  &:hover {
    background-color: #444444;
  }

  &:active {
    background-color: #333333;
  }
}
</style>
