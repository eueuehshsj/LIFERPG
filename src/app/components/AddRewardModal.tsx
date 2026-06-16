import { useState } from 'react';
import { X } from 'lucide-react';

interface Reward {
  id: number;
  name: string;
  points: number;
  description: string;
}

interface Props {
  onClose: () => void;
  onSubmit: (reward: Omit<Reward, 'id'>) => void;
}

const SERRATED_TOP = `polygon(
  0% 8px, 8px 0%, 16px 8px, 24px 0%, 32px 8px, 40px 0%, 48px 8px,
  56px 0%, 64px 8px, 72px 0%, 80px 8px, 88px 0%, 96px 8px, 104px 0%,
  112px 8px, 120px 0%, 128px 8px, 136px 0%, 144px 8px, 152px 0%,
  160px 8px, 168px 0%, 176px 8px, 184px 0%, 192px 8px, 200px 0%,
  208px 8px, 216px 0%, 224px 8px, 232px 0%, 240px 8px, 248px 0%,
  256px 8px, 264px 0%, 272px 8px, 280px 0%, 288px 8px, 296px 0%,
  304px 8px, 312px 0%, 320px 8px,
  100% 0%, 100% 100%, 0% 100%
)`;

const SERRATED_BOTTOM = `polygon(
  0% 0%, 100% 0%, 100% 100%,
  320px calc(100% - 8px), 312px 100%, 304px calc(100% - 8px),
  296px 100%, 288px calc(100% - 8px), 280px 100%, 272px calc(100% - 8px),
  264px 100%, 256px calc(100% - 8px), 248px 100%, 240px calc(100% - 8px),
  232px 100%, 224px calc(100% - 8px), 216px 100%, 208px calc(100% - 8px),
  200px 100%, 192px calc(100% - 8px), 184px 100%, 176px calc(100% - 8px),
  168px 100%, 160px calc(100% - 8px), 152px 100%, 144px calc(100% - 8px),
  136px 100%, 128px calc(100% - 8px), 120px 100%, 112px calc(100% - 8px),
  104px 100%, 96px calc(100% - 8px), 88px 100%, 80px calc(100% - 8px),
  72px 100%, 64px calc(100% - 8px), 56px 100%, 48px calc(100% - 8px),
  40px 100%, 32px calc(100% - 8px), 24px 100%, 16px calc(100% - 8px),
  8px 100%, 0% calc(100% - 8px)
)`;

export default function AddRewardModal({ onClose, onSubmit }: Props) {
  const today = new Date().toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' });
  const receiptNo = useState(() => String(Math.floor(Math.random() * 90000) + 10000))[0];

  const [name, setName] = useState('');
  const [points, setPoints] = useState(50);
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!name.trim()) return;
    setSubmitted(true);
    setTimeout(() => {
      onSubmit({ name: name.trim(), points, description });
      onClose();
    }, 700);
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

      {/* 영수증 래퍼 */}
      <div
        style={{
          opacity: submitted ? 0 : 1,
          transform: submitted ? 'scale(0.95)' : 'scale(1)',
          transition: 'opacity 0.4s ease, transform 0.3s ease',
        }}
      >
        {/* 상단 톱니 */}
        <div
          className="w-80 h-4"
          style={{
            background: '#fefefe',
            clipPath: SERRATED_TOP,
          }}
        />

        {/* 본문 */}
        <div className="w-80 px-6 py-2" style={{ background: '#fefefe' }}>
          {/* 가게 헤더 */}
          <div className="text-center mb-3">
            <div style={{ fontFamily: 'monospace', fontSize: '11px', color: '#a8a29e', letterSpacing: '0.3em' }}>
              ✦ ✦ ✦
            </div>
            <div className="font-black text-xl" style={{ fontFamily: 'monospace', color: '#1c1917', letterSpacing: '0.1em' }}>
              투두퀘스트
            </div>
            <div style={{ fontFamily: 'monospace', fontSize: '10px', color: '#78716c', letterSpacing: '0.25em' }}>
              REWARD SHOP
            </div>
            <div className="mt-1 border-t border-dashed border-stone-300 pt-1 flex justify-between">
              <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#a8a29e' }}>
                No. {receiptNo}
              </span>
              <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#a8a29e' }}>
                {today}
              </span>
            </div>
          </div>

          {/* 구분선 */}
          <div className="border-t border-dashed border-stone-300 mb-3" />

          {/* 상품명 */}
          <div className="mb-4">
            <div className="flex justify-between items-end mb-1">
              <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#78716c' }}>상품명</span>
            </div>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="보상 이름을 입력하세요"
              className="w-full bg-transparent border-b border-dotted border-stone-300 focus:border-stone-500 outline-none pb-1 text-stone-800 placeholder-stone-300 transition-colors"
              style={{ fontFamily: 'monospace', fontSize: '15px' }}
            />
          </div>

          {/* 필요 포인트 */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span style={{ fontFamily: 'monospace', fontSize: '10px', color: '#78716c' }}>필요 포인트</span>
              <span className="font-black text-stone-800" style={{ fontFamily: 'monospace', fontSize: '15px' }}>
                {points}pt
              </span>
            </div>
            <input
              type="range"
              min={10}
              max={500}
              step={10}
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
              className="w-full accent-stone-700"
            />
            <div className="flex justify-between mt-1">
              {[10, 125, 250, 375, 500].map((v) => (
                <span key={v} style={{ fontFamily: 'monospace', fontSize: '9px', color: '#a8a29e' }}>
                  {v}
                </span>
              ))}
            </div>
          </div>

          {/* 내용 */}
          <div className="mb-4">
            <span className="block mb-1" style={{ fontFamily: 'monospace', fontSize: '10px', color: '#78716c' }}>
              내용
            </span>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="보상에 대한 설명을 입력하세요"
              className="w-full bg-transparent outline-none resize-none text-stone-700 placeholder-stone-300"
              style={{
                fontFamily: 'monospace',
                fontSize: '12px',
                lineHeight: '2em',
                backgroundImage: 'repeating-linear-gradient(transparent, transparent calc(2em - 1px), rgba(180,160,120,0.3) calc(2em - 1px), rgba(180,160,120,0.3) 2em)',
                backgroundAttachment: 'local',
              }}
            />
          </div>

          {/* 구분선 */}
          <div className="border-t border-dashed border-stone-300 mb-3" />

          {/* 합계 */}
          <div className="mb-3">
            <div className="flex justify-between items-center">
              <span className="font-bold" style={{ fontFamily: 'monospace', fontSize: '11px', color: '#57534e' }}>
                합계
              </span>
              <span className="font-black" style={{ fontFamily: 'monospace', fontSize: '16px', color: '#1c1917' }}>
                {points}pt
              </span>
            </div>
            {name && (
              <div className="text-right mt-0.5" style={{ fontFamily: 'monospace', fontSize: '10px', color: '#a8a29e' }}>
                {name}
              </div>
            )}
          </div>

          {/* 구분선 */}
          <div className="border-t border-dashed border-stone-300 mb-3" />

          {/* 감사 문구 */}
          <div className="text-center mb-3">
            <div style={{ fontFamily: 'monospace', fontSize: '10px', color: '#78716c' }}>
              이용해 주셔서 감사합니다!
            </div>
            <div className="mt-1 flex justify-center flex-wrap gap-x-0.5" style={{ maxWidth: '100%' }}>
              {Array.from({ length: 24 }).map((_, i) => (
                <span key={i} style={{ fontFamily: 'monospace', fontSize: '9px', color: '#d6d3d1' }}>•</span>
              ))}
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex gap-2 pb-4">
            <button
              onClick={onClose}
              className="flex-1 py-2 border border-stone-300 text-stone-500 hover:bg-stone-50 transition-colors rounded text-sm font-bold"
              style={{ fontFamily: 'monospace' }}
            >
              취소
            </button>
            <button
              onClick={handleSubmit}
              disabled={!name.trim()}
              className="flex-1 py-2 rounded text-white font-black text-sm disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
              style={{
                fontFamily: 'monospace',
                background: 'linear-gradient(135deg, #1c1917, #292524)',
                boxShadow: name.trim() ? '0 4px 12px rgba(0,0,0,0.3)' : 'none',
              }}
            >
              등록
            </button>
          </div>
        </div>

        {/* 하단 톱니 */}
        <div
          className="w-80 h-4"
          style={{
            background: '#fefefe',
            clipPath: SERRATED_BOTTOM,
          }}
        />
      </div>
    </div>
  );
}
