import React, {useState} from "react";
import TleCalculator from "./TleCalculator";
import HintLadder from "./HintLadder";
import DryRunStepper from "./DryRunStepper";
import {PRESETS} from "../data/presets";
import {generateCustomProblemLadder} from "../services/aiService"; // 1. Import our service

export default function Workspace({
  setCurrentScreen,
  activeProblem,
  setActiveProblem,
  score,
  setScore,
}) {
  // 2. Local form state initialized from activeProblem
  const [problemTitle, setProblemTitle] = useState(activeProblem.title);
  const [problemStatement, setProblemStatement] = useState(
    activeProblem.statement,
  );
  const [attemptText, setAttemptText] = useState(activeProblem.attempt);

  const [activePreset, setActivePreset] = useState(
    activeProblem.id || "substring",
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  // 3. Handle clicking a preset
  const handlePresetSelect = (key) => {
    const preset = PRESETS[key];
    setActivePreset(key);
    setProblemTitle(preset.title);
    setProblemStatement(preset.statement);
    setAttemptText(preset.attempt);
    setActiveProblem(preset); // Updates App.jsx state!
    setScore(100);
    setStatusMsg(`Loaded preset: ${preset.label}`);
  };

  // 4. Handle generating a custom problem
  const handleGenerateCustom = async () => {
    if (!attemptText.trim()) {
      setStatusMsg("Please describe what you have tried so far first.");
      return;
    }
    setIsGenerating(true);
    setStatusMsg("Analyzing your problem and attempt...");

    // Calls our service (Gemini API or local fallback)
    const generated = await generateCustomProblemLadder({
      title: problemTitle,
      statement: problemStatement,
      attempt: attemptText,
    });

    setActivePreset("custom");
    setActiveProblem(generated); // Updates App.jsx state with the new AI JSON!
    setScore(100);
    setIsGenerating(false);
    setStatusMsg(`Generated hint ladder for: ${generated.title}`);
  };

  // ... (Keep the rest of your return statement the same for now, but update the "Generate" button)

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
            ✦ {score} points
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Column: Presets + TLE + Form */}
        <div className="xl:col-span-5 space-y-6">
          {/* Presets Card (Now maps over all 3 presets dynamically) */}
          <div className="bg-deep-navy border border-[#2B3950] rounded-2xl p-5 shadow-lg">
            <div className="flex items-center justify-between mb-2.5">
              <div className="text-[10px] uppercase tracking-[0.16em] font-bold text-[#9AABC4]">
                Quick problem presets
              </div>
              <span className="text-[11px] text-[#9AABC4]">Demo data</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {Object.keys(PRESETS).map((key) => (
                <button
                  key={key}
                  onClick={() => handlePresetSelect(key)}
                  className={`text-left p-3 rounded-xl border transition ${
                    activePreset === key
                      ? "border-[#35578F] bg-electric-indigo/15 text-[#9EC0FF]"
                      : "border-[#2B3950] bg-midnight-arctic text-[#C5D0E2] hover:border-electric-indigo"
                  }`}
                >
                  <span className="block text-xs font-semibold">
                    {PRESETS[key].label}
                  </span>
                  <span className="block text-[10px] text-[#9AABC4] mt-0.5">
                    {PRESETS[key].shortTag}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <TleCalculator />

          {/* Problem Input Form */}
          <div className="bg-deep-navy border border-[#2B3950] rounded-2xl p-5 shadow-lg space-y-4">
            <div>
              <label className="block text-xs text-[#9AABC4] mb-1.5">
                Problem title
              </label>
              <input
                type="text"
                value={problemTitle}
                onChange={(e) => setProblemTitle(e.target.value)}
                placeholder="e.g., Two Sum, Binary Search..."
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
                placeholder="Paste any DSA problem statement here..."
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

            {/* THIS is the updated Generate Button! */}
            <button
              onClick={handleGenerateCustom}
              disabled={isGenerating}
              className="w-full py-3 rounded-xl bg-electric-indigo text-midnight-arctic font-bold text-xs hover:bg-[#9EC0FF] disabled:opacity-50 transition shadow-lg shadow-electric-indigo/10 flex items-center justify-center gap-2"
            >
              <span>
                {isGenerating
                  ? "Generating hint ladder..."
                  : "Generate my hint ladder"}
              </span>
              <span>→</span>
            </button>

            {/* Status Message for AI Loading */}
            {statusMsg && (
              <p className="text-[11px] text-cool-teal font-medium">
                {statusMsg}
              </p>
            )}
          </div>
        </div>

        {/* Right Column: Hint Ladder, Dry Run Stepper, and Logic Gate Button */}
        <div className="xl:col-span-7 space-y-5">
          {/* We pass the activeProblem data down to the children! */}
          <HintLadder
            problem={activeProblem}
            score={score}
            setScore={setScore}
          />
          <DryRunStepper problem={activeProblem} />

          {/* The Verify button has moved here to the bottom of the learning flow */}
          <div className="flex justify-end">
            <button
              onClick={() => setCurrentScreen("logic")}
              className="px-5 py-3 rounded-xl bg-electric-indigo text-midnight-arctic font-bold text-xs hover:bg-[#9EC0FF] transition shadow-lg shadow-electric-indigo/10"
            >
              I solved it in my IDE — verify & log ↗
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
