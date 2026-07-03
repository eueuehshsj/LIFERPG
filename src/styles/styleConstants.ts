/**
 * 공통 정적 스타일 상수
 * 프로젝트 전역에서 반복되는 스타일을 중앙화하여 관리
 */

// ============ 색상 팔레트 ============
export const COLORS = {
  // 목재 계열
  wood: {
    dark: "#3d2410",
    medium: "#5a3516",
    light: "#704214",
    text: "#8b4513",
  },
  // 바위/돌 계열
  stone: {
    darkest: "#1c1917",
    dark: "#292524",
    medium: "#78716c",
    light: "#f5f5f4",
  },
  // 황금/앰버 계열
  amber: {
    dark: "#78350f",
    medium: "#92400e",
    light: "#fbbf24",
    text: "#1f2937",
  },
  // 상태 색상
  status: {
    success: "#16a34a", // 녹색 (low priority)
    warning: "#eab308", // 노란색 (medium priority)
    danger: "#dc2626", // 빨간색 (high priority)
    completed: "#059669",
  },
} as const;

// ============ 그림자 정의 ============
export const SHADOWS = {
  // 3D 우드 효과
  wood3d: "inset 0 2px 4px rgba(0, 0, 0, 0.5), 0 -2px 8px rgba(0, 0, 0, 0.4)",
  wood3dInverted:
    "inset 0 -2px 4px rgba(0, 0, 0, 0.5), 0 2px 8px rgba(0, 0, 0, 0.4)",

  // 종이 효과
  paperLayered: "0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08)",
  paperStacked:
    "-2px 2px 8px rgba(0, 0, 0, 0.15), -4px 4px 12px rgba(0, 0, 0, 0.1)",

  // 모드별 하이라이트
  completeShadow: "0 0 20px rgba(220, 38, 38, 0.6)",
  deleteShadow: "0 0 16px rgba(100, 116, 139, 0.5)",
  editShadow: "0 0 16px rgba(234, 179, 8, 0.5)",

  // 일반 그림자
  sm: "0 1px 2px rgba(0, 0, 0, 0.05)",
  md: "0 4px 6px rgba(0, 0, 0, 0.1)",
  lg: "0 10px 15px rgba(0, 0, 0, 0.1)",
  xl: "0 20px 25px rgba(0, 0, 0, 0.1)",
} as const;

// ============ 그라데이션 정의 ============
export const GRADIENTS = {
  // 목판 헤더
  woodenSignBg:
    "linear-gradient(135deg, #8b4513 0%, #654321 50%, #4a2c0f 100%)",

  // 가판대
  shelfTopBar: "linear-gradient(to bottom, #704214, #5a3516)",
  shelfBody: "linear-gradient(to bottom, #5a3516, #3d2410)",

  // 게시판
  boardBg: "linear-gradient(145deg, #a0713a 0%, #7a5328 50%, #5a3716 100%)",
  boardContent:
    "linear-gradient(to br, rgba(251, 191, 36, 0.95) 0%, rgba(254, 243, 199, 0.95) 100%)",

  // 태스크 카드 - Priority별
  cardPriorityLow: "linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)",
  cardPriorityMedium: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
  cardPriorityHigh: "linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)",

  // 모드별 오버레이 배경
  modeLabelBg:
    "linear-gradient(135deg, rgba(220, 38, 38, 0.95), rgba(220, 38, 38, 0.85))",

  // 모달 배경
  modalBg: "linear-gradient(160deg, #fdf6e3, #faf0d7)",
  rewardClaimBg: "linear-gradient(160deg, #fdf6e3, #faf0d7)",

  // 도장 잉크
  stampInk: "linear-gradient(135deg, #dc2626, #991b1b)",

  // 버튼 배경
  submitButtonBg: "linear-gradient(135deg, #92400e, #78350f)",
  hammerHeadBg: "linear-gradient(90deg, #92400e 0%, #78350f 50%, #92400e 100%)",
} as const;

// ============ 배경 이미지 (텍스처) ============
export const TEXTURES = {
  // 목재 줄무늬
  woodGrain:
    "repeating-linear-gradient(90deg, rgba(90, 53, 22, 0.8) 0px, transparent 1px, transparent 2px, rgba(90, 53, 22, 0.4) 3px)",

  // 줄 노트 패턴
  linedPaper: `repeating-linear-gradient(
    0deg,
    transparent,
    transparent 24px,
    #d1d5db 24px,
    #d1d5db 25px
  )`,

  // 격자 패턴 (돈자루 천 질감)
  gridPattern: `repeating-linear-gradient(
    0deg,
    transparent,
    transparent 8px,
    rgba(139, 69, 19, 0.15) 8px,
    rgba(139, 69, 19, 0.15) 9px
  ),
  repeating-linear-gradient(
    90deg,
    transparent,
    transparent 8px,
    rgba(139, 69, 19, 0.15) 8px,
    rgba(139, 69, 19, 0.15) 9px
  )`,

  // 종이 질감 (노이즈 효과)
  paperNoise: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' result='noise' /%3E%3C/filter%3E%3Crect width='400' height='400' fill='%23f5f3f0' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`,
} as const;

// ============ 테두리 반경 ============
export const BORDER_RADIUS = {
  // 정사각형 (모서리 직각)
  none: "0",

  // 약한 둥글기
  sm: "0.125rem",

  // 보통 둥글기
  md: "0.375rem",
  lg: "0.5rem",

  // 강한 둥글기
  xl: "0.75rem",
  "2xl": "1rem",
  "3xl": "1.5rem",

  // 완전 원형
  full: "9999px",

  // 비표준 형태
  topOnly: "0.5rem 0.5rem 0 0",
  bottomOnly: "0 0 0.5rem 0.5rem",
  paperLike: "40% 40% 50% 50% / 25% 25% 75% 75%",
} as const;

// ============ Clip Path 정의 ============
export const CLIP_PATHS = {
  // 영수증 톱니 (상단)
  receiptSerrated: `polygon(
    0% 0%, 2% 8%, 4% 0%, 6% 8%, 8% 0%, 10% 8%, 12% 0%, 14% 8%, 
    16% 0%, 18% 8%, 20% 0%, 22% 8%, 24% 0%, 26% 8%, 28% 0%, 30% 8%, 
    32% 0%, 34% 8%, 36% 0%, 38% 8%, 40% 0%, 42% 8%, 44% 0%, 46% 8%, 
    48% 0%, 50% 8%, 52% 0%, 54% 8%, 56% 0%, 58% 8%, 60% 0%, 62% 8%, 
    64% 0%, 66% 8%, 68% 0%, 70% 8%, 72% 0%, 74% 8%, 76% 0%, 78% 8%, 
    80% 0%, 82% 8%, 84% 0%, 86% 8%, 88% 0%, 90% 8%, 92% 0%, 94% 8%, 
    96% 0%, 98% 8%, 100% 0%, 100% 100%, 0% 100%
  )`,

  // 영수증 톱니 (하단)
  receiptSerratedBottom: `polygon(
    0% 0%, 100% 0%, 100% 100%, 98% 92%, 96% 100%, 94% 92%, 92% 100%, 90% 92%, 
    88% 100%, 86% 92%, 84% 100%, 82% 92%, 80% 100%, 78% 92%, 76% 100%, 74% 92%, 
    72% 100%, 70% 92%, 68% 100%, 66% 92%, 64% 100%, 62% 92%, 60% 100%, 58% 92%, 
    56% 100%, 54% 92%, 52% 100%, 50% 92%, 48% 100%, 46% 92%, 44% 100%, 42% 92%, 
    40% 100%, 38% 92%, 36% 100%, 34% 92%, 32% 100%, 30% 92%, 28% 100%, 26% 92%, 
    24% 100%, 22% 92%, 20% 100%, 18% 92%, 16% 100%, 14% 92%, 12% 100%, 10% 92%, 
    8% 100%, 6% 92%, 4% 100%, 2% 92%, 0% 100%
  )`,
} as const;

// ============ 공통 스타일 객체 ============
export const COMMON_STYLES = {
  // 모달 배경 오버레이
  modalOverlay: {
    backgroundColor: "rgba(30, 15, 5, 0.75)",
    backdropFilter: "blur(4px)",
  },

  // 종이 기본 스타일
  paperBase: {
    backgroundColor: "#faf6ed",
    backgroundImage: TEXTURES.paperNoise,
    fontFamily: "serif",
  },

  // 영수증 기본 스타일
  receiptBase: {
    backgroundColor: "#fefefe",
    fontFamily: "monospace",
    fontSize: "13px",
  },

  // 슬롯머신 디스플레이
  slotMachineDisplay: {
    backgroundColor: "#1c1917",
    color: "#fbbf24",
    fontFamily: "monospace",
    fontSize: "18px",
    fontWeight: "bold",
  },
} as const;

// ============ Z-Index 정의 ============
export const Z_INDEX = {
  background: -1,
  default: 0,
  elevated: 10,
  modal: 50,
  modalContent: 51,
  tooltip: 100,
} as const;

// ============ 전환 효과 ============
export const TRANSITIONS = {
  fast: "all 150ms ease-in-out",
  base: "all 200ms ease-in-out",
  slow: "all 300ms ease-in-out",

  // 특정 속성
  colorTransition:
    "color 200ms ease-in-out, background-color 200ms ease-in-out",
  transformTransition: "transform 200ms ease-in-out, opacity 200ms ease-in-out",
  shadowTransition: "box-shadow 200ms ease-in-out",
} as const;

// ============ 태스크 카드 우선순위별 색상 ============
export const TASK_CARD_COLORS = {
  low: {
    bg: "#dcfce7",
    border: COLORS.status.success,
    text: "#166534",
    hover: "#bbf7d0",
  },
  medium: {
    bg: "#fef3c7",
    border: COLORS.status.warning,
    text: "#92400e",
    hover: "#fde68a",
  },
  high: {
    bg: "#fee2e2",
    border: COLORS.status.danger,
    text: "#991b1b",
    hover: "#fecaca",
  },
} as const;

// ============ 태스크 우선순위 라벨 (TaskBoard, CompletedTasksModal 공용) ============
export const PRIORITY_LABELS = {
  low: "보통",
  medium: "중요",
  high: "긴급",
} as const;

// ============ 태스크 우선순위 뱃지 색상 (TaskBoard, CompletedTasksModal 공용) ============
export const PRIORITY_BADGE_COLORS = {
  low: { text: "#15803d", badge: "#dcfce7", border: "#86efac" },
  medium: { text: "#b45309", badge: "#fef3c7", border: "#fcd34d" },
  high: { text: "#b91c1c", badge: "#fee2e2", border: "#fca5a5" },
} as const;

// ============ 게시판 색상 조정 ============
export const BOARD_COLORS = {
  backdrop: "#8b4513",
  backdropDark: "#704214",
  backdropLight: "#a0713a",
  contentBg: "#fbf4e7",
  contentBgAlt: "#f5ede0",
  contentBorder: "#d4a574",
  overlayPattern: "rgba(139, 69, 19, 0.03)",
} as const;

// ============ 모드별 그림자 ============
export const TASK_SHADOWS_BY_MODE = {
  complete: {
    shadow: SHADOWS.completeShadow,
    bgColor: "rgba(220, 38, 38, 0.15)",
    borderColor: "rgba(220, 38, 38, 0.5)",
  },
  delete: {
    shadow: SHADOWS.deleteShadow,
    bgColor: "rgba(100, 116, 139, 0.15)",
    borderColor: "rgba(100, 116, 139, 0.5)",
  },
  edit: {
    shadow: SHADOWS.editShadow,
    bgColor: "rgba(234, 179, 8, 0.15)",
    borderColor: "rgba(234, 179, 8, 0.5)",
  },
} as const;

// ============ 선반 관련 그라데이션 ============
export const SHELF_GRADIENTS = {
  topBar: "linear-gradient(to bottom, #704214, #5a3516)",
  body: "linear-gradient(to bottom, #5a3516, #3d2410)",
  bodyAlt: "linear-gradient(135deg, #5a3516 0%, #4a2c0f 100%)",
  edge: "linear-gradient(90deg, #3d2410, #5a3516, #3d2410)",
  innerShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.5)",
} as const;

// ============ 버튼별 기본 스타일 ============
export const BUTTON_STYLES = {
  primary: {
    bg: "#92400e",
    bgHover: "#78350f",
    bgActive: "#5a2606",
    text: "#ffffff",
    gradient: "linear-gradient(135deg, #92400e, #78350f)",
  },
  secondary: {
    bg: "#d1d5db",
    bgHover: "#9ca3af",
    bgActive: "#6b7280",
    text: "#1f2937",
    gradient: "linear-gradient(135deg, #d1d5db, #9ca3af)",
  },
  danger: {
    bg: "#dc2626",
    bgHover: "#b91c1c",
    bgActive: "#991b1b",
    text: "#ffffff",
    gradient: "linear-gradient(135deg, #dc2626, #b91c1c)",
  },
  success: {
    bg: "#16a34a",
    bgHover: "#15803d",
    bgActive: "#166534",
    text: "#ffffff",
    gradient: "linear-gradient(135deg, #16a34a, #15803d)",
  },
} as const;

// ============ 종이 레이어별 색상 ============
export const PAPER_COLORS = {
  layer1: "#faf6ed",
  layer2: "#f5ede0",
  layer3: "#f0e6d3",
  text: "#2d2416",
  textLight: "#5a4a3a",
  highlight: "#fef3c7",
  border: "#d1c4b0",
} as const;

// ============ 모달별 배경색 ============
export const MODAL_COLORS = {
  default: "linear-gradient(160deg, #fdf6e3, #faf0d7)",
  addTask: "linear-gradient(160deg, #fef3c7, #fce68a)",
  addReward: "linear-gradient(160deg, #fef3c7, #fce68a)",
  removeReward: "linear-gradient(160deg, #fee2e2, #fecaca)",
  completedTasks: "linear-gradient(160deg, #dcfce7, #bbf7d0)",
  claimReward: "linear-gradient(160deg, #fdf6e3, #faf0d7)",
} as const;
