import { useMemo, useState } from "react";
import { Edit3, Trash2, ArrowUpDown } from "lucide-react";
import type { Task } from "../types";
import {
  GRADIENTS,
  PRIORITY_LABELS,
  PRIORITY_BADGE_COLORS,
} from "../../styles/styleConstants";
import { getBoardBackdropPattern } from "../../styles/styleHelpers";

type TaskBoardProps = {
  tasks: Task[];
  completeMode: boolean;
  deleteMode: boolean;
  editMode: boolean;
  selectedTaskIds: string[];
  confirmDeleteId: string | null;
  onToggleSelectTask: (id: string) => void;
  onConfirmDeleteTask: (id: string) => void;
  onCancelDelete: () => void;
  onDeleteTask: (id: string) => void;
  onStartEditTask: (task: Task) => void;
};

// ============ 상수 정의 ============
const PIN_GRADIENT = {
  background: "radial-gradient(circle at 35% 35%, #f87171, #991b1b)",
  boxShadow: "0 2px 6px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,150,150,0.4)",
} as const;

const PIN_STYLE = {
  width: "20px",
  height: "20px",
  borderRadius: "50%",
  border: "2px solid #7f1d1d",
  ...PIN_GRADIENT,
} as const;

const MODAL_OVERLAY_STYLE = {
  background: "rgba(15,23,42,0.88)",
} as const;

const PRIORITY_CARD_BG = {
  low: "#f0fdf4",
  medium: "#fffbeb",
  high: "#fef2f2",
} as const;

const PRIORITY_CARD_STYLES = {
  low: { bg: PRIORITY_CARD_BG.low, ...PRIORITY_BADGE_COLORS.low },
  medium: { bg: PRIORITY_CARD_BG.medium, ...PRIORITY_BADGE_COLORS.medium },
  high: { bg: PRIORITY_CARD_BG.high, ...PRIORITY_BADGE_COLORS.high },
} as const;

type PriorityFilter = "all" | Task["priority"];
type SortOption = "default" | "dueDate";

const FILTER_OPTIONS: {
  value: PriorityFilter;
  label: string;
  text: string;
  badge: string;
  border: string;
}[] = [
  { value: "all", label: "전체", text: "#44403c", badge: "#e7e5e4", border: "#a8a29e" },
  { value: "low", label: "보통", ...PRIORITY_BADGE_COLORS.low },
  { value: "medium", label: "중요", ...PRIORITY_BADGE_COLORS.medium },
  { value: "high", label: "긴급", ...PRIORITY_BADGE_COLORS.high },
];

const BOARD_MODE_OVERLAY_STYLES = {
  complete: {
    overlayBg: "rgba(220,38,38,0.04)",
    overlayBorder: "rgba(220,38,38,0.3)",
    labelBg: "rgba(185,28,28,0.8)",
    labelText: "#fef2f2",
    message: "완료할 퀘스트를 클릭하세요",
  },
  delete: {
    overlayBg: "rgba(71,85,105,0.04)",
    overlayBorder: "rgba(71,85,105,0.3)",
    labelBg: "rgba(51,65,85,0.8)",
    labelText: "#f1f5f9",
    message: "삭제할 퀘스트를 클릭하세요",
  },
  edit: {
    overlayBg: "rgba(202,138,4,0.04)",
    overlayBorder: "rgba(202,138,4,0.4)",
    labelBg: "rgba(161,110,5,0.85)",
    labelText: "#fefce8",
    message: "편집할 퀘스트를 클릭하세요",
  },
} as const;

export default function TaskBoard({
  tasks,
  completeMode,
  deleteMode,
  editMode,
  selectedTaskIds,
  confirmDeleteId,
  onToggleSelectTask,
  onConfirmDeleteTask,
  onCancelDelete,
  onDeleteTask,
  onStartEditTask,
}: TaskBoardProps) {
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>("all");
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const displayedTasks = useMemo(() => {
    const filtered =
      priorityFilter === "all"
        ? tasks
        : tasks.filter((task) => task.priority === priorityFilter);
    if (sortBy !== "dueDate") return filtered;
    return [...filtered].sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return a.dueDate.localeCompare(b.dueDate);
    });
  }, [tasks, priorityFilter, sortBy]);

  return (
    <div className="flex-1 flex flex-col px-8 pb-4 min-h-0">
      <div
        className="relative flex-1 rounded-2xl p-8 border-8 border-amber-950 min-h-0"
        style={{
          background: GRADIENTS.boardBg,
          boxShadow: `
            inset 0 4px 8px rgba(0,0,0,0.4),
            inset 0 -4px 8px rgba(255,255,255,0.05),
            0 20px 40px rgba(0,0,0,0.5),
            0 10px 20px rgba(0,0,0,0.3)
          `,
        }}
      >
        <div
          className="absolute inset-0 opacity-40 rounded-xl"
          style={getBoardBackdropPattern()}
        />

        <div
          className="absolute top-4 left-1/4 w-5 h-5 rounded-full border-2 border-red-950"
          style={PIN_STYLE}
        />
        <div
          className="absolute top-4 right-1/4 w-5 h-5 rounded-full border-2 border-red-950"
          style={PIN_STYLE}
        />

        <div
          className="relative h-full bg-linear-to-br from-amber-100/95 to-yellow-50/95 rounded-lg p-6 backdrop-blur-sm overflow-y-auto"
          style={{
            background: GRADIENTS.boardContent,
            boxShadow: `
              inset 0 4px 12px rgba(0,0,0,0.25),
              inset 0 -2px 8px rgba(255,255,255,0.3),
              0 2px 8px rgba(0,0,0,0.2)
            `,
          }}
        >
          {(completeMode || deleteMode || editMode) &&
            tasks.length > 0 &&
            (() => {
              const mode = completeMode
                ? "complete"
                : deleteMode
                  ? "delete"
                  : "edit";
              const modeStyle = BOARD_MODE_OVERLAY_STYLES[mode];
              return (
                <div
                  className="absolute inset-0 rounded-lg pointer-events-none z-10 flex items-start justify-center pt-4"
                  style={{
                    background: modeStyle.overlayBg,
                    border: `2px dashed ${modeStyle.overlayBorder}`,
                  }}
                >
                  <div
                    className="text-xs font-bold px-4 py-1.5 rounded-full tracking-widest shadow-lg"
                    style={{
                      fontFamily: "serif",
                      background: modeStyle.labelBg,
                      color: modeStyle.labelText,
                    }}
                  >
                    {modeStyle.message}
                  </div>
                </div>
              );
            })()}
          {tasks.length > 0 && (
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="flex flex-wrap gap-1.5">
                {FILTER_OPTIONS.map(({ value, label, text, badge, border }) => {
                  const active = priorityFilter === value;
                  return (
                    <button
                      key={value}
                      onClick={() => setPriorityFilter(value)}
                      className="text-[10px] font-bold px-2.5 py-1 rounded-full border transition-colors"
                      style={{
                        fontFamily: "serif",
                        color: active ? text : "#a8a29e",
                        background: active ? badge : "rgba(255,255,255,0.5)",
                        borderColor: active ? border : "rgba(180,150,80,0.3)",
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() =>
                  setSortBy((prev) => (prev === "dueDate" ? "default" : "dueDate"))
                }
                className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1 rounded-full border transition-colors"
                style={{
                  fontFamily: "serif",
                  color: sortBy === "dueDate" ? "#92400e" : "#a8a29e",
                  background:
                    sortBy === "dueDate" ? "#fef3c7" : "rgba(255,255,255,0.5)",
                  borderColor:
                    sortBy === "dueDate"
                      ? "#fcd34d"
                      : "rgba(180,150,80,0.3)",
                }}
              >
                <ArrowUpDown className="w-3 h-3" />
                마감일순
              </button>
            </div>
          )}
          {tasks.length === 0 ? (
            <p className="text-center text-amber-800/50 text-lg mt-8">
              퀘스트를 붙여보세요
            </p>
          ) : displayedTasks.length === 0 ? (
            <p className="text-center text-amber-800/50 text-lg mt-8">
              조건에 맞는 퀘스트가 없습니다
            </p>
          ) : (
            <div className="flex flex-wrap items-start gap-4">
              {displayedTasks.map((task, idx) => {
                const colors = PRIORITY_CARD_STYLES[task.priority];
                const labels = PRIORITY_LABELS;
                const rotation = ((idx * 137) % 9) - 4;
                const isSelected = selectedTaskIds.includes(task.id);
                return (
                  <div
                    key={task.id}
                    onClick={() => {
                      if (completeMode) onToggleSelectTask(task.id);
                      else if (deleteMode) onConfirmDeleteTask(task.id);
                      else if (editMode) onStartEditTask(task);
                    }}
                    className="relative w-44 rounded border-2 p-3 shadow-lg select-none"
                    style={{
                      background: isSelected ? "#fef3c7" : colors.bg,
                      borderColor: isSelected
                        ? "#dc2626"
                        : completeMode
                          ? "#b45309"
                          : deleteMode
                            ? "#64748b"
                            : editMode
                              ? "#ca8a04"
                              : colors.border,
                      boxShadow: isSelected
                        ? "4px 4px 10px rgba(0,0,0,0.2), 0 0 0 3px rgba(220,38,38,0.6)"
                        : completeMode
                          ? "4px 4px 10px rgba(0,0,0,0.2), 0 0 0 2px rgba(180,83,9,0.4)"
                          : deleteMode
                            ? "4px 4px 10px rgba(0,0,0,0.2), 0 0 0 2px rgba(100,116,139,0.4)"
                            : editMode
                              ? "4px 4px 10px rgba(0,0,0,0.2), 0 0 0 2px rgba(202,138,4,0.5)"
                              : "4px 4px 10px rgba(0,0,0,0.2), 2px 2px 5px rgba(0,0,0,0.15), inset 0 1px 2px rgba(255,255,255,0.6)",
                      transform: `rotate(${rotation}deg)`,
                      cursor:
                        completeMode || deleteMode || editMode
                          ? "pointer"
                          : "default",
                      transition: "border-color 0.2s, box-shadow 0.2s",
                    }}
                  >
                    <div
                      className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-red-900"
                      style={PIN_GRADIENT}
                    />
                    {editMode && (
                      <div className="absolute inset-0 rounded bg-yellow-400/5 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{
                            background: "rgba(202,138,4,0.15)",
                            border: "3px solid rgba(202,138,4,0.6)",
                          }}
                        >
                          <Edit3 className="w-5 h-5 text-yellow-600" />
                        </div>
                      </div>
                    )}
                    {deleteMode && confirmDeleteId !== task.id && (
                      <div className="absolute inset-0 rounded bg-slate-900/5 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center"
                          style={{
                            background: "rgba(71,85,105,0.15)",
                            border: "3px solid rgba(71,85,105,0.5)",
                          }}
                        >
                          <Trash2 className="w-5 h-5 text-slate-600" />
                        </div>
                      </div>
                    )}
                    {confirmDeleteId === task.id && (
                      <div
                        className="absolute inset-0 rounded flex flex-col items-center justify-center gap-1.5 z-20"
                        style={MODAL_OVERLAY_STYLE}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <p
                          className="text-white text-[11px] font-bold text-center px-2"
                          style={{ fontFamily: "serif" }}
                        >
                          삭제하시겠습니까?
                        </p>
                        <div className="flex gap-1.5">
                          <button
                            onClick={onCancelDelete}
                            className="px-3 py-1 rounded text-[11px] font-bold border border-stone-400 text-stone-300 hover:bg-stone-700 transition-colors"
                            style={{ fontFamily: "serif" }}
                          >
                            취소
                          </button>
                          <button
                            onClick={() => onDeleteTask(task.id)}
                            className="px-3 py-1 rounded text-[11px] font-bold transition-colors"
                            style={{
                              background: "#dc2626",
                              color: "#fff",
                              fontFamily: "serif",
                            }}
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    )}
                    {completeMode && !isSelected && (
                      <div className="absolute inset-0 rounded bg-amber-900/5 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <div
                          className="w-14 h-14 rounded-full border-4 border-red-700 flex items-center justify-center -rotate-12"
                          style={{
                            background: "rgba(220,38,38,0.12)",
                            boxShadow: "0 0 0 2px rgba(220,38,38,0.3)",
                          }}
                        >
                          <span
                            className="text-red-700 font-black text-[11px] tracking-widest"
                            style={{ fontFamily: "serif" }}
                          >
                            선택
                          </span>
                        </div>
                      </div>
                    )}
                    {isSelected && (
                      <div className="absolute inset-0 rounded flex items-center justify-center pointer-events-none">
                        <div
                          className="w-14 h-14 rounded-full border-4 border-red-600 flex items-center justify-center -rotate-12"
                          style={{
                            background: "rgba(220,38,38,0.18)",
                            boxShadow: "0 0 0 3px rgba(220,38,38,0.5)",
                          }}
                        >
                          <span
                            className="text-red-700 font-black text-[11px] tracking-widest"
                            style={{ fontFamily: "serif" }}
                          >
                            ✓완료
                          </span>
                        </div>
                      </div>
                    )}
                    <div
                      className="text-[10px] font-bold px-1.5 py-0.5 rounded-full inline-block mb-1.5 border"
                      style={{
                        color: colors.text,
                        background: colors.badge,
                        borderColor: colors.border,
                        fontFamily: "serif",
                      }}
                    >
                      {labels[task.priority]}
                    </div>
                    <div
                      className="font-bold text-stone-800 mb-1 leading-snug break-all"
                      style={{ fontFamily: "serif", fontSize: "13px" }}
                    >
                      {task.title}
                    </div>
                    {task.description && (
                      <div
                        className="text-stone-500 text-[11px] mb-2 leading-snug break-all"
                        style={{ fontFamily: "serif" }}
                      >
                        {task.description}
                      </div>
                    )}
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-stone-400 text-[10px]">
                        {task.dueDate}
                      </span>
                      <span
                        className="text-amber-700 font-black text-[11px]"
                        style={{ fontFamily: "serif" }}
                      >
                        +{task.reward}pt
                      </span>
                    </div>
                    {task.author && (
                      <div
                        className="mt-2 pt-1.5 border-t flex justify-end"
                        style={{ borderColor: "rgba(139,90,43,0.2)" }}
                      >
                        <span
                          className="text-stone-500 text-[10px] italic"
                          style={{
                            fontFamily: "serif",
                            letterSpacing: "0.05em",
                          }}
                        >
                          — {task.author}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
