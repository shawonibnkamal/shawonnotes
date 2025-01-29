# **Chapter 2: Sliding Window**

## **Concept & When to Use**

The **Sliding Window** technique is a powerful approach for optimizing problems involving **contiguous subarrays or substrings**. Instead of using nested loops to repeatedly compute values, we maintain a **window (a range of indices)** that dynamically expands and contracts as we iterate through the input.

### **When to Use Sliding Window**

Use this pattern when:

✔ **The problem involves subarrays or substrings.**

✔ **You need to find an optimal subarray (max/min sum, longest/shortest length).**

✔ **A brute-force approach involves recomputing overlapping parts of an array.**

---

## **Types of Sliding Window Approaches**

There are two main types of sliding window approaches:

### 🔹 **Fixed-size Sliding Window**

- The window size is **predetermined** and remains **constant** throughout the iteration.
- Used in problems where we are asked to compute values over a **fixed-length subarray** (e.g., "find the max sum of a subarray of size `k`").

### 🔹 **Variable-size Sliding Window** (Expanding/Shrinking Window)

- The window size **changes dynamically** based on the problem constraints.
- Used when trying to find **the shortest/longest subarray** that meets a condition (e.g., "find the smallest subarray with a sum ≥ `S`").

---

## **Grind 75 Problems**

The **Sliding Window** pattern appears in multiple **Grind 75 problems**, such as:

1. **Maximum Sum Subarray of Size K** (Fixed-size) (LeetCode #643)
2. **Longest Substring Without Repeating Characters** (Variable-size) (LeetCode #3)
3. **Minimum Window Substring** (Variable-size) (LeetCode #76)

Below, we analyze each problem and discuss brute-force vs. optimized solutions.

---

## **1. Fixed-size Sliding Window**

### **Problem: Maximum Sum Subarray of Size K**

💡 **Given an array `nums` and an integer `k`, find the maximum sum of any contiguous subarray of size `k`.**

### **Brute-Force Approach (O(n × k))**

- Iterate through all possible subarrays of length `k`.
- Compute their sums and track the maximum sum.
- **Time Complexity:** O(n × k) – inefficient for large arrays.

### **Optimized Sliding Window Approach (O(n))**

- Maintain a **running sum** of size `k`.
- As the window slides, **remove the leftmost element** and **add the new rightmost element**.
- **Time Complexity:** O(n) – each element is processed once.
- **Space Complexity:** O(1) – only a few variables are used.

### **Python Implementation**

```python
def maxSumSubarray(nums, k):
    max_sum, window_sum = 0, sum(nums[:k])

    for i in range(k, len(nums)):
        window_sum += nums[i] - nums[i - k]
        max_sum = max(max_sum, window_sum)

    return max_sum

# Example
nums = [2, 1, 5, 1, 3, 2]
k = 3
print(maxSumSubarray(nums, k))  # Output: 9

```

🚀 **Trade-offs:**

- Uses constant space (O(1)), but requires careful index management.
- **Efficient alternative** to recomputing sums for every subarray.

---

## **2. Variable-size Sliding Window**

### **Problem: Longest Substring Without Repeating Characters**

💡 **Given a string `s`, find the length of the longest substring without repeating characters.**

### **Brute-Force Approach (O(n²))**

- Try **all substrings** and check for duplicates.
- **Time Complexity:** O(n²) – inefficient.

### **Optimized Sliding Window Approach (O(n))**

- Use a **hash set** to track unique characters.
- Expand the window (`right` pointer) while characters are unique.
- When a duplicate is found, **shrink the window** (`left` pointer).
- **Time Complexity:** O(n) – each character is processed twice.
- **Space Complexity:** O(min(n, 26)) ≈ O(1), since we store at most 26 letters.

### **Python Implementation**

```python
def lengthOfLongestSubstring(s):
    char_set = set()
    left, max_length = 0, 0

    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        char_set.add(s[right])
        max_length = max(max_length, right - left + 1)

    return max_length

# Example
s = "abcabcbb"
print(lengthOfLongestSubstring(s))  # Output: 3

```

🚀 **Trade-offs:**

- Uses **extra space** for `char_set`, but ensures **O(n) performance**.
- Works efficiently for **ASCII characters** but may need modifications for Unicode.

---

## **3. Variable-size Sliding Window (Shrinking)**

### **Problem: Minimum Window Substring**

💡 **Given two strings `s` and `t`, find the smallest substring of `s` that contains all characters of `t`.**

### **Brute-Force Approach (O(n² × m))**

- Try all substrings and check if they contain all characters of `t`.
- **Time Complexity:** O(n² × m) – inefficient.

### **Optimized Sliding Window Approach (O(n))**

- Maintain a **hash map** of character frequencies in `t`.
- Expand the **right pointer** until all characters are included.
- Shrink the **left pointer** to minimize the window.
- **Time Complexity:** O(n) – each character is processed at most twice.
- **Space Complexity:** O(1) – only 26 characters stored in frequency maps.

### **Python Implementation**

```python
from collections import Counter

def minWindow(s, t):
    if not t or not s:
        return ""

    char_count = Counter(t)
    left, min_length, required_chars, current_chars = 0, float('inf'), len(char_count), 0
    window_counts = {}
    result = ""

    for right in range(len(s)):
        char = s[right]
        window_counts[char] = window_counts.get(char, 0) + 1

        if char in char_count and window_counts[char] == char_count[char]:
            current_chars += 1

        while left <= right and current_chars == required_chars:
            if right - left + 1 < min_length:
                min_length = right - left + 1
                result = s[left:right+1]

            window_counts[s[left]] -= 1
            if s[left] in char_count and window_counts[s[left]] < char_count[s[left]]:
                current_chars -= 1
            left += 1

    return result

# Example
s = "ADOBECODEBANC"
t = "ABC"
print(minWindow(s, t))  # Output: "BANC"

```

🚀 **Trade-offs:**

- Uses extra space for **hash maps**, but avoids recomputation.
- Ensures **O(n) performance**, ideal for long strings.

---

## **Key Takeaways**

✅ **Fixed vs. variable window sizes depend on problem constraints.**

✅ **Sliding Window reduces time complexity in subarray/substring problems.**

✅ **Character frequency maps help with substring containment problems.**

✅ **Trade-offs include extra space (sets/maps) vs. recomputation costs.**

By mastering this pattern, you'll solve many problems efficiently and recognize **when to apply it in coding interviews!** 🚀
