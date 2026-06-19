import { useState, useEffect } from 'react';
import { Coins, Edit3, PencilLine, Trash2 } from 'lucide-react';
import AddTaskModal from './components/AddTaskModal';
import AddRewardModal from './components/AddRewardModal';
import RewardClaimModal from './components/RewardClaimModal';
import CompletedTasksModal from './components/CompletedTasksModal';
import RemoveRewardModal from './components/RemoveRewardModal';

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
  const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>(() => {
    try { return JSON.parse(localStorage.getItem('liferpg_tasks') ?? 'null') ?? []; } catch { return []; }
  });
  const [completedTasks, setCompletedTasks] = useState<Task[]>(() => {
    try { return JSON.parse(localStorage.getItem('liferpg_completedTasks') ?? 'null') ?? []; } catch { return []; }
  });
  const [rewards, setRewards] = useState<Reward[]>(() => {
    try { return JSON.parse(localStorage.getItem('liferpg_rewards') ?? 'null') ?? []; } catch { return []; }
  });
  const [spentPoints, setSpentPoints] = useState<number>(() => {
    try { return JSON.parse(localStorage.getItem('liferpg_spentPoints') ?? 'null') ?? 0; } catch { return 0; }
  });

  useEffect(() => { localStorage.setItem('liferpg_tasks', JSON.stringify(tasks)); }, [tasks]);
  useEffect(() => { localStorage.setItem('liferpg_completedTasks', JSON.stringify(completedTasks)); }, [completedTasks]);
  useEffect(() => { localStorage.setItem('liferpg_rewards', JSON.stringify(rewards)); }, [rewards]);
  useEffect(() => { localStorage.setItem('liferpg_spentPoints', JSON.stringify(spentPoints)); }, [spentPoints]);

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

  const handleRemoveReward = (id: number) => {
    setRewards((prev) => prev.filter((r) => r.id !== id));
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
                    ? '완료할 퀘스트를 클릭하세요'
                    : deleteMode
                    ? '삭제할 퀘스트를 클릭하세요'
                    : '편집할 퀘스트를 클릭하세요'}
                </div>
              </div>
            )}
            {tasks.length === 0 ? (
              <p className="text-center text-amber-800/50 text-lg mt-8">퀘스트를 붙여보세요</p>
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
                        else if (deleteMode) setConfirmDeleteId(task.id);
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
                      {deleteMode && confirmDeleteId !== task.id && (
                        <div className="absolute inset-0 rounded bg-slate-900/5 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <div
                            className="w-12 h-12 rounded-full flex items-center justify-center"
                            style={{ background: 'rgba(71,85,105,0.15)', border: '3px solid rgba(71,85,105,0.5)' }}
                          >
                            <Trash2 className="w-5 h-5 text-slate-600" />
                          </div>
                        </div>
                      )}
                      {/* 삭제 확인 오버레이 */}
                      {confirmDeleteId === task.id && (
                        <div
                          className="absolute inset-0 rounded flex flex-col items-center justify-center gap-1.5 z-20"
                          style={{ background: 'rgba(15,23,42,0.88)' }}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <p className="text-white text-[11px] font-bold text-center px-2" style={{ fontFamily: 'serif' }}>
                            삭제하시겠습니까?
                          </p>
                          <div className="flex gap-1.5">
                            <button
                              onClick={() => setConfirmDeleteId(null)}
                              className="px-3 py-1 rounded text-[11px] font-bold border border-stone-400 text-stone-300 hover:bg-stone-700 transition-colors"
                              style={{ fontFamily: 'serif' }}
                            >
                              취소
                            </button>
                            <button
                              onClick={() => {
                                setTasks((prev) => prev.filter((t) => t.id !== task.id));
                                setConfirmDeleteId(null);
                                setDeleteMode(false);
                              }}
                              className="px-3 py-1 rounded text-[11px] font-bold transition-colors"
                              style={{ background: '#dc2626', color: '#fff', fontFamily: 'serif' }}
                            >
                              삭제
                            </button>
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

      {/* RemoveRewardModal */}
      {showRemoveRewardModal && (
        <RemoveRewardModal
          onClose={() => setShowRemoveRewardModal(false)}
          onRemove={handleRemoveReward}
          rewards={rewards}
        />
      )}

      {/* CompletedTasksModal */}
      {showCompletedModal && (
        <CompletedTasksModal
          onClose={() => setShowCompletedModal(false)}
          completedTasks={completedTasks}
        />
      )}

      {/* RewardClaimModal */}
      {showClaimModal && (
        <RewardClaimModal
          onClose={() => setShowClaimModal(false)}
          onClaim={(reward) => { handleClaim(reward); setShowClaimModal(false); }}
          rewards={rewards}
          currentPoints={totalPoints}
        />
      )}

      {/* AddRewardModal */}
      {showAddRewardModal && (
        <AddRewardModal
          onClose={() => setShowAddRewardModal(false)}
          onSubmit={(reward) => { handleAddReward(reward); setShowAddRewardModal(false); }}
        />
      )}

      {/* AddTaskModal */}
      {(showAddModal || editingTask) && (
        <AddTaskModal
          onClose={() => { setShowAddModal(false); setEditingTask(null); setEditMode(false); }}
          onSubmit={(task) => {
            if (editingTask) handleEditTask(editingTask, task);
            else handleAddTask(task);
          }}
          editingTask={editingTask}
        />
      )}

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
            <div className="flex gap-4 items-end">
              {/* ① 퀘스트 추가 버튼 - 종이더미 + 연필 */}
              <button className="group relative hover:scale-105 transition-transform" onClick={() => setShowAddModal(true)}>
                <div className="relative w-32 h-40 flex items-end justify-center">
                  <div className="relative w-28 h-32">
                    {/* 맨 아래 종이 */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 rotate-2 w-24 h-28 bg-gradient-to-br from-slate-100 to-slate-200 rounded-sm border border-slate-300"
                         style={{ boxShadow: '0 6px 12px rgba(0,0,0,0.3), 0 3px 6px rgba(0,0,0,0.2), inset 0 1px 2px rgba(255,255,255,0.5)' }} />
                    {/* 중간 종이 */}
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 -rotate-1 w-24 h-28 bg-gradient-to-br from-white to-slate-100 rounded-sm border border-slate-300"
                         style={{ boxShadow: '0 8px 16px rgba(0,0,0,0.35), 0 4px 8px rgba(0,0,0,0.25), inset 0 1px 2px rgba(255,255,255,0.6)' }} />
                    {/* 맨 위 종이 */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-28 bg-gradient-to-br from-white to-slate-50 rounded-sm border border-slate-300 relative"
                         style={{ boxShadow: '0 10px 20px rgba(0,0,0,0.4), 0 6px 12px rgba(0,0,0,0.3), inset 0 1px 3px rgba(255,255,255,0.8)' }}>
                      <div className="absolute top-6 left-3 right-3 h-px bg-blue-300/60" />
                      <div className="absolute top-10 left-3 right-3 h-px bg-blue-300/60" />
                      <div className="absolute top-14 left-3 right-3 h-px bg-blue-300/60" />
                      <div className="absolute top-18 left-3 right-3 h-px bg-blue-300/60" />
                      <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                        <span className="text-slate-700 font-bold text-xs" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}>퀘스트 추가</span>
                      </div>
                    </div>
                    {/* 연필 */}
                    <div className="absolute top-0 right-0 w-20 h-5 rotate-45 origin-center z-10">
                      <div className="absolute inset-0 bg-gradient-to-br from-yellow-600 via-amber-500 to-yellow-700 rounded-full border border-amber-800"
                           style={{ boxShadow: '0 4px 8px rgba(0,0,0,0.5), inset 0 2px 4px rgba(255,200,100,0.4), inset 0 -2px 4px rgba(0,0,0,0.3)' }}>
                        <div className="absolute inset-0 opacity-40 rounded-full"
                             style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(139,69,19,0.3) 0px, transparent 2px, rgba(0,0,0,0.2) 4px, transparent 6px)' }} />
                      </div>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-4 bg-gradient-to-r from-amber-800 to-stone-900"
                           style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }} />
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-3 h-full bg-gradient-to-br from-pink-400 to-pink-600 rounded-l-full border-l-2 border-pink-700"
                           style={{ boxShadow: 'inset 0 2px 3px rgba(255,200,220,0.5), 0 2px 4px rgba(0,0,0,0.4)' }} />
                      <div className="absolute left-2.5 top-1/2 -translate-y-1/2 w-1 h-full bg-gradient-to-r from-slate-300 via-slate-400 to-slate-500" />
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                        <PencilLine className="w-4 h-4 text-amber-900/30 -rotate-45" strokeWidth={2} />
                      </div>
                    </div>
                  </div>
                </div>
              </button>

              {/* ② 퀘스트 삭제 버튼 - 휴지통 */}
              <button className="group relative hover:scale-105 transition-transform" onClick={() => { setDeleteMode((v) => !v); setConfirmDeleteId(null); setCompleteMode(false); setEditMode(false); }}>
                <div className="relative w-20 h-32 flex items-end justify-center">
                  <div className="relative w-16 h-24">
                    {/* 뚜껑 */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-18 h-3 rounded-t-lg border-2 border-slate-400"
                         style={{ background: 'linear-gradient(to bottom, #94a3b8 0%, #64748b 100%)', boxShadow: 'inset 0 2px 3px rgba(255,255,255,0.4), 0 2px 4px rgba(0,0,0,0.4)' }} />
                    {/* 몸통 */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-20 rounded-b-lg border-2 border-slate-500"
                         style={{ background: 'linear-gradient(to bottom, #cbd5e1 0%, #94a3b8 50%, #64748b 100%)', boxShadow: 'inset 0 2px 6px rgba(255,255,255,0.5), 0 6px 12px rgba(0,0,0,0.4)' }}>
                      <div className="absolute inset-y-2 left-1/4 w-px bg-slate-400/50" />
                      <div className="absolute inset-y-2 right-1/4 w-px bg-slate-400/50" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                        <Trash2 className="w-7 h-7 text-slate-700" strokeWidth={2} style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.3))' }} />
                        <span className="text-slate-700 font-bold text-[9px]" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}>삭제</span>
                      </div>
                    </div>
                  </div>
                </div>
              </button>

              {/* ③ 퀘스트 편집 버튼 - 연필꽂이 */}
              <button className="group relative hover:scale-105 transition-transform" onClick={() => { setEditMode((v) => !v); setCompleteMode(false); setDeleteMode(false); setConfirmDeleteId(null); }}>
                <div className="relative w-24 h-32 flex items-end justify-center">
                  <div className="relative w-20 h-28">
                    {/* 통 본체 */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-18 h-20 rounded-b-lg border-2 border-slate-500 z-10"
                         style={{ background: 'linear-gradient(to bottom, #e2e8f0 0%, #cbd5e1 40%, #94a3b8 100%)', boxShadow: 'inset 0 3px 8px rgba(255,255,255,0.6), 0 8px 16px rgba(0,0,0,0.4)' }}>
                      <div className="absolute inset-0 opacity-20 rounded-b-lg"
                           style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 3px)' }} />
                      <div className="absolute inset-x-0 bottom-4 flex justify-center">
                        <span className="text-slate-700 font-bold text-[10px]" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.8)' }}>편집</span>
                      </div>
                    </div>
                    {/* 자 */}
                    <div className="absolute bottom-12 left-3 w-2 h-20 rotate-[-25deg] origin-bottom bg-gradient-to-r from-amber-100 to-amber-200 border border-amber-400 opacity-80"
                         style={{ boxShadow: 'inset 1px 0 2px rgba(255,255,255,0.6), 0 2px 4px rgba(0,0,0,0.3)' }}>
                      <div className="absolute top-2 left-0 right-0 h-px bg-amber-600/40" />
                      <div className="absolute top-6 left-0 right-0 h-px bg-amber-600/40" />
                      <div className="absolute top-10 left-0 right-0 h-px bg-amber-600/40" />
                      <div className="absolute top-14 left-0 right-0 h-px bg-amber-600/40" />
                    </div>
                    {/* 연필 왼쪽 (노란색) */}
                    <div className="absolute bottom-12 left-2 w-3 h-16 rotate-[-15deg] origin-bottom rounded-t-full border border-yellow-700"
                         style={{ background: 'linear-gradient(to bottom, #fde047 0%, #facc15 50%, #eab308 100%)', boxShadow: 'inset 1px 0 3px rgba(255,255,255,0.5), 0 3px 6px rgba(0,0,0,0.4)' }}>
                      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-pink-400 to-pink-500 rounded-t-full border-b border-yellow-700" />
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gradient-to-b from-stone-700 to-black" style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }} />
                    </div>
                    {/* 펜 중앙 (파란색) */}
                    <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-3 h-18 rounded-t-full border border-blue-800"
                         style={{ background: 'linear-gradient(to bottom, #60a5fa 0%, #3b82f6 50%, #2563eb 100%)', boxShadow: 'inset 1px 0 3px rgba(255,255,255,0.5), 0 3px 6px rgba(0,0,0,0.4)' }}>
                      <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-blue-600 to-blue-700 rounded-t-full border-b border-blue-800" />
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-2 bg-gradient-to-b from-slate-700 to-black rounded-b-sm" />
                    </div>
                    {/* 연필 오른쪽 (주황색) */}
                    <div className="absolute bottom-12 right-2 w-3 h-15 rotate-[15deg] origin-bottom rounded-t-full border border-orange-700"
                         style={{ background: 'linear-gradient(to bottom, #fb923c 0%, #f97316 50%, #ea580c 100%)', boxShadow: 'inset 1px 0 3px rgba(255,255,255,0.5), 0 3px 6px rgba(0,0,0,0.4)' }}>
                      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-pink-400 to-pink-500 rounded-t-full border-b border-orange-700" />
                      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gradient-to-b from-stone-700 to-black" style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }} />
                    </div>
                  </div>
                </div>
              </button>
            </div>
            {/* 중앙 완료 도장 */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-0 flex flex-col items-center z-10">
              <button
                onClick={() => { setCompleteMode((v) => !v); setDeleteMode(false); setConfirmDeleteId(null); setEditMode(false); }}
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
            <div className="flex gap-4 items-end">
              {/* ④ 보상 추가 버튼 - 돈자루 */}
              <button className="group relative hover:scale-105 transition-transform" onClick={() => setShowAddRewardModal(true)}>
                <div className="relative w-24 h-36 flex items-end justify-center">
                  <div className="relative w-20 h-32">
                    <div className="relative w-16 h-10 mx-auto">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-6 rounded-t-full border-2 border-amber-800"
                           style={{ background: 'linear-gradient(to bottom, #92400e 0%, #78350f 100%)', boxShadow: 'inset 0 1px 2px rgba(255,200,150,0.3), 0 2px 4px rgba(0,0,0,0.4)' }} />
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-8 rounded-t-full border-2 border-amber-900"
                           style={{ background: 'linear-gradient(to bottom, #a16207 0%, #854d0e 100%)', boxShadow: 'inset 0 2px 4px rgba(255,200,100,0.3), 0 3px 6px rgba(0,0,0,0.4)' }}>
                        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-amber-950/50 rounded-full" />
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-11 h-1 bg-amber-950/40 rounded-full" />
                      </div>
                    </div>
                    <div className="relative w-20 h-24 mx-auto" style={{ borderRadius: '40% 40% 50% 50% / 25% 25% 75% 75%' }}>
                      <div className="absolute inset-0 border-3 border-amber-900"
                           style={{ background: 'linear-gradient(145deg, #ca8a04 0%, #a16207 30%, #854d0e 70%, #713f12 100%)', borderRadius: '40% 40% 50% 50% / 25% 25% 75% 75%', boxShadow: 'inset 0 4px 8px rgba(255,200,100,0.3), inset 0 -4px 8px rgba(0,0,0,0.5), 0 10px 20px rgba(0,0,0,0.5)' }}>
                        <div className="absolute inset-0 opacity-30"
                             style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px), repeating-linear-gradient(-45deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)', borderRadius: '40% 40% 50% 50% / 25% 25% 75% 75%' }} />
                        <div className="absolute top-1/4 left-3 w-7 h-7 rounded-full" style={{ background: 'radial-gradient(circle, rgba(250,204,21,0.4) 0%, transparent 70%)', filter: 'blur(3px)' }} />
                        <div className="absolute top-1/2 right-3 w-6 h-6 rounded-full" style={{ background: 'radial-gradient(circle, rgba(234,179,8,0.4) 0%, transparent 70%)', filter: 'blur(3px)' }} />
                        <div className="absolute bottom-1/4 left-1/3 w-8 h-8 rounded-full" style={{ background: 'radial-gradient(circle, rgba(250,204,21,0.5) 0%, transparent 70%)', filter: 'blur(4px)' }} />
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 z-10" style={{ borderRadius: '40% 40% 50% 50% / 25% 25% 75% 75%' }}>
                          <Coins className="w-9 h-9 text-yellow-200" strokeWidth={2.5} style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.6))' }} />
                          <span className="text-yellow-100 font-bold text-center" style={{ fontSize: '11px', lineHeight: '1.4', textShadow: '0 2px 4px rgba(0,0,0,0.8)' }}>보상 목록<br/>추가</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </button>

              {/* ⑤ 보상 제거 버튼 - 망치 */}
              <button className="group relative hover:scale-105 transition-transform" onClick={() => setShowRemoveRewardModal(true)}>
                <div className="relative w-28 h-36 flex items-end justify-center">
                  <div className="relative w-24 h-32">
                    {/* 자루 */}
                    <div
                      className="absolute rounded-b-md"
                      style={{ left: '50%', transform: 'translateX(-50%)', top: '36px', bottom: '0px', width: '14px', background: 'linear-gradient(to right, #a16207 0%, #ca8a04 40%, #92400e 100%)', boxShadow: 'inset 2px 0 4px rgba(255,200,100,0.25), inset -2px 0 4px rgba(0,0,0,0.45), 0 4px 8px rgba(0,0,0,0.35)' }}
                    >
                      <div className="absolute inset-0 opacity-25" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 5px, rgba(0,0,0,0.25) 5px, rgba(0,0,0,0.25) 6px)' }} />
                    </div>
                    {/* 망치 머리 */}
                    <div
                      className="absolute rounded-md overflow-hidden"
                      style={{ top: '0px', left: '50%', transform: 'translateX(-50%)', width: '88px', height: '40px', background: 'linear-gradient(to bottom, #d1d5db 0%, #9ca3af 45%, #6b7280 100%)', boxShadow: 'inset 0 3px 6px rgba(255,255,255,0.35), inset 0 -3px 6px rgba(0,0,0,0.45), 0 6px 14px rgba(0,0,0,0.5)' }}
                    >
                      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(255,255,255,0.08) 10px, rgba(255,255,255,0.08) 11px)' }} />
                      <div className="absolute left-0 top-0 bottom-0 w-3 rounded-l-md" style={{ background: 'linear-gradient(to right, #374151, #4b5563)', boxShadow: 'inset 2px 0 4px rgba(0,0,0,0.5)' }} />
                      <div className="absolute right-0 top-0 bottom-0 w-3 rounded-r-md" style={{ background: 'linear-gradient(to left, #374151, #4b5563)', boxShadow: 'inset -2px 0 4px rgba(0,0,0,0.5)' }} />
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-3 rounded-t-sm" style={{ background: 'rgba(0,0,0,0.35)', boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.6)' }} />
                      <div className="absolute inset-0 flex items-center justify-center pb-1">
                        <span className="text-slate-100 font-black text-[10px] tracking-widest" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.7)', fontFamily: 'serif' }}>보상 제거</span>
                      </div>
                    </div>
                  </div>
                </div>
              </button>

              {/* ⑥ 보상(저금통) 버튼 */}
              <button className="group relative hover:scale-105 transition-transform" onClick={() => setShowClaimModal(true)}>
                <div className="relative w-32 h-40 flex items-center justify-center">
                  <div className="relative w-32 h-36 rounded-lg border-4 border-yellow-900"
                       style={{ background: 'linear-gradient(145deg, #d4a444 0%, #c9952d 30%, #b8841a 70%, #a67310 100%)', boxShadow: 'inset 0 4px 8px rgba(255,220,150,0.4), inset 0 -4px 8px rgba(0,0,0,0.4), 0 12px 24px rgba(0,0,0,0.5)' }}>
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-2.5 bg-gradient-to-b from-stone-950 to-stone-800 rounded-full border border-stone-900"
                         style={{ boxShadow: 'inset 0 3px 6px rgba(0,0,0,0.9)' }} />
                    <div className="absolute inset-0 opacity-30 rounded-md"
                         style={{ backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.5) 0%, transparent 30%, rgba(0,0,0,0.3) 70%, transparent 100%), repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(255,255,255,0.1) 8px, rgba(255,255,255,0.1) 9px)' }} />
                    <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-yellow-950/60" />
                    <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-yellow-950/60" />
                    <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-yellow-950/60" />
                    <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-yellow-950/60" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 z-10 pt-4">
                      <div className="flex flex-col items-center leading-none" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.5))' }}>
                        <span className="text-yellow-200 font-black" style={{ fontSize: '26px', textShadow: '0 2px 6px rgba(0,0,0,0.7)' }}>{totalPoints}</span>
                        <span className="text-yellow-300/80 font-bold" style={{ fontSize: '11px', textShadow: '0 1px 3px rgba(0,0,0,0.6)' }}>pt</span>
                      </div>
                      <span className="text-yellow-50 font-bold text-sm" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.6)' }}>보상</span>
                    </div>
                    <div className="absolute top-6 right-3 w-12 h-12 rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)', filter: 'blur(8px)' }} />
                    <div className="absolute bottom-6 left-4 w-8 h-8 rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,230,150,0.3) 0%, transparent 60%)', filter: 'blur(6px)' }} />
                  </div>
                </div>
              </button>

              {/* ⑦ 해결한 일 목록 버튼 - 두루마리 더미 */}
              <button className="group relative hover:scale-105 transition-transform" onClick={() => setShowCompletedModal(true)}>
                <div className="relative w-36 h-40 flex items-center justify-center">
                  <div className="relative w-32 h-36">
                    <div className="absolute inset-0 rounded-lg border-t-2 border-b-2 border-amber-500"
                         style={{ background: 'linear-gradient(to bottom, #f5e6d3 0%, #f0dcc4 20%, #ebe0c9 40%, #e8d9bd 60%, #e5d4b8 80%, #e0cab0 100%)', boxShadow: 'inset 0 2px 6px rgba(255,255,255,0.6), 0 10px 20px rgba(0,0,0,0.4)' }}>
                      <div className="absolute inset-0 opacity-20 rounded-lg"
                           style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(139,90,43,0.1) 1px, rgba(139,90,43,0.1) 2px)' }} />
                      <div className="absolute bottom-[66%] left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-600/50 to-transparent" />
                      <div className="absolute bottom-[33%] left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-600/50 to-transparent" />
                      {[2, '36%', '70%'].map((top, i) => (
                        <div key={i}>
                          <div className="absolute inset-x-2 h-1 bg-amber-400/50 rounded-full" style={{ top: typeof top === 'number' ? `${top * 4}px` : top }} />
                          <div className="absolute inset-x-3 h-1 bg-amber-400/40 rounded-full" style={{ top: typeof top === 'number' ? `${top * 4 + 8}px` : `calc(${top} + 6%)` }} />
                        </div>
                      ))}
                      <div className="absolute bottom-2 inset-x-2 h-1 bg-amber-500/50 rounded-full" />
                    </div>
                    {/* 왼쪽 단면 */}
                    <div className="absolute left-0 top-0 bottom-0 w-4 rounded-l-full border-2 border-amber-500"
                         style={{ background: 'radial-gradient(ellipse at 30% 50%, #f5e6d3 0%, #e8d4b8 40%, #ddc5a5 100%)', boxShadow: 'inset 2px 0 4px rgba(255,255,255,0.4), -2px 0 6px rgba(0,0,0,0.3)' }}>
                      <div className="absolute bottom-[66%] left-0 right-0 h-0.5 bg-amber-600/60" />
                      <div className="absolute bottom-[33%] left-0 right-0 h-0.5 bg-amber-600/60" />
                    </div>
                    {/* 오른쪽 단면 */}
                    <div className="absolute right-0 top-0 bottom-0 w-4 rounded-r-full border-2 border-amber-600"
                         style={{ background: 'radial-gradient(ellipse at 70% 50%, #e8d4b8 0%, #ddc5a5 40%, #d2b894 100%)', boxShadow: 'inset -2px 0 4px rgba(255,255,255,0.3), 2px 0 6px rgba(0,0,0,0.4)' }}>
                      <div className="absolute bottom-[66%] left-0 right-0 h-0.5 bg-amber-700/60" />
                      <div className="absolute bottom-[33%] left-0 right-0 h-0.5 bg-amber-700/60" />
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center gap-2 z-10">
                      <svg className="w-7 h-7 text-amber-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.3))' }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span className="text-amber-900 font-bold text-[11px] leading-tight" style={{ textShadow: '0 1px 2px rgba(255,255,255,0.5)' }}>해결한<br/>일 목록</span>
                    </div>
                  </div>
                </div>
              </button>
            </div>
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
