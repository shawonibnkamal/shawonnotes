# **Chapter 7: Heap and Priority Queue**

## **Concept & When to Use**

The **Heap and Priority Queue** pattern is powerful for solving problems that require **efficient retrieval of the largest/smallest elements, scheduling tasks, and maintaining dynamic order**.

This technique uses:

- A **Min Heap** (Priority Queue) to efficiently retrieve the smallest elements.
- A **Max Heap** (simulated using a Min Heap with negated values) to retrieve the largest elements.
- **Balancing heaps** enables efficient median retrieval and other optimizations.

---

### **When to Use Heaps & Priority Queues**

✔ **Finding the Kth largest/smallest element** (e.g., "Kth Largest Element in an Array").

✔ **Finding the median of a dynamic data stream** (e.g., "Find Median in a Stream").

✔ **Handling priority-based tasks** (e.g., "Task Scheduler").

✔ **Merging multiple sorted streams efficiently** (e.g., "Merge K Sorted Lists").

✔ **Processing dynamic elements where order matters** (e.g., "Meeting Rooms II").

### **Key Idea**

🔹 **Min Heap** (`min-heap`) efficiently retrieves the smallest elements.

🔹 **Max Heap** (`max-heap`) efficiently retrieves the largest elements.

🔹 **Insertion & removal take O(log n)** due to heap operations.

🔹 **Top element retrieval takes O(1)**, making heaps ideal for priority-based problems.

---

## **Grind 75 Problems**

The **Heap and Priority Queue** pattern is essential for solving these **Grind 75** problems:

1. **Kth Largest Element in an Array** (LeetCode #215)
2. **Find Median in a Stream** (LeetCode #295)
3. **Task Scheduler** (LeetCode #621)

Below, we explore these problems, different solution approaches, and trade-offs.

---

## **Solutions & Trade-offs**

### **1. Kth Largest Element in an Array**

💡 **Problem:** Given an unsorted array, find the **Kth largest element**.

### **Brute-Force Approach (Sorting) – O(n log n) Time, O(1) Space**

- **Sort the array** and return `nums[-k]` (the `Kth` largest element).

### **Python Implementation (Sorting)**

```python
def findKthLargest(nums: list[int], k: int) -> int:
    nums.sort()
    return nums[-k]

```

✅ **Simple, but inefficient** for large datasets due to sorting (**O(n log n)**).

---

### **Optimized Approach (Min Heap) – O(n log k) Time, O(k) Space**

- **Use a Min Heap of size `k`** to track the top `k` largest elements.
- **After iterating, the heap's root is the Kth largest element**.

### **Python Implementation (Min Heap)**

```python
import heapq

def findKthLargest(nums: list[int], k: int) -> int:
    min_heap = []
    for num in nums:
        heapq.heappush(min_heap, num)
        if len(min_heap) > k:
            heapq.heappop(min_heap)  # Remove smallest element

    return min_heap[0]

```

🚀 **Trade-offs:**

- **O(n log k) time complexity**, faster than sorting for large `n`.
- **O(k) space complexity**, since we store only `k` elements.

---

### **2. Find Median in a Stream**

💡 **Problem:** Design a data structure that supports:

- `addNum(int num)`: Inserts a number into the data stream.
- `findMedian()`: Returns the median of all elements so far.

### **Brute-Force Approach (Sorting) – O(n log n) Time, O(n) Space**

- **Store all numbers** in a list and **sort on every insertion**.

### **Python Implementation (Sorting)**

```python
class MedianFinder:
    def __init__(self):
        self.data = []

    def addNum(self, num: int) -> None:
        self.data.append(num)
        self.data.sort()

    def findMedian(self) -> float:
        n = len(self.data)
        if n % 2 == 1:
            return self.data[n // 2]
        else:
            return (self.data[n // 2 - 1] + self.data[n // 2]) / 2

```

✅ **Simple, but inefficient** due to sorting on every insert (**O(n log n)**).

---

### **Optimized Approach (Two Heaps) – O(log n) Insert, O(1) Find Median**

- **Use a Max Heap** for the lower half of numbers.
- **Use a Min Heap** for the upper half.
- **Balance the two heaps** to ensure correct median retrieval.

### **Python Implementation (Two Heaps)**

```python
import heapq

class MedianFinder:
    def __init__(self):
        self.small = []  # Max Heap (store negative values)
        self.large = []  # Min Heap

    def addNum(self, num: int) -> None:
        heapq.heappush(self.small, -num)
        heapq.heappush(self.large, -heapq.heappop(self.small))

        if len(self.small) < len(self.large):
            heapq.heappush(self.small, -heapq.heappop(self.large))

    def findMedian(self) -> float:
        if len(self.small) > len(self.large):
            return -self.small[0]
        return (-self.small[0] + self.large[0]) / 2

```

🚀 **Trade-offs:**

- **O(log n) insertion** vs. **O(n log n) sorting**.
- **O(1) median retrieval** vs. **O(n) median retrieval in sorting**.
- **Extra space for two heaps (O(n))**, but avoids frequent sorting.

---

### **3. Task Scheduler**

💡 **Problem:** Given an array of tasks and a cooling interval `n`, find the **minimum time required** to execute all tasks, ensuring that the same task is scheduled only after `n` intervals.

### **Brute-Force Approach (Sorting & Simulation) – O(n log n) Time, O(n) Space**

- **Sort tasks by frequency** and process in order.
- **Insert idle slots manually** to maintain the cooling period.

### **Python Implementation (Sorting)**

```python
from collections import Counter

def leastInterval(tasks: list[str], n: int) -> int:
    freq = list(Counter(tasks).values())
    freq.sort(reverse=True)
    max_freq = freq[0]
    idle_time = (max_freq - 1) * n

    for f in freq[1:]:
        idle_time -= min(max_freq - 1, f)

    idle_time = max(0, idle_time)
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
    max_heap = [-f for f in freq_map.values()]
    heapq.heapify(max_heap)

    queue = deque()
    time = 0

    while max_heap or queue:
        time += 1
        if max_heap:
            count = 1 + heapq.heappop(max_heap)
            if count:
                queue.append((count, time + n))

        if queue and queue[0][1] == time:
            heapq.heappush(max_heap, queue.popleft()[0])

    return time

```

🚀 **Trade-offs:**

- **O(n log k) is better than O(n log n) sorting**.
- **Max Heap ensures efficient task execution**.
- **Uses extra space for heap & queue**.

---

## **Key Takeaways**

✅ **Heaps and Priority Queues provide efficient ways to solve order-based problems.**

✅ **Heap operations (O(log n)) are often better than sorting (O(n log n)).**

✅ **Min Heaps retrieve smallest elements efficiently, Max Heaps retrieve largest elements efficiently.**

✅ **Use heaps for priority scheduling, median retrieval, and Kth largest/smallest problems.**

By mastering **Heap and Priority Queue**, you'll solve scheduling, median-finding, and priority problems efficiently! 🚀
