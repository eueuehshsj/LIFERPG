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

export default function WoodenHeader() {
  return (
    <div className="flex justify-center py-6">
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
    </div>
  );
}
