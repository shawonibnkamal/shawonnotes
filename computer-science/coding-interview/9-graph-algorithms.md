# **Chapter 9: Graph Algorithms (BFS, DFS, Union-Find, Dijkstra)**

## **Concept & When to Use**

Graph algorithms are vital for solving problems related to **network traversal, pathfinding, and connectivity**. A graph is a collection of nodes (vertices) connected by edges, and it can represent various real-world structures such as networks, maps, and social relationships. The four most common graph algorithms are:

1. **Breadth-First Search (BFS)** – Explores all neighbors at the current level before moving on to the next level. Ideal for finding the shortest path in unweighted graphs.
2. **Depth-First Search (DFS)** – Explores as far down a branch as possible before backtracking. Useful for solving problems related to connectivity and pathfinding.
3. **Union-Find (Disjoint Set Union, DSU)** – A data structure for efficiently tracking and merging disjoint sets. Essential for solving problems involving connectivity (e.g., determining if two nodes are in the same connected component).
4. **Dijkstra’s Algorithm** – Finds the shortest path between nodes in a weighted graph. It is typically used for pathfinding in graphs with non-negative edge weights.

### **When to Use Each Algorithm**

- **BFS:** When you need to explore nodes level-by-level or find the shortest path in unweighted graphs.
- **DFS:** When you need to explore all nodes in a branch first, useful for topological sorting, connected components, and backtracking problems.
- **Union-Find:** When you need to manage and merge sets of connected nodes efficiently (e.g., determining if two nodes are connected in an undirected graph).
- **Dijkstra’s:** When you need to find the shortest path between nodes in weighted graphs.

## **Grind 75 Problems**

The following **Grind 75** problems make use of various graph algorithms:

1. **Clone Graph (DFS/BFS)**
2. **Course Schedule (Topological Sort)**
3. **Number of Islands (DFS/BFS)**

## **Solutions & Trade-offs**

### **1. Clone Graph (DFS/BFS)**

💡 **Problem:** Given a reference to a graph node, **clone the graph**. Each node in the graph contains a value and a list of neighbors.

### **Approach: BFS/DFS – O(V + E) Time, O(V) Space**

- For **DFS**, use recursion or a stack to explore each node and its neighbors, cloning each node as you visit it.
- For **BFS**, use a queue and iterate level-by-level, cloning nodes and adding them to a new graph.

### **Python Implementation (DFS)**

```python
class Node:
    def __init__(self, val=0, neighbors=None):
        self.val = val
        self.neighbors = neighbors if neighbors is not None else []

def cloneGraph(node: 'Node') -> 'Node':
    if not node:
        return None

    visited = {}

    def dfs(node):
        if node in visited:
            return visited[node]

        # Create a new node and store it in visited
        clone = Node(node.val)
        visited[node] = clone

        # Recursively clone neighbors
        for neighbor in node.neighbors:
            clone.neighbors.append(dfs(neighbor))

        return clone

    return dfs(node)
```

### **Approach: BFS**

```python
from collections import deque

def cloneGraph(node: 'Node') -> 'Node':
    if not node:
        return None

    visited = {node: Node(node.val)}
    queue = deque([node])

    while queue:
        curr = queue.popleft()

        for neighbor in curr.neighbors:
            if neighbor not in visited:
                visited[neighbor] = Node(neighbor.val)
                queue.append(neighbor)
            visited[curr].neighbors.append(visited[neighbor])

    return visited[node]
```

✅ **Trade-offs:**

- **O(V + E) time complexity**: Each node and edge is visited once.
- **O(V) space complexity**: Store all visited nodes.
- **DFS is easy to implement recursively but can lead to stack overflow for deep graphs. BFS is more memory-intensive but avoids recursion depth issues.**

### **2. Course Schedule (Topological Sort)**

💡 **Problem:** Given a set of courses and prerequisites, determine if it's possible to finish all the courses. This is a **topological sorting** problem on a directed graph.

### **Approach: Topological Sort – O(V + E) Time, O(V) Space**

- Use **DFS** to detect cycles and perform a topological sort. If you can complete the sorting, the courses can be finished.
- Alternatively, use **Kahn's algorithm** (BFS) to process nodes with no incoming edges, which allows you to build the topological order.

### **Python Implementation (DFS)**

```python
from collections import defaultdict

def canFinish(numCourses: int, prerequisites: list[list[int]]) -> bool:
    graph = defaultdict(list)
    for dest, src in prerequisites:
        graph[src].append(dest)

    visited = [0] * numCourses  # 0 = unvisited, 1 = visiting, 2 = visited

    def dfs(course):
        if visited[course] == 1:  # Cycle detected
            return False
        if visited[course] == 2:
            return True

        visited[course] = 1
        for neighbor in graph[course]:
            if not dfs(neighbor):
                return False

        visited[course] = 2
        return True

    for course in range(numCourses):
        if visited[course] == 0:
            if not dfs(course):
                return False

    return True
```

### **Approach: BFS (Kahn’s Algorithm)**

```python
from collections import deque, defaultdict

def canFinish(numCourses: int, prerequisites: list[list[int]]) -> bool:
    graph = defaultdict(list)
    in_degree = [0] * numCourses

    # Build graph and calculate in-degrees
    for dest, src in prerequisites:
        graph[src].append(dest)
        in_degree[dest] += 1

    # Start with courses that have no prerequisites
    queue = deque([i for i in range(numCourses) if in_degree[i] == 0])

    visited_courses = 0

    while queue:
        course = queue.popleft()
        visited_courses += 1

        for neighbor in graph[course]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return visited_courses == numCourses
```

✅ **Trade-offs:**

- **O(V + E) time complexity** (topological sort).
- **O(V) space complexity** (graph and in-degree storage).
- **DFS is elegant but may be tricky to implement for large graphs. BFS is iterative and avoids recursion depth issues.**

### **3. Number of Islands (DFS/BFS)**

💡 **Problem:** Given a 2D grid representing a map of `'1'`s (land) and `'0'`s (water), find the number of islands. An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically.

### **Approach: DFS/BFS – O(M _ N) Time, O(M _ N) Space**

- Use **DFS** or **BFS** to mark all land cells connected to a given land cell as visited (flood fill).
- Count the number of connected components (islands).

### **Python Implementation (DFS)**

```python
def numIslands(grid: list[list[str]]) -> int:
    if not grid:
        return 0

    def dfs(i, j):
        if i < 0 or i >= len(grid) or j < 0 or j >= len(grid[0]) or grid[i][j] == '0':
            return
        grid[i][j] = '0'  # Mark as visited
        dfs(i+1, j)
        dfs(i-1, j)
        dfs(i, j+1)
        dfs(i, j-1)

    count = 0
    for i in range(len(grid)):
        for j in range(len(grid[0])):
            if grid[i][j] == '1':  # Found an unvisited land cell
                count += 1
                dfs(i, j)  # Mark all connected land as visited

    return count
```

### **Approach: BFS**

```python
from collections import deque

def numIslands(grid: list[list[str]]) -> int:
    if not grid:
        return 0

    def bfs(i, j):
        queue = deque([(i, j)])
        grid[i][j] = '0'  # Mark as visited
        while queue:
            x, y = queue.popleft()
            for dx, dy in [(0, 1), (0, -1), (1, 0), (-1, 0)]:
                nx, ny = x + dx, y + dy
                if 0 <= nx < len(grid) and 0 <= ny < len(grid[0]) and grid[nx][ny] == '1':
                    grid[nx][ny] = '0'  # Mark as visited
                    queue.append((nx, ny))

    count = 0
    for i in range(len(grid)):
        for j in range(len(grid[0])):
            if grid[i][j] == '1':  # Found an unvisited land cell
                count += 1
                bfs(i, j)  # Mark all connected land as visited

    return count
```

✅ **Trade-offs:**

- **O(M \* N) time complexity** (each cell is visited once).
- **O(M \* N) space complexity** (for the recursion stack or queue).
- **DFS may cause stack overflow on large grids, while BFS avoids recursion but uses more memory for large grids.**

## **BFS vs. DFS vs. Union-Find**

- **BFS** is best for problems involving level-order traversal or shortest path in unweighted graphs.
- **DFS** is ideal for problems where you need to explore every branch (e.g., pathfinding, connectivity).
- **Union-Find** is optimal when you need to efficiently track connected components or merge sets.
