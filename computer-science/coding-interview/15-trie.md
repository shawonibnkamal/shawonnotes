# **Chapter 15: Trie (Prefix Tree)**

### **Why Trie?**

The **Trie (Prefix Tree)** is a specialized tree data structure used for **efficient storage and retrieval of strings**, particularly in scenarios involving **autocomplete systems**, **dictionary implementations**, and **prefix-based searches**. Unlike hash tables, Tries enable prefix queries in **O(M)** time, where **M** is the length of the word.

### **Key Use Cases**

- **Efficient Word Storage & Retrieval**: Fast lookups for dictionaries and word-based searches.
- **Autocomplete & Search Suggestions**: Used in search engines and predictive text.
- **Prefix-Based Searches**: Finding words with common prefixes quickly.

### **Example Problems**

1. **Implement Trie (Prefix Tree)** (Medium)
2. **Word Search II** (Hard)

## **Trie Data Structure & Implementation**

### **1. Trie Node & Basic Operations**

A Trie consists of nodes where:

- Each node has a **dictionary of children** (representing characters).
- A **boolean flag** indicates if a word ends at that node.

### **Trie Implementation**

```python
class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end_of_word = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str):
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end_of_word = True

    def search(self, word: str) -> bool:
        node = self._find_node(word)
        return node is not None and node.is_end_of_word

    def starts_with(self, prefix: str) -> bool:
        return self._find_node(prefix) is not None

    def _find_node(self, prefix: str):
        node = self.root
        for char in prefix:
            if char not in node.children:
                return None
            node = node.children[char]
        return node
```

### **2. Word Search II (Trie + DFS)**

The **Word Search II** problem is an advanced Trie application where we combine **Trie construction** with **Depth-First Search (DFS)** to efficiently find words in a grid.

### **Optimized Approach (Trie + DFS + Backtracking)**

```python
class Solution:
    def findWords(self, board: List[List[str]], words: List[str]) -> List[str]:
        trie = Trie()
        for word in words:
            trie.insert(word)

        rows, cols = len(board), len(board[0])
        result, visited = set(), set()

        def dfs(r, c, node, path):
            if (r, c) in visited or not (0 <= r < rows and 0 <= c < cols):
                return
            char = board[r][c]
            if char not in node.children:
                return

            visited.add((r, c))
            node = node.children[char]
            path += char

            if node.is_end_of_word:
                result.add(path)

            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                dfs(r + dr, c + dc, node, path)

            visited.remove((r, c))

        for r in range(rows):
            for c in range(cols):
                dfs(r, c, trie.root, "")

        return list(result)
```

## **Trade-offs & Complexity Analysis**

| Approach                        | Time Complexity | Space Complexity | Notes                                                   |
| ------------------------------- | --------------- | ---------------- | ------------------------------------------------------- |
| **Trie Insert/Search**          | O(M)            | O(N \* M)        | Fast lookups but uses extra space                       |
| **Trie + DFS (Word Search II)** | O(N _ M _ 4^L)  | O(N \* M)        | Efficient for word grids but backtracking can be costly |

### **Key Takeaways**

1. **Tries are useful for prefix-based queries**, offering a major advantage over hash tables.
2. **Word Search II combines Tries with DFS** to efficiently find words in a matrix.
3. **Trade-offs exist between space efficiency and performance**, but Tries are optimal for problems requiring fast prefix searches.

### **Practice Problems**

- LeetCode 208: Implement Trie (Prefix Tree)
- LeetCode 211: Design Add and Search Words Data Structure
- LeetCode 212: Word Search II

### **Conclusion**

Tries are a powerful data structure for solving word-based problems efficiently. Mastering **basic Trie operations** and **Trie-based search optimizations** (such as DFS in Word Search II) is crucial for excelling in string-processing problems in coding interviews.
