import React, {useState} from "react";
import TleCalculator from "./TleCalculator";

export default function Workspace({setCurrentScreen}) {
  const [problemTitle, setProblemTitle] = useState(
    "Longest Substring Without Repeating Characters",
  );
  const [problemStatement, setProblemStatement] = useState(
    "Given a string s, find the length of the longest substring without repeating characters. Constraints: 0 <= s.length <= 10^5.",
  );
  const [attemptText, setAttemptText] = useState(
    "I used two nested loops to check substrings and a HashSet to detect duplicates, but it gets too slow on large inputs.",
  );
  const [activePreset, setActivePreset] = useState("substring");

  const presets = {
    substring: {
      title: "Longest Substring Without Repeating Characters",
      statement:
        "Given a string s, find the length of the longest substring without repeating characters. Constraints: 0 <= s.length <= 10^5.",
      attempt:
        "I used two nested loops to check substrings and a HashSet to detect duplicates, but it gets too slow on large inputs.",
    },
    subarray: {
      title: "Subarray Sum Equals K",
      statement:
        "Given an integer array nums and an integer k, return the total number of continuous subarrays whose sum equals k.",
      attempt:
        "I am checking every possible subarray and summing its elements, but the nested loops are slow.",
    },
  };

  const handlePresetSelect = (key) => {
    setActivePreset(key);
    setProblemTitle(presets[key].title);
    setProblemStatement(presets[key].statement);
    setAttemptText(presets[key].attempt);
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.16em] font-bold text-[#9AABC4] mb-1">
            Your problem-solving studio
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Think it through<span className="text-electric-indigo">.</span>
          </h1>
          <p className="text-sm text-[#9AABC4] mt-1">
            Hints guide your thinking. The solution stays yours.
          </p>
        </div>
        <div className="flex gap-2">
          <span className="inline-flex items-center gap-2 border border-[#2B3950] bg-midnight-arctic rounded-full px-3 py-1 text-xs text-[#C5D0E2]">
            <span className="w-2 h-2 rounded-full bg-cool-teal"></span>{" "}
            Workspace ready
          </span>
          <span className="inline-flex items-center gap-1.5 border border-[#35578F] bg-electric-indigo/12 rounded-full px-3 py-1 text-xs text-[#9EC0FF] font-mono">
            ✦ 100 points
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Column: Presets + TLE + Form */}
        <div className="xl:col-span-5 space-y-6">
          {/* Presets */}
          <div className="bg-deep-navy border border-[#2B3950] rounded-2xl p-5 shadow-lg">
            <div className="text-[10px] uppercase tracking-[0.16em] font-bold text-[#9AABC4] mb-2">
              Quick problem presets
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handlePresetSelect("substring")}
                className={`text-left p-3 rounded-xl border transition ${activePreset === "substring" ? "border-[#35578F] bg-electric-indigo/15 text-[#9EC0FF]" : "border-[#2B3950] bg-midnight-arctic text-[#C5D0E2] hover:border-electric-indigo"}`}
              >
                <span className="block text-xs font-semibold">
                  Longest Substring
                </span>
                <span className="block text-[10px] text-[#9AABC4] mt-0.5">
                  Sliding window
                </span>
              </button>
              <button
                onClick={() => handlePresetSelect("subarray")}
                className={`text-left p-3 rounded-xl border transition ${activePreset === "subarray" ? "border-[#35578F] bg-electric-indigo/15 text-[#9EC0FF]" : "border-[#2B3950] bg-midnight-arctic text-[#C5D0E2] hover:border-electric-indigo"}`}
              >
                <span className="block text-xs font-semibold">
                  Subarray Sum = K
                </span>
                <span className="block text-[10px] text-[#9AABC4] mt-0.5">
                  Prefix sum
                </span>
              </button>
            </div>
          </div>

          {/* TLE Calculator Component */}
          <TleCalculator />

          {/* Problem Inputs */}
          <div className="bg-deep-navy border border-[#2B3950] rounded-2xl p-5 shadow-lg space-y-4">
            <div>
              <label className="block text-xs text-[#9AABC4] mb-1.5">
                Problem title
              </label>
              <input
                type="text"
                value={problemTitle}
                onChange={(e) => setProblemTitle(e.target.value)}
                className="w-full bg-midnight-arctic border border-[#2B3950] rounded-xl px-3.5 py-2.5 text-xs font-semibold text-ice-white outline-none focus:border-electric-indigo"
              />
            </div>

            <div>
              <label className="block text-xs text-[#9AABC4] mb-1.5">
                Problem statement
              </label>
              <textarea
                rows="3"
                value={problemStatement}
                onChange={(e) => setProblemStatement(e.target.value)}
                className="w-full bg-midnight-arctic border border-[#2B3950] rounded-xl px-3.5 py-2.5 text-xs text-ice-white outline-none focus:border-electric-indigo resize-y"
              />
            </div>

            <div>
              <label className="block text-xs text-[#9AABC4] mb-1.5">
                What have you tried so far?
              </label>
              <textarea
                rows="3"
                value={attemptText}
                onChange={(e) => setAttemptText(e.target.value)}
                className="w-full bg-midnight-arctic border border-[#2B3950] rounded-xl px-3.5 py-2.5 text-xs text-ice-white outline-none focus:border-electric-indigo resize-y"
                placeholder="Describe your current approach..."
              />
            </div>

            <button
              onClick={() => setCurrentScreen("logic")}
              className="w-full py-3 rounded-xl bg-electric-indigo text-midnight-arctic font-bold text-xs hover:bg-[#9EC0FF] transition shadow-lg shadow-electric-indigo/10 flex items-center justify-center gap-2"
            >
              <span>Generate my hint ladder</span>
              <span>→</span>
            </button>
          </div>
        </div>

        {/* Right Column Preview placeholder for Step 3 */}
        <div className="xl:col-span-7">
          <div className="bg-deep-navy border border-[#2B3950] rounded-2xl p-8 text-center text-[#9AABC4] flex flex-col items-center justify-center h-full min-h-100">
            <div className="text-3xl mb-2">🪜</div>
            <h3 className="text-sm font-bold text-ice-white">
              Hint Ladder & Dry-Run Preview
            </h3>
            <p className="text-xs text-[#9AABC4] mt-1 max-w-sm">
              In Step 3, this side will render our 3 progressive hint cards,
              cooldown timers, and interactive code dry-run stepper.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
