export const PRESETS = {
    substring: {
        id: 'substring',
        label: 'Longest Substring',
        shortTag: 'Sliding window',
        title: 'Longest Substring Without Repeating Characters',
        pattern: 'Sliding Window + Two Pointers',
        size: '100000',
        complexity: 'n2',
        statement: 'Given a string s, find the length of the longest substring without repeating characters. Constraints: 0 <= s.length <= 10^5.',
        attempt: 'I used two nested loops to check substrings and a HashSet to detect duplicates, but it gets too slow on large inputs.',
        hint1: 'Your nested loop repeats work by restarting the right pointer. Imagine stretching a window across the string: expand the right edge, and when a duplicate appears, move the left edge forward just enough to remove it.',
        hint2: 'Maintain two pointers (left = 0, right = 0) and a Set or Map for the current window. Check whether the incoming character already exists before expanding the window.',
        hint3: "For each character, update the window's left boundary only when necessary, then record the largest valid window length. Time complexity: O(N), Space complexity: O(min(N, 'charset')).",
        dryRunInputLabel: 's = "abca"',
        dryRunChars: ['a', 'b', 'c', 'a'],
        dryRunSteps: [
            { text: "Start with an empty window. Add 'a' at index 0; the current window is \"a\" and maxLen = 1.", activeIdx: 0 },
            { text: "Move right to index 1 ('b'). No duplicate exists, so the window becomes \"ab\" and maxLen = 2.", activeIdx: 1 },
            { text: "Move right to index 2 ('c'). The window is \"abc\"; all characters are unique and maxLen = 3.", activeIdx: 2 },
            { text: "At index 3, 'a' repeats. Move left past the previous 'a'; the valid window becomes \"bca\". maxLen remains 3.", activeIdx: 3 }
        ],
        edgeCases: 'Empty string "", repeated characters ("bbbbb"), and strings containing spaces.',
        quiz: {
            question: 'In a sliding-window solution, when should we advance the left pointer?',
            options: [
                { id: 'a', text: 'At every iteration of the outer loop' },
                { id: 'b', text: 'When the current character creates a duplicate in the active window' },
                { id: 'c', text: 'Only when the window length becomes even' }
            ],
            correct: 'b',
            explanation: 'Move the left boundary when the current window becomes invalid. Keep advancing it until the repeated character is no longer inside the window.'
        }
    },

    subarray: {
        id: 'subarray',
        label: 'Subarray Sum = K',
        shortTag: 'Prefix sum',
        title: 'Subarray Sum Equals K',
        pattern: 'Prefix Sum + HashMap',
        size: '100000',
        complexity: 'n2',
        statement: 'Given an integer array nums and an integer k, return the total number of continuous subarrays whose sum equals k.',
        attempt: 'I am checking every possible subarray and summing its elements, but the nested loops are slow.',
        hint1: 'Instead of recalculating every subarray sum, think about the running prefix sum. If the current prefix is P, what earlier prefix would make the difference equal k?',
        hint2: 'Use a HashMap to store how many times each prefix sum has appeared so far (initialize with {0: 1}). At each element, check if (currentSum - k) exists in the map.',
        hint3: 'Add the frequency of (currentSum - k) to your count before inserting currentSum into the map. This runs in O(N) time and O(N) space.',
        dryRunInputLabel: 'nums = [1, 2, 3], k = 3',
        dryRunChars: ['1', '2', '3'],
        dryRunSteps: [
            { text: 'Start with map = {0: 1}, sum = 0, count = 0. At index 0 (val 1): sum = 1. (1 - 3 = -2) not in map.', activeIdx: 0 },
            { text: 'At index 1 (val 2): sum = 3. Check (3 - 3 = 0) -> found in map! count becomes 1.', activeIdx: 1 },
            { text: 'At index 2 (val 3): sum = 6. Check (6 - 3 = 3) -> found in map! count becomes 2.', activeIdx: 2 }
        ],
        edgeCases: 'Arrays with negative numbers, k = 0, and single-element arrays.',
        quiz: {
            question: 'If the current prefix sum is P, which previous prefix sum completes a subarray with sum k?',
            options: [
                { id: 'a', text: 'P + k' },
                { id: 'b', text: 'P × k' },
                { id: 'c', text: 'P − k' }
            ],
            correct: 'c',
            explanation: 'A subarray sum is currentPrefix − previousPrefix. Rearranging gives previousPrefix = currentPrefix − k.'
        }
    },

    knapsack: {
        id: 'knapsack',
        label: '0/1 Knapsack',
        shortTag: 'Dynamic programming',
        title: '0/1 Knapsack',
        pattern: 'Dynamic Programming',
        size: '100',
        complexity: '2n',
        statement: 'Given item weights and values plus a capacity W, maximize total value without exceeding W. Each item can be selected at most once.',
        attempt: 'I tried selecting the highest-value item first, but that does not always produce the best combination.',
        hint1: 'A greedy choice can fail because item value alone does not account for weight. Consider the decisions for each item and each capacity, reusing results from smaller subproblems.',
        hint2: 'Define a DP array dp[w] storing the max value for capacity w. For each item, choose max(dp[w], value + dp[w - weight]).',
        hint3: 'Iterate capacity w backwards from W down to weight so each item is used at most once. Time complexity: O(N × W).',
        dryRunInputLabel: 'W = 4, items = [(w:2,v:3), (w:3,v:4)]',
        dryRunChars: ['w=0', 'w=2', 'w=3', 'w=4'],
        dryRunSteps: [
            { text: 'Initialize dp = [0, 0, 0, 0, 0] for capacities 0 through 4.', activeIdx: 0 },
            { text: 'Item 1 (weight 2, val 3): capacities >= 2 can take it -> dp[2..4] = 3.', activeIdx: 1 },
            { text: 'Item 2 (weight 3, val 4): at capacity w = 3, max(3, 4 + dp[0]) = 4.', activeIdx: 2 },
            { text: 'At capacity w = 4: max(dp[4]=3, 4 + dp[1]=0) = 4. Optimal value = 4.', activeIdx: 3 }
        ],
        edgeCases: 'Capacity W = 0, all item weights greater than W, and multiple items with equal ratios.',
        quiz: {
            question: 'Why is the 0/1 knapsack problem commonly solved with dynamic programming?',
            options: [
                { id: 'a', text: 'Because every item has the same value' },
                { id: 'b', text: 'Because subproblems overlap and optimal choices build from smaller states' },
                { id: 'c', text: 'Because sorting by weight always gives the optimal answer' }
            ],
            correct: 'b',
            explanation: 'The DP state captures the best value for a given prefix of items and capacity. Each item is either excluded or included if it fits.'
        }
    }
};