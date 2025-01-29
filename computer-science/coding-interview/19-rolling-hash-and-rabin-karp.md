# **Chapter 19: Rolling Hash & Rabin-Karp (String Algorithms)**

## **Why?**

Rolling Hash and Rabin-Karp are **powerful hashing techniques** for **efficient string matching**, especially when dealing with:

- **Substring search** (e.g., checking if a pattern exists in a text).
- **Detecting repeated sequences** (e.g., plagiarism detection, bioinformatics).
- **Finding anagrams or scrambled substrings** efficiently.

Traditional **brute-force substring search** takes **O(N × M)** time (where `N` is text length, `M` is pattern length).

**Rolling Hash reduces this to O(N) on average** using a **sliding window hash function**.

## **Core Idea**

### **Rolling Hash (Sliding Window Hashing)**

Instead of recomputing the **entire hash** for each substring, **Rolling Hash** efficiently updates it in **O(1) time** when sliding the window.

For a string `S` of length `N` and a window of size `M`:

- Compute the **initial hash** of `S[:M]`.
- Slide the window: Remove the **left character**, add the **right character**, and compute the new hash efficiently.

**Hash formula for a base `B` and prime `P`:**

\text{Hash} = (B \times \text{previous_hash} - \text{outgoing_char} \times B^M + \text{incoming_char}) \mod P

### **Rabin-Karp Algorithm (Pattern Matching)**

Uses **rolling hash** for **fast substring matching**:

1. Compute the hash of the **pattern**.
2. Compute the hash of **each window in the text**.
3. If hashes match, **compare characters to confirm** (to avoid false positives).
4. Slide the window and update the hash in **O(1)**.

## **Example Problems and Solutions**

### **1. Repeated DNA Sequences (Medium)**

**Problem:** Given a DNA sequence `s`, find all **10-letter-long** substrings that appear more than once.

**Approach:**

- Use **rolling hash** (or **set-based lookup**) to detect duplicate substrings efficiently.

**Python Solution (Rolling Hash)**

```python
def findRepeatedDnaSequences(s):
    if len(s) < 10:
        return []

    seen = set()
    repeated = set()
    base = 4  # Since DNA has 4 characters (A, C, G, T)
    prime = 10**9 + 7
    hash_val = 0
    B_M = pow(base, 9, prime)  # Base^M-1 for rolling hash

    char_map = {'A': 0, 'C': 1, 'G': 2, 'T': 3}

    for i in range(len(s)):
        hash_val = (hash_val * base + char_map[s[i]]) % prime

        if i >= 9:  # When we have a valid 10-char window
            if hash_val in seen:
                repeated.add(s[i-9:i+1])
            seen.add(hash_val)

            # Remove leftmost char from hash (rolling hash update)
            hash_val = (hash_val - char_map[s[i-9]] * B_M) % prime

    return list(repeated)

# Example
s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"
print(findRepeatedDnaSequences(s))  # Output: ["AAAAACCCCC", "CCCCCAAAAA"]

```

✅ **O(N) complexity**, much faster than **O(N²) brute force**.

✅ **Memory-efficient hashing** instead of storing all substrings.

⚠️ **Potential hash collisions** (rare but possible).

### **2. Substring with Concatenation of All Words (Hard)**

**Problem:** Given a string `s` and a list of words (all of same length), find all **starting indices** of substrings in `s` that are concatenations of all words in any order.

**Approach:**

- Each window contains a **permutation of the words**.
- **Rolling hash + sliding window** for fast checking.

**Python Solution (HashMap + Sliding Window)**

```python
from collections import Counter

def findSubstring(s, words):
    if not s or not words:
        return []

    word_len = len(words[0])
    word_count = len(words)
    total_len = word_len * word_count
    word_map = Counter(words)
    result = []

    for i in range(word_len):  # Try all possible start positions
        left, right = i, i
        current_map = Counter()

        while right + word_len <= len(s):
            word = s[right:right + word_len]
            right += word_len

            if word in word_map:
                current_map[word] += 1
                while current_map[word] > word_map[word]:  # Too many instances of a word
                    current_map[s[left:left + word_len]] -= 1
                    left += word_len
                if right - left == total_len:  # Valid window
                    result.append(left)
            else:  # Invalid word, reset window
                current_map.clear()
                left = right

    return result

# Example
s = "barfoothefoobarman"
words = ["foo", "bar"]
print(findSubstring(s, words))  # Output: [0, 9]

```

✅ **Sliding window avoids unnecessary recomputation**.

✅ **Efficient O(N) solution** compared to brute-force **O(N × M!)**.

⚠️ **Does not use rolling hash (word-based hashmap instead)**.

## **When to Use Rolling Hash vs. Other String Matching Algorithms**

| **Algorithm**                 | **Best Use Case**         | **Time Complexity** | **Notes**                          |
| ----------------------------- | ------------------------- | ------------------- | ---------------------------------- |
| **Brute Force (O(N × M))**    | Short pattern matching    | O(N × M)            | Slow for large inputs              |
| **KMP (Knuth-Morris-Pratt)**  | Exact pattern matching    | O(N + M)            | Good when no hash needed           |
| **Rabin-Karp (Rolling Hash)** | Multiple pattern matching | O(N) (avg)          | Fast for large texts               |
| **Aho-Corasick (Trie + BFS)** | Multi-pattern matching    | O(N + M)            | Works for dictionary-based lookups |

## **Conclusion**

- **Rolling Hash is an efficient O(N) technique for substring matching** (vs. O(N × M) brute force).
- **Rabin-Karp extends Rolling Hash for pattern matching** with quick hash comparisons.
- **Useful for detecting duplicates, plagiarism detection, DNA sequence analysis, and anagram search**.
- **Alternative string algorithms (KMP, Aho-Corasick) are better for certain problems**.
