import { useState } from 'react';
import { Edit3, Trash2 } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  reward: number;
  author: string;
}

interface Reward {
  id: number;
  name: string;
  points: number;
  description: string;
}

export default function App() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddRewardModal, setShowAddRewardModal] = useState(false);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [showRemoveRewardModal, setShowRemoveRewardModal] = useState(false);
  const [showCompletedModal, setShowCompletedModal] = useState(false);
  const [completeMode, setCompleteMode] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [spentPoints, setSpentPoints] = useState(0);

  const earnedPoints = completedTasks.reduce((sum, t) => sum + t.reward, 0);
  const totalPoints = earnedPoints - spentPoints;

  const handleAddTask = (task: Omit<Task, 'id'>) => {
    setTasks((prev) => [...prev, { ...task, id: Date.now() }]);
  };

  const handleEditTask = (task: Task, updated: Omit<Task, 'id'>) => {
    setTasks((prev) => prev.map((t) => t.id === task.id ? { ...updated, id: task.id } : t));
    setEditingTask(null);
    setEditMode(false);
  };

  const handleCompleteTask = (task: Task) => {
    setTasks((prev) => prev.filter((t) => t.id !== task.id));
    setCompletedTasks((prev) => [...prev, task]);
    setCompleteMode(false);
  };

  const handleAddReward = (reward: Omit<Reward, 'id'>) => {
    setRewards((prev) => [...prev, { ...reward, id: Date.now() }]);
  };

  const handleClaim = (reward: Reward) => {
    setSpentPoints((prev) => prev + reward.points);
  };

  return (
    <div className="size-full flex flex-col bg-gradient-to-br from-stone-700 via-stone-600 to-stone-800">
      {/* 상단 목판 제목 */}
      <div className="flex justify-center py-6">
        <div className="relative">
          <div
            className="relative px-16 py-6 rounded-lg border-4 border-amber-950"
            style={{
              background: 'linear-gradient(135deg, #8b4513 0%, #654321 50%, #4a2c0f 100%)',
              boxShadow: `
                inset 0 2px 4px rgba(255,255,255,0.1),
                inset 0 -2px 4px rgba(0,0,0,0.5),
                0 8px 16px rgba(0,0,0,0.6),
                0 4px 8px rgba(0,0,0,0.4)
              `,
            }}
          >
            {/* 나무 질감 오버레이 */}
            <div
              className="absolute inset-0 opacity-30 rounded-lg"
              style={{
                backgroundImage: `
                  repeating-linear-gradient(90deg,
                    rgba(139,69,19,0.5) 0px,
                    rgba(101,67,33,0.5) 2px,
                    rgba(74,44,15,0.5) 4px,
                    rgba(101,67,33,0.5) 6px,
                    rgba(139,69,19,0.5) 8px),
                  repeating-linear-gradient(0deg,
                    transparent,
                    transparent 40px,
                    rgba(0,0,0,0.1) 40px,
                    rgba(0,0,0,0.1) 42px)
                `,
              }}
            />
            {/* 나무못 장식 */}
            <div className="absolute top-3 left-3 w-4 h-4 rounded-full bg-gradient-to-br from-stone-800 to-stone-950"
                 style={{ boxShadow: 'inset 0 2px 3px rgba(0,0,0,0.8), 0 1px 2px rgba(0,0,0,0.5)' }} />
            <div className="absolute top-3 right-3 w-4 h-4 rounded-full bg-gradient-to-br from-stone-800 to-stone-950"
                 style={{ boxShadow: 'inset 0 2px 3px rgba(0,0,0,0.8), 0 1px 2px rgba(0,0,0,0.5)' }} />
            <div className="absolute bottom-3 left-3 w-4 h-4 rounded-full bg-gradient-to-br from-stone-800 to-stone-950"
                 style={{ boxShadow: 'inset 0 2px 3px rgba(0,0,0,0.8), 0 1px 2px rgba(0,0,0,0.5)' }} />
            <div className="absolute bottom-3 right-3 w-4 h-4 rounded-full bg-gradient-to-br from-stone-800 to-stone-950"
                 style={{ boxShadow: 'inset 0 2px 3px rgba(0,0,0,0.8), 0 1px 2px rgba(0,0,0,0.5)' }} />
            <h1
              className="text-4xl font-bold text-amber-100 tracking-wide relative z-10"
              style={{
                textShadow: '3px 3px 6px rgba(0,0,0,0.8), 1px 1px 2px rgba(0,0,0,0.9)',
                filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
              }}
            >
              투두퀘스트
            </h1>
          </div>
        </div>
      </div>

      {/* 메인 게시판 */}
      <div className="flex-1 flex flex-col px-8 pb-4">
        <div
          className="relative flex-1 rounded-2xl p-8 border-8 border-amber-950"
          style={{
            background: 'linear-gradient(145deg, #a0713a 0%, #8b5a2b 30%, #6d451f 60%, #5a3716 100%)',
            boxShadow: `
              inset 0 4px 8px rgba(0,0,0,0.4),
              inset 0 -4px 8px rgba(255,255,255,0.05),
              0 20px 40px rgba(0,0,0,0.5),
              0 10px 20px rgba(0,0,0,0.3)
            `,
          }}
        >
          {/* 나무 질감 오버레이 */}
          <div
            className="absolute inset-0 opacity-40 rounded-xl"
            style={{
              backgroundImage: `
                repeating-linear-gradient(90deg,
                  rgba(139,90,43,0.8) 0px,
                  rgba(101,67,33,0.6) 3px,
                  rgba(74,44,15,0.7) 6px,
                  rgba(101,67,33,0.6) 9px,
                  rgba(139,90,43,0.8) 12px),
                repeating-linear-gradient(0deg,
                  transparent,
                  transparent 60px,
                  rgba(0,0,0,0.15) 60px,
                  rgba(0,0,0,0.15) 63px),
                radial-gradient(ellipse at 20% 30%, rgba(160,113,58,0.3) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 70%, rgba(90,55,22,0.3) 0%, transparent 50%)
              `,
            }}
          />

          {/* 게시판 핀 */}
          <div
            className="absolute top-4 left-1/4 w-5 h-5 rounded-full bg-gradient-to-br from-red-500 to-red-800 border-2 border-red-950"
            style={{
              boxShadow: `
                inset -2px -2px 4px rgba(0,0,0,0.5),
                inset 2px 2px 4px rgba(255,100,100,0.3),
                0 4px 8px rgba(0,0,0,0.6),
                0 2px 4px rgba(0,0,0,0.4)
              `,
            }}
          />
          <div
            className="absolute top-4 right-1/4 w-5 h-5 rounded-full bg-gradient-to-br from-red-500 to-red-800 border-2 border-red-950"
            style={{
              boxShadow: `
                inset -2px -2px 4px rgba(0,0,0,0.5),
                inset 2px 2px 4px rgba(255,100,100,0.3),
                0 4px 8px rgba(0,0,0,0.6),
                0 2px 4px rgba(0,0,0,0.4)
              `,
            }}
          />

          {/* 게시판 내용 영역 */}
          <div
            className="relative h-full bg-gradient-to-br from-amber-100/95 to-yellow-50/95 rounded-lg p-6 backdrop-blur-sm overflow-auto"
            style={{
              boxShadow: `
                inset 0 4px 12px rgba(0,0,0,0.25),
                inset 0 -2px 8px rgba(255,255,255,0.3),
                0 2px 8px rgba(0,0,0,0.2)
              `,
            }}
          >
            {(completeMode || deleteMode || editMode) && tasks.length > 0 && (
              <div
                className="absolute inset-0 rounded-lg pointer-events-none z-10 flex items-start justify-center pt-4"
                style={{
                  background: completeMode
                    ? 'rgba(220,38,38,0.04)'
                    : deleteMode
                    ? 'rgba(71,85,105,0.04)'
                    : 'rgba(202,138,4,0.04)',
                  border: `2px dashed ${
                    completeMode
                      ? 'rgba(220,38,38,0.3)'
                      : deleteMode
                      ? 'rgba(71,85,105,0.3)'
                      : 'rgba(202,138,4,0.4)'
                  }`,
                }}
              >
                <div
                  className="text-xs font-bold px-4 py-1.5 rounded-full tracking-widest shadow-lg"
                  style={{
                    fontFamily: 'serif',
                    background: completeMode
                      ? 'rgba(185,28,28,0.8)'
                      : deleteMode
                      ? 'rgba(51,65,85,0.8)'
                      : 'rgba(161,110,5,0.85)',
                    color: completeMode ? '#fef2f2' : deleteMode ? '#f1f5f9' : '#fefce8',
                  }}
                >
                  {completeMode
                    ? '완료할 일정을 클릭하세요'
                    : deleteMode
                    ? '삭제할 일정을 클릭하세요'
                    : '편집할 일정을 클릭하세요'}
                </div>
              </div>
            )}
            {tasks.length === 0 ? (
              <p className="text-center text-amber-800/50 text-lg mt-8">할 일을 붙여보세요</p>
            ) : (
              <div className="flex flex-wrap gap-4">
                {tasks.map((task, idx) => {
                  const colors = {
                    low: { bg: '#f0fdf4', border: '#86efac', text: '#15803d', badge: '#dcfce7' },
                    medium: { bg: '#fffbeb', border: '#fcd34d', text: '#b45309', badge: '#fef3c7' },
                    high: { bg: '#fef2f2', border: '#fca5a5', text: '#b91c1c', badge: '#fee2e2' },
                  }[task.priority];
                  const labels = { low: '보통', medium: '중요', high: '긴급' };
                  const rotation = ((idx * 137) % 9) - 4;
                  return (
                    <div
                      key={task.id}
                      onClick={() => {
                        if (completeMode) handleCompleteTask(task);
                        else if (deleteMode) { setTasks((prev) => prev.filter((t) => t.id !== task.id)); setDeleteMode(false); }
                        else if (editMode) setEditingTask(task);
                      }}
                      className="relative w-44 rounded border-2 p-3 shadow-lg select-none"
                      style={{
                        background: colors.bg,
                        borderColor: completeMode ? '#b45309' : deleteMode ? '#64748b' : editMode ? '#ca8a04' : colors.border,
                        boxShadow: completeMode
                          ? '4px 4px 10px rgba(0,0,0,0.2), 0 0 0 2px rgba(180,83,9,0.4)'
                          : deleteMode
                          ? '4px 4px 10px rgba(0,0,0,0.2), 0 0 0 2px rgba(100,116,139,0.4)'
                          : editMode
                          ? '4px 4px 10px rgba(0,0,0,0.2), 0 0 0 2px rgba(202,138,4,0.5)'
                          : '4px 4px 10px rgba(0,0,0,0.2), 2px 2px 5px rgba(0,0,0,0.15), inset 0 1px 2px rgba(255,255,255,0.6)',
                        transform: `rotate(${rotation}deg)`,
                        cursor: (completeMode || deleteMode || editMode) ? 'pointer' : 'default',
                        transition: 'border-color 0.2s, box-shadow 0.2s',
                      }}
                    >
                      {/* 핀 */}
                      <div
                        className="absolute -top-2.5 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-2 border-red-900"
                        style={{
                          background: 'radial-gradient(circle at 35% 35%, #f87171, #991b1b)',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.5), inset 0 1px 2px rgba(255,150,150,0.4)',
                        }}
                      />
                      {/* 편집 모드 hover 오버레이 */}
                      {editMode && (
                        <div className="absolute inset-0 rounded bg-yellow-400/5 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <div
                            className="w-12 h-12 rounded-full flex items-center justify-center"
                            style={{ background: 'rgba(202,138,4,0.15)', border: '3px solid rgba(202,138,4,0.6)' }}
                          >
                            <Edit3 className="w-5 h-5 text-yellow-600" />
                          </div>
                        </div>
                      )}
                      {/* 삭제 모드 hover 오버레이 */}
                      {deleteMode && (
                        <div className="absolute inset-0 rounded bg-slate-900/5 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <div
                            className="w-12 h-12 rounded-full flex items-center justify-center"
                            style={{ background: 'rgba(71,85,105,0.15)', border: '3px solid rgba(71,85,105,0.5)' }}
                          >
                            <Trash2 className="w-5 h-5 text-slate-600" />
                          </div>
                        </div>
                      )}
                      {/* 완료 모드 hover 오버레이 */}
                      {completeMode && (
                        <div className="absolute inset-0 rounded bg-amber-900/5 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <div
                            className="w-14 h-14 rounded-full border-4 border-red-700 flex items-center justify-center -rotate-12"
                            style={{ background: 'rgba(220,38,38,0.12)', boxShadow: '0 0 0 2px rgba(220,38,38,0.3)' }}
                          >
                            <span className="text-red-700 font-black text-[11px] tracking-widest" style={{ fontFamily: 'serif' }}>완료</span>
                          </div>
                        </div>
                      )}
                      {/* priority 뱃지 */}
                      <div
                        className="text-[10px] font-bold px-1.5 py-0.5 rounded-full inline-block mb-1.5 border"
                        style={{ color: colors.text, background: colors.badge, borderColor: colors.border, fontFamily: 'serif' }}
                      >
                        {labels[task.priority]}
                      </div>
                      {/* 제목 */}
                      <div
                        className="font-bold text-stone-800 mb-1 leading-snug"
                        style={{ fontFamily: 'serif', fontSize: '13px' }}
                      >
                        {task.title}
                      </div>
                      {/* 설명 */}
                      {task.description && (
                        <div
                          className="text-stone-500 text-[11px] mb-2 leading-snug line-clamp-2"
                          style={{ fontFamily: 'serif' }}
                        >
                          {task.description}
                        </div>
                      )}
                      {/* 마감일 + 포인트 */}
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-stone-400 text-[10px]">{task.dueDate}</span>
                        <span className="text-amber-700 font-black text-[11px]" style={{ fontFamily: 'serif' }}>
                          +{task.reward}pt
                        </span>
                      </div>
                      {/* 작성자 */}
                      {task.author && (
                        <div
                          className="mt-2 pt-1.5 border-t flex justify-end"
                          style={{ borderColor: 'rgba(139,90,43,0.2)' }}
                        >
                          <span className="text-stone-500 text-[10px] italic" style={{ fontFamily: 'serif', letterSpacing: '0.05em' }}>
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

      {/* 하단 가판대 */}
      <div className="relative px-8 pb-8">
        {/* 선반 상단 바 */}
        <div
          className="h-4 w-full rounded-t-lg border-t-4 border-amber-950"
          style={{
            background: 'linear-gradient(to bottom, #704214 0%, #5a3516 100%)',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5), 0 -2px 8px rgba(0,0,0,0.4)',
          }}
        />
        {/* 선반 본체 */}
        <div
          className="h-24 w-full relative"
          style={{
            background: 'linear-gradient(to bottom, #5a3516 0%, #3d2410 100%)',
            boxShadow: `
              inset 0 4px 8px rgba(0,0,0,0.6),
              inset 0 -2px 4px rgba(255,255,255,0.05),
              0 8px 20px rgba(0,0,0,0.6)
            `,
          }}
        >
          {/* 나무 질감 */}
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
          {/* 버튼 영역 */}
          <div className="absolute -top-20 left-0 right-0 flex justify-between items-end px-12">
            {/* 왼쪽 버튼 그룹 */}
            <div className="flex gap-4 items-end" />
            {/* 중앙 완료 도장 */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 flex flex-col items-center z-10">
              <button
                onClick={() => { setCompleteMode((v) => !v); setDeleteMode(false); setEditMode(false); }}
                className="group relative flex flex-col items-center"
                style={{ filter: completeMode ? 'drop-shadow(0 0 12px rgba(220,38,38,0.7))' : 'none', transition: 'filter 0.3s' }}
              >
                {/* 도장 손잡이 */}
                <div
                  className="relative w-10 h-8 rounded-t-lg"
                  style={{
                    background: completeMode
                      ? 'linear-gradient(to bottom, #991b1b 0%, #7f1d1d 100%)'
                      : 'linear-gradient(to bottom, #57534e 0%, #44403c 100%)',
                    boxShadow: completeMode
                      ? 'inset 0 2px 4px rgba(255,100,100,0.3), inset 0 -2px 4px rgba(0,0,0,0.4), 0 4px 8px rgba(0,0,0,0.4)'
                      : 'inset 0 2px 4px rgba(255,255,255,0.15), inset 0 -2px 4px rgba(0,0,0,0.4), 0 4px 8px rgba(0,0,0,0.4)',
                    transition: 'all 0.2s',
                  }}
                >
                  <div className="absolute top-2 left-2 right-2 h-1 rounded-full" style={{ background: 'rgba(0,0,0,0.3)' }} />
                  <div className="absolute top-4 left-2 right-2 h-1 rounded-full" style={{ background: 'rgba(0,0,0,0.3)' }} />
                </div>
                {/* 도장 몸통 */}
                <div
                  className="w-14 h-4"
                  style={{
                    background: completeMode
                      ? 'linear-gradient(to bottom, #b91c1c 0%, #991b1b 100%)'
                      : 'linear-gradient(to bottom, #78716c 0%, #57534e 100%)',
                    boxShadow: 'inset 0 1px 3px rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.4)',
                    transition: 'all 0.2s',
                  }}
                />
                {/* 도장 잉크 면 */}
                <div
                  className="w-16 h-6 rounded-b-sm flex items-center justify-center"
                  style={{
                    background: completeMode
                      ? 'linear-gradient(to bottom, #dc2626 0%, #b91c1c 100%)'
                      : 'linear-gradient(to bottom, #292524 0%, #1c1917 100%)',
                    boxShadow: completeMode
                      ? 'inset 0 2px 4px rgba(0,0,0,0.4), 0 4px 8px rgba(220,38,38,0.5)'
                      : 'inset 0 2px 4px rgba(0,0,0,0.6), 0 4px 8px rgba(0,0,0,0.4)',
                    transition: 'all 0.2s',
                  }}
                >
                  <span
                    className="font-black tracking-widest"
                    style={{
                      fontFamily: 'serif',
                      fontSize: '11px',
                      color: completeMode ? '#fef2f2' : '#a8a29e',
                      textShadow: completeMode ? '0 0 6px rgba(255,100,100,0.5)' : 'none',
                    }}
                  >
                    완료
                  </span>
                </div>
                {/* 잉크 번짐 효과 (활성화 시) */}
                {completeMode && (
                  <div
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-2 rounded-full"
                    style={{ background: 'radial-gradient(ellipse, rgba(220,38,38,0.4) 0%, transparent 70%)', filter: 'blur(3px)' }}
                  />
                )}
              </button>
              <span
                className="mt-2 text-[10px] font-bold tracking-widest"
                style={{
                  fontFamily: 'serif',
                  color: completeMode ? '#fca5a5' : 'rgba(245,245,244,0.5)',
                  textShadow: completeMode ? '0 0 8px rgba(220,38,38,0.6)' : 'none',
                  transition: 'all 0.3s',
                }}
              >
                {completeMode ? '완료 모드 ON' : '완료 도장'}
              </span>
            </div>
            {/* 오른쪽 버튼 그룹 */}
            <div className="flex gap-4 items-end" />
          </div>
        </div>
        {/* 가판대 다리 */}
        <div className="flex justify-around px-32">
          <div
            className="w-6 h-12 rounded-b-lg"
            style={{
              background: 'linear-gradient(to bottom, #3d2410 0%, #5a3516 100%)',
              boxShadow: `
                inset 0 2px 4px rgba(0,0,0,0.6),
                inset 2px 0 4px rgba(0,0,0,0.4),
                inset -2px 0 4px rgba(0,0,0,0.4),
                0 4px 8px rgba(0,0,0,0.5)
              `,
            }}
          />
          <div
            className="w-6 h-12 rounded-b-lg"
            style={{
              background: 'linear-gradient(to bottom, #3d2410 0%, #5a3516 100%)',
              boxShadow: `
                inset 0 2px 4px rgba(0,0,0,0.6),
                inset 2px 0 4px rgba(0,0,0,0.4),
                inset -2px 0 4px rgba(0,0,0,0.4),
                0 4px 8px rgba(0,0,0,0.5)
              `,
            }}
          />
        </div>
      </div>
    </div>
  );
}
