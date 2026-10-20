const SYSTEM_PROMPT = `You are HintLadder, a no-spoiler DSA learning assistant.
Given a coding problem title, statement, and the student's current attempt, return ONLY a valid JSON object matching this exact schema (never output solution code):
{
  "title": "string",
  "pattern": "string",
  "hint1": "string (Intuition and why current attempt fails)",
  "hint2": "string (Data structure and pattern to use)",
  "hint3": "string (Boundary rules and target Time/Space complexity)",
  "dryRunInputLabel": "string (Short sample input)",
  "dryRunChars": ["string", "string", "string", "string"],
  "dryRunSteps": [
    { "text": "Step 1 explanation", "activeIdx": 0 },
    { "text": "Step 2 explanation", "activeIdx": 1 },
    { "text": "Step 3 explanation", "activeIdx": 2 },
    { "text": "Step 4 explanation", "activeIdx": 3 }
  ],
  "edgeCases": "string",
  "quiz": {
    "question": "string",
    "options": [
      { "id": "a", "text": "string" },
      { "id": "b", "text": "string" },
      { "id": "c", "text": "string" }
    ],
    "correct": "b",
    "explanation": "string"
  }
}`;

export async function generateCustomProblemLadder({ title, statement, attempt }) {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

    // 1. Live Gemini API call (if VITE_GEMINI_API_KEY is set in .env)
    if (apiKey) {
        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
                        contents: [{
                            parts: [{ text: `Title: ${title}\nStatement: ${statement}\nAttempt: ${attempt}` }]
                        }],
                        generationConfig: {
                            responseMimeType: 'application/json',
                            temperature: 0.3
                        }
                    })
                }
            );

            if (response.ok) {
                const data = await response.json();
                const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
                if (text) {
                    return { ...JSON.parse(text), statement, attempt, isAiGenerated: true };
                }
            }
        } catch (err) {
            console.warn('Live AI call unavailable, falling back to local analyzer:', err);
        }
    }

    // 2. Local JS Fallback Analyzer (works without API key or internet)
    return buildLocalFallbackLadder({ title, statement, attempt });
}

function buildLocalFallbackLadder({ title, statement, attempt }) {
    const text = `${title} ${statement} ${attempt}`.toLowerCase();

    let pattern = 'HashMap + Single-Pass Lookup';
    let dsAdvice = 'a HashMap or HashSet to store seen elements and achieve O(1) complement lookups';

    if (text.includes('sorted') || text.includes('binary') || text.includes('rotated') || text.includes('peak')) {
        pattern = 'Binary Search (Two Pointers)';
        dsAdvice = 'low and high pointers, computing mid = low + Math.floor((high - low) / 2) to halve the search space each step';
    } else if (text.includes('tree') || text.includes('graph') || text.includes('island') || text.includes('level') || text.includes('node')) {
        pattern = 'BFS / DFS Traversal';
        dsAdvice = 'a Queue (for level-order/shortest path BFS) or recursive DFS with a visited set so no node is visited twice';
    } else if (text.includes('parenthes') || text.includes('bracket') || text.includes('greater element') || text.includes('stack')) {
        pattern = 'Monotonic / LIFO Stack';
        dsAdvice = 'a Stack to keep track of unresolved elements or indices in Last-In-First-Out order';
    } else if (text.includes('subarray') || text.includes('substring') || text.includes('window') || text.includes('consecutive')) {
        pattern = 'Sliding Window + Two Pointers';
        dsAdvice = 'a dynamic [left, right] window that expands right and only shrinks left when the condition is broken';
    } else if (text.includes('dp') || text.includes('ways') || text.includes('coin') || text.includes('knapsack') || text.includes('climb')) {
        pattern = 'Dynamic Programming';
        dsAdvice = 'a 1D/2D DP array that caches solutions to smaller overlapping subproblems';
    }

    const cleanTitle = title.trim() || 'Custom DSA Problem';

    return {
        title: cleanTitle,
        pattern,
        statement,
        attempt,
        isAiGenerated: false,
        hint1: `Your current logic ("${attempt.slice(0, 65)}...") repeats work across elements. Ask yourself: what information from index i can you store so index i+1 doesn't have to scan from the beginning?`,
        hint2: `Apply ${pattern}: maintain ${dsAdvice}. Update your state incrementally as you iterate.`,
        hint3: `Verify boundary conditions before updating your best answer at each step. Target Complexity: O(N) or O(N log N) time.`,
        dryRunInputLabel: `Trace for ${cleanTitle.slice(0, 22)}`,
        dryRunChars: ['i=0', 'i=1', 'i=2', 'i=3'],
        dryRunSteps: [
            { text: `Step 1 (i=0): Initialize state for ${pattern} and inspect the first element.`, activeIdx: 0 },
            { text: 'Step 2 (i=1): Query your auxiliary structure in O(1) time instead of running an inner loop.', activeIdx: 1 },
            { text: 'Step 3 (i=2): Update pointers or stored state based on the problem condition.', activeIdx: 2 },
            { text: 'Step 4 (i=3): Record the optimal result and finish the single-pass traversal.', activeIdx: 3 }
        ],
        edgeCases: 'Empty or single-element input, duplicate elements, negative values, and maximum N constraints.',
        quiz: {
            question: `How does ${pattern} improve upon a brute-force nested loop for "${cleanTitle}"?`,
            options: [
                { id: 'a', text: 'By checking every possible pair twice' },
                { id: 'b', text: 'By reusing previously seen state/boundaries so each element is processed a constant number of times' },
                { id: 'c', text: 'By ignoring constraints on large inputs' }
            ],
            correct: 'b',
            explanation: `${pattern} eliminates redundant inner-loop rescans by maintaining state across iterations.`
        }
    };
}