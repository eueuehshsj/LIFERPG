import { useState, useRef, useEffect } from 'react';
import { X, Coins, Shuffle, Hand, Star, Gift } from 'lucide-react';

interface Reward {
  id: number;
  name: string;
  points: number;
  description: string;
}

interface Props {
  onClose: () => void;
  onClaim: (reward: Reward) => void;
  rewards: Reward[];
  currentPoints: number;
}

type Mode = 'select' | 'random' | 'pick';

export default function RewardClaimModal({ onClose, onClaim, rewards, currentPoints }: Props) {
  const [mode, setMode] = useState<Mode>('select');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinIndex, setSpinIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [claimedReward, setClaimedReward] = useState<Reward | null>(null);
  const spinRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const affordable = rewards.filter((r) => r.points <= currentPoints);
  const unaffordable = rewards.filter((r) => r.points > currentPoints);

  useEffect(() => () => { if (spinRef.current) clearInterval(spinRef.current); }, []);

  const handleSpin = () => {
    if (affordable.length === 0 || isSpinning) return;
    setIsSpinning(true);
    setRevealed(false);
    setClaimedReward(null);

    const count = Math.floor(Math.random() * 11) + 20;
    let i = 0;
    spinRef.current = setInterval(() => {
      setSpinIndex((prev) => (prev + 1) % affordable.length);
      i++;
      if (i >= count) {
        clearInterval(spinRef.current!);
        const winner = affordable[Math.floor(Math.random() * affordable.length)];
        setClaimedReward(winner);
        setSpinIndex(affordable.indexOf(winner));
        setIsSpinning(false);
        setRevealed(true);
      }
    }, 80);
  };

  const handleClaim = (reward: Reward) => {
    onClaim(reward);
    onClose();
  };

  const selectedReward = rewards.find((r) => r.id === selectedId) ?? null;

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
        className="w-[540px] rounded-2xl border-4 border-amber-950 overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #fdf6e3, #faf0d7)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.5)',
          backgroundImage: `
            linear-gradient(160deg, #fdf6e3, #faf0d7),
            repeating-linear-gradient(transparent, transparent calc(1.5em - 1px), rgba(180,150,80,0.15) calc(1.5em - 1px), rgba(180,150,80,0.15) 1.5em)
          `,
        }}
      >
        {/* 헤더 */}
        <div className="px-8 pt-6 pb-4 border-b-2 border-dashed border-amber-800/30">
          <div className="text-center mb-3">
            <div style={{ fontFamily: 'serif', fontSize: '11px', color: '#92400e', letterSpacing: '0.3em' }}>
              ✦ REWARD SHOP ✦
            </div>
            <div className="font-black text-2xl mt-0.5" style={{ fontFamily: 'serif', color: '#1c1917' }}>
              보상 수령
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 mb-4">
            <Coins className="w-4 h-4 text-amber-700" />
            <span className="font-black text-amber-700" style={{ fontFamily: 'serif', fontSize: '15px' }}>
              {currentPoints}pt 보유
            </span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => { setMode('random'); setRevealed(false); setClaimedReward(null); }}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-bold text-sm transition-all"
              style={{
                fontFamily: 'serif',
                background: mode === 'random' ? 'linear-gradient(135deg, #92400e, #78350f)' : 'rgba(255,255,255,0.5)',
                color: mode === 'random' ? '#fef3c7' : '#78716c',
                border: mode === 'random' ? 'none' : '1px solid rgba(180,150,80,0.3)',
                boxShadow: mode === 'random' ? '0 4px 12px rgba(120,53,15,0.4)' : 'none',
              }}
            >
              <Shuffle className="w-4 h-4" />
              보상 랜덤 뽑기
            </button>
            <button
              onClick={() => { setMode('pick'); setSelectedId(null); }}
              className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-bold text-sm transition-all"
              style={{
                fontFamily: 'serif',
                background: mode === 'pick' ? 'linear-gradient(135deg, #1d4ed8, #1e3a8a)' : 'rgba(255,255,255,0.5)',
                color: mode === 'pick' ? '#eff6ff' : '#78716c',
                border: mode === 'pick' ? 'none' : '1px solid rgba(180,150,80,0.3)',
                boxShadow: mode === 'pick' ? '0 4px 12px rgba(30,58,138,0.3)' : 'none',
              }}
            >
              <Hand className="w-4 h-4" />
              보상 선택
            </button>
          </div>
        </div>

        {/* 콘텐츠 */}
        <div className="px-8 py-5 max-h-[60vh] overflow-y-auto">

          {/* 초기 상태 */}
          {mode === 'select' && (
            <div className="flex flex-col items-center justify-center py-10 gap-3">
              <Star className="w-12 h-12 text-amber-300" strokeWidth={1.5} />
              <p className="text-stone-500 font-bold text-sm text-center" style={{ fontFamily: 'serif' }}>
                위에서 방식을 선택해주세요
              </p>
            </div>
          )}

          {/* 보상 없음 */}
          {mode !== 'select' && rewards.length === 0 && (
            <div className="flex flex-col items-center justify-center py-10 gap-3">
              <Gift className="w-12 h-12 text-stone-300" strokeWidth={1.5} />
              <p className="text-stone-400 font-bold text-sm text-center" style={{ fontFamily: 'serif' }}>
                등록된 보상이 없습니다
              </p>
            </div>
          )}

          {/* 랜덤 뽑기 모드 */}
          {mode === 'random' && rewards.length > 0 && (
            <div className="flex flex-col gap-4">
              {/* 슬롯머신 디스플레이 */}
              <div
                className="rounded-xl p-5 text-center min-h-[100px] flex flex-col items-center justify-center"
                style={{ background: '#1c1917', boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.6)' }}
              >
                {!isSpinning && !revealed && (
                  <>
                    <div className="font-black text-3xl text-yellow-300/40" style={{ fontFamily: 'serif' }}>???</div>
                    <div className="text-stone-500 text-xs mt-1" style={{ fontFamily: 'serif' }}>뽑기 버튼을 눌러주세요</div>
                  </>
                )}
                {isSpinning && affordable[spinIndex] && (
                  <>
                    <div className="font-black text-2xl text-yellow-300" style={{ fontFamily: 'serif' }}>
                      {affordable[spinIndex].name}
                    </div>
                    <div className="text-yellow-600 text-sm mt-1" style={{ fontFamily: 'serif' }}>
                      {affordable[spinIndex].points}pt
                    </div>
                  </>
                )}
                {revealed && claimedReward && (
                  <div style={{ animation: 'fadeIn 0.4s ease' }}>
                    <Star className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
                    <div className="font-black text-2xl text-yellow-300" style={{ fontFamily: 'serif' }}>
                      {claimedReward.name}
                    </div>
                    <div className="text-yellow-600 text-sm mt-1" style={{ fontFamily: 'serif' }}>
                      {claimedReward.points}pt
                    </div>
                  </div>
                )}
              </div>

              {/* 뽑기 대상 태그 목록 */}
              {affordable.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {affordable.map((r, i) => (
                    <span
                      key={r.id}
                      className="px-3 py-1 rounded-full text-xs font-bold transition-all"
                      style={{
                        fontFamily: 'serif',
                        background: isSpinning && spinIndex === i
                          ? '#92400e'
                          : revealed && claimedReward?.id === r.id
                          ? '#92400e'
                          : 'rgba(255,255,255,0.6)',
                        color: (isSpinning && spinIndex === i) || (revealed && claimedReward?.id === r.id)
                          ? '#fef3c7'
                          : '#78716c',
                        border: '1px solid rgba(180,150,80,0.3)',
                      }}
                    >
                      {r.name} · {r.points}pt
                    </span>
                  ))}
                </div>
              )}

              {/* 버튼 */}
              {!revealed ? (
                <button
                  onClick={handleSpin}
                  disabled={isSpinning || affordable.length === 0}
                  className="w-full py-3 rounded-xl font-black text-base disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  style={{
                    fontFamily: 'serif',
                    background: 'linear-gradient(135deg, #92400e, #78350f)',
                    color: '#fef3c7',
                    boxShadow: '0 6px 16px rgba(120,53,15,0.4)',
                  }}
                >
                  🎲 랜덤 뽑기
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSpin}
                    className="flex-1 py-2.5 rounded-xl font-bold text-sm border-2 border-stone-400 text-stone-600 hover:bg-stone-100 transition-colors"
                    style={{ fontFamily: 'serif' }}
                  >
                    다시 뽑기
                  </button>
                  <button
                    onClick={() => claimedReward && handleClaim(claimedReward)}
                    className="flex-1 py-2.5 rounded-xl font-black text-sm transition-all"
                    style={{
                      fontFamily: 'serif',
                      background: 'linear-gradient(135deg, #15803d, #166534)',
                      color: '#f0fdf4',
                      boxShadow: '0 4px 12px rgba(21,128,61,0.4)',
                    }}
                  >
                    ✓ 수령하기
                  </button>
                </div>
              )}

              {/* 포인트 부족 목록 */}
              {unaffordable.length > 0 && (
                <div className="mt-1">
                  <div className="text-xs text-stone-400 mb-2" style={{ fontFamily: 'serif' }}>포인트 부족</div>
                  <div className="flex flex-col gap-1">
                    {unaffordable.map((r) => (
                      <div
                        key={r.id}
                        className="flex justify-between items-center px-3 py-2 rounded-lg"
                        style={{ border: '1px dashed rgba(180,150,80,0.3)', opacity: 0.4 }}
                      >
                        <span className="text-sm text-stone-600" style={{ fontFamily: 'serif' }}>{r.name}</span>
                        <span className="text-xs text-stone-500" style={{ fontFamily: 'serif' }}>{r.points}pt</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 선택 모드 */}
          {mode === 'pick' && rewards.length > 0 && (
            <div className="flex flex-col gap-2">
              {/* 수령 가능 목록 */}
              {affordable.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedId(r.id)}
                  className="w-full text-left px-4 py-3 rounded-xl transition-all"
                  style={{
                    background: selectedId === r.id ? 'rgba(219,234,254,0.8)' : 'rgba(255,255,255,0.6)',
                    border: selectedId === r.id ? '2px solid #3b82f6' : '1px solid rgba(180,150,80,0.3)',
                    transform: selectedId === r.id ? 'scale(1.01)' : 'scale(1)',
                    boxShadow: selectedId === r.id ? '0 4px 12px rgba(59,130,246,0.2)' : 'none',
                  }}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold text-stone-800 text-sm" style={{ fontFamily: 'serif' }}>{r.name}</div>
                      {r.description && (
                        <div className="text-stone-500 text-xs mt-0.5" style={{ fontFamily: 'serif' }}>{r.description}</div>
                      )}
                    </div>
                    <div className="flex items-center gap-2 shrink-0 ml-3">
                      <span className="font-black text-amber-700 text-sm" style={{ fontFamily: 'serif' }}>{r.points}pt</span>
                      {selectedId === r.id && (
                        <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                          <span className="text-white text-xs font-black">✓</span>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}

              {/* 포인트 부족 목록 */}
              {unaffordable.length > 0 && (
                <>
                  <div className="text-xs text-stone-400 mt-2 mb-1" style={{ fontFamily: 'serif' }}>포인트 부족</div>
                  {unaffordable.map((r) => (
                    <div
                      key={r.id}
                      className="px-4 py-3 rounded-xl"
                      style={{ border: '1px dashed rgba(180,150,80,0.3)', opacity: 0.4 }}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-bold text-stone-700 text-sm" style={{ fontFamily: 'serif' }}>{r.name}</div>
                          {r.description && (
                            <div className="text-stone-500 text-xs mt-0.5" style={{ fontFamily: 'serif' }}>{r.description}</div>
                          )}
                        </div>
                        <div className="flex items-center gap-2 shrink-0 ml-3">
                          <span className="font-black text-stone-500 text-sm" style={{ fontFamily: 'serif' }}>{r.points}pt</span>
                          <span className="text-red-500 font-bold text-xs" style={{ fontFamily: 'serif' }}>
                            -{r.points - currentPoints}pt
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}

              {/* 수령 버튼 (sticky) */}
              <div className="sticky bottom-0 pt-3 pb-1" style={{ background: 'linear-gradient(to top, #faf0d7 70%, transparent)' }}>
                <button
                  onClick={() => selectedReward && handleClaim(selectedReward)}
                  disabled={!selectedId}
                  className="w-full py-3 rounded-xl font-black text-base transition-all disabled:cursor-not-allowed"
                  style={{
                    fontFamily: 'serif',
                    background: selectedId
                      ? 'linear-gradient(135deg, #15803d, #166534)'
                      : 'rgba(180,180,180,0.4)',
                    color: selectedId ? '#f0fdf4' : '#a8a29e',
                    boxShadow: selectedId ? '0 6px 16px rgba(21,128,61,0.4)' : 'none',
                  }}
                >
                  {selectedId ? '✓ 수령하기' : '보상을 선택하세요'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.9); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </div>
  );
}
