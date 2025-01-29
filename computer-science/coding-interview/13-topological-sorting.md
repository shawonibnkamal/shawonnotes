# **Chapter 13: Topological Sorting (Advanced Graphs)**

### **Why Topological Sorting?**

Topological Sorting is a fundamental algorithm in **graph theory** used for problems involving **dependency resolution**, **build order**, and **task scheduling**. It applies to **Directed Acyclic Graphs (DAGs)** and provides a linear ordering of nodes such that for every directed edge `u -> v`, node `u` appears before `v` in the ordering.

### **Key Use Cases**

- **Dependency Resolution**: Ensuring correct execution order in systems like package managers.
- **Build Order Problems**: Determining the correct sequence of tasks with dependencies.
- **Scheduling Tasks**: Solving real-world scheduling and precedence problems efficiently.

### **Example Problems**

1. **Course Schedule** (Medium)
2. **Alien Dictionary** (Hard)

## **Topological Sorting Algorithms**

### **1. Kahn’s Algorithm (BFS Approach)**

This approach uses **indegree tracking** to iteratively process nodes with zero incoming edges.

### **Algorithm Steps**

1. Compute the indegree (number of incoming edges) for each node.
2. Add all nodes with indegree `0` to a queue.
3. While the queue is not empty:
   - Remove a node from the queue and append it to the topological order.
   - Reduce the indegree of its neighbors.
   - If any neighbor's indegree becomes `0`, add it to the queue.
4. If all nodes are processed, return the order; otherwise, a cycle exists.

### **Implementation**

```
from collections import deque

def topological_sort_kahn(graph, num_nodes):
    indegree = {i: 0 for i in range(num_nodes)}
    for node in graph:
        for neighbor in graph[node]:
            indegree[neighbor] += 1

    queue = deque([node for node in indegree if indegree[node] == 0])
    topo_order = []

    while queue:
        node = queue.popleft()
        topo_order.append(node)
        for neighbor in graph[node]:
            indegree[neighbor] -= 1
            if indegree[neighbor] == 0:
                queue.append(neighbor)

    return topo_order if len(topo_order) == num_nodes else []  # Detect cycle
```

### **2. DFS-Based Topological Sorting**

A **Depth-First Search (DFS) approach** recursively explores nodes and records the **finishing order** to determine the topological order.

### **Algorithm Steps**

1. Maintain a visited set to track processed nodes.
2. Perform DFS and push nodes to a stack after all their neighbors are visited.
3. The final topological order is obtained by reversing the stack.

### **Implementation**

```
def topological_sort_dfs(graph, num_nodes):
    visited = set()
    stack = []

    def dfs(node):
        if node in visited:
            return
        visited.add(node)
        for neighbor in graph[node]:
            dfs(neighbor)
        stack.append(node)

    for node in range(num_nodes):
        if node not in visited:
            dfs(node)

    return stack[::-1]  # Reverse to get correct order
```

## **Trade-offs & Complexity Analysis**

| Approach                   | Time Complexity | Space Complexity | Notes                                   |
| -------------------------- | --------------- | ---------------- | --------------------------------------- |
| **Kahn’s Algorithm (BFS)** | O(V + E)        | O(V + E)         | Good for iterative processing           |
| **DFS-based Sorting**      | O(V + E)        | O(V + E)         | Useful for problems involving recursion |

### **Key Takeaways**

1. **Use Kahn’s Algorithm (BFS)** when iterative processing is required (e.g., resolving dependencies in layers).
2. **Use DFS-Based Sorting** when recursion is natural and we need to track finishing order.
3. **Topological sorting only works on DAGs**—cycle detection is crucial before applying it.

### **Practice Problems**

- LeetCode 207: Course Schedule
- LeetCode 210: Course Schedule II
- LeetCode 269: Alien Dictionary

### **Conclusion**

Topological Sorting is an essential technique for solving dependency-based problems efficiently. By mastering **Kahn’s Algorithm (BFS)** and **DFS-based Sorting**, you can tackle complex scheduling, ordering, and graph traversal problems effectively.
