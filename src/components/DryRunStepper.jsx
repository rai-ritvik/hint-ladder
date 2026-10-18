import React, {useState} from "react";

export default function DryRunStepper({onFinished}) {
  const [dryStep, setDryStep] = useState(0);

  const steps = [
    {
      text: "Start with an empty window. Add 'a' at index 0; the current window is \"a\" and maxLen = 1.",
      activeIdx: 0,
    },
    {
      text: "Move right to index 1 ('b'). No duplicate exists, so the window becomes \"ab\" and maxLen = 2.",
      activeIdx: 1,
    },
    {
      text: "Move right to index 2 ('c'). The window is \"abc\"; all characters are unique and maxLen = 3.",
      activeIdx: 2,
    },
    {
      text: "At index 3, 'a' repeats. Move left past the previous 'a'; the valid window becomes \"bca\". maxLen remains 3.",
      activeIdx: 3,
    },
  ];

  const chars = ["a", "b", "c", "a"];

  const handlePrev = () => setDryStep((prev) => Math.max(0, prev - 1));
  const handleNext = () =>
    setDryStep((prev) => Math.min(steps.length - 1, prev + 1));

  return (
    <div className="bg-deep-navy border border-[#2B3950] rounded-2xl p-5 shadow-lg space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <div className="text-[10px] uppercase tracking-[0.16em] font-bold text-[#9AABC4] mb-1">
            Walk through the algorithm
          </div>
          <h3 className="font-bold text-sm text-ice-white">
            Interactive dry run
          </h3>
        </div>
        <span className="border border-[#35578F] bg-electric-indigo/12 rounded-full px-3 py-0.5 text-xs font-mono text-[#9EC0FF]">
          Step {dryStep + 1} of {steps.length}
        </span>
      </div>

      {/* Sample String Visualizer */}
      <div className="flex items-center gap-3">
        <span className="text-xs text-[#9AABC4]">Input</span>
        <span className="font-mono text-sm text-[#9EC0FF]">s = "abca"</span>
        <div className="ml-auto flex gap-1.5">
          {chars.map((ch, idx) => (
            <span
              key={idx}
              className={`w-8 h-8 rounded-xl border flex items-center justify-center font-mono text-sm transition ${
                idx === steps[dryStep].activeIdx
                  ? "border-[#35578F] bg-electric-indigo/20 text-[#9EC0FF]"
                  : "border-[#2B3950] bg-midnight-arctic text-[#C5D0E2]"
              }`}
            >
              {ch}
            </span>
          ))}
        </div>
      </div>

      {/* Explanation Box */}
      <div className="rounded-xl bg-midnight-arctic border border-[#2B3950] p-4 text-xs sm:text-sm text-[#C5D0E2] leading-relaxed min-h-20 flex items-center">
        {steps[dryStep].text}
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between pt-1">
        <button
          onClick={handlePrev}
          disabled={dryStep === 0}
          className="px-3.5 py-2 rounded-xl bg-[#202D42] border border-[#2B3950] text-xs font-semibold text-[#C5D0E2] hover:border-electric-indigo disabled:opacity-40 disabled:hover:border-[#2B3950] transition"
        >
          ← Previous
        </button>

        <div className="flex gap-1.5">
          {steps.map((_, i) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full transition ${i === dryStep ? "bg-electric-indigo" : "bg-[#2B3950]"}`}
            ></span>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="px-4 py-2 rounded-xl bg-electric-indigo text-midnight-arctic text-xs font-bold hover:bg-[#9EC0FF] transition shadow-lg shadow-electric-indigo/10"
        >
          {dryStep === steps.length - 1 ? "Finish Dry Run →" : "Next step →"}
        </button>
      </div>

      <p className="text-[10px] text-[#9AABC4]">
        Edge cases: empty string, repeated characters ("bbbbb"), and strings
        containing spaces.
      </p>
    </div>
  );
}
