import React, {useState} from "react";

export default function LogicGate({setCurrentScreen, score}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const correctOption = "b";
  const explanation =
    "Move the left boundary when the current window becomes invalid. Keep advancing it until the repeated character is no longer inside the active window.";

  const options = [
    {id: "a", text: "At every single iteration of the outer loop"},
    {
      id: "b",
      text: "When the current character creates a duplicate in the active window",
    },
    {id: "c", text: "Only when the window length becomes an even number"},
  ];

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    const correct = selectedAnswer === correctOption;
    setIsCorrect(correct);
    setIsSubmitted(true);

    if (correct) {
      // Save record to localStorage
      try {
        const existing = JSON.parse(
          localStorage.getItem("hintladder-records"),
        ) || [
          {
            title: "Coin Change (Minimum Coins)",
            pattern: "Dynamic Programming",
            hints: 3,
            score: 15,
            status: "Needs revision",
          },
          {
            title: "Subarray Sum Equals K",
            pattern: "Prefix Sum",
            hints: 2,
            score: 50,
            status: "Due tomorrow",
          },
        ];

        const newRecord = {
          title: "Longest Substring Without Repeating Characters",
          pattern: "Sliding Window",
          hints: score < 80 ? 2 : 1,
          score: score,
          status: score >= 70 ? "Mastered" : "Needs revision",
        };

        // Avoid exact duplicates
        const filtered = existing.filter((r) => r.title !== newRecord.title);
        filtered.unshift(newRecord);
        localStorage.setItem("hintladder-records", JSON.stringify(filtered));
      } catch (e) {
        console.error("Failed to save record", e);
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <button
        onClick={() => setCurrentScreen("workspace")}
        className="text-xs text-[#9AABC4] hover:text-[#9EC0FF] transition"
      >
        ← Back to workspace
      </button>

      <div>
        <div className="text-[10px] uppercase tracking-[0.16em] font-bold text-[#9AABC4] mb-1">
          Verification gate · Step 1 of 1
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold">
          Prove you own the solution<span className="text-electric-indigo">.</span>
        </h1>
        <p className="text-sm text-[#9AABC4] mt-1">
          A quick concept check before a problem is marked solved.
        </p>
      </div>

      <div className="bg-deep-navy border border-[#2B3950] rounded-2xl p-6 sm:p-8 shadow-xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#2B3950] pb-4">
          <div>
            <div className="text-[10px] uppercase tracking-[0.16em] font-bold text-[#9AABC4] mb-1">
              Logic checkpoint
            </div>
            <h2 className="font-bold text-lg text-ice-white">
              One-line logic check
            </h2>
          </div>
          <span className="border border-[#35578F] bg-electric-indigo/12 rounded-full px-3 py-1 text-xs font-mono text-[#9EC0FF]">
            Current score: {score} pts
          </span>
        </div>

        <p className="text-xs text-[#9AABC4]">
          Problem:{" "}
          <strong className="text-ice-white">
            Longest Substring Without Repeating Characters
          </strong>
        </p>

        <div className="rounded-xl bg-midnight-arctic border border-[#2B3950] p-5">
          <div className="text-[10px] uppercase tracking-[0.16em] font-bold text-[#9AABC4] mb-2">
            Question
          </div>
          <p className="text-sm sm:text-base font-semibold text-ice-white leading-relaxed">
            In a sliding-window solution, when should we advance the left
            pointer?
          </p>
        </div>

        {/* Options */}
        <div className="space-y-3">
          {options.map((opt) => {
            let borderStyle = "border-[#2B3950] bg-[#0B1120] text-[#C5D0E2]";
            if (selectedAnswer === opt.id) {
              borderStyle = "border-[#5794FF] bg-[#5794FF]/15 text-[#E7EDF8]";
            }
            if (isSubmitted && opt.id === correctOption) {
              borderStyle = "border-[#214A4B] bg-[#122C32] text-[#52D6C7]";
            }

            return (
              <button
                key={opt.id}
                disabled={isSubmitted}
                onClick={() => setSelectedAnswer(opt.id)}
                className={`w-full flex items-start gap-3 p-4 rounded-xl border text-left text-xs sm:text-sm transition ${borderStyle}`}
              >
                <span
                  className={`mt-0.5 h-4 w-4 rounded-full border border-[#62738A] shrink-0 flex items-center justify-center text-[10px] ${selectedAnswer === opt.id ? "bg-electric-indigo text-midnight-arctic font-bold" : ""}`}
                >
                  {selectedAnswer === opt.id ? "✓" : ""}
                </span>
                <span>{opt.text}</span>
              </button>
            );
          })}
        </div>

        {/* Feedback box */}
        {isSubmitted && (
          <div
            className={`rounded-xl p-4 text-xs sm:text-sm leading-relaxed border ${isCorrect ? "border-[#214A4B] bg-[#122C32] text-cool-teal" : "border-[#5A343F] bg-[#2C1C2A] text-[#FF9D9D]"}`}
          >
            <strong>
              {isCorrect
                ? "Correct — you understand the key idea."
                : "Not quite — review the reasoning."}
            </strong>
            <div className="text-[#C5D0E2] mt-1">{explanation}</div>
          </div>
        )}

        <div className="flex gap-3 pt-2">
          {!isSubmitted ? (
            <button
              onClick={handleSubmit}
              disabled={!selectedAnswer}
              className="w-full py-3 rounded-xl bg-electric-indigo text-midnight-arctic font-bold text-xs hover:bg-[#9EC0FF] disabled:opacity-40 transition shadow-lg shadow-electric-indigo/10"
            >
              Check my answer →
            </button>
          ) : (
            <button
              onClick={() => setCurrentScreen("revision")}
              className="w-full py-3 rounded-xl bg-cool-teal text-midnight-arctic font-bold text-xs hover:bg-teal-400 transition shadow-lg"
            >
              View Revision Queue →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
