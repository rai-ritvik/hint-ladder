import React, {useEffect, useState} from "react";

export default function Navbar({currentScreen, setCurrentScreen}) {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const savedTheme = localStorage.getItem("hintladder-theme") || "dark";
    const darkActive = savedTheme === "dark";
    setIsDark(darkActive);
    document.documentElement.classList.toggle("dark", darkActive);
    document.documentElement.classList.toggle("light", !darkActive);
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    const themeStr = nextDark ? "dark" : "light";
    document.documentElement.classList.toggle("dark", nextDark);
    document.documentElement.classList.toggle("light", !nextDark);
    document.documentElement.setAttribute("data-theme", themeStr);
    localStorage.setItem("hintladder-theme", themeStr);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-[#2B3950]/80 bg-deep-navy/85 backdrop-blur-md">
      <div className="max-w-360 mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl border border-[#35578F] bg-electric-indigo/10 flex items-center justify-center text-[#9EC0FF] font-extrabold font-mono">
            HL
          </div>
          <div>
            <div className="font-bold tracking-tight text-ice-white">
              HintLadder{" "}
              <span className="text-electric-indigo text-xs font-semibold ml-1">
                BETA
              </span>
            </div>
            <div className="text-[11px] text-[#9AABC4]">
              Build understanding, one hint at a time.
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav
          className="flex flex-wrap gap-1 p-1 rounded-xl bg-midnight-arctic border border-[#2B3950]"
          aria-label="Main navigation"
        >
          <button
            onClick={() => setCurrentScreen("workspace")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${currentScreen === "workspace" ? "bg-electric-indigo/15 border border-[#35578F] text-[#9EC0FF]" : "text-[#9AABC4] hover:text-ice-white"}`}
          >
            Workspace
          </button>
          <button
            onClick={() => setCurrentScreen("logic")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${currentScreen === "logic" ? "bg-electric-indigo/15 border border-[#35578F] text-[#9EC0FF]" : "text-[#9AABC4] hover:text-ice-white"}`}
          >
            Logic Gate
          </button>
          <button
            onClick={() => setCurrentScreen("revision")}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${currentScreen === "revision" ? "bg-electric-indigo/15 border border-[#35578F] text-[#9EC0FF]" : "text-[#9AABC4] hover:text-ice-white"}`}
          >
            Revision Queue
          </button>
        </nav>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="flex items-center gap-2 px-3 py-2 rounded-xl border border-[#35578F] bg-deep-navy text-ice-white text-xs font-semibold hover:border-electric-indigo transition"
        >
          <span>{isDark ? "☀️" : "🌙"}</span>
          <span>{isDark ? "Light mode" : "Dark mode"}</span>
        </button>
      </div>
    </header>
  );
}
