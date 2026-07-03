/**
 * 동적 인라인 스타일 생성 함수
 * 상태, props에 따라 변하는 스타일을 계산하는 유틸리티
 */

import React from "react";
import {
  COLORS,
  SHADOWS,
  GRADIENTS,
  TASK_CARD_COLORS,
  BOARD_COLORS,
  TASK_SHADOWS_BY_MODE,
  SHELF_GRADIENTS,
  BUTTON_STYLES,
  PAPER_COLORS,
  MODAL_COLORS,
  TRANSITIONS,
} from "./styleConstants";

// ============ 태스크 카드 스타일 ============
export const getTaskCardStyle = (rotation: number) => ({
  transform: `rotate(${rotation}deg)`,
  transition: "all 150ms ease-in-out",
});

export const getTaskCardBorderStyle = (priority: "low" | "medium" | "high") => {
  const borderColorMap = {
    low: COLORS.status.success,
    medium: COLORS.status.warning,
    high: COLORS.status.danger,
  };

  return {
    borderColor: borderColorMap[priority],
    borderWidth: "2px",
  };
};

export const getTaskCardModeOverlay = (
  mode: "complete" | "delete" | "edit" | null,
) => {
  if (!mode) return { display: "none" };

  const styleMap = {
    complete: {
      boxShadow: SHADOWS.completeShadow,
      backgroundColor: `rgba(220, 38, 38, 0.15)`,
      borderColor: "rgba(220, 38, 38, 0.5)",
    },
    delete: {
      boxShadow: SHADOWS.deleteShadow,
      backgroundColor: `rgba(100, 116, 139, 0.15)`,
      borderColor: "rgba(100, 116, 139, 0.5)",
    },
    edit: {
      boxShadow: SHADOWS.editShadow,
      backgroundColor: `rgba(234, 179, 8, 0.15)`,
      borderColor: "rgba(234, 179, 8, 0.5)",
    },
  };

  return {
    ...styleMap[mode],
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute" as const,
    inset: "0",
    borderRadius: "0.5rem",
    zIndex: 10,
    cursor: "pointer",
    transition: "all 150ms ease-in-out",
  };
};

// ============ 게시판 모드 표시 스타일 ============
export const getBoardModeLabel = (
  mode: "complete" | "delete" | "edit" | null,
) => {
  if (!mode) return { display: "none" };

  const labelMap = {
    complete: "완료할 일정을 클릭하세요",
    delete: "삭제할 일정을 클릭하세요",
    edit: "편집할 일정을 클릭하세요",
  };

  const colorMap = {
    complete: COLORS.status.danger,
    delete: COLORS.stone.medium,
    edit: COLORS.status.warning,
  };

  return {
    background: GRADIENTS.modeLabelBg,
    color: "#ffffff",
    padding: "6px 12px",
    borderRadius: "0.375rem",
    fontSize: "12px",
    fontWeight: "600",
    zIndex: 20,
    borderStyle: "dashed",
    borderWidth: "2px",
    borderColor: colorMap[mode],
  };
};

// ============ 완료 도장 스타일 ============
export const getStampStyle = (isActive: boolean) => ({
  backgroundColor: isActive ? COLORS.status.danger : COLORS.stone.medium,
  boxShadow: isActive ? SHADOWS.completeShadow : "none",
  transition: "all 200ms ease-in-out",
});

export const getStampInkStyle = (isActive: boolean) => ({
  background: isActive
    ? GRADIENTS.stampInk
    : "linear-gradient(135deg, #9ca3af, #6b7280)",
  filter: isActive ? "drop-shadow(0 0 8px rgba(220, 38, 38, 0.4))" : "none",
});

// ============ 모달 제출 애니메이션 ============
export const getSubmittedModalStyle = (submitted: boolean) => ({
  transform: submitted ? "scale(0.95)" : "scale(1)",
  opacity: submitted ? 0 : 1,
  transition: "all 300ms ease-in-out",
  pointerEvents: submitted ? "none" : ("auto" as const),
});

// ============ 보상 선택 상태 스타일 ============
export const getRewardSelectStyle = (isSelected: boolean) => ({
  borderColor: isSelected ? COLORS.amber.medium : "#d1d5db",
  borderWidth: "2px",
  transform: isSelected ? "scale(1.02)" : "scale(1)",
  boxShadow: isSelected ? `0 0 12px ${COLORS.amber.medium}40` : "none",
  backgroundColor: isSelected ? `${COLORS.amber.light}15` : "#f9fafb",
  transition: "all 150ms ease-in-out",
});

export const getRewardCheckMark = (isSelected: boolean) => ({
  display: isSelected ? "flex" : "none",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute" as const,
  width: "24px",
  height: "24px",
  backgroundColor: COLORS.amber.medium,
  borderRadius: "50%",
  color: "white",
  fontWeight: "bold",
  top: "8px",
  right: "8px",
  zIndex: 10,
});

// ============ 슬롯머신 애니메이션 스타일 ============
export const getSlotSpinStyle = (isSpinning: boolean, revealed: boolean) => ({
  opacity: revealed ? 1 : 0.5,
  transform: `translateY(${isSpinning ? "0" : "0"})`,
  transition: isSpinning ? "none" : "all 300ms ease-in-out",
});

export const getSlotRevealedStyle = (revealed: boolean) => ({
  opacity: revealed ? 1 : 0,
  transform: revealed ? "scale(1)" : "scale(0.9)",
  animation: revealed ? "fadeIn 300ms ease-in-out" : "none",
});

// ============ 삭제 확인 상태 스타일 ============
export const getDeleteConfirmStyle = (isConfirming: boolean) => ({
  borderColor: isConfirming ? COLORS.status.danger : "#d1d5db",
  borderWidth: "2px",
  backgroundColor: isConfirming ? "rgba(254, 226, 226, 0.5)" : "#f9fafb",
  transition: "all 150ms ease-in-out",
});

// ============ 비활성 상태 스타일 (포인트 부족) ============
export const getDisabledRewardStyle = (isDisabled: boolean) => ({
  opacity: isDisabled ? 0.4 : 1,
  pointerEvents: isDisabled ? "none" : ("auto" as const),
  borderStyle: isDisabled ? "dashed" : "solid",
  transition: "all 150ms ease-in-out",
});

// ============ Floating Label 스타일 ============
export const getFloatingLabelStyle = (
  isFocused: boolean,
  hasValue: boolean,
) => {
  const isActive = isFocused || hasValue;
  return {
    transform: isActive
      ? "translateY(-1.5rem) scale(0.875)"
      : "translateY(0) scale(1)",
    opacity: isActive ? 1 : 0.7,
    color: isFocused ? COLORS.amber.medium : COLORS.stone.medium,
    transition: "all 200ms ease-in-out",
  };
};

// ============ 구분선 스타일 ============
export const getDashedDividerStyle = (color: string = "#d1d5db") => ({
  borderTop: `2px dashed ${color}`,
  margin: "12px 0",
  opacity: 0.6,
});

// ============ 태스크 카드 컨테이너 스타일 ============
/**
 * 태스크 카드의 회전각과 모드별 그림자를 적용하는 스타일 생성
 * @param rotation 회전각 (도)
 * @param mode 현재 모드 (complete | delete | edit | null)
 * @returns CSS 스타일 객체
 */
export const getTaskCardContainerStyle = (
  rotation: number,
  mode: "complete" | "delete" | "edit" | null = null,
): React.CSSProperties => {
  const modeStyle = mode && TASK_SHADOWS_BY_MODE[mode];

  return {
    transform: `rotate(${rotation}deg)`,
    boxShadow: modeStyle?.shadow || "none",
    transition: TRANSITIONS.base,
  };
};

// ============ 태스크 카드 배경 스타일 ============
/**
 * 우선순위, 선택 상태, 모드에 따른 카드 배경 색상 결정
 * @param priority 우선순위 (low | medium | high)
 * @param isSelected 선택 여부
 * @param mode 현재 모드 (complete | delete | edit | null)
 * @returns CSS 스타일 객체
 */
export const getTaskCardBgStyle = (
  priority: "low" | "medium" | "high" = "medium",
  isSelected: boolean = false,
  mode: "complete" | "delete" | "edit" | null = null,
): React.CSSProperties => {
  const priorityColors = TASK_CARD_COLORS[priority];
  const modeStyle = mode && TASK_SHADOWS_BY_MODE[mode];

  return {
    backgroundColor: modeStyle?.bgColor || priorityColors.bg,
    borderColor: modeStyle?.borderColor || priorityColors.border,
    borderWidth: "2px",
    borderStyle: "solid",
    transform: isSelected ? "scale(1.02)" : "scale(1)",
    transition: TRANSITIONS.fast,
  };
};

// ============ 게시판 백드롭 패턴 ============
/**
 * 게시판의 목재 백드롭 패턴과 텍스처 적용
 * @returns CSS 스타일 객체
 */
export const getBoardBackdropPattern = (): React.CSSProperties => ({
  backgroundColor: BOARD_COLORS.backdropDark,
  backgroundImage: `
    repeating-linear-gradient(
      90deg,
      ${BOARD_COLORS.backdropDark} 0px,
      ${BOARD_COLORS.backdrop} 1px,
      ${BOARD_COLORS.backdropDark} 2px
    ),
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.1) 2px,
      rgba(0, 0, 0, 0.1) 3px
    )
  `,
  boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.5)",
});

// ============ 게시판 모드 오버레이 ============
/**
 * 게시판의 모드 표시 오버레이 스타일
 * @param mode 현재 모드 (complete | delete | edit | null)
 * @returns CSS 스타일 객체
 */
export const getBoardModeOverlay = (
  mode: "complete" | "delete" | "edit" | null,
): React.CSSProperties => {
  if (!mode) {
    return { display: "none" };
  }

  const modeStyle = TASK_SHADOWS_BY_MODE[mode];

  return {
    position: "absolute",
    inset: 0,
    backgroundColor: modeStyle.bgColor,
    borderColor: modeStyle.borderColor,
    borderWidth: "2px",
    borderStyle: "solid",
    borderRadius: "0.5rem",
    boxShadow: modeStyle.shadow,
    opacity: 0.8,
    zIndex: 5,
    transition: TRANSITIONS.base,
  };
};

// ============ 종이 스택 레이어 스타일 ============
/**
 * 종이의 3층 레이어별 색상과 오프셋 스타일
 * @param layer 레이어 번호 (1 | 2 | 3)
 * @returns CSS 스타일 객체
 */
export const getPaperStackStyle = (layer: 1 | 2 | 3): React.CSSProperties => {
  const layerMap = {
    1: {
      backgroundColor: PAPER_COLORS.layer1,
      transform: "translateY(0px) translateX(0px)",
      zIndex: 30,
    },
    2: {
      backgroundColor: PAPER_COLORS.layer2,
      transform: "translateY(2px) translateX(2px)",
      zIndex: 20,
    },
    3: {
      backgroundColor: PAPER_COLORS.layer3,
      transform: "translateY(4px) translateX(4px)",
      zIndex: 10,
    },
  };

  return {
    ...layerMap[layer],
    borderColor: PAPER_COLORS.border,
    borderWidth: "1px",
    borderStyle: "solid",
    transition: TRANSITIONS.fast,
  };
};

// ============ 펜 스타일 ============
/**
 * 펜의 회전각 적용
 * @param angle 회전각 (도)
 * @returns CSS 스타일 객체
 */
export const getPencilStyle = (angle: number = 0): React.CSSProperties => ({
  transform: `rotate(${angle}deg)`,
  transformOrigin: "center",
  transition: TRANSITIONS.fast,
  filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.15))",
});

// ============ 망치 활성화 스타일 ============
/**
 * 망치의 활성화/비활성화 상태 스타일
 * @param isActive 활성화 여부
 * @returns CSS 스타일 객체
 */
export const getHammerStyle = (isActive: boolean): React.CSSProperties => ({
  opacity: isActive ? 1 : 0.6,
  transform: isActive ? "scale(1.1)" : "scale(1)",
  filter: isActive ? `drop-shadow(0 0 8px ${COLORS.status.danger})` : "none",
  cursor: isActive ? "pointer" : "default",
  transition: TRANSITIONS.fast,
});

// ============ 동전 활성화 스타일 ============
/**
 * 동전의 활성화/비활성화 상태 스타일
 * @param isActive 활성화 여부
 * @returns CSS 스타일 객체
 */
export const getCoinStyle = (isActive: boolean): React.CSSProperties => ({
  opacity: isActive ? 1 : 0.5,
  transform: isActive ? "scale(1.15) rotate(0deg)" : "scale(1) rotate(-20deg)",
  filter: isActive ? `drop-shadow(0 0 12px ${COLORS.amber.medium})` : "none",
  cursor: isActive ? "pointer" : "default",
  transition: TRANSITIONS.base,
});

// ============ 영수증 톱니 패턴 스타일 ============
/**
 * 영수증 상단/하단 톱니 패턴 적용
 * @param position 톱니 위치 (top | bottom)
 * @returns CSS 스타일 객체
 */
export const getReceiptSerrationStyle = (
  position: "top" | "bottom" = "top",
): React.CSSProperties => {
  const serrationMap = {
    top: `polygon(
      0% 0%, 2% 8%, 4% 0%, 6% 8%, 8% 0%, 10% 8%, 12% 0%, 14% 8%, 
      16% 0%, 18% 8%, 20% 0%, 22% 8%, 24% 0%, 26% 8%, 28% 0%, 30% 8%, 
      32% 0%, 34% 8%, 36% 0%, 38% 8%, 40% 0%, 42% 8%, 44% 0%, 46% 8%, 
      48% 0%, 50% 8%, 52% 0%, 54% 8%, 56% 0%, 58% 8%, 60% 0%, 62% 8%, 
      64% 0%, 66% 8%, 68% 0%, 70% 8%, 72% 0%, 74% 8%, 76% 0%, 78% 8%, 
      80% 0%, 82% 8%, 84% 0%, 86% 8%, 88% 0%, 90% 8%, 92% 0%, 94% 8%, 
      96% 0%, 98% 8%, 100% 0%, 100% 100%, 0% 100%
    )`,
    bottom: `polygon(
      0% 0%, 100% 0%, 100% 100%, 98% 92%, 96% 100%, 94% 92%, 92% 100%, 90% 92%, 
      88% 100%, 86% 92%, 84% 100%, 82% 92%, 80% 100%, 78% 92%, 76% 100%, 74% 92%, 
      72% 100%, 70% 92%, 68% 100%, 66% 92%, 64% 100%, 62% 92%, 60% 100%, 58% 92%, 
      56% 100%, 54% 92%, 52% 100%, 50% 92%, 48% 100%, 46% 92%, 44% 100%, 42% 92%, 
      40% 100%, 38% 92%, 36% 100%, 34% 92%, 32% 100%, 30% 92%, 28% 100%, 26% 92%, 
      24% 100%, 22% 92%, 20% 100%, 18% 92%, 16% 100%, 14% 92%, 12% 100%, 10% 92%, 
      8% 100%, 6% 92%, 4% 100%, 2% 92%, 0% 100%
    )`,
  };

  return {
    clipPath: serrationMap[position],
  } as React.CSSProperties;
};

// ============ 보상 모드 버튼 스타일 ============
/**
 * 보상 선택 모드 버튼의 활성화 상태 스타일
 * @param mode 모드 타입 (add | remove)
 * @param isActive 활성화 여부
 * @returns CSS 스타일 객체
 */
export const getModeButtonStyle = (
  mode: "add" | "remove",
  isActive: boolean,
): React.CSSProperties => {
  const colorMap = {
    add: BUTTON_STYLES.success,
    remove: BUTTON_STYLES.danger,
  };

  const color = colorMap[mode];

  return {
    backgroundColor: isActive ? color.bg : color.bgActive,
    color: color.text,
    border: `2px solid ${isActive ? color.bg : color.bgActive}`,
    transform: isActive ? "scale(1.05)" : "scale(1)",
    boxShadow: isActive ? `0 0 12px ${color.bg}40` : "none",
    cursor: "pointer",
    transition: TRANSITIONS.fast,
  };
};

// ============ 보상 아이템 스타일 ============
/**
 * 보상 아이템의 구매 가능 여부와 선택 상태 스타일
 * @param isAffordable 구매 가능 여부
 * @param isSelected 선택 여부
 * @returns CSS 스타일 객체
 */
export const getRewardItemStyle = (
  isAffordable: boolean,
  isSelected: boolean,
): React.CSSProperties => ({
  opacity: isAffordable ? 1 : 0.4,
  borderColor: isSelected ? COLORS.amber.medium : "#d1d5db",
  borderWidth: "2px",
  borderStyle: "solid",
  transform: isSelected ? "scale(1.02)" : "scale(1)",
  backgroundColor: isSelected ? `${COLORS.amber.light}15` : "#f9fafb",
  boxShadow: isSelected ? `0 0 12px ${COLORS.amber.medium}40` : "none",
  cursor: isAffordable ? "pointer" : "not-allowed",
  pointerEvents: isAffordable ? "auto" : "none",
  transition: TRANSITIONS.fast,
});
