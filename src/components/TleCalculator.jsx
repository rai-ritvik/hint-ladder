import React, {useState} from "react";

export default function TleCalculator() {
  const [inputSize, setInputSize] = useState("100000"); // N = 10^5
  const [complexity, setComplexity] = useState("n2"); // O(N^2)

  // Pure-JS calculation function
  const calculateOperations = () => {
    const n = Number(inputSize);
    let ops = 0;

    switch (complexity) {
      case "1":
        ops = 1;
        break;
      case "log":
        ops = Math.ceil(Math.log2(Math.max(2, n)));
        break;
      case "n":
        ops = n;
        break;
      case "nlogn":
        ops = n * Math.log2(Math.max(2, n));
        break;
      case "n2":
        ops = n * n;
        break;
      case "n3":
        ops = n * n * n;
        break;
      case "2n":
        ops = Math.pow(2, Math.min(n, 30));
        break;
      default:
        ops = n;
    }

    const isSafe = ops <= 1e8; // 10^8 operations per second standard limit
    const formattedOps =
      ops >= 1e15
        ? ops.toExponential(1)
        : Math.round(ops).toLocaleString("en-US");

    return {ops, isSafe, formattedOps};
  };

  const {isSafe, formattedOps} = calculateOperations();

  return (
    <div className="bg-deep-navy border border-[#2B3950] rounded-2xl p-5 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-sm font-semibold text-ice-white flex items-center gap-2">
          <span className="text-electric-indigo">⚡</span> "Will It TLE?" Constraint
          Checker
        </h2>
        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-midnight-arctic text-[#9AABC4] border border-[#2B3950]">
          100% Pure JS
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div>
          <label className="text-xs text-[#9AABC4] block mb-1">
            Max Input Size (N)
          </label>
          <select
            value={inputSize}
            onChange={(e) => setInputSize(e.target.value)}
            className="w-full bg-midnight-arctic border border-[#2B3950] rounded-xl px-3 py-2 text-xs font-mono text-ice-white outline-none focus:border-electric-indigo"
          >
            <option value="100">10² (100)</option>
            <option value="1000">10³ (1,000)</option>
            <option value="10000">10⁴ (10,000)</option>
            <option value="100000">10⁵ (100,000)</option>
            <option value="1000000">10⁶ (1,000,000)</option>
          </select>
        </div>

        <div>
          <label className="text-xs text-[#9AABC4] block mb-1">
            Current Complexity
          </label>
          <select
            value={complexity}
            onChange={(e) => setComplexity(e.target.value)}
            className="w-full bg-midnight-arctic border border-[#2B3950] rounded-xl px-3 py-2 text-xs font-mono text-ice-white outline-none focus:border-electric-indigo"
          >
            <option value="1">O(1) - Constant</option>
            <option value="log">O(log N) - Logarithmic</option>
            <option value="n">O(N) - Linear</option>
            <option value="nlogn">O(N log N) - Linearithmic</option>
            <option value="n2">O(N²) - Quadratic</option>
            <option value="n3">O(N³) - Cubic</option>
            <option value="2n">O(2ᴺ) - Exponential</option>
          </select>
        </div>
      </div>

      {/* Dynamic Warning or Success Badge */}
      <div
        className={`rounded-xl border p-3.5 flex items-start gap-3 ${isSafe ? "border-[#214A4B] bg-[#122C32]" : "border-[#5A343F] bg-[#2C1C2A]"}`}
      >
        <div
          className={`h-7 w-7 shrink-0 rounded-lg flex items-center justify-center font-bold ${isSafe ? "bg-cool-teal/10 text-cool-teal" : "bg-[#FF9D9D]/10 text-[#FF9D9D]"}`}
        >
          {isSafe ? "✓" : "!"}
        </div>
        <div className="text-xs">
          <p
            className={`font-semibold ${isSafe ? "text-cool-teal" : "text-[#FF9D9D]"}`}
          >
            {isSafe
              ? "Likely within operation budget"
              : "WILL TLE! (Exceeds 10⁸ ops/sec limit)"}
          </p>
          <p className="text-[#C5D0E2] mt-0.5 leading-relaxed">
            Estimated work:{" "}
            <span className="font-mono font-bold">{formattedOps}</span>{" "}
            operations at N = {Number(inputSize).toLocaleString()}.{" "}
            {isSafe
              ? "Approach scales well."
              : "Consider an optimized O(N) or O(N log N) solution."}
          </p>
        </div>
      </div>
    </div>
  );
}
