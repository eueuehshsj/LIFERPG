export default function WoodenHeader() {
  return (
    <div className="flex justify-center py-6">
      <div className="relative">
        <div
          className="relative px-16 py-6 rounded-lg border-4 border-amber-950"
          style={{
            background:
              "linear-gradient(135deg, #8b4513 0%, #654321 50%, #4a2c0f 100%)",
            boxShadow: `
              inset 0 2px 4px rgba(255,255,255,0.1),
              inset 0 -2px 4px rgba(0,0,0,0.5),
              0 8px 16px rgba(0,0,0,0.6),
              0 4px 8px rgba(0,0,0,0.4)
            `,
          }}
        >
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
          <div
            className="absolute top-3 left-3 w-4 h-4 rounded-full bg-linear-to-br from-stone-800 to-stone-950"
            style={{
              boxShadow:
                "inset 0 2px 3px rgba(0,0,0,0.8), 0 1px 2px rgba(0,0,0,0.5)",
            }}
          />
          <div
            className="absolute top-3 right-3 w-4 h-4 rounded-full bg-linear-to-br from-stone-800 to-stone-950"
            style={{
              boxShadow:
                "inset 0 2px 3px rgba(0,0,0,0.8), 0 1px 2px rgba(0,0,0,0.5)",
            }}
          />
          <div
            className="absolute bottom-3 left-3 w-4 h-4 rounded-full bg-linear-to-br from-stone-800 to-stone-950"
            style={{
              boxShadow:
                "inset 0 2px 3px rgba(0,0,0,0.8), 0 1px 2px rgba(0,0,0,0.5)",
            }}
          />
          <div
            className="absolute bottom-3 right-3 w-4 h-4 rounded-full bg-linear-to-br from-stone-800 to-stone-950"
            style={{
              boxShadow:
                "inset 0 2px 3px rgba(0,0,0,0.8), 0 1px 2px rgba(0,0,0,0.5)",
            }}
          />
          <h1
            className="text-4xl font-bold text-amber-100 tracking-wide relative z-10"
            style={{
              textShadow:
                "3px 3px 6px rgba(0,0,0,0.8), 1px 1px 2px rgba(0,0,0,0.9)",
              filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.5))",
            }}
          >
            투두퀘스트
          </h1>
        </div>
      </div>
    </div>
  );
}
