import { useState } from 'react';
import { X, Hammer, Trash2 } from 'lucide-react';

interface Reward {
  id: number;
  name: string;
  points: number;
  description: string;
}

interface Props {
  onClose: () => void;
  onRemove: (id: number) => void;
  rewards: Reward[];
}

export default function RemoveRewardModal({ onClose, onRemove, rewards }: Props) {
  const [confirmId, setConfirmId] = useState<number | null>(null);

  const handleRemove = (id: number) => {
    onRemove(id);
    setConfirmId(null);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: 'rgba(30,15,5,0.75)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center border border-stone-600 hover:bg-stone-700 transition-colors"
        style={{ background: 'rgba(28,25,23,0.8)' }}
      >
        <X className="w-5 h-5 text-stone-300" />
      </button>

      <div
        className="w-[480px] rounded-2xl border-4 border-amber-950 overflow-hidden flex flex-col"
        style={{
          background: 'linear-gradient(160deg, #fdf6e3, #faf0d7)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
          maxHeight: '80vh',
        }}
      >
        {/* 헤더 */}
        <div className="px-8 pt-6 pb-4 border-b-2 border-dashed border-amber-800/30 shrink-0">
          <div className="flex items-center justify-center gap-3 mb-1">
            <Hammer className="w-5 h-5 text-amber-800" />
            <span style={{ fontFamily: 'serif', fontSize: '11px', color: '#92400e', letterSpacing: '0.3em' }}>
              REMOVE REWARD
            </span>
            <Hammer className="w-5 h-5 text-amber-800 scale-x-[-1]" />
          </div>
          <div className="text-center">
            <div className="font-black text-2xl" style={{ fontFamily: 'serif', color: '#1c1917' }}>
              보상 제거
            </div>
            <div className="text-stone-500 text-xs mt-1" style={{ fontFamily: 'serif' }}>
              제거할 보상을 선택하세요
            </div>
          </div>
        </div>

        {/* 목록 */}
        <div className="flex-1 overflow-y-auto px-8 py-5">
          {rewards.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <Hammer className="w-14 h-14 text-stone-300" strokeWidth={1.5} style={{ opacity: 0.2 }} />
              <p className="text-stone-400 font-bold text-sm text-center" style={{ fontFamily: 'serif' }}>
                등록된 보상이 없습니다
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {rewards.map((r) =>
                confirmId === r.id ? (
                  /* 삭제 확인 상태 */
                  <div
                    key={r.id}
                    className="rounded-xl p-4"
                    style={{ border: '2px solid #ef4444', background: 'rgba(254,242,242,0.8)' }}
                  >
                    <p className="font-black text-red-700 text-sm mb-0.5" style={{ fontFamily: 'serif' }}>
                      "{r.name}"을 제거할까요?
                    </p>
                    <p className="text-red-500 text-xs mb-3" style={{ fontFamily: 'serif' }}>
                      이 작업은 되돌릴 수 없습니다.
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setConfirmId(null)}
                        className="flex-1 py-2 rounded-lg border-2 border-stone-300 text-stone-600 hover:bg-stone-50 transition-colors font-bold text-sm"
                        style={{ fontFamily: 'serif' }}
                      >
                        취소
                      </button>
                      <button
                        onClick={() => handleRemove(r.id)}
                        className="flex-1 py-2 rounded-lg font-black text-sm text-white transition-all"
                        style={{
                          fontFamily: 'serif',
                          background: 'linear-gradient(135deg, #dc2626, #b91c1c)',
                          boxShadow: '0 4px 12px rgba(220,38,38,0.4)',
                        }}
                      >
                        제거
                      </button>
                    </div>
                  </div>
                ) : (
                  /* 일반 항목 */
                  <div
                    key={r.id}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.6)', border: '1px solid rgba(180,150,80,0.25)' }}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-stone-800 text-sm" style={{ fontFamily: 'serif' }}>
                        {r.name}
                      </div>
                      {r.description && (
                        <div className="text-stone-500 text-xs mt-0.5 line-clamp-1" style={{ fontFamily: 'serif' }}>
                          {r.description}
                        </div>
                      )}
                    </div>
                    <span className="font-black text-amber-700 text-sm shrink-0" style={{ fontFamily: 'serif' }}>
                      {r.points}pt
                    </span>
                    <button
                      onClick={() => setConfirmId(r.id)}
                      className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center hover:bg-red-50 transition-colors"
                      style={{ border: '1px solid rgba(220,38,38,0.2)' }}
                    >
                      <Trash2 className="w-4 h-4 text-red-400 hover:text-red-600" />
                    </button>
                  </div>
                )
              )}
            </div>
          )}
        </div>

        {/* 하단 닫기 버튼 */}
        <div className="shrink-0 px-8 py-4" style={{ background: '#1c1917' }}>
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl font-black text-sm text-stone-300 hover:text-white hover:bg-stone-700 transition-colors"
            style={{ fontFamily: 'serif', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}
