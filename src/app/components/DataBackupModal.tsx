import { useRef, useState } from "react";
import { Download, Upload, RotateCcw, X } from "lucide-react";
import {
  COMMON_STYLES,
  MODAL_COLORS,
  BUTTON_STYLES,
} from "../../styles/styleConstants";
import type { BackupData } from "../types";

interface Props {
  onClose: () => void;
  onExport: () => void;
  onImport: (data: BackupData) => void;
  onReset: () => void;
}

function isValidBackupData(value: unknown): value is BackupData {
  if (typeof value !== "object" || value === null) return false;
  const data = value as Record<string, unknown>;
  return (
    Array.isArray(data.tasks) &&
    Array.isArray(data.completedTasks) &&
    Array.isArray(data.rewards) &&
    typeof data.spentPoints === "number" &&
    typeof data.earnedPoints === "number"
  );
}

export default function DataBackupModal({
  onClose,
  onExport,
  onImport,
  onReset,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (!isValidBackupData(parsed)) {
        setImportError("백업 파일 형식이 올바르지 않습니다.");
        return;
      }
      setImportError(null);
      onImport(parsed);
      onClose();
    } catch {
      setImportError("파일을 읽는 중 오류가 발생했습니다.");
    }
  };

  const handleResetConfirm = () => {
    onReset();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={COMMON_STYLES.modalOverlay}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center border border-stone-600 hover:bg-stone-700 transition-colors"
        style={{ background: "rgba(28,25,23,0.8)" }}
      >
        <X className="w-5 h-5 text-stone-300" />
      </button>

      <div
        className="w-[420px] rounded-2xl border-4 border-amber-950 overflow-hidden flex flex-col"
        style={{
          background: MODAL_COLORS.default,
          boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
        }}
      >
        {/* 헤더 */}
        <div className="px-8 pt-6 pb-4 border-b-2 border-dashed border-amber-800/30 shrink-0">
          <div
            className="text-center"
            style={{
              fontFamily: "serif",
              fontSize: "11px",
              color: "#92400e",
              letterSpacing: "0.3em",
            }}
          >
            ✦ DATA MANAGEMENT ✦
          </div>
          <div
            className="font-black text-2xl mt-0.5 text-center"
            style={{ fontFamily: "serif", color: "#1c1917" }}
          >
            데이터 관리
          </div>
        </div>

        {/* 내용 */}
        <div className="px-8 py-6 flex flex-col gap-3">
          <button
            onClick={onExport}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors"
            style={{
              background: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(180,150,80,0.3)",
              fontFamily: "serif",
            }}
          >
            <Download className="w-5 h-5 text-amber-800 shrink-0" />
            <div className="text-left">
              <div className="font-bold text-stone-800 text-sm">
                데이터 내보내기
              </div>
              <div className="text-stone-500 text-xs mt-0.5">
                모든 퀘스트/보상 데이터를 JSON 파일로 저장합니다
              </div>
            </div>
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors"
            style={{
              background: "rgba(255,255,255,0.6)",
              border: "1px solid rgba(180,150,80,0.3)",
              fontFamily: "serif",
            }}
          >
            <Upload className="w-5 h-5 text-amber-800 shrink-0" />
            <div className="text-left">
              <div className="font-bold text-stone-800 text-sm">
                데이터 가져오기
              </div>
              <div className="text-stone-500 text-xs mt-0.5">
                백업 파일로 현재 데이터를 덮어씁니다
              </div>
            </div>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            onChange={handleFileChange}
            className="hidden"
          />
          {importError && (
            <p className="text-red-600 text-xs" style={{ fontFamily: "serif" }}>
              {importError}
            </p>
          )}

          <div className="border-t-2 border-dashed border-stone-300 my-1" />

          {!confirmReset ? (
            <button
              onClick={() => setConfirmReset(true)}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors"
              style={{
                background: "rgba(254,242,242,0.6)",
                border: "1px solid rgba(220,38,38,0.25)",
                fontFamily: "serif",
              }}
            >
              <RotateCcw className="w-5 h-5 text-red-700 shrink-0" />
              <div className="text-left">
                <div className="font-bold text-red-700 text-sm">
                  전체 초기화
                </div>
                <div className="text-red-500/80 text-xs mt-0.5">
                  모든 퀘스트/보상/포인트를 삭제합니다
                </div>
              </div>
            </button>
          ) : (
            <div
              className="rounded-xl p-4"
              style={{ border: "2px solid #ef4444", background: "rgba(254,242,242,0.8)" }}
            >
              <p
                className="font-black text-red-700 text-sm mb-0.5"
                style={{ fontFamily: "serif" }}
              >
                정말 초기화할까요?
              </p>
              <p
                className="text-red-500 text-xs mb-3"
                style={{ fontFamily: "serif" }}
              >
                이 작업은 되돌릴 수 없습니다.
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => setConfirmReset(false)}
                  className="flex-1 py-2 rounded-lg border-2 border-stone-300 text-stone-600 hover:bg-stone-50 transition-colors font-bold text-sm"
                  style={{ fontFamily: "serif" }}
                >
                  취소
                </button>
                <button
                  onClick={handleResetConfirm}
                  className="flex-1 py-2 rounded-lg font-black text-sm text-white transition-all"
                  style={{
                    fontFamily: "serif",
                    background: BUTTON_STYLES.danger.gradient,
                    boxShadow: "0 4px 12px rgba(220,38,38,0.4)",
                  }}
                >
                  초기화
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 하단 닫기 버튼 */}
        <div className="shrink-0 px-8 py-4" style={{ background: "#1c1917" }}>
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl font-black text-sm text-stone-300 hover:text-white hover:bg-stone-700 transition-colors"
            style={{ fontFamily: "serif", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
