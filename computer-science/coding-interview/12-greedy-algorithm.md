# **Chapter 12: Greedy Algorithms**

### **Why Greedy Algorithms?**

Greedy algorithms are a fundamental problem-solving technique that work by making the locally optimal choice at each step with the hope of finding a global optimum. They are particularly useful in **optimization problems**, such as **scheduling, graph algorithms, and interval selection**. However, understanding when a greedy approach works is key—greedy solutions do not always lead to the optimal solution.

### **Key Use Cases**

- **Optimization Problems**: Finding the best solution within constraints.
- **Scheduling & Resource Allocation**: Maximizing utilization with minimum resources.
- **Graph Problems**: Algorithms like Dijkstra’s shortest path and Prim’s MST.

### **Example Problems**

1. **Jump Game** (Medium)
2. **Gas Station** (Medium)
3. **Interval Scheduling Maximization** (like **Activity Selection Problem**)

---

## **Greedy Algorithm Strategies & Implementations**

### **1. Jump Game (Greedy Traversal)**

The **Jump Game** problem requires determining if one can reach the last index of an array given certain jump constraints. A greedy approach works by tracking the **furthest reachable index**.

### **Implementation**

```python
def can_jump(nums):
    max_reach = 0
    for i, jump in enumerate(nums):
        if i > max_reach:
            return False
        max_reach = max(max_reach, i + jump)
    return True
```

**Time Complexity**: O(N)

**Space Complexity**: O(1)

### **2. Gas Station (Circular Route Optimization)**

The **Gas Station** problem requires determining if a circular route can be completed given gas constraints. The greedy solution involves tracking the net fuel balance and restarting the journey from potential candidates.

### **Implementation**

```python
def can_complete_circuit(gas, cost):
    total, tank, start = 0, 0, 0
    for i in range(len(gas)):
        diff = gas[i] - cost[i]
        total += diff
        tank += diff
        if tank < 0:
            start = i + 1
            tank = 0
    return start if total >= 0 else -1
```

**Time Complexity**: O(N)

**Space Complexity**: O(1)

### **3. Interval Scheduling Maximization (Activity Selection Problem)**

This classic **interval scheduling problem** involves selecting the maximum number of non-overlapping intervals. A greedy approach sorts by **end time** and selects intervals accordingly.

### **Implementation**

```python
def max_non_overlapping_intervals(intervals):
    intervals.sort(key=lambda x: x[1])
    count, last_end = 0, float('-inf')
    for start, end in intervals:
        if start >= last_end:
            count += 1
            last_end = end
    return count
```

**Time Complexity**: O(N log N) (sorting step)

**Space Complexity**: O(1)

---

## **Trade-offs & Complexity Analysis**

| Approach                           | Time Complexity | Space Complexity | Notes                                              |
| ---------------------------------- | --------------- | ---------------- | -------------------------------------------------- |
| **Jump Game (Greedy)**             | O(N)            | O(1)             | Works since reaching the farthest index is optimal |
| **Gas Station (Greedy Selection)** | O(N)            | O(1)             | Greedy approach ensures a valid start if possible  |
| **Interval Scheduling (Sorting)**  | O(N log N)      | O(1)             | Sorting ensures optimal selection of intervals     |

### **Key Takeaways**

1. **Greedy algorithms work well for optimization problems** where local choices lead to a global optimum.
2. **Sorting-based greedy strategies** are common in scheduling problems.
3. **Greedy approaches don’t always work**—validating correctness is crucial.

---

### **Practice Problems**

- LeetCode 55: Jump Game
- LeetCode 134: Gas Station
- LeetCode 435: Non-overlapping Intervals

### **Conclusion**

Greedy algorithms provide efficient solutions for many optimization problems. While they don’t always guarantee optimality, understanding their applicability and limitations is crucial for solving interview problems effectively.
