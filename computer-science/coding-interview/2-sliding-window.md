# **Chapter 2: Sliding Window**

## **Concept & When to Use**

The **Sliding Window** technique is a powerful approach used to optimize problems involving **contiguous subarrays or substrings**. Instead of using nested loops to repeatedly compute values, we maintain a **window (a range of indices)** that dynamically expands and contracts as we iterate through the input.

### **When to Use Sliding Window**

Use this pattern when:

✔ The problem involves **subarrays or substrings**.

✔ The problem requires finding an **optimal subarray** (e.g., maximum/minimum sum, longest/shortest length).

✔ Brute-force solutions involve **recomputing overlapping parts** of an array.

### **Types of Sliding Window Approaches**

🔹 **Fixed-size window:** When the window size is predetermined (e.g., "find the max sum of a subarray of size `k`").

🔹 **Dynamic-size window:** When the window size changes based on conditions (e.g., "find the smallest subarray with a sum ≥ `S`").

---

## **Grind 75 Problems**

The **Sliding Window** pattern appears in multiple **Grind 75 problems**, such as:

1. **Longest Substring Without Repeating Characters** (LeetCode #3)
2. **Permutation in String** (LeetCode #567)
3. **Minimum Window Substring** (LeetCode #76)

Each of these problems can be **solved efficiently** using a **dynamic sliding window approach**. Below, we analyze each problem and discuss brute-force vs. optimized solutions.

---

## **Solutions & Trade-offs**

### **1. Longest Substring Without Repeating Characters**

💡 **Problem:** Given a string `s`, find the length of the **longest substring** without repeating characters.

### **Brute-Force Approach** (O(n²))

- Try **all substrings** and check if they have unique characters.
- **Time Complexity:** O(n²) – for each start index, try all possible end indices.
- **Space Complexity:** O(n) – for storing unique characters in a set.

### **Optimized Sliding Window Approach** (O(n))

- Use a **hash set** to store unique characters.
- Maintain a **left pointer** (`l`) and expand the **right pointer** (`r`), adjusting `l` when duplicates appear.
- **Time Complexity:** O(n) – each character is processed at most twice.
- **Space Complexity:** O(min(n, 26)) ≈ O(1), since we store at most 26 letters in the hash set.

### **Python Implementation**

```python
def lengthOfLongestSubstring(s: str) -> int:
    char_set = set()
    l, max_length = 0, 0

    for r in range(len(s)):
        while s[r] in char_set:
            char_set.remove(s[l])
            l += 1
        char_set.add(s[r])
        max_length = max(max_length, r - l + 1)

    return max_length
```

🚀 **Trade-offs:**

- Uses extra space for `char_set`, but ensures **O(n) performance**.
- Works efficiently for all **ASCII character sets** (but may need adjustments for Unicode).

---

### **2. Permutation in String**

💡 **Problem:** Given two strings `s1` and `s2`, return `True` if `s2` contains a **permutation** of `s1`.

### **Brute-Force Approach** (O(n \* m!))

- Generate all permutations of `s1` and check if they appear in `s2`.
- **Time Complexity:** O(n \* m!) – infeasible for large inputs.

### **Optimized Sliding Window Approach** (O(n))

- Instead of generating permutations, we compare **character frequency counts** within a moving window of size `len(s1)`.
- If two frequency maps match, a permutation exists.
- **Time Complexity:** O(n) – single pass through `s2`.
- **Space Complexity:** O(1) – since we store at most **26** characters in frequency maps.

### **Python Implementation**

```python
from collections import Counter

def checkInclusion(s1: str, s2: str) -> bool:
    if len(s1) > len(s2):
        return False

    s1_count = Counter(s1)
    window_count = Counter(s2[:len(s1)])

    for i in range(len(s1), len(s2)):
        if window_count == s1_count:
            return True
        window_count[s2[i]] += 1
        window_count[s2[i - len(s1)]] -= 1
        if window_count[s2[i - len(s1)]] == 0:
            del window_count[s2[i - len(s1)]]

    return window_count == s1_count
```

🚀 **Trade-offs:**

- Instead of generating **permutations**, we efficiently track **character frequencies**.
- Requires **extra space** for frequency maps, but ensures **O(n) performance**.

---

### **3. Minimum Window Substring**

💡 **Problem:** Given two strings `s` and `t`, find the **smallest substring** of `s` that contains all characters of `t`.

### **Brute-Force Approach** (O(n² \* m))

- Try all substrings and check if they contain all characters of `t`.
- **Time Complexity:** O(n² \* m) – inefficient for long strings.

### **Optimized Sliding Window Approach** (O(n))

- Maintain a **hash map** of character frequencies in `t`.
- Expand the **right pointer** until all characters are included.
- Shrink the **left pointer** to minimize the window.
- **Time Complexity:** O(n) – each character is processed at most twice.
- **Space Complexity:** O(1) – only 26 characters stored in frequency maps.

### **Python Implementation**

```python
from collections import Counter

def minWindow(s: str, t: str) -> str:
    if not t or not s:
        return ""

    char_count = Counter(t)
    l, r, min_length = 0, 0, float('inf')
    required_chars, current_chars = len(char_count), 0
    window_counts = {}

    result = ""
    while r < len(s):
        char = s[r]
        window_counts[char] = window_counts.get(char, 0) + 1

        if char in char_count and window_counts[char] == char_count[char]:
            current_chars += 1

        while l <= r and current_chars == required_chars:
            if r - l + 1 < min_length:
                min_length = r - l + 1
                result = s[l:r+1]

            window_counts[s[l]] -= 1
            if s[l] in char_count and window_counts[s[l]] < char_count[s[l]]:
                current_chars -= 1
            l += 1

        r += 1

    return result
```

🚀 **Trade-offs:**

- Uses extra space for **hash maps**, but avoids recomputation.
- Ensures **O(n) performance**, ideal for long strings.

---

## **Key Takeaways**

✅ **Sliding Window reduces time complexity** in problems involving subarrays or substrings.

✅ **Fixed vs. dynamic windows** depend on problem constraints.

✅ **Character frequency maps** are useful for substring containment problems.

✅ **Trade-offs include extra space for sets/maps vs. recomputation costs.**

By mastering this pattern, you'll solve many problems efficiently and recognize **when to apply it in interviews.** 🚀
