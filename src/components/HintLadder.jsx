import React, {useState} from "react";

export default function HintLadder({score, setScore}) {
  const [hint2Unlocked, setHint2Unlocked] = useState(false);
  const [hint3Unlocked, setHint3Unlocked] = useState(false);

  const unlockHint2 = () => {
    if (!hint2Unlocked) {
      setHint2Unlocked(true);
      setScore((prev) => Math.max(0, prev - 15));
    }
  };

  const unlockHint3 = () => {
    if (!hint2Unlocked) {
      alert("Please unlock Rung 2 first to preserve the learning path!");
      return;
    }
    if (!hint3Unlocked) {
      setHint3Unlocked(true);
      setScore((prev) => Math.max(0, prev - 25));
    }
  };

  return (
    <div className="space-y-4">
      {/* Pattern & Score Bar */}
      <div className="bg-deep-navy border border-[#2B3950] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
        <div>
          <div className="text-[10px] uppercase tracking-[0.16em] font-bold text-[#9AABC4] mb-1">
            Detected pattern
          </div>
          <span className="inline-flex items-center gap-1.5 border border-[#35578F] bg-electric-indigo/12 rounded-lg px-3 py-1 text-xs font-mono text-[#9EC0FF]">
            Sliding Window + Two Pointers
          </span>
        </div>
        <div className="sm:min-w-44">
          <div className="flex justify-between items-center text-xs mb-1.5">
            <span className="text-[#9AABC4]">Independence score</span>
            <span className="font-mono font-bold text-[#9EC0FF]">
              {score} <span className="text-[#9AABC4]">/ 100</span>
            </span>
          </div>
          <div className="h-1.5 bg-[#2B3950] rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r text-transparent bg-[linear-gradient(90deg,#376FDB,#9EC0FF)] transition-all duration-300"
              style={{width: `${score}%`}}
            ></div>
          </div>
        </div>
      </div>

      {/* Rung 1: Unlocked by default */}
      <div className="bg-deep-navy border border-[#35578F] rounded-2xl p-5 shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <span className="h-7 w-7 rounded-lg bg-electric-indigo/10 text-[#9EC0FF] flex items-center justify-center text-xs font-bold font-mono">
              01
            </span>
            <div>
              <div className="font-bold text-sm text-ice-white">
                Intuition & why your logic fails
              </div>
              <div className="text-[10px] text-[#9AABC4]">
                Rung 1 · Conceptual nudge
              </div>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 border border-[#214A4B] bg-[#122C32] rounded-full px-3 py-0.5 text-[11px] text-cool-teal">
            Unlocked
          </span>
        </div>
        <p className="text-sm text-[#C5D0E2] leading-7">
          Your nested loop repeats work by restarting the right pointer. Imagine
          stretching a window across the string: expand the right edge, and when
          a duplicate appears, move the left edge forward just enough to remove
          it.
        </p>
      </div>

      {/* Rung 2: Locked with deduction */}
      <div
        className={`relative bg-deep-navy border rounded-2xl p-5 shadow-lg overflow-hidden ${hint2Unlocked ? "border-[#35578F]" : "border-[#2B3950]"}`}
      >
        <div
          className={
            !hint2Unlocked
              ? "filter blur-xs opacity-25 select-none pointer-events-none"
              : ""
          }
        >
          <div className="flex items-center justify-between mb-3">
            <div className="font-bold text-sm text-ice-white">
              02 · Pattern & data structure
            </div>
            <span className="border border-[#2B3950] bg-midnight-arctic rounded-full px-2.5 py-0.5 text-[11px] text-[#C5D0E2]">
              Rung 2
            </span>
          </div>
          <p className="text-sm leading-7 text-[#C5D0E2]">
            Maintain two pointers and a Set or Map for the current window. Check
            whether the incoming character already exists before expanding the
            window.
          </p>
        </div>

        {!hint2Unlocked && (
          <div className="absolute inset-0 bg-midnight-arctic/80 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 text-center">
            <span className="border border-[#35578F] bg-electric-indigo/15 text-[#9EC0FF] rounded-full px-3 py-1 text-xs font-semibold mb-2">
              ⌁ Think-first checkpoint
            </span>
            <p className="text-xs text-[#9AABC4] max-w-sm mb-3">
              Try applying the first hint in your code before revealing the data
              structure.
            </p>
            <button
              onClick={unlockHint2}
              className="px-4 py-2 rounded-xl bg-[#202D42] border border-[#2B3950] text-ice-white text-xs font-semibold hover:border-electric-indigo transition"
            >
              Reveal next hint{" "}
              <span className="text-[#9EC0FF] ml-1">−15 pts</span>
            </button>
          </div>
        )}
      </div>

      {/* Rung 3: Locked with deduction */}
      <div
        className={`relative bg-deep-navy border rounded-2xl p-5 shadow-lg overflow-hidden ${hint3Unlocked ? "border-[#35578F]" : "border-[#2B3950]"}`}
      >
        <div
          className={
            !hint3Unlocked
              ? "filter blur-xs opacity-25 select-none pointer-events-none"
              : ""
          }
        >
          <div className="flex items-center justify-between mb-3">
            <div className="font-bold text-sm text-ice-white">
              03 · Dry run & edge cases
            </div>
            <span className="border border-[#2B3950] bg-midnight-arctic rounded-full px-2.5 py-0.5 text-[11px] text-[#C5D0E2]">
              Rung 3
            </span>
          </div>
          <p className="text-sm leading-7 text-[#C5D0E2]">
            For each character, update the window's left boundary only when
            necessary, then record the largest valid window length. Time
            complexity: $O(N)$, Space complexity: $O(\min(N, \text{charset}))$.
          </p>
        </div>

        {!hint3Unlocked && (
          <div className="absolute inset-0 bg-midnight-arctic/80 backdrop-blur-[2px] flex flex-col items-center justify-center p-4 text-center">
            <span className="border border-[#2B3950] bg-midnight-arctic text-[#C5D0E2] rounded-full px-3 py-1 text-xs font-semibold mb-2">
              Advanced hint
            </span>
            <p className="text-xs text-[#9AABC4] max-w-sm mb-3">
              Use this after you have a plan for the data structure.
            </p>
            <button
              onClick={unlockHint3}
              className="px-4 py-2 rounded-xl bg-[#202D42] border border-[#2B3950] text-ice-white text-xs font-semibold hover:border-electric-indigo transition"
            >
              Reveal dry-run hint{" "}
              <span className="text-[#9EC0FF] ml-1">−25 pts</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
