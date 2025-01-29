# **Chapter 6: Two Heaps (Min Heap & Max Heap)**

## **Concept & When to Use**

The **Two Heaps** pattern is useful for solving problems that require **finding medians, scheduling tasks efficiently, or handling dynamic data** where elements are continuously added or removed.

This technique uses:

- A **Max Heap** to store the smaller half of elements.
- A **Min Heap** to store the larger half of elements.
- By maintaining a balance between these heaps, we can efficiently **retrieve median values, process priorities, and optimize scheduling.**

---

### **When to Use Two Heaps**

✔ When **finding the median of a dynamic data stream** (e.g., "Find Median in a Stream").

✔ When **handling scheduling or priority-based tasks** (e.g., "Task Scheduler").

✔ When **continuously inserting and removing elements** while maintaining order.

✔ When **retrieving smallest or largest elements efficiently** (better than sorting).

### **Key Idea**

🔹 Use a **Min Heap** (`min-heap`) to store the larger half of numbers.

🔹 Use a **Max Heap** (`max-heap`) to store the smaller half.

🔹 Ensure both heaps stay **balanced** (difference in sizes ≤ 1).

🔹 **Median can be found in O(1)** by looking at the top of heaps.

🔹 **Insertion/removal takes O(log n)** due to heap operations.

---

## **Grind 75 Problems**

The **Two Heaps** pattern is essential for solving these **Grind 75** problems:

1. **Find Median in a Stream** (LeetCode #295)
2. **Task Scheduler** (LeetCode #621)

Below, we explore these problems, different solution approaches, and trade-offs.

---

## **Solutions & Trade-offs**

### **1. Find Median in a Stream**

💡 **Problem:** Design a data structure that supports:

- `addNum(int num)`: Inserts a number into the data stream.
- `findMedian()`: Returns the median of all elements so far.

### **Brute-Force Approach (Sorting) – O(n log n) Time, O(n) Space**

- Store all numbers in a list and **sort on every insertion**.
- **Finding the median:** Take the middle element(s).

### **Python Implementation (Sorting)**

```python
class MedianFinder:
    def __init__(self):
        self.data = []

    def addNum(self, num: int) -> None:
        self.data.append(num)
        self.data.sort()  # Sorting every time (O(n log n))

    def findMedian(self) -> float:
        n = len(self.data)
        if n % 2 == 1:
            return self.data[n // 2]  # Odd length -> Middle element
        else:
            return (self.data[n // 2 - 1] + self.data[n // 2]) / 2  # Average of two middle elements
```

✅ **Simple, but inefficient** due to sorting on every insert (**O(n log n)**).

---

### **Optimized Approach (Two Heaps) – O(log n) Insert, O(1) Find Median**

- Use **Max Heap** for the lower half of numbers.
- Use **Min Heap** for the upper half.
- **Balance the two heaps** to ensure correct median retrieval.

### **Python Implementation (Two Heaps)**

```python
import heapq

class MedianFinder:
    def __init__(self):
        self.small = []  # Max Heap (store negative values)
        self.large = []  # Min Heap

    def addNum(self, num: int) -> None:
        heapq.heappush(self.small, -num)  # Push to Max Heap
        heapq.heappush(self.large, -heapq.heappop(self.small))  # Balance heaps

        if len(self.small) < len(self.large):  # Ensure max heap has more elements
            heapq.heappush(self.small, -heapq.heappop(self.large))

    def findMedian(self) -> float:
        if len(self.small) > len(self.large):
            return -self.small[0]  # Max Heap root is median
        return (-self.small[0] + self.large[0]) / 2  # Average of two roots
```

🚀 **Trade-offs:**

- **O(log n) insertion (heap operations)** vs. **O(n log n) sorting**.
- **O(1) median retrieval** vs. **O(n) median retrieval in sorting.**
- **Uses extra space for heaps (O(n))**, but avoids frequent sorting.

---

### **2. Task Scheduler**

💡 **Problem:** Given an array of tasks and a cooling interval `n`, find the **minimum time required** to execute all tasks, ensuring that the same task is scheduled only after `n` intervals.

### **Brute-Force Approach (Sorting & Simulation) – O(n log n) Time, O(n) Space**

- **Sort tasks by frequency** and process in order.
- **Insert idle slots manually** to maintain the cooling period.

### **Python Implementation (Sorting)**

```python
from collections import Counter

def leastInterval(tasks: list[str], n: int) -> int:
    freq = list(Counter(tasks).values())
    freq.sort(reverse=True)  # Sort by frequency
    max_freq = freq[0]  # Most frequent task count
    idle_time = (max_freq - 1) * n  # Idle slots needed

    for f in freq[1:]:  # Reduce idle time by filling with tasks
        idle_time -= min(max_freq - 1, f)

    idle_time = max(0, idle_time)  # Cannot be negative
    return len(tasks) + idle_time
```

✅ **Works but inefficient** due to sorting (**O(n log n)**).

---

### **Optimized Approach (Max Heap) – O(n log k) Time, O(n) Space**

- **Use a Max Heap** to always process the most frequent tasks first.
- **Use a queue to track cooldown periods** for tasks.

### **Python Implementation (Heap)**

```python
import heapq
from collections import Counter, deque

def leastInterval(tasks: list[str], n: int) -> int:
    freq_map = Counter(tasks)
    max_heap = [-f for f in freq_map.values()]  # Max heap (negate values)
    heapq.heapify(max_heap)

    queue = deque()  # Store (frequency, available_time)
    time = 0

    while max_heap or queue:
        time += 1

        if max_heap:
            count = 1 + heapq.heappop(max_heap)  # Process most frequent task
            if count:
                queue.append((count, time + n))  # Add to cooldown queue

        if queue and queue[0][1] == time:  # Time to reinsert cooled-down task
            heapq.heappush(max_heap, queue.popleft()[0])

    return time
```

🚀 **Trade-offs:**

- **O(n log k) is much better than O(n log n) sorting**.
- **Max Heap ensures efficient task execution.**
- **Uses extra space for heap & queue.**

---

## **Key Takeaways**

✅ **Two Heaps provide efficient ways to handle median and scheduling problems.**

✅ **Heap operations (O(log n)) are often better than sorting (O(n log n)).**

✅ **Use Max Heap for processing largest elements first (priority scheduling).**

✅ **Use Min Heap for efficiently finding the smallest element (median retrieval).**

Mastering **Two Heaps** will help you solve **median-finding, scheduling, and priority problems efficiently!** 🚀
