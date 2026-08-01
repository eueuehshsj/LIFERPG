import { Flame, Star } from 'lucide-react';
import { GRADIENTS } from '../../styles/styleConstants';

const NAIL_SHADOW = 'inset 0 2px 3px rgba(0,0,0,0.8), 0 1px 2px rgba(0,0,0,0.5)';
const TITLE_SHADOW = '3px 3px 6px rgba(0,0,0,0.8), 1px 1px 2px rgba(0,0,0,0.9)';
const HEADER_BOX_SHADOW = `
  inset 0 2px 4px rgba(255,255,255,0.1),
  inset 0 -2px 4px rgba(0,0,0,0.5),
  0 8px 16px rgba(0,0,0,0.6),
  0 4px 8px rgba(0,0,0,0.4)
`;
const WOOD_GRAIN_OVERLAY = `
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
`;

const CHIP_BG =
  'linear-gradient(145deg, #d4a444 0%, #c9952d 30%, #b8841a 70%, #a67310 100%)';
const CHIP_SHADOW = `
  inset 0 4px 8px rgba(255,220,150,0.4),
  inset 0 -4px 8px rgba(0,0,0,0.4),
  0 8px 16px rgba(0,0,0,0.5)
`;

type WoodenHeaderProps = {
  streak: number;
  level: number;
  levelProgress: number;
  pointsIntoLevel: number;
  pointsForNextLevel: number;
  justLeveledUp: boolean;
};

export default function WoodenHeader({
  streak,
  level,
  levelProgress,
  pointsIntoLevel,
  pointsForNextLevel,
  justLeveledUp,
}: WoodenHeaderProps) {
  return (
    <div className="flex flex-col items-center gap-3 py-6">
      <div className="relative">
        <div
          className="relative px-16 py-6 rounded-lg border-4 border-amber-950"
          style={{
            background: GRADIENTS.woodenSignBg,
            boxShadow: HEADER_BOX_SHADOW,
          }}
        >
          {/* 나무 질감 오버레이 */}
          <div
            className="absolute inset-0 opacity-30 rounded-lg pointer-events-none"
            style={{
              backgroundImage: WOOD_GRAIN_OVERLAY,
            }}
          />

          {/* 네 모서리 나무못 */}
          {(['top-3 left-3', 'top-3 right-3', 'bottom-3 left-3', 'bottom-3 right-3'] as const).map(
            (position) => (
              <div
                key={position}
                className={`absolute ${position} w-4 h-4 rounded-full bg-linear-to-br from-stone-800 to-stone-950`}
                style={{ boxShadow: NAIL_SHADOW }}
              />
            )
          )}

          {/* 제목 */}
          <h1
            className="text-4xl font-bold text-amber-100 tracking-wide relative z-10"
            style={{
              textShadow: TITLE_SHADOW,
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))',
            }}
          >
            투두퀘스트
          </h1>
        </div>
      </div>

      <div className="flex gap-3">
        {/* 연속 완료(스트릭) 칩 */}
        <div
          aria-label="연속 기록"
          className="flex items-center gap-1.5 rounded-lg border-4 border-yellow-900 px-3 py-1.5"
          style={{ background: CHIP_BG, boxShadow: CHIP_SHADOW }}
        >
          <Flame className="w-4 h-4 text-orange-200" strokeWidth={2.5} />
          <span
            className="text-yellow-100 font-black"
            style={{ fontSize: '16px', textShadow: '0 2px 6px rgba(0,0,0,0.7)' }}
          >
            {streak}
          </span>
          <span className="text-yellow-200/80 font-bold" style={{ fontSize: '10px' }}>
            일 연속
          </span>
        </div>

        {/* 레벨 칩 */}
        <div
          aria-label="레벨"
          className={`flex flex-col items-center gap-1 rounded-lg border-4 border-yellow-900 px-3 py-1.5 ${
            justLeveledUp ? 'animate-glow-gold' : ''
          }`}
          style={{ background: CHIP_BG, boxShadow: CHIP_SHADOW }}
        >
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-yellow-100" strokeWidth={2.5} />
            <span
              className="text-yellow-100 font-black"
              style={{ fontSize: '16px', textShadow: '0 2px 6px rgba(0,0,0,0.7)' }}
            >
              Lv.{level}
            </span>
          </div>
          <div className="w-16 h-1.5 rounded-full bg-black/40 overflow-hidden">
            <div
              className="h-full bg-yellow-200"
              style={{ width: `${levelProgress * 100}%` }}
            />
          </div>
          <span className="text-yellow-200/70 font-bold" style={{ fontSize: '9px' }}>
            {pointsIntoLevel}/{pointsForNextLevel}
          </span>
        </div>
      </div>
    </div>
  );
}
