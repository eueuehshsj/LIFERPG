import { Coins, PencilLine, Trash2 } from "lucide-react";

type ActionShelfProps = {
  onOpenAddTask: () => void;
  onToggleDeleteMode: () => void;
  onToggleEditMode: () => void;
  onOpenAddReward: () => void;
  onOpenRemoveReward: () => void;
  onOpenClaimReward: () => void;
  onOpenCompletedTasks: () => void;
  onCompleteSelected: () => void;
  completeMode: boolean;
  selectedTaskIds: number[];
};

export default function ActionShelf({
  onOpenAddTask,
  onToggleDeleteMode,
  onToggleEditMode,
  onOpenAddReward,
  onOpenRemoveReward,
  onOpenClaimReward,
  onOpenCompletedTasks,
  onCompleteSelected,
  completeMode,
  selectedTaskIds,
}: ActionShelfProps) {
  return (
    <div className="relative w-full px-4 pb-8 sm:px-8">
      <div className="w-full">
        <div
          className="h-4 w-full rounded-t-lg border-t-4 border-amber-950"
          style={{
            background: "linear-gradient(to bottom, #704214 0%, #5a3516 100%)",
            boxShadow:
              "inset 0 2px 4px rgba(0,0,0,0.5), 0 -2px 8px rgba(0,0,0,0.4)",
          }}
        />
        <div
          className="relative w-full min-h-52 sm:min-h-44 md:min-h-40 lg:min-h-34 px-3 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-6"
          style={{
            background: "linear-gradient(to bottom, #5a3516 0%, #3d2410 100%)",
            boxShadow: `
              inset 0 4px 8px rgba(0,0,0,0.6),
              inset 0 -2px 4px rgba(255,255,255,0.05),
              0 8px 20px rgba(0,0,0,0.6)
            `,
          }}
        >
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `
                repeating-linear-gradient(90deg,
                  rgba(90,53,22,0.8) 0px,
                  rgba(61,36,16,0.6) 4px,
                  rgba(90,53,22,0.8) 8px),
                repeating-linear-gradient(0deg,
                  transparent,
                  transparent 20px,
                  rgba(0,0,0,0.2) 20px,
                  rgba(0,0,0,0.2) 22px)
              `,
            }}
          />
          <div className="relative z-10 flex w-full flex-col items-center gap-4 pt-12 sm:flex-row sm:items-end sm:justify-between sm:gap-3 sm:pt-14 md:gap-4 md:pt-10 lg:gap-6 xl:gap-8">
            <div className="flex w-full flex-wrap justify-center gap-3 items-end sm:flex-1 sm:justify-start sm:gap-4">
              <button
                className="group relative hover:scale-105 transition-transform"
                onClick={onOpenAddTask}
              >
                <div className="relative w-32 h-40 flex items-end justify-center">
                  <div className="relative w-28 h-32">
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 rotate-2 w-24 h-28 bg-linear-to-br from-slate-100 to-slate-200 rounded-sm border border-slate-300"
                      style={{
                        boxShadow:
                          "0 6px 12px rgba(0,0,0,0.3), 0 3px 6px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.5)",
                      }}
                    />
                    <div
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 -rotate-1 w-24 h-28 bg-linear-to-br from-white to-slate-100 rounded-sm border border-slate-300"
                      style={{
                        boxShadow:
                          "0 8px 16px rgba(0,0,0,0.35), 0 4px 8px rgba(0,0,0,0.25), inset 0 1px 2px rgba(255,255,255,0.6)",
                      }}
                    />
                    <div
                      className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-28 bg-linear-to-br from-white to-slate-50 rounded-sm border border-slate-300"
                      style={{
                        boxShadow:
                          "0 10px 20px rgba(0,0,0,0.4), 0 6px 12px rgba(0,0,0,0.3), inset 0 1px 3px rgba(255,255,255,0.8)",
                      }}
                    >
                      <div className="absolute top-6 left-3 right-3 h-px bg-blue-300/60" />
                      <div className="absolute top-10 left-3 right-3 h-px bg-blue-300/60" />
                      <div className="absolute top-14 left-3 right-3 h-px bg-blue-300/60" />
                      <div className="absolute top-18 left-3 right-3 h-px bg-blue-300/60" />
                      <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                        <span
                          className="text-slate-700 font-bold text-xs"
                          style={{
                            textShadow: "0 1px 2px rgba(255,255,255,0.8)",
                          }}
                        >
                          퀘스트 추가
                        </span>
                      </div>
                    </div>
                    <div className="absolute top-0 right-0 w-20 h-5 rotate-45 origin-center z-10">
                      <div
                        className="absolute inset-0 bg-linear-to-br from-yellow-600 via-amber-500 to-yellow-700 rounded-full border border-amber-800"
                        style={{
                          boxShadow:
                            "0 4px 8px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,200,100,0.4), inset 0 -2px 4px rgba(0,0,0,0.3)",
                        }}
                      >
                        <div
                          className="absolute inset-0 opacity-40 rounded-full"
                          style={{
                            backgroundImage:
                              "repeating-linear-gradient(90deg, rgba(139,69,19,0.3) 0px, transparent 2px, rgba(0,0,0,0.2) 4px, transparent 6px)",
                          }}
                        />
                      </div>
                      <div
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-4 bg-linear-to-r from-amber-800 to-stone-900"
                        style={{ clipPath: "polygon(0 0, 100% 50%, 0 100%)" }}
                      />
                      <div
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-full bg-linear-to-br from-pink-400 to-pink-600 rounded-l-full border-l-2 border-pink-700"
                        style={{
                          boxShadow:
                            "inset 0 2px 3px rgba(255,200,220,0.5), 0 2px 4px rgba(0,0,0,0.4)",
                        }}
                      />
                      <div className="absolute left-2.5 top-1/2 -translate-y-1/2 w-1 h-full bg-linear-to-r from-slate-300 via-slate-400 to-slate-500" />
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <PencilLine
                          className="w-4 h-4 text-amber-900/30 -rotate-45"
                          strokeWidth={2}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </button>

              <button
                className="group relative hover:scale-105 transition-transform"
                onClick={onToggleDeleteMode}
              >
                <div className="relative w-20 h-32 flex items-end justify-center">
                  <div className="relative w-16 h-24">
                    <div
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-18 h-3 rounded-t-lg border-2 border-slate-400"
                      style={{
                        background:
                          "linear-gradient(to bottom, #94a3b8 0%, #64748b 100%)",
                        boxShadow:
                          "inset 0 2px 3px rgba(255,255,255,0.4), 0 2px 4px rgba(0,0,0,0.4)",
                      }}
                    />
                    <div
                      className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-20 rounded-b-lg border-2 border-slate-500"
                      style={{
                        background:
                          "linear-gradient(to bottom, #cbd5e1 0%, #94a3b8 50%, #64748b 100%)",
                        boxShadow:
                          "inset 0 2px 6px rgba(255,255,255,0.5), 0 6px 12px rgba(0,0,0,0.4)",
                      }}
                    >
                      <div className="absolute inset-y-2 left-1/4 w-px bg-slate-400/50" />
                      <div className="absolute inset-y-2 right-1/4 w-px bg-slate-400/50" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                        <Trash2
                          className="w-7 h-7 text-slate-700"
                          strokeWidth={2}
                          style={{
                            filter: "drop-shadow(0 2px 3px rgba(0,0,0,0.3))",
                          }}
                        />
                        <span
                          className="text-slate-700 font-bold text-[9px]"
                          style={{
                            textShadow: "0 1px 2px rgba(255,255,255,0.8)",
                          }}
                        >
                          삭제
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </button>

              <button
                className="group relative hover:scale-105 transition-transform"
                onClick={onToggleEditMode}
              >
                <div className="relative w-24 h-32 flex items-end justify-center">
                  <div className="relative w-20 h-28">
                    <div
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 w-18 h-20 rounded-b-lg border-2 border-slate-500 z-10"
                      style={{
                        background:
                          "linear-gradient(to bottom, #e2e8f0 0%, #cbd5e1 40%, #94a3b8 100%)",
                        boxShadow:
                          "inset 0 3px 8px rgba(255,255,255,0.6), 0 8px 16px rgba(0,0,0,0.4)",
                      }}
                    >
                      <div
                        className="absolute inset-0 opacity-20 rounded-b-lg"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 3px)",
                        }}
                      />
                      <div className="absolute inset-x-0 bottom-4 flex justify-center">
                        <span
                          className="text-slate-700 font-bold text-[10px]"
                          style={{
                            textShadow: "0 1px 2px rgba(255,255,255,0.8)",
                          }}
                        >
                          편집
                        </span>
                      </div>
                    </div>
                    <div
                      className="absolute bottom-12 left-3 w-2 h-20 rotate-[-25deg] origin-bottom bg-linear-to-r from-amber-100 to-amber-200 border border-amber-400 opacity-80"
                      style={{
                        boxShadow:
                          "inset 1px 0 2px rgba(255,255,255,0.6), 0 2px 4px rgba(0,0,0,0.3)",
                      }}
                    >
                      <div className="absolute top-2 left-0 right-0 h-px bg-amber-600/40" />
                      <div className="absolute top-6 left-0 right-0 h-px bg-amber-600/40" />
                      <div className="absolute top-10 left-0 right-0 h-px bg-amber-600/40" />
                      <div className="absolute top-14 left-0 right-0 h-px bg-amber-600/40" />
                    </div>
                    <div
                      className="absolute bottom-12 left-2 w-3 h-16 rotate-[-15deg] origin-bottom rounded-t-full border border-yellow-700"
                      style={{
                        background:
                          "linear-gradient(to bottom, #fde047 0%, #facc15 50%, #eab308 100%)",
                        boxShadow:
                          "inset 1px 0 3px rgba(255,255,255,0.5), 0 3px 6px rgba(0,0,0,0.4)",
                      }}
                    >
                      <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-b from-pink-400 to-pink-500 rounded-t-full border-b border-yellow-700" />
                      <div
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-linear-to-b from-stone-700 to-black"
                        style={{ clipPath: "polygon(50% 100%, 0 0, 100% 0)" }}
                      />
                    </div>
                    <div
                      className="absolute bottom-12 left-1/2 -translate-x-1/2 w-3 h-18 rounded-t-full border border-blue-800"
                      style={{
                        background:
                          "linear-gradient(to bottom, #60a5fa 0%, #3b82f6 50%, #2563eb 100%)",
                        boxShadow:
                          "inset 1px 0 3px rgba(255,255,255,0.5), 0 3px 6px rgba(0,0,0,0.4)",
                      }}
                    >
                      <div className="absolute top-0 left-0 right-0 h-3 bg-linear-to-b from-blue-600 to-blue-700 rounded-t-full border-b border-blue-800" />
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-2 bg-linear-to-b from-slate-700 to-black rounded-b-sm" />
                    </div>
                    <div
                      className="absolute bottom-12 right-2 w-3 h-15 rotate-15 origin-bottom rounded-t-full border border-orange-700"
                      style={{
                        background:
                          "linear-gradient(to bottom, #fb923c 0%, #f97316 50%, #ea580c 100%)",
                        boxShadow:
                          "inset 1px 0 3px rgba(255,255,255,0.5), 0 3px 6px rgba(0,0,0,0.4)",
                      }}
                    >
                      <div className="absolute top-0 left-0 right-0 h-2 bg-linear-to-b from-pink-400 to-pink-500 rounded-t-full border-b border-orange-700" />
                      <div
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-linear-to-b from-stone-700 to-black"
                        style={{ clipPath: "polygon(50% 100%, 0 0, 100% 0)" }}
                      />
                    </div>
                  </div>
                </div>
              </button>
            </div>

            <div className="flex flex-col items-center justify-center z-10 shrink-0 order-first sm:order-0">
              <button
                onClick={onCompleteSelected}
                className="group relative flex flex-col items-center"
                style={{
                  filter: completeMode
                    ? "drop-shadow(0 0 12px rgba(220,38,38,0.7))"
                    : "none",
                  transition: "filter 0.3s",
                }}
              >
                <div
                  className="relative w-10 h-8 rounded-t-lg"
                  style={{
                    background: completeMode
                      ? "linear-gradient(to bottom, #991b1b 0%, #7f1d1d 100%)"
                      : "linear-gradient(to bottom, #57534e 0%, #44403c 100%)",
                    boxShadow: completeMode
                      ? "inset 0 2px 4px rgba(255,100,100,0.3), inset 0 -2px 4px rgba(0,0,0,0.4), 0 4px 8px rgba(0,0,0,0.4)"
                      : "inset 0 2px 4px rgba(255,255,255,0.15), inset 0 -2px 4px rgba(0,0,0,0.4), 0 4px 8px rgba(0,0,0,0.4)",
                    transition: "all 0.2s",
                  }}
                >
                  <div
                    className="absolute top-2 left-2 right-2 h-1 rounded-full"
                    style={{ background: "rgba(0,0,0,0.3)" }}
                  />
                  <div
                    className="absolute top-4 left-2 right-2 h-1 rounded-full"
                    style={{ background: "rgba(0,0,0,0.3)" }}
                  />
                </div>
                <div
                  className="w-14 h-4"
                  style={{
                    background: completeMode
                      ? "linear-gradient(to bottom, #b91c1c 0%, #991b1b 100%)"
                      : "linear-gradient(to bottom, #78716c 0%, #57534e 100%)",
                    boxShadow:
                      "inset 0 1px 3px rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.4)",
                    transition: "all 0.2s",
                  }}
                />
                <div
                  className="w-16 h-6 rounded-b-sm flex items-center justify-center"
                  style={{
                    background: completeMode
                      ? "linear-gradient(to bottom, #dc2626 0%, #b91c1c 100%)"
                      : "linear-gradient(to bottom, #292524 0%, #1c1917 100%)",
                    boxShadow: completeMode
                      ? "inset 0 2px 4px rgba(0,0,0,0.4), 0 4px 8px rgba(220,38,38,0.5)"
                      : "inset 0 2px 4px rgba(0,0,0,0.6), 0 4px 8px rgba(0,0,0,0.4)",
                    transition: "all 0.2s",
                  }}
                >
                  <span
                    className="font-black tracking-widest"
                    style={{
                      fontFamily: "serif",
                      fontSize: "11px",
                      color: completeMode ? "#fef2f2" : "#a8a29e",
                      textShadow: completeMode
                        ? "0 0 6px rgba(255,100,100,0.5)"
                        : "none",
                    }}
                  >
                    완료
                  </span>
                </div>
                {completeMode && (
                  <div
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-2 rounded-full"
                    style={{
                      background:
                        "radial-gradient(ellipse, rgba(220,38,38,0.4) 0%, transparent 70%)",
                      filter: "blur(3px)",
                    }}
                  />
                )}
              </button>
              <span
                className="mt-2 text-[10px] font-bold tracking-widest"
                style={{
                  fontFamily: "serif",
                  color: completeMode ? "#fca5a5" : "rgba(245,245,244,0.5)",
                  textShadow: completeMode
                    ? "0 0 8px rgba(220,38,38,0.6)"
                    : "none",
                  transition: "all 0.3s",
                }}
              >
                {completeMode
                  ? selectedTaskIds.length > 0
                    ? `${selectedTaskIds.length}개 완료 확인`
                    : "완료 모드 ON"
                  : "완료 도장"}
              </span>
            </div>

            <div className="flex w-full flex-wrap justify-center gap-3 items-end sm:flex-1 sm:justify-end sm:gap-4">
              <button
                className="group relative hover:scale-105 transition-transform"
                onClick={onOpenAddReward}
              >
                <div className="relative w-24 h-36 flex items-end justify-center">
                  <div className="relative w-20 h-32">
                    <div className="relative w-16 h-10 mx-auto">
                      <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-6 rounded-t-full border-2 border-amber-800"
                        style={{
                          background:
                            "linear-gradient(to bottom, #92400e 0%, #78350f 100%)",
                          boxShadow:
                            "inset 0 1px 2px rgba(255,200,150,0.3), 0 2px 4px rgba(0,0,0,0.4)",
                        }}
                      />
                      <div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-8 rounded-t-full border-2 border-amber-900"
                        style={{
                          background:
                            "linear-gradient(to bottom, #a16207 0%, #854d0e 100%)",
                          boxShadow:
                            "inset 0 2px 4px rgba(255,200,100,0.3), 0 3px 6px rgba(0,0,0,0.4)",
                        }}
                      >
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-amber-950/50 rounded-full" />
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-11 h-1 bg-amber-950/40 rounded-full" />
                      </div>
                    </div>
                    <div
                      className="relative w-20 h-24 mx-auto"
                      style={{
                        borderRadius: "40% 40% 50% 50% / 25% 25% 75% 75%",
                      }}
                    >
                      <div
                        className="absolute inset-0 border-3 border-amber-900"
                        style={{
                          background:
                            "linear-gradient(145deg, #ca8a04 0%, #a16207 30%, #854d0e 70%, #713f12 100%)",
                          borderRadius: "40% 40% 50% 50% / 25% 25% 75% 75%",
                          boxShadow:
                            "inset 0 4px 8px rgba(255,200,100,0.3), inset 0 -4px 8px rgba(0,0,0,0.5), 0 10px 20px rgba(0,0,0,0.5)",
                        }}
                      >
                        <div
                          className="absolute inset-0 opacity-30"
                          style={{
                            backgroundImage:
                              "repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px), repeating-linear-gradient(-45deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)",
                            borderRadius: "40% 40% 50% 50% / 25% 25% 75% 75%",
                          }}
                        />
                        <div
                          className="absolute top-1/4 left-3 w-7 h-7 rounded-full"
                          style={{
                            background:
                              "radial-gradient(circle, rgba(250,204,21,0.4) 0%, transparent 70%)",
                            filter: "blur(3px)",
                          }}
                        />
                        <div
                          className="absolute top-1/2 right-3 w-6 h-6 rounded-full"
                          style={{
                            background:
                              "radial-gradient(circle, rgba(234,179,8,0.4) 0%, transparent 70%)",
                            filter: "blur(3px)",
                          }}
                        />
                        <div
                          className="absolute bottom-1/4 left-1/3 w-8 h-8 rounded-full"
                          style={{
                            background:
                              "radial-gradient(circle, rgba(250,204,21,0.5) 0%, transparent 70%)",
                            filter: "blur(4px)",
                          }}
                        />
                        <div
                          className="absolute inset-0 flex flex-col items-center justify-center gap-1 z-10"
                          style={{
                            borderRadius: "40% 40% 50% 50% / 25% 25% 75% 75%",
                          }}
                        >
                          <Coins
                            className="w-9 h-9 text-yellow-200"
                            strokeWidth={2.5}
                            style={{
                              filter: "drop-shadow(0 3px 6px rgba(0,0,0,0.6))",
                            }}
                          />
                          <span
                            className="text-yellow-100 font-bold text-center"
                            style={{
                              fontSize: "11px",
                              lineHeight: "1.4",
                              textShadow: "0 2px 4px rgba(0,0,0,0.8)",
                            }}
                          >
                            보상 목록
                            <br />
                            추가
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>

              <button
                className="group relative hover:scale-105 transition-transform"
                onClick={onOpenRemoveReward}
              >
                <div className="relative w-28 h-36 flex items-end justify-center">
                  <div className="relative w-24 h-32">
                    <div
                      className="absolute rounded-b-md"
                      style={{
                        left: "50%",
                        transform: "translateX(-50%)",
                        top: "36px",
                        bottom: "0px",
                        width: "14px",
                        background:
                          "linear-gradient(to right, #a16207 0%, #ca8a04 40%, #92400e 100%)",
                        boxShadow:
                          "inset 2px 0 4px rgba(255,200,100,0.25), inset -2px 0 4px rgba(0,0,0,0.45), 0 4px 8px rgba(0,0,0,0.35)",
                      }}
                    >
                      <div
                        className="absolute inset-0 opacity-25"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(0,0,0,0.25) 5px, rgba(0,0,0,0.25) 6px)",
                        }}
                      />
                    </div>
                    <div
                      className="absolute rounded-md overflow-hidden"
                      style={{
                        top: "0px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: "88px",
                        height: "40px",
                        background:
                          "linear-gradient(to bottom, #d1d5db 0%, #9ca3af 45%, #6b7280 100%)",
                        boxShadow:
                          "inset 0 3px 6px rgba(255,255,255,0.35), inset 0 -3px 6px rgba(0,0,0,0.45), 0 6px 14px rgba(0,0,0,0.5)",
                      }}
                    >
                      <div
                        className="absolute inset-0 opacity-30"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(255,255,255,0.08) 10px, rgba(255,255,255,0.08) 11px)",
                        }}
                      />
                      <div
                        className="absolute left-0 top-0 bottom-0 w-3 rounded-l-md"
                        style={{
                          background:
                            "linear-gradient(to right, #374151, #4b5563)",
                          boxShadow: "inset 2px 0 4px rgba(0,0,0,0.5)",
                        }}
                      />
                      <div
                        className="absolute right-0 top-0 bottom-0 w-3 rounded-r-md"
                        style={{
                          background:
                            "linear-gradient(to left, #374151, #4b5563)",
                          boxShadow: "inset -2px 0 4px rgba(0,0,0,0.5)",
                        }}
                      />
                      <div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-3 rounded-t-sm"
                        style={{
                          background: "rgba(0,0,0,0.35)",
                          boxShadow: "inset 0 2px 4px rgba(0,0,0,0.6)",
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center pb-1">
                        <span
                          className="text-slate-100 font-black text-[10px] tracking-widest"
                          style={{
                            textShadow: "0 1px 3px rgba(0,0,0,0.7)",
                            fontFamily: "serif",
                          }}
                        >
                          보상 제거
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </button>

              <button
                className="group relative hover:scale-105 transition-transform"
                onClick={onOpenClaimReward}
              >
                <div className="relative w-32 h-40 flex items-center justify-center">
                  <div
                    className="relative w-32 h-36 rounded-lg border-4 border-yellow-900"
                    style={{
                      background:
                        "linear-gradient(145deg, #d4a444 0%, #c9952d 30%, #b8841a 70%, #a67310 100%)",
                      boxShadow:
                        "inset 0 4px 8px rgba(255,220,150,0.4), inset 0 -4px 8px rgba(0,0,0,0.4), 0 12px 24px rgba(0,0,0,0.5)",
                    }}
                  >
                    <div
                      className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-2.5 bg-linear-to-b from-stone-950 to-stone-800 rounded-full border border-stone-900"
                      style={{ boxShadow: "inset 0 3px 6px rgba(0,0,0,0.9)" }}
                    />
                    <div
                      className="absolute inset-0 opacity-30 rounded-md"
                      style={{
                        backgroundImage:
                          "linear-gradient(135deg, rgba(255,255,255,0.5) 0%, transparent 30%, rgba(0,0,0,0.3) 70%, transparent 100%), repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(255,255,255,0.1) 8px, rgba(255,255,255,0.1) 9px)",
                      }}
                    />
                    <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-yellow-950/60" />
                    <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-yellow-950/60" />
                    <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-yellow-950/60" />
                    <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-yellow-950/60" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 z-10 pt-4">
                      <div
                        className="flex flex-col items-center leading-none"
                        style={{
                          filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.5))",
                        }}
                      >
                        <span
                          className="text-yellow-200 font-black"
                          style={{
                            fontSize: "26px",
                            textShadow: "0 2px 6px rgba(0,0,0,0.7)",
                          }}
                        >
                          {0}
                        </span>
                        <span
                          className="text-yellow-300/80 font-bold"
                          style={{
                            fontSize: "11px",
                            textShadow: "0 1px 3px rgba(0,0,0,0.6)",
                          }}
                        >
                          pt
                        </span>
                      </div>
                      <span
                        className="text-yellow-50 font-bold text-sm"
                        style={{ textShadow: "0 2px 4px rgba(0,0,0,0.6)" }}
                      >
                        보상
                      </span>
                    </div>
                    <div
                      className="absolute top-6 right-3 w-12 h-12 rounded-full"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)",
                        filter: "blur(8px)",
                      }}
                    />
                    <div
                      className="absolute bottom-6 left-4 w-8 h-8 rounded-full"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(255,230,150,0.3) 0%, transparent 60%)",
                        filter: "blur(6px)",
                      }}
                    />
                  </div>
                </div>
              </button>

              <button
                className="group relative hover:scale-105 transition-transform"
                onClick={onOpenCompletedTasks}
              >
                <div className="relative w-36 h-40 flex items-center justify-center">
                  <div className="relative w-32 h-36">
                    <div
                      className="absolute inset-0 rounded-lg border-t-2 border-b-2 border-amber-500"
                      style={{
                        background:
                          "linear-gradient(to bottom, #f5e6d3 0%, #f0dcc4 20%, #ebe0c9 40%, #e8d9bd 60%, #e5d4b8 80%, #e0cab0 100%)",
                        boxShadow:
                          "inset 0 2px 6px rgba(255,255,255,0.6), 0 10px 20px rgba(0,0,0,0.4)",
                      }}
                    >
                      <div
                        className="absolute inset-0 opacity-20 rounded-lg"
                        style={{
                          backgroundImage:
                            "repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(139,90,43,0.1) 1px, rgba(139,90,43,0.1) 2px)",
                        }}
                      />
                      <div className="absolute bottom-[66%] left-0 right-0 h-1 bg-linear-to-r from-transparent via-amber-600/50 to-transparent" />
                      <div className="absolute bottom-[33%] left-0 right-0 h-1 bg-linear-to-r from-transparent via-amber-600/50 to-transparent" />
                      {[2, "36%", "70%"].map((top, i) => (
                        <div key={i}>
                          <div
                            className="absolute inset-x-2 h-1 bg-amber-400/50 rounded-full"
                            style={{
                              top:
                                typeof top === "number" ? `${top * 4}px` : top,
                            }}
                          />
                          <div
                            className="absolute inset-x-3 h-1 bg-amber-400/40 rounded-full"
                            style={{
                              top:
                                typeof top === "number"
                                  ? `${top * 4 + 8}px`
                                  : `calc(${top} + 6%)`,
                            }}
                          />
                        </div>
                      ))}
                      <div className="absolute bottom-2 inset-x-2 h-1 bg-amber-500/50 rounded-full" />
                    </div>
                    <div
                      className="absolute left-0 top-0 bottom-0 w-4 rounded-l-full border-2 border-amber-500"
                      style={{
                        background:
                          "radial-gradient(ellipse at 30% 50%, #f5e6d3 0%, #e8d4b8 40%, #ddc5a5 100%)",
                        boxShadow:
                          "inset 2px 0 4px rgba(255,255,255,0.4), -2px 0 6px rgba(0,0,0,0.3)",
                      }}
                    >
                      <div className="absolute bottom-[66%] left-0 right-0 h-0.5 bg-amber-600/60" />
                      <div className="absolute bottom-[33%] left-0 right-0 h-0.5 bg-amber-600/60" />
                    </div>
                    <div
                      className="absolute right-0 top-0 bottom-0 w-4 rounded-r-full border-2 border-amber-600"
                      style={{
                        background:
                          "radial-gradient(ellipse at 70% 50%, #e8d4b8 0%, #ddc5a5 40%, #d2b894 100%)",
                        boxShadow:
                          "inset -2px 0 4px rgba(255,255,255,0.4), 2px 0 6px rgba(0,0,0,0.3)",
                      }}
                    >
                      <div className="absolute bottom-[66%] left-0 right-0 h-0.5 bg-amber-600/60" />
                      <div className="absolute bottom-[33%] left-0 right-0 h-0.5 bg-amber-600/60" />
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
