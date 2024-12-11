// types/tailwind-merge.d.ts
import "tailwind-merge"

// `tailwind-merge` 모듈을 확장하여 `classGroups` 속성을 추가합니다.
declare module "tailwind-merge" {
  interface ClassGroup {
    text?: RegExp[] // 텍스트 관련 클래스 그룹
    borderColor?: RegExp[] // 테두리 색상 관련 그룹
    backgroundColor?: RegExp[] // 배경 색상 관련 그룹
    fontSize?: RegExp[] // 폰트 사이즈 관련 그룹
  }

  interface ConfigExtension {
    classGroups?: ClassGroup // classGroups 속성을 추가하여 커스터마이징
  }
}
