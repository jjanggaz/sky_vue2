# 🎨 SKY TEST 컴포넌트 자산 가이드

## 📁 폴더 구조

```
src/assets/
├── images/                    # 🖼️ 이미지 자산
│   ├── components/           # 컴포넌트별 이미지
│   │   ├── buttons/         # 버튼 관련 이미지
│   │   ├── cards/           # 카드 컴포넌트용
│   │   ├── forms/           # 폼 관련 이미지
│   │   └── navigation/      # 네비게이션용
│   ├── pages/               # 페이지별 이미지
│   │   ├── dashboard/       # 대시보드 페이지
│   │   ├── models/          # 3D 모델 관리
│   │   ├── projects/        # 프로젝트 관리
│   │   └── users/           # 사용자 관리
│   └── common/              # 공통 이미지
│       ├── placeholders/    # 플레이스홀더
│       ├── illustrations/   # 일러스트
│       └── backgrounds/     # 배경 이미지
├── icons/                    # 🎯 아이콘 자산
│   ├── navigation/          # 네비게이션 아이콘
│   ├── ui/                  # UI 아이콘
│   └── status/              # 상태 아이콘
└── vue.svg                  # 기본 Vue 로고
```

## 🔧 사용 방법

### 1. Vue 컴포넌트에서 import 사용

```vue
<script setup lang="ts">
import placeholderImg from '@/assets/images/common/placeholder.svg'
import dashboardIcon from '@/assets/icons/navigation/dashboard.svg'
import loadingImg from '@/assets/images/common/loading.gif'
</script>

<template>
  <div class="component">
    <img :src="placeholderImg" alt="Placeholder" />
    <img :src="dashboardIcon" alt="Dashboard" />
    <img :src="loadingImg" alt="Loading" />
  </div>
</template>
```

### 2. CSS/SCSS에서 사용

```scss
.hero-section {
  background-image: url('@/assets/images/pages/dashboard/hero-bg.png');
}

.icon-button {
  background-image: url('@/assets/icons/ui/plus.svg');
}
```

### 3. 동적 import (조건부 로딩)

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'

const imageType = ref('placeholder')

const dynamicImage = computed(() => {
  return new URL(`../assets/images/common/${imageType.value}.svg`, import.meta.url).href
})
</script>
```

## 📝 파일 네이밍 규칙

### 이미지 파일
- **kebab-case** 사용
- 의미있는 이름 사용
- 예: `no-data-placeholder.svg`, `user-avatar-default.png`

### 아이콘 파일
- **동사-명사** 형태
- 예: `add-user.svg`, `edit-item.svg`, `delete-confirm.svg`

## 🎯 SKY TEST 프로젝트 전용 자산

### 네비게이션 아이콘
- `dashboard.svg` - 대시보드
- `project.svg` - 프로젝트 관리
- `model-3d.svg` - 3D 모델 관리
- `revit.svg` - Revit 관리
- `user-management.svg` - 사용자 관리

### 상태 아이콘
- `success.svg` - 성공 상태
- `error.svg` - 에러 상태
- `warning.svg` - 경고 상태
- `loading.svg` - 로딩 상태

### 3D 모델 관리 전용
- `model-upload.svg` - 모델 업로드
- `model-preview.png` - 모델 미리보기
- `revit-file.svg` - Revit 파일 아이콘
- `dwg-file.svg` - DWG 파일 아이콘

## 💡 최적화 팁

1. **파일 크기 최적화**
   - SVG: 벡터 아이콘용
   - WebP: 현대 브라우저용 이미지
   - PNG: 투명도 필요한 이미지
   - JPG: 사진류

2. **반응형 이미지**
   ```vue
   <picture>
     <source srcset="@/assets/images/hero@2x.webp" type="image/webp">
     <img src="@/assets/images/hero.jpg" alt="Hero">
   </picture>
   ```

3. **Lazy Loading**
   ```vue
   <img :src="imageUrl" loading="lazy" alt="Description">
   ```

## 🔍 예시 사용법

### 공통 플레이스홀더 컴포넌트
```vue
<!-- components/common/ImagePlaceholder.vue -->
<template>
  <div class="image-placeholder">
    <img :src="placeholderImage" :alt="altText" />
  </div>
</template>

<script setup lang="ts">
import placeholderImage from '@/assets/images/common/no-data.svg'

interface Props {
  altText?: string
}

withDefaults(defineProps<Props>(), {
  altText: 'No data available'
})
</script>
```

### 아이콘 컴포넌트
```vue
<!-- components/common/Icon.vue -->
<template>
  <img 
    :src="iconSrc" 
    :alt="name"
    class="icon"
    :class="size"
  />
</template>

<script setup lang="ts">
interface Props {
  name: string
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<Props>(), {
  size: 'md'
})

const iconSrc = new URL(`../assets/icons/ui/${props.name}.svg`, import.meta.url).href
</script>
```
