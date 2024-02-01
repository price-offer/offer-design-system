# @offer-ui/react

## 0.3.6

### Patch Changes

- cd1d94a: - Carousel
  - onClick, 화살표 클릭시에는 동작하지 않도록 수정
  - tablet, mobile에서 인디케이터 클릭시 동작하지 않는 이슈 수정
  - src -> url로 변경
  - ImageModal
    - 처음에 이미지 위치 잡지 못하는 이슈 수정
    - src -> url로 변경
- 49309a2: - Carousel
  - mobile, tablet에서 인디케이터 동작하지 않는 이슈 수정
  - 화살표 클릭이 이미지 클릭에 영향을 미치지 않도록 수정
  - ImageModal
    - 초기 로딩시 이미지 위치 잃어버리는 이슈 수정
  - Input - Edit
    - UI 상에서 한국어가 maxLength 이상으로 입력되는 이슈 수정

## 0.3.5

### Patch Changes

- 247b71b: - fix: ImageModal 이미지 위치 못잡는 이슈 수정
  - feat: Carousel onClick prop 추가

## 0.3.4

### Patch Changes

- fdc2483: - Input-Edit: isPrice에 따른 UI변화

## 0.3.3

### Patch Changes

- b41b934: - Input.Edit에 isPrice prop 추가

## 0.3.2

### Patch Changes

- 894b47d: - Input 컴포넌트 개선
  - Carousel과 ImageModal 디자인 이슈 수정

## 0.3.1

### Patch Changes

- cd4b4bb: Carousel, ImageModal 컴포넌트 개선

## 0.3.0

### Minor Changes

- fbcf16c: - feat: implement the useImageUploader hook
  - refactor: force an ImageUploader component accept image to jpeg and png
  - refactor: rename useImageUploader to useImageListUploader
- 1bebf12: implement the useImageUploader hook
- 33b6d53: implement the useImageUploader hook

## 0.2.8

### Patch Changes

- 95b9c3a: 뱃지 높이 틀어지는 이슈 수정, 이미지 업로더 상위 상태와 싱크업하도록

## 0.2.7

### Patch Changes

- 50dcfa3: design: selectbox darkmode 스타일 이슈 수정

## 0.2.6

### Patch Changes

- 7bdfc35: - ImageUploader 파일 데이터 추가

## 0.2.5

### Patch Changes

- 249ca8e: - ImageUploader 이슈 수정 \* Radio 선택 값 받을 수 있도록 수정

## 0.2.4

### Patch Changes

- 8de7dbb: fix the hydration error on ImageUploader Component and fix some issues

## 0.2.3

### Patch Changes

- 28903ed: fix the image component min-height and min-width

## 0.2.2

### Patch Changes

- 4617c8b: fix the image layout

## 0.2.1

### Patch Changes

- 4c68ede: fix: avatar radius style

## 0.2.0

### Minor Changes

- migration storybook and node version
