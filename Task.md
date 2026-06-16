# 투두퀘스트 구현 Task 목록

## 앱 개요

RPG 테마의 할 일 관리 앱 "투두퀘스트".  
나무 게시판에 포스트잇 형태로 일정을 붙이고, 하단 가판대의 버튼으로 조작하는 단일 페이지 앱.

---

## 기술 스택 (Example 기준)

| 항목 | Example | 현재 프로젝트 |
|------|---------|--------------|
| React | 18 | 19 |
| CSS | Tailwind CSS v4 | Panda CSS |
| 아이콘 | lucide-react | 없음 |
| 빌드 | Vite + @tailwindcss/vite | Vite |
| 스타일 애니메이션 | tw-animate-css | 없음 |

> ⚠️ **현재 프로젝트는 Panda CSS 기반이므로, Tailwind CSS v4로 교체가 필요합니다.**

---

## 데이터 구조

```ts
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
```

---

## 구현 순서

### STEP 1 — 프로젝트 환경 세팅

**목표**: Example과 동일한 의존성 환경 구축

- [x] `@pandacss/dev` 제거 및 관련 설정 파일 삭제 (`panda.config.ts`, `styled-system/` 등)
- [x] Tailwind CSS v4 설치
  ```
  @tailwindcss/vite, tailwindcss, tw-animate-css
  ```
- [x] lucide-react 설치
- [x] `vite.config.ts`에 `tailwindcss()` 플러그인 등록, `@` 경로 alias 추가
- [x] `src/styles/` 디렉토리 생성 및 CSS 파일 작성
  - `index.css` — fonts, tailwind, theme import
  - `tailwind.css` — `@import 'tailwindcss'` + `@source` + `@import 'tw-animate-css'`
  - `theme.css` — (Example의 theme.css 내용 참고)
  - `fonts.css` — (Example의 fonts.css 내용 참고)
- [x] `src/main.tsx`에서 `./styles/index.css` import
- [x] `package.json` scripts에서 `panda codegen` 제거, `dev`/`build` 단순화
- [x] 개발 서버 실행 확인

---

### STEP 2 — 타입 & 상태 정의 (App.tsx 뼈대)

**목표**: 메인 컴포넌트의 상태 구조 확립

- [x] `src/app/App.tsx` 생성
- [x] Task, Reward 인터페이스 정의
- [x] useState로 전체 상태 선언:
  - `tasks`, `completedTasks`, `rewards` — 데이터 배열
  - `spentPoints` — 소비한 포인트
  - `earnedPoints` (derived) — `completedTasks.reduce((sum, t) => sum + t.reward, 0)`
  - `totalPoints` (derived) — `earnedPoints - spentPoints`
  - `completeMode`, `deleteMode`, `editMode` — 인터랙션 모드 (토글)
  - `editingTask: Task | null` — 편집 중인 태스크
  - 모달 표시 상태 6개: `showAddModal`, `showAddRewardModal`, `showClaimModal`, `showRemoveRewardModal`, `showCompletedModal` + editingTask로 편집 모달 제어
- [x] 핸들러 함수 정의:
  - `handleAddTask` — tasks에 추가
  - `handleEditTask` — tasks 내 수정
  - `handleCompleteTask` — tasks에서 제거 → completedTasks에 추가
  - `handleAddReward` — rewards에 추가
  - `handleClaim` — spentPoints 누적

---

### STEP 3 — 메인 레이아웃: 목판 헤더

**목표**: 상단 "투두퀘스트" 나무 목판 사인 구현

- [x] 전체 배경: `bg-gradient-to-br from-stone-700 via-stone-600 to-stone-800`
- [x] 목판 컨테이너: `px-16 py-6 rounded-lg border-4 border-amber-950`
  - 배경: `linear-gradient(135deg, #8b4513 0%, #654321 50%, #4a2c0f 100%)`
  - 입체 그림자: inset + drop-shadow 조합
- [x] 나무 질감 오버레이 (absolute, opacity-30): `repeating-linear-gradient` 수직 줄무늬
- [x] 4 모서리 나무못 장식: `w-4 h-4 rounded-full bg-gradient-to-br from-stone-800 to-stone-950`
- [x] 제목 텍스트 "투두퀘스트": `text-4xl font-bold text-amber-100 tracking-wide`

---

### STEP 4 — 메인 레이아웃: 게시판 (태스크 영역)

**목표**: 나무 게시판 위에 포스트잇 형태 태스크 카드 렌더링

- [x] 게시판 외곽: `border-8 border-amber-950 rounded-2xl`
  - 배경: `linear-gradient(145deg, #a0713a ... #5a3716)`
  - 나무 질감 오버레이 (absolute, opacity-40)
- [x] 빨간 핀 2개: `absolute top-4 left-1/4` / `right-1/4`
  - `w-5 h-5 rounded-full bg-gradient-to-br from-red-500 to-red-800`
- [x] 게시판 내용 영역: `bg-gradient-to-br from-amber-100/95 to-yellow-50/95 rounded-lg`
- [x] 모드 활성 시 오버레이 표시:
  - `completeMode`: 빨간 점선 테두리 + "완료할 일정을 클릭하세요" 뱃지
  - `deleteMode`: 슬레이트 점선 테두리 + "삭제할 일정을 클릭하세요" 뱃지
  - `editMode`: 노란 점선 테두리 + "편집할 일정을 클릭하세요" 뱃지
- [x] 태스크 없을 때: `"할 일을 붙여보세요"` 안내 텍스트
- [x] **태스크 카드** (`flex-wrap gap-4`로 배치):
  - 크기: `w-44`, `border-2 rounded p-3`
  - priority별 색상: `low`=녹색, `medium`=노란색, `high`=빨간색
  - 랜덤 회전: `((idx * 137) % 9) - 4` 도
  - 상단 핀: `w-4 h-4 rounded-full`, radial-gradient 빨간색
  - priority 뱃지 (보통/중요/긴급)
  - 제목: `font-bold text-stone-800`, `fontFamily: serif`
  - 설명 (최대 2줄): `line-clamp-2`
  - 하단: 마감일 + `+{reward}pt`
  - 작성자: 이탤릭체 서명
  - 모드별 hover 오버레이:
    - `editMode`: Edit3 아이콘 원형 노란색 오버레이
    - `deleteMode`: Trash2 아이콘 원형 슬레이트 오버레이
    - `completeMode`: "완료" 텍스트 원형 빨간색 오버레이
  - 클릭 시: completeMode → 완료, deleteMode → 삭제, editMode → 편집 모달

---

### STEP 5 — 메인 레이아웃: 하단 가판대

**목표**: 하단 나무 선반 + 7개 액션 버튼 구현

**가판대 구조**:
- [x] 선반 상단 바: `h-4`, `linear-gradient(to bottom, #704214, #5a3516)`
- [x] 선반 본체: `h-24`, `linear-gradient(to bottom, #5a3516, #3d2410)` + 나무 질감
- [x] 가판대 다리 2개: `w-6 h-12 rounded-b-lg`

**버튼 레이아웃** (`.absolute -top-20`으로 선반 위에 배치):

#### 중앙 — 완료 도장 버튼
- [x] 도장 손잡이: `w-10 h-8 rounded-t-lg`
- [x] 도장 몸통: `w-14 h-4`
- [x] 잉크 면: `w-16 h-6 rounded-b-sm` → "완료" 텍스트
- [x] 활성(completeMode): 빨간색 + 잉크 번짐 효과 + glow
- [x] 비활성: 회색(stone)
- [x] 클릭: `completeMode` 토글, 다른 모드 해제

#### 왼쪽 그룹 (flex gap-4 items-end)

**① 일정 추가 버튼** (종이 더미 + 연필)
- [x] 3장 겹친 종이 (rotate 효과로 살짝 어긋나게)
- [x] 줄 노트 선 4개
- [x] "일정 추가" 텍스트
- [x] 연필: `rotate-45 origin-center` — 몸통(노란색), 심, 지우개(분홍), 금속띠
- [x] PencilLine 아이콘 포함
- [x] 클릭: `showAddModal = true`

**② 일정 삭제 버튼** (휴지통)
- [x] 뚜껑: `w-18 h-3 rounded-t-lg`
- [x] 몸통: `w-16 h-20 rounded-b-lg` + 세로 줄무늬 2개
- [x] Trash2 아이콘 + "삭제" 텍스트
- [x] 클릭: `deleteMode` 토글, 다른 모드 해제

**③ 일정 편집 버튼** (연필꽂이)
- [x] 통 본체: `w-18 h-20 rounded-b-lg` + "편집" 텍스트
- [x] 연필 3자루: 왼쪽 노란색 `-15deg`, 중앙 파란색 펜, 오른쪽 주황색 `15deg`
- [x] 자(ruler): `rotate-[-25deg]` + 눈금 선 4개
- [x] 클릭: `editMode` 토글, 다른 모드 해제

#### 오른쪽 그룹 (flex gap-4 items-end)

**④ 보상 추가 버튼** (돈자루)
- [x] 상단 끈: `w-3 h-6 rounded-t-full`
- [x] 묶인 목: `w-14 h-8 rounded-t-full`
- [x] 본체: `borderRadius: '40% 40% 50% 50% / 25% 25% 75% 75%'` 불룩한 형태
- [x] 천 질감 오버레이 (격자 패턴)
- [x] 동전 빛 번짐 효과 3개 (radial-gradient + blur)
- [x] Coins 아이콘 + "보상 목록\n추가" 텍스트
- [x] 클릭: `showAddRewardModal = true`

**⑤ 보상 제거 버튼** (망치)
- [x] 자루: 세로 직사각형, 나무 질감
- [x] 머리: 가로 직사각형 `88px × 40px`, 좌우 타격면, "보상 제거" 텍스트
- [x] 자루 끼움 구멍 표현
- [x] 클릭: `showRemoveRewardModal = true`

**⑥ 보상(저금통) 버튼**
- [x] 상자 본체: `w-32 h-36 rounded-lg border-4 border-yellow-900`
- [x] 상단 동전 투입구: `w-16 h-2.5`
- [x] 금속 질감 오버레이 + 빛 반사
- [x] 4 모서리 장식 (L자 형태)
- [x] 중앙: `totalPoints` 숫자(26px) + "pt" + "보상" 텍스트
- [x] 클릭: `showClaimModal = true`

**⑦ 해결한 일 목록 버튼** (두루마리 더미)
- [x] 3단 두루마리: 메인 본체에 2개 구분선으로 3층 표현
- [x] 좌우 원형 단면
- [x] 각 층 말린 종이 표현 (가로 선들)
- [x] 문서 SVG 아이콘 + "해결한\n일 목록" 텍스트
- [x] 클릭: `showCompletedModal = true`

---

### STEP 6 — AddTaskModal (일정 접수증)

**목표**: 서류 형태의 태스크 추가/수정 모달

**레이아웃**:
- 배경 오버레이: `rgba(30,15,5,0.75)` + `backdropFilter: blur(4px)`
- 뒤에 삐져나온 종이 2장 (rotate-2, -rotate-1)
- 메인 서류: `w-[520px]`, 종이 질감 배경 `#faf6ed`
- 좌측 빨간 여백선 (`left-16`, `rgba(220,80,80,0.35)`)
- 종이 질감 노이즈 오버레이

**헤더**:
- 우측 상단: 서류 번호(`No. XXXX`) + 날짜
- 도장 이미지: 원형 `w-14 h-14 border-4`, `opacity-20 -rotate-12`, "퀘스트 접수" 텍스트
- 중앙: "─── 투두퀘스트 ───" + "일정 접수증" / "일정 수정증" (editMode 분기) + "QUEST REGISTRATION FORM"

**입력 필드**:
- `① 과제명 (필수)`: `border-b-2` 스타일 input, serif 폰트
- `② 마감 기한`: date input, `min={today}`
- `③ 중요도`: 보통/중요/긴급 토글 버튼 3개 (priority별 색상)
- `④ 상세 내용`: 줄 노트 배경 textarea (4행)
- `⑤ 보상 포인트`: range input (5~100, step 5) + 포인트 표시 + 눈금(5, 25, 50, 75, 100)
- 구분선: `border-t-2 border-dashed`
- 서명란: 작성자 이름 input

**버튼**:
- 취소: `border-2 border-stone-400`
- 접수/수정: 제목 입력 시 활성화, `linear-gradient(135deg, #92400e, #78350f)`
- 제출 시 `submitted=true` → scale(0.95) fade out → 800ms 후 `onSubmit` 호출

**하단 바**:
- "TodoQuest Official Form · Rev.1" + 바코드 형태 사각형 8개

**닫기 버튼**: 모달 외부 `absolute top-6 right-6`

---

### STEP 7 — AddRewardModal (영수증)

**목표**: 영수증 스타일의 보상 추가 모달

**레이아웃**:
- `w-80`, 흰색 배경 (`#fefefe`)
- **상단 톱니**: `clipPath polygon` 들쭉날쭉 패턴
- **하단 톱니**: 반전 패턴

**내용** (점선 `border-dashed border-stone-300`으로 구분):
- 가게 헤더: "✦ ✦ ✦" + "투두퀘스트" (monospace) + "REWARD SHOP" + 영수증 No. + 날짜
- 상품명: `border-b border-dotted` input (monospace, 15px)
- 필요 포인트: range (10~500, step 10) + 포인트 표시 + 눈금(10, 125, 250, 375, 500)
- 내용: 줄 노트 배경 textarea
- 합계: 총 포인트 + 상품명 미리보기
- 감사 문구 + 점 24개 장식
- 취소/등록 버튼

**제출**: `submitted=true` → fade out → 700ms 후 `onSubmit` 호출

---

### STEP 8 — RewardClaimModal (보상 수령)

**목표**: 랜덤 뽑기 / 직접 선택 두 모드의 보상 수령 모달

**레이아웃**:
- `w-[540px]`, `rounded-2xl border-4 border-amber-950`
- 배경: `linear-gradient(160deg, #fdf6e3, #faf0d7)` + 줄 노트 질감

**헤더**:
- "✦ REWARD SHOP ✦" + "보상 수령" 제목
- 현재 포인트: Coins 아이콘 + `{currentPoints}pt 보유`
- 모드 토글 버튼 2개:
  - `보상 랜덤 뽑기` (Shuffle 아이콘): 활성 시 갈색 배경
  - `보상 선택` (Hand 아이콘): 활성 시 파란색 배경

**랜덤 뽑기 모드** (`mode === 'random'`):
- 슬롯머신 디스플레이: 어두운 배경 `#1c1917`, 노란 텍스트
  - 스피닝 중: 현재 이름 + 포인트 표시
  - 미공개: "???" + 안내 텍스트
  - 공개: 별 아이콘 + 당첨 보상명 + fadeIn 애니메이션
- 뽑기 대상 태그 목록 (스피닝 중 현재 항목 하이라이트)
- "🎲 랜덤 뽑기" 버튼 → 20~30회 80ms 간격 setInterval → 당첨 결정
- 당첨 후: "다시 뽑기" + "✓ 수령하기" 버튼
- 포인트 부족 목록 (점선 테두리, opacity-40)

**선택 모드** (`mode === 'pick'`):
- 수령 가능 목록: 각 보상을 버튼으로 표시
  - 선택 시: 파란색 테두리 + scale(1.01) + ✓ 체크 원형
- 포인트 부족 목록: 점선 테두리, opacity-40, 부족 포인트 빨간색 표시
- sticky 하단 수령 버튼: 선택 시 녹색, 미선택 시 회색

**초기 상태** (`mode === 'select'`): Star 아이콘 + "위에서 방식을 선택해주세요"

**보상 없을 때**: Gift 아이콘 + 안내 텍스트

**상태**:
- `mode: 'select' | 'random' | 'pick'`
- `selectedId` — 선택 모드 선택 ID
- `isSpinning`, `spinIndex` — 랜덤 애니메이션
- `revealed`, `claimedReward` — 결과 표시

---

### STEP 9 — CompletedTasksModal (완료 목록)

**목표**: 완료된 태스크 목록 모달

**레이아웃**: `w-[520px]`, 보상 수령 모달과 동일한 기본 스타일

**헤더**:
- "✦ COMPLETED ✦" + "해결한 일 목록"
- 총 N건 완료 | 획득 포인트 Npt

**목록**:
- 완료 태스크 없을 때: CheckCircle 아이콘(opacity-20) + 안내 텍스트
- 각 항목:
  - 배경: `rgba(255,255,255,0.55)`, `border-stone-200`
  - "완료" 도장 흔적: `w-14 h-14 rounded-full border-4`, `opacity-15 -rotate-12`, 빨간색
  - 번호 원형 뱃지 (1, 2, 3...)
  - priority 뱃지 + CheckCircle 아이콘(green)
  - 제목 (serif, font-black)
  - 설명 (line-clamp-2)
  - 하단: 마감일 + `+{reward}pt`

**하단**: 닫기 버튼 (어두운 배경)

---

### STEP 10 — RemoveRewardModal (보상 제거)

**목표**: 보상 삭제 모달 (삭제 전 확인 단계 포함)

**레이아웃**: `w-[480px]`, 동일 스타일

**헤더**:
- Hammer 아이콘(좌) + "REMOVE REWARD" + Hammer 아이콘(우, scale-x-[-1] 반전)
- "보상 제거" 제목 + "제거할 보상을 선택하세요"

**목록**:
- 보상 없을 때: Hammer 아이콘(opacity-20) + 안내 텍스트
- 일반 항목: 보상명 + 설명 + 포인트 + Trash2 삭제 버튼
- **삭제 확인 상태** (`confirmId === r.id`):
  - 빨간 테두리 컨테이너
  - `"[보상명]"을 제거할까요?` + `이 작업은 되돌릴 수 없습니다.`
  - 취소 버튼 + 제거 버튼 (빨간색)

**상태**: `confirmId: number | null`

**하단**: 닫기 버튼

---

## 파일 구조 (완성 후)

```
src/
├── app/
│   ├── App.tsx                          # 메인 컴포넌트 + 상태 관리
│   └── components/
│       ├── AddTaskModal.tsx             # 일정 접수증/수정증 모달
│       ├── AddRewardModal.tsx           # 영수증 스타일 보상 추가 모달
│       ├── RewardClaimModal.tsx         # 랜덤/선택 보상 수령 모달
│       ├── CompletedTasksModal.tsx      # 완료 일정 목록 모달
│       └── RemoveRewardModal.tsx        # 보상 제거 모달
├── styles/
│   ├── index.css                        # 진입점 (fonts + tailwind + theme)
│   ├── tailwind.css                     # Tailwind v4 설정
│   ├── theme.css                        # 커스텀 CSS 변수
│   └── fonts.css                        # 폰트 설정
└── main.tsx                             # 앱 진입점
```

---

## 구현 시 주의사항

1. **인라인 스타일 사용**: Tailwind로 표현 안 되는 복잡한 그림자/gradient/clip-path는 `style={{}}` 인라인 스타일 사용
2. **fontFamily: 'serif'**: 모든 한국어 텍스트에 적용
3. **fontFamily: 'monospace'**: 영수증 모달 텍스트에 적용
4. **모드 배타성**: completeMode/deleteMode/editMode는 동시에 하나만 활성화
5. **포인트 계산**: `earnedPoints = completedTasks.reduce(...)`, `totalPoints = earnedPoints - spentPoints`
6. **태스크 회전**: `((idx * 137) % 9) - 4` 도로 자연스러운 무작위 회전 구현
7. **랜덤 뽑기 cleanup**: `useEffect(() => () => clearInterval(spinRef.current), [])` 반드시 포함
8. **모달 외부 클릭 닫기**: `onClick={(e) => e.target === e.currentTarget && onClose()}`
