import React, {useState, useEffect} from "react";

export default function RevisionQueue({setCurrentScreen}) {
  const [records, setRecords] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [sortBy, setSortBy] = useState("scoreAsc");

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("hintladder-records"));
      if (Array.isArray(saved) && saved.length > 0) {
        setRecords(saved);
      } else {
        const defaultRecords = [
          {
            title: "Longest Substring Without Repeating Chars",
            pattern: "Sliding Window",
            hints: 1,
            score: 85,
            status: "Mastered",
          },
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
          {
            title: "Container With Most Water",
            pattern: "Two Pointers",
            hints: 1,
            score: 85,
            status: "Mastered",
          },
        ];
        setRecords(defaultRecords);
        localStorage.setItem(
          "hintladder-records",
          JSON.stringify(defaultRecords),
        );
      }
    } catch (e) {
      setRecords([]);
    }
  }, []);

  // Filter and Sort logic
  const filteredRecords = records
    .filter((r) => {
      const matchesSearch = (r.title + " " + r.pattern)
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      if (filterStatus === "due")
        return matchesSearch && r.status !== "Mastered";
      if (filterStatus === "mastered")
        return matchesSearch && r.status === "Mastered";
      return matchesSearch;
    })
    .sort((a, b) => {
      if (sortBy === "scoreAsc") return a.score - b.score;
      if (sortBy === "scoreDesc") return b.score - a.score;
      return a.title.localeCompare(b.title);
    });

  const avgScore = records.length
    ? Math.round(records.reduce((acc, r) => acc + r.score, 0) / records.length)
    : 0;
  const needsRevisionCount = records.filter(
    (r) => r.status !== "Mastered",
  ).length;

  const handleExport = () => {
    const blob = new Blob([JSON.stringify(records, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "hintladder-progress.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.16em] font-bold text-[#9AABC4] mb-1">
            Spaced repetition
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold">
            Your revision queue<span className="text-electric-indigo">.</span>
          </h1>
          <p className="text-sm text-[#9AABC4] mt-1">
            Revisit the patterns that needed the most help.
          </p>
        </div>
        <button
          onClick={handleExport}
          className="px-4 py-2 rounded-xl bg-[#202D42] border border-[#2B3950] text-xs font-semibold text-[#C5D0E2] hover:border-electric-indigo transition"
        >
          Export progress ↓
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-deep-navy border border-[#2B3950] rounded-2xl p-5 shadow-lg">
          <div className="text-xs text-[#9AABC4]">Problems logged</div>
          <div className="text-2xl font-extrabold font-mono mt-2 text-ice-white">
            {records.length}
          </div>
          <div className="text-[11px] text-cool-teal mt-1">
            Your learning history
          </div>
        </div>

        <div className="bg-deep-navy border border-[#2B3950] rounded-2xl p-5 shadow-lg">
          <div className="text-xs text-[#9AABC4]">Average independence</div>
          <div className="text-2xl font-extrabold font-mono mt-2 text-[#9EC0FF]">
            {avgScore} <span className="text-sm text-[#9AABC4]">/ 100</span>
          </div>
          <div className="h-1.5 bg-[#2B3950] rounded-full overflow-hidden mt-3">
            <div
              className="h-full bg-electric-indigo rounded-full"
              style={{width: `${avgScore}%`}}
            ></div>
          </div>
        </div>

        <div className="bg-deep-navy border border-[#2B3950] rounded-2xl p-5 shadow-lg">
          <div className="text-xs text-[#9AABC4]">Needs revision</div>
          <div className="text-2xl font-extrabold font-mono mt-2 text-[#FF9D9D]">
            {needsRevisionCount}
          </div>
          <div className="text-[11px] text-[#9AABC4] mt-1">
            Due or low confidence
          </div>
        </div>

        <div className="bg-deep-navy border border-[#2B3950] rounded-2xl p-5 shadow-lg">
          <div className="text-xs text-[#9AABC4]">Current focus</div>
          <div className="text-lg font-bold text-ice-white mt-2">
            Sliding Window
          </div>
          <div className="text-[11px] text-[#9AABC4] mt-1">
            Based on local records
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-deep-navy border border-[#2B3950] rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h2 className="font-bold text-sm text-ice-white">
              Problem history
            </h2>
            <p className="text-xs text-[#9AABC4] mt-0.5">
              Problems using multiple hints or lower scores are flagged for
              review.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search problems or patterns..."
              className="bg-midnight-arctic border border-[#2B3950] rounded-xl px-3 py-2 text-xs text-ice-white outline-none focus:border-electric-indigo sm:w-56"
            />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-midnight-arctic border border-[#2B3950] rounded-xl px-3 py-2 text-xs text-ice-white outline-none focus:border-electric-indigo sm:w-40"
            >
              <option value="all">All problems</option>
              <option value="due">Needs revision</option>
              <option value="mastered">Mastered</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-midnight-arctic border border-[#2B3950] rounded-xl px-3 py-2 text-xs text-ice-white outline-none focus:border-electric-indigo sm:w-40"
            >
              <option value="scoreAsc">Score: low to high</option>
              <option value="scoreDesc">Score: high to low</option>
              <option value="title">Title: A–Z</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-175">
            <thead>
              <tr className="border-b border-[#2B3950] text-[10px] uppercase tracking-[0.13em] text-[#9AABC4]">
                <th className="py-3 px-3 font-semibold">Problem</th>
                <th className="py-3 px-3 font-semibold">Pattern</th>
                <th className="py-3 px-3 font-semibold">Hints used</th>
                <th className="py-3 px-3 font-semibold">Independence</th>
                <th className="py-3 px-3 font-semibold">Status</th>
                <th className="py-3 px-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2B3950] text-xs">
              {filteredRecords.map((r, i) => (
                <tr key={i} className="hover:bg-electric-indigo/5 transition">
                  <td className="py-4 px-3 font-semibold text-ice-white">
                    {r.title}
                  </td>
                  <td className="py-4 px-3 font-mono text-[#9EC0FF]">
                    {r.pattern}
                  </td>
                  <td className="py-4 px-3 font-mono text-[#C5D0E2]">
                    {r.hints} / 3
                  </td>
                  <td className="py-4 px-3">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-mono font-bold ${r.score >= 70 ? "text-cool-teal" : r.score >= 50 ? "text-[#9EC0FF]" : "text-[#FF9D9D]"}`}
                      >
                        {r.score}
                      </span>
                      <div className="w-16 h-1.5 bg-[#2B3950] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-electric-indigo rounded-full"
                          style={{width: `${r.score}%`}}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-medium border ${r.status === "Mastered" ? "border-[#214A4B] bg-[#122C32] text-cool-teal" : "border-[#5A343F] bg-[#2C1C2A] text-[#FF9D9D]"}`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td className="py-4 px-3 text-right">
                    <button
                      onClick={() => setCurrentScreen("workspace")}
                      className="px-3 py-1.5 rounded-lg bg-[#202D42] border border-[#2B3950] text-[11px] text-[#C5D0E2] hover:border-electric-indigo transition"
                    >
                      Review →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredRecords.length === 0 && (
          <div className="text-center py-12 text-sm text-[#9AABC4]">
            No problems match your filter criteria.
          </div>
        )}
      </div>
    </div>
  );
}
