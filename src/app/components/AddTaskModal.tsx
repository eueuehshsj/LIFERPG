import { useState } from 'react';
import { X } from 'lucide-react';

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
  onSubmit: (task: Omit<Task, 'id'>) => void;
  editingTask?: Task | null;
}

const PRIORITY_OPTIONS = [
  { value: 'low', label: '보통', active: 'bg-green-100 border-green-500 text-green-700' },
  { value: 'medium', label: '중요', active: 'bg-yellow-100 border-yellow-500 text-yellow-700' },
  { value: 'high', label: '긴급', active: 'bg-red-100 border-red-500 text-red-700' },
] as const;

export default function AddTaskModal({ onClose, onSubmit, editingTask }: Props) {
  const isEdit = !!editingTask;
  const today = new Date().toISOString().split('T')[0];
  const docNo = useState(() => String(Math.floor(Math.random() * 9000) + 1000))[0];
  const dateStr = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });

  const [title, setTitle] = useState(editingTask?.title ?? '');
  const [description, setDescription] = useState(editingTask?.description ?? '');
  const [dueDate, setDueDate] = useState(editingTask?.dueDate ?? '');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>(editingTask?.priority ?? 'low');
  const [reward, setReward] = useState(editingTask?.reward ?? 10);
  const [author, setAuthor] = useState(editingTask?.author ?? '');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!title.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      onSubmit({ title: title.trim(), description, dueDate, priority, reward, author });
      onClose();
    }, 800);
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: 'rgba(30,15,5,0.75)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* 닫기 버튼 */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-colors border border-stone-600 hover:bg-stone-700"
        style={{ background: 'rgba(28,25,23,0.8)' }}
      >
        <X className="w-5 h-5 text-stone-300" />
      </button>

      {/* 모달 래퍼 (애니메이션) */}
      <div
        className="relative"
        style={{
          transform: submitted ? 'scale(0.95)' : 'scale(1)',
          opacity: submitted ? 0 : 1,
          transition: 'transform 0.3s ease, opacity 0.5s ease',
        }}
      >
        {/* 뒤에 삐져나온 종이 */}
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            background: '#f0ebe0',
            transform: 'rotate(2deg)',
            boxShadow: '0 4px 16px rgba(0,0,0,0.3)',
          }}
        />
        <div
          className="absolute inset-0 rounded-lg"
          style={{
            background: '#f5f0e8',
            transform: 'rotate(-1deg)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
          }}
        />

        {/* 메인 서류 */}
        <div
          className="relative w-[520px] rounded-lg overflow-hidden"
          style={{
            background: '#faf6ed',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.3)',
          }}
        >
          {/* 종이 질감 노이즈 오버레이 */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.15] rounded-lg"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            }}
          />
          {/* 좌측 빨간 여백선 */}
          <div
            className="absolute top-0 bottom-0 w-px pointer-events-none"
            style={{ left: '64px', background: 'rgba(220,80,80,0.35)' }}
          />

          <div className="relative p-8">
            {/* 서류 번호 + 날짜 */}
            <div className="flex justify-end mb-2">
              <div className="text-right" style={{ fontFamily: 'monospace', fontSize: '10px', color: '#a8a29e' }}>
                <div>No. {docNo}</div>
                <div>{dateStr}</div>
              </div>
            </div>

            {/* 도장 */}
            <div
              className="absolute top-8 left-8 w-14 h-14 rounded-full border-4 border-red-700 flex items-center justify-center -rotate-12 pointer-events-none"
              style={{ opacity: 0.2 }}
            >
              <span className="text-red-700 font-black text-center leading-tight" style={{ fontFamily: 'serif', fontSize: '9px' }}>
                퀘스트<br />접수
              </span>
            </div>

            {/* 헤더 */}
            <div className="text-center mb-6">
              <div style={{ fontFamily: 'serif', fontSize: '11px', color: '#78716c', letterSpacing: '0.3em' }}>
                ─── 투두퀘스트 ───
              </div>
              <div className="font-black text-2xl mt-1" style={{ fontFamily: 'serif', color: '#1c1917' }}>
                {isEdit ? '일정 수정증' : '일정 접수증'}
              </div>
              <div style={{ fontFamily: 'monospace', fontSize: '10px', color: '#a8a29e', letterSpacing: '0.2em', marginTop: '2px' }}>
                QUEST REGISTRATION FORM
              </div>
            </div>

            <div className="space-y-4">
              {/* ① 과제명 */}
              <div>
                <label className="block mb-1 font-bold text-stone-500" style={{ fontFamily: 'serif', fontSize: '12px' }}>
                  ① 과제명 <span className="text-red-500">*</span>
                </label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="할 일을 입력하세요"
                  className="w-full bg-transparent border-b-2 border-stone-300 focus:border-amber-700 outline-none pb-1 text-stone-800 placeholder-stone-300 transition-colors"
                  style={{ fontFamily: 'serif', fontSize: '15px' }}
                />
              </div>

              {/* ② 마감 기한 */}
              <div>
                <label className="block mb-1 font-bold text-stone-500" style={{ fontFamily: 'serif', fontSize: '12px' }}>
                  ② 마감 기한
                </label>
                <input
                  type="date"
                  value={dueDate}
                  min={today}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="bg-transparent border-b-2 border-stone-300 focus:border-amber-700 outline-none pb-1 text-stone-700 transition-colors"
                  style={{ fontFamily: 'serif', fontSize: '14px' }}
                />
              </div>

              {/* ③ 중요도 */}
              <div>
                <label className="block mb-2 font-bold text-stone-500" style={{ fontFamily: 'serif', fontSize: '12px' }}>
                  ③ 중요도
                </label>
                <div className="flex gap-2">
                  {PRIORITY_OPTIONS.map(({ value, label, active }) => (
                    <button
                      key={value}
                      onClick={() => setPriority(value)}
                      className={`px-4 py-1 rounded-full border-2 text-sm font-bold transition-colors ${
                        priority === value ? active : 'border-stone-300 text-stone-400 hover:border-stone-400'
                      }`}
                      style={{ fontFamily: 'serif' }}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* ④ 상세 내용 */}
              <div>
                <label className="block mb-1 font-bold text-stone-500" style={{ fontFamily: 'serif', fontSize: '12px' }}>
                  ④ 상세 내용
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  placeholder="상세 내용을 입력하세요"
                  className="w-full bg-transparent outline-none resize-none text-stone-700 placeholder-stone-300"
                  style={{
                    fontFamily: 'serif',
                    fontSize: '14px',
                    lineHeight: '2em',
                    backgroundImage: 'repeating-linear-gradient(transparent, transparent calc(2em - 1px), rgba(180,160,120,0.4) calc(2em - 1px), rgba(180,160,120,0.4) 2em)',
                    backgroundAttachment: 'local',
                  }}
                />
              </div>

              {/* ⑤ 보상 포인트 */}
              <div>
                <label className="block mb-2 font-bold text-stone-500" style={{ fontFamily: 'serif', fontSize: '12px' }}>
                  ⑤ 보상 포인트:{' '}
                  <span className="font-black text-amber-700">{reward}pt</span>
                </label>
                <input
                  type="range"
                  min={5}
                  max={100}
                  step={5}
                  value={reward}
                  onChange={(e) => setReward(Number(e.target.value))}
                  className="w-full accent-amber-700"
                />
                <div className="flex justify-between mt-1">
                  {[5, 25, 50, 75, 100].map((v) => (
                    <span key={v} style={{ fontFamily: 'monospace', fontSize: '10px', color: '#a8a29e' }}>
                      {v}
                    </span>
                  ))}
                </div>
              </div>

              {/* 구분선 */}
              <div className="border-t-2 border-dashed border-stone-300" />

              {/* 서명란 */}
              <div>
                <label className="block mb-1 font-bold text-stone-500" style={{ fontFamily: 'serif', fontSize: '12px' }}>
                  작성자
                </label>
                <input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="이름을 입력하세요"
                  className="w-full bg-transparent border-b border-stone-300 focus:border-amber-700 outline-none pb-1 text-stone-700 italic transition-colors"
                  style={{ fontFamily: 'serif', fontSize: '14px' }}
                />
              </div>

              {/* 버튼 */}
              <div className="flex gap-3 justify-end pt-2">
                <button
                  onClick={onClose}
                  className="px-6 py-2 rounded border-2 border-stone-400 text-stone-600 hover:bg-stone-100 transition-colors font-bold text-sm"
                  style={{ fontFamily: 'serif' }}
                >
                  취소
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!title.trim()}
                  className="px-6 py-2 rounded text-amber-50 font-black text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
                  style={{
                    fontFamily: 'serif',
                    background: 'linear-gradient(135deg, #92400e, #78350f)',
                    boxShadow: title.trim() ? '0 4px 12px rgba(120,53,15,0.4)' : 'none',
                  }}
                >
                  {isEdit ? '수정' : '접수'}
                </button>
              </div>
            </div>
          </div>

          {/* 하단 바 */}
          <div
            className="px-8 py-3 flex items-center justify-between"
            style={{ background: '#1c1917' }}
          >
            <span style={{ fontFamily: 'monospace', fontSize: '9px', color: '#57534e', letterSpacing: '0.1em' }}>
              TodoQuest Official Form · Rev.1
            </span>
            <div className="flex gap-1 items-center">
              {[3, 2, 4, 2, 3, 2, 4, 3].map((w, i) => (
                <div key={i} style={{ width: `${w}px`, height: '20px', background: '#57534e' }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
