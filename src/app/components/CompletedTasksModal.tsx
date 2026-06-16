import { X, CheckCircle } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  reward: number;
  author: string;
}

interface Props {
  onClose: () => void;
  completedTasks: Task[];
}

const PRIORITY_LABEL = { low: '보통', medium: '중요', high: '긴급' } as const;
const PRIORITY_STYLE = {
  low:    { color: '#15803d', background: '#dcfce7', border: '#86efac' },
  medium: { color: '#b45309', background: '#fef3c7', border: '#fcd34d' },
  high:   { color: '#b91c1c', background: '#fee2e2', border: '#fca5a5' },
} as const;

export default function CompletedTasksModal({ onClose, completedTasks }: Props) {
  const totalPoints = completedTasks.reduce((sum, t) => sum + t.reward, 0);

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
        className="w-[520px] rounded-2xl border-4 border-amber-950 overflow-hidden flex flex-col"
        style={{
          background: 'linear-gradient(160deg, #fdf6e3, #faf0d7)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
          maxHeight: '80vh',
        }}
      >
        {/* 헤더 */}
        <div className="px-8 pt-6 pb-4 border-b-2 border-dashed border-amber-800/30 shrink-0">
          <div className="text-center mb-2">
            <div style={{ fontFamily: 'serif', fontSize: '11px', color: '#92400e', letterSpacing: '0.3em' }}>
              ✦ COMPLETED ✦
            </div>
            <div className="font-black text-2xl mt-0.5" style={{ fontFamily: 'serif', color: '#1c1917' }}>
              해결한 퀘스트 목록
            </div>
          </div>
          <div className="flex justify-center gap-4 mt-3">
            <div className="text-center">
              <span className="font-black text-stone-700" style={{ fontFamily: 'serif', fontSize: '18px' }}>
                {completedTasks.length}
              </span>
              <span className="text-stone-500 text-xs ml-1" style={{ fontFamily: 'serif' }}>건 완료</span>
            </div>
            <div className="w-px bg-amber-800/20" />
            <div className="text-center">
              <span className="font-black text-amber-700" style={{ fontFamily: 'serif', fontSize: '18px' }}>
                {totalPoints}
              </span>
              <span className="text-stone-500 text-xs ml-1" style={{ fontFamily: 'serif' }}>pt 획득</span>
            </div>
          </div>
        </div>

        {/* 목록 */}
        <div className="flex-1 overflow-y-auto px-8 py-5">
          {completedTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <CheckCircle className="w-14 h-14 text-stone-300" strokeWidth={1.5} style={{ opacity: 0.2 }} />
              <p className="text-stone-400 font-bold text-sm text-center" style={{ fontFamily: 'serif' }}>
                아직 해결한 퀘스트가 없습니다
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {completedTasks.map((task, idx) => {
                const ps = PRIORITY_STYLE[task.priority];
                return (
                  <div
                    key={task.id}
                    className="relative rounded-xl border overflow-hidden"
                    style={{
                      background: 'rgba(255,255,255,0.55)',
                      borderColor: '#e7e5e4',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    }}
                  >
                    {/* 완료 도장 흔적 */}
                    <div
                      className="absolute top-1/2 right-4 -translate-y-1/2 w-14 h-14 rounded-full border-4 border-red-700 flex items-center justify-center -rotate-12 pointer-events-none"
                      style={{ opacity: 0.15 }}
                    >
                      <span className="text-red-700 font-black text-[9px] text-center leading-tight" style={{ fontFamily: 'serif' }}>
                        완료
                      </span>
                    </div>

                    <div className="relative px-4 py-3 pr-16">
                      <div className="flex items-start gap-3">
                        {/* 번호 뱃지 */}
                        <div
                          className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-black text-xs text-white mt-0.5"
                          style={{ background: 'linear-gradient(135deg, #92400e, #78350f)', fontSize: '10px' }}
                        >
                          {idx + 1}
                        </div>

                        <div className="flex-1 min-w-0">
                          {/* priority 뱃지 + 체크 아이콘 */}
                          <div className="flex items-center gap-2 mb-1">
                            <span
                              className="text-[10px] font-bold px-1.5 py-0.5 rounded-full border"
                              style={{ color: ps.color, background: ps.background, borderColor: ps.border, fontFamily: 'serif' }}
                            >
                              {PRIORITY_LABEL[task.priority]}
                            </span>
                            <CheckCircle className="w-3.5 h-3.5 text-green-500" strokeWidth={2.5} />
                          </div>

                          {/* 제목 */}
                          <div className="font-black text-stone-800 leading-snug" style={{ fontFamily: 'serif', fontSize: '14px' }}>
                            {task.title}
                          </div>

                          {/* 설명 */}
                          {task.description && (
                            <div
                              className="text-stone-500 text-xs mt-0.5 leading-snug line-clamp-2"
                              style={{ fontFamily: 'serif' }}
                            >
                              {task.description}
                            </div>
                          )}

                          {/* 하단: 마감일 + 포인트 */}
                          <div className="flex justify-between items-center mt-2">
                            <span className="text-stone-400 text-[10px]">{task.dueDate}</span>
                            <span className="font-black text-amber-700 text-[11px]" style={{ fontFamily: 'serif' }}>
                              +{task.reward}pt
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
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
