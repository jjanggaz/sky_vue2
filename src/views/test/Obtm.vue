<template>
  <div class="obtm-detail-page">
    <div class="page-layout">
      <!-- 왼쪽 패널 -->
      <div class="left-panel">
        <div class="title-header">OBTM DB 등록</div>
        
        <div class="form-section">
          <div class="form-item">
            <label>캠페인ID</label>
            <input
              v-model="formData.campaignId"
              type="text"
              class="form-input"
              placeholder="캠페인ID"
            />
          </div>

          <div class="form-item">
            <label>캠페인명</label>
            <input
              v-model="formData.campaignName"
              type="text"
              class="form-input"
              placeholder="캠페인명"
            />
          </div>
        </div>

        <div class="customer-list-section">
          <div class="list-header">고객번호; 스페셜 DB 여부</div>
          <textarea
            v-model="customerListText"
            class="customer-textarea"
            placeholder="고객번호; 스페셜 DB 여부 형식으로 입력하세요&#10;예: 0001234568; 우선"
            @input="updateCustomerList"
          ></textarea>
        </div>
      </div>

      <!-- 오른쪽 패널 -->
      <div class="right-panel">
        <div class="title-header">SMS 그룹추가</div>

        <div class="form-section">
          <div class="form-item">
            <label>그룹명 <span class="required">*</span></label>
            <input
              v-model="formData.groupName"
              type="text"
              class="form-input"
              placeholder="그룹명"
            />
          </div>

          <div class="form-item">
            <label>그룹설명</label>
            <input
              v-model="formData.groupDescription"
              type="text"
              class="form-input"
              placeholder="그룹설명"
            />
          </div>

          <div class="form-item">
            <label class="label-with-upload">
              <span>텍스트입력 <span class="required">*</span></span>
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
            </label>
            <textarea
              v-model="formData.textInput"
              class="form-textarea"
              placeholder="전화번호:청구계정번호:이름 형식으로 입력하세요"
              rows="10"
            ></textarea>
          </div>

          <div class="input-info">
            <p class="info-text">
              * 입력형식 : 전화번호; 청구계정번호;예약어1;예약어2; _예약어7까지
            </p>
            <p class="info-text">* 15000건까지 붙여넣기 가능합니다.</p>
            <button class="btn-validate" @click="handleValidate">데이터검증</button>
          </div>
        </div>

        <div class="validation-section">
          <div class="section-title">데이터검증결과</div>
          <div class="table-wrapper">
            <DataTable
              :columns="validationColumns"
              :data="validationData"
              :loading="validationLoading"
              :selectable="false"
              row-key="id"
            />
          </div>
          <div class="validation-summary">
            <span>전체 항목: {{ validationData.length }}</span>
            <span>[실패 : {{ failedCount }} / 전체: {{ validationData.length }}]</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 등록 버튼 -->
    <div class="save-button-container">
      <button class="btn-save" @click="handleSave">등록</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import DataTable, { type TableColumn } from "@/components/common/DataTable.vue";

const formData = ref({
  campaignId: "",
  campaignName: "",
  groupName: "전일AS캠페인",
  groupDescription: "",
  textInput: "",
});

const customerList = ref<Array<{ number: string; status: string }>>([]);
const customerListText = ref("0001234568; 우선\n0001234568; 일반\n0001234568; 우선\n0001234568; 일반");

const updateCustomerList = () => {
  const lines = customerListText.value.split("\n").filter((line) => line.trim());
  customerList.value = lines.map((line) => {
    const parts = line.split(";").map((part) => part.trim());
    return {
      number: parts[0] || "",
      status: parts[1] || "",
    };
  });
};

// 초기 데이터 로드
updateCustomerList();

const validationLoading = ref(false);
const validationData = ref<Record<string, unknown>[]>([]);

const validationColumns: TableColumn[] = [
  { key: "phone_number", title: "전화번호", width: "120px", sortable: false, align: "center" },
  { key: "billing_account", title: "청구계정번호", width: "140px", sortable: false, align: "center" },
  { key: "reserved1", title: "예약어1", width: "100px", sortable: false, align: "center" },
  { key: "reserved2", title: "예약어2", width: "100px", sortable: false, align: "center" },
  { key: "reserved3", title: "예약어3", width: "100px", sortable: false, align: "center" },
  { key: "reserved4", title: "예약어4", width: "100px", sortable: false, align: "center" },
  { key: "reserved5", title: "예약어5", width: "100px", sortable: false, align: "center" },
  { key: "reserved6", title: "예약어6", width: "100px", sortable: false, align: "center" },
  { key: "reserved7", title: "예약어7", width: "100px", sortable: false, align: "center" },
];

const failedCount = computed(() => {
  return validationData.value.filter((item) => item.status === "failed").length;
});

const handleValidate = () => {
  validationLoading.value = true;
  
  // 텍스트 입력 파싱
  const lines = formData.value.textInput.split("\n").filter((line) => line.trim());
  const parsedData: Record<string, unknown>[] = [];

  lines.forEach((line, index) => {
    const parts = line.split(":");
    parsedData.push({
      id: `validation_${index}`,
      phone_number: parts[0] || "",
      billing_account: parts[1] || "",
      reserved1: parts[2] || "",
      reserved2: parts[3] || "",
      reserved3: parts[4] || "",
      reserved4: parts[5] || "",
      reserved5: parts[6] || "",
      reserved6: parts[7] || "",
      reserved7: parts[8] || "",
      status: parts.length >= 3 ? "success" : "failed",
    });
  });

  setTimeout(() => {
    validationData.value = parsedData;
    validationLoading.value = false;
  }, 500);
};

const handleFileUpload = () => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".txt,.csv";
  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        formData.value.textInput = content;
      };
      reader.readAsText(file);
    }
  };
  input.click();
};

const handleSave = () => {
  // TODO: 저장 로직 구현
  console.log("저장", formData.value);
};
</script>

<style scoped lang="scss">
.obtm-detail-page {
  padding: $spacing-xl;
  height: calc(100vh - 70px);
  overflow-y: auto;
  background: #ffffff;
}

.page-layout {
  display: flex;
  gap: $spacing-lg;
  height: 100%;
}

.left-panel {
  width: 300px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  border: 1px solid $border-color;
  background: #ffffff;
  height: 100%;
  max-height: 90%;
}

.title-header {
  background-color: #4169e1;
  padding: $spacing-md;
  font-size: $font-size-sm;
  font-weight: 600;
  color: #ffffff;
  border-bottom: 1px solid $border-color;
}

.form-section {
  padding: $spacing-md;

  .form-item {
    margin-bottom: $spacing-md;

    label {
      display: block;
      font-size: $font-size-sm;
      font-weight: 600;
      color: $text-color;
      margin-bottom: $spacing-xs;

      .required {
        color: #dc3545;
      }
    }
  }
}

.input-with-dropdown {
  display: flex;
  align-items: center;
  position: relative;

  .form-input {
    flex: 1;
    padding-right: 30px;
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

.customer-list-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  border-top: 1px solid $border-color;
  min-height: 0;
  overflow: hidden;
}

.list-header {
  background-color: #4169e1;
  color: #ffffff;
  padding: $spacing-md;
  font-size: $font-size-sm;
  font-weight: 600;
}

.customer-textarea {
  flex: 1;
  width: 100%;
  min-height: 200px;
  padding: $spacing-sm;
  border: 1px solid $border-form;
  border-radius: 4px;
  font-size: $font-size-sm;
  background: #ffffff;
  outline: none;
  resize: none;
  transition: border 0.1s linear;
  font-family: inherit;
  overflow-y: auto;

  &:focus {
    border: 1px solid #279bd8;
  }

  &::placeholder {
    color: #767676;
  }
}

.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 1px solid $border-color;
  background: #ffffff;
  padding: $spacing-lg;
  max-height: 90%;
  overflow: auto;
}

.section-title {
  font-size: $font-size-lg;
  font-weight: 600;
  color: $text-color;
  margin-bottom: $spacing-md;
}

.form-input {
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
}

.input-info {
  margin-top: $spacing-md;

  .info-text {
    color: #dc3545;
    font-size: $font-size-sm;
    margin-bottom: $spacing-xs;
  }

  .btn-validate {
    padding: $spacing-sm $spacing-lg;
    background-color: #555555;
    color: #ffffff;
    border: none;
    border-radius: 4px;
    font-size: $font-size-base;
    font-weight: 600;
    cursor: pointer;
    min-width: 120px;
    height: 40px;
    margin-top: $spacing-sm;

    &:hover {
      background-color: #444444;
    }
  }
}

.validation-section {
  margin-top: $spacing-xl;
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
}

.table-wrapper {
  flex: 1;
  overflow: auto;
  border: 1px solid $border-color;
  margin-bottom: $spacing-md;
}

.validation-summary {
  display: flex;
  gap: $spacing-lg;
  font-size: $font-size-sm;
  color: $text-color;
}

.form-item .label-with-upload {
  display: inline-flex !important;
  align-items: center;
  gap: $spacing-sm;
  white-space: nowrap;
  margin-bottom: $spacing-xs;
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
  position: fixed;
  bottom: $spacing-lg;
  right: calc(#{$spacing-xl} + #{$spacing-lg});
  z-index: 1000;
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
