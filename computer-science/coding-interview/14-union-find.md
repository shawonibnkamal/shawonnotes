# **Chapter 14: Union-Find (Disjoint Set Union - DSU)**

### **Why?**

Union-Find (also called Disjoint Set Union, DSU) is a powerful data structure for efficiently solving **dynamic connectivity problems** in graphs. It is particularly useful for:

- **Finding connected components**: Identifying groups of nodes that are connected.
- **Cycle detection**: Checking whether adding an edge forms a cycle in an undirected graph.
- **Merging related entities**: Used in problems like clustering, network connectivity, and Kruskal’s algorithm for Minimum Spanning Trees (MST).

Union-Find provides nearly **O(1) (amortized)** time complexity for key operations when optimized using **path compression** and **union by rank/size**.

---

### **Core Operations**

Union-Find supports two main operations:

1. **Find(x)**: Determines the representative (root) of the set containing `x`.
2. **Union(x, y)**: Merges the sets containing `x` and `y`.

**Optimizations:**

- **Path Compression**: Makes future `find(x)` calls faster by directly linking nodes to their root.
- **Union by Rank/Size**: Ensures smaller trees attach to larger ones, keeping the structure balanced.

With both optimizations, Union-Find operates in **O(α(N))**, where **α(N)** (inverse Ackermann function) is **almost constant** for practical inputs.

---

### **Example Problems and Solutions**

### **1. Number of Provinces (Medium)**

**Problem:** Given an `n x n` adjacency matrix representing a graph, find the number of connected components (provinces).

**Approach:**

- Treat each node as its own component.
- Iterate through the adjacency matrix and union connected nodes.
- Count the number of unique root nodes.

**Python Solution:**

```python
class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [1] * n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # Path compression
        return self.parent[x]

    def union(self, x, y):
        root_x = self.find(x)
        root_y = self.find(y)
        if root_x != root_y:
            if self.rank[root_x] > self.rank[root_y]:
                self.parent[root_y] = root_x
            elif self.rank[root_x] < self.rank[root_y]:
                self.parent[root_x] = root_y
            else:
                self.parent[root_y] = root_x
                self.rank[root_x] += 1

def findCircleNum(isConnected):
    n = len(isConnected)
    uf = UnionFind(n)

    for i in range(n):
        for j in range(i + 1, n):  # Avoid redundant checks
            if isConnected[i][j] == 1:
                uf.union(i, j)

    return len(set(uf.find(i) for i in range(n)))

# Example
isConnected = [[1,1,0],[1,1,0],[0,0,1]]
print(findCircleNum(isConnected))  # Output: 2

```

**Trade-offs:**

- **Better than DFS/BFS** for larger graphs since it avoids recursion depth issues.
- **Nearly O(1) operations** with optimizations, making it highly efficient.

---

### **2. Redundant Connection (Medium)**

**Problem:** Given a tree (graph with `n` nodes and `n-1` edges) with one extra edge, find the **redundant** edge that creates a cycle.

**Approach:**

- Initialize Union-Find for `n` nodes.
- Process each edge and perform `union(x, y)`.
- If `x` and `y` are already in the same set, that edge is redundant.

**Python Solution:**

```python
def findRedundantConnection(edges):
    uf = UnionFind(len(edges))

    for u, v in edges:
        if uf.find(u - 1) == uf.find(v - 1):  # Already connected
            return [u, v]
        uf.union(u - 1, v - 1)

# Example
edges = [[1,2],[1,3],[2,3]]
print(findRedundantConnection(edges))  # Output: [2,3]

```

**Trade-offs:**

- **More efficient than DFS/BFS** for cycle detection in undirected graphs.
- **Scales well** for large graphs, as opposed to an adjacency list approach.

---

### **3. Accounts Merge (Hard)**

**Problem:** Given a list of accounts (each containing an email list), merge accounts with overlapping emails.

**Approach:**

- Use a **Union-Find structure** to group emails into components.
- Store an email → index mapping to track connected components.
- Sort and format the merged accounts.

**Python Solution:**

```python
from collections import defaultdict

def accountsMerge(accounts):
    uf = UnionFind(len(accounts))
    email_to_index = {}

    for i, account in enumerate(accounts):
        for email in account[1:]:
            if email in email_to_index:
                uf.union(i, email_to_index[email])
            email_to_index[email] = i

    index_to_emails = defaultdict(set)
    for email, index in email_to_index.items():
        index_to_emails[uf.find(index)].add(email)

    return [[accounts[i][0]] + sorted(emails) for i, emails in index_to_emails.items()]

# Example
accounts = [
    ["John", "johnsmith@mail.com", "john_newyork@mail.com"],
    ["John", "johnsmith@mail.com", "john00@mail.com"],
    ["Mary", "mary@mail.com"],
    ["John", "johnnybravo@mail.com"]
]
print(accountsMerge(accounts))

```

**Trade-offs:**

- **Faster than DFS-based merging** for large datasets.
- **Efficient for millions of emails**, avoiding repeated DFS traversals.

---

### **When to Use Union-Find**

| **Problem Type**                    | **Union-Find?** | **Why?**                                         |
| ----------------------------------- | --------------- | ------------------------------------------------ |
| Connected Components                | ✅ Yes          | Efficient for merging nodes dynamically.         |
| Cycle Detection (Undirected Graphs) | ✅ Yes          | Detects cycles in O(1) operations.               |
| Cycle Detection (Directed Graphs)   | ❌ No           | Use **DFS** or **Kahn’s Algorithm** instead.     |
| Kruskal’s Algorithm (MST)           | ✅ Yes          | Quickly processes edge unions.                   |
| Path Queries (Dynamic Graph)        | ✅ Yes          | Answers connectivity in **O(1) amortized time**. |

---

### **Conclusion**

Union-Find (Disjoint Set Union) is a crucial technique for **connected components, cycle detection, and merging problems**. With **path compression** and **union by rank**, it achieves **almost constant-time operations**, making it one of the most **efficient** ways to handle dynamic connectivity in graphs.

Would you like to add more problem variations or explanations? 🚀
