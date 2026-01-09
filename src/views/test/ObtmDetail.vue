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
            <label>텍스트입력 <span class="required">*</span></label>
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
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import DataTable, { type TableColumn } from "@/components/common/DataTable.vue";

interface Props {
  obtmItem?: Record<string, unknown> | null;
}

const props = withDefaults(defineProps<Props>(), {
  obtmItem: null,
});

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

const handleSave = () => {
  // TODO: 저장 로직 구현
  console.log("저장", formData.value);
};

defineExpose({
  handleSave,
  formData,
});
</script>

<style scoped lang="scss">
.obtm-detail-page {
  padding: 0;
  height: auto;
  overflow-y: visible;
  background: transparent;
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

.right-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  border: 1px solid $border-color;
  background: #ffffff;
  padding: $spacing-lg;
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
</style>
