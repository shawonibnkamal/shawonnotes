# **Chapter 5: Merge Intervals**

## **Concept & When to Use**

The **Merge Intervals** pattern is useful when dealing with **overlapping intervals** in problems related to scheduling, time ranges, or segment merging. The key idea is to **sort intervals** and then **merge or process them sequentially**.

### **When to Use Merge Intervals**

✔ The problem involves **intervals or ranges** (e.g., `[start, end]`).

✔ You need to **merge overlapping intervals** into a single range.

✔ The problem involves **sorting and comparing** intervals based on their start and end points.

✔ You need to **count active intervals** at any given time (e.g., **finding the maximum number of concurrent meetings**).

### **Key Idea**

🔹 **Sort intervals by start time** to process them in a logical order.

🔹 **Use a greedy approach** to merge intervals **as we iterate**.

🔹 **Heap (Priority Queue) can optimize counting active intervals** (used in scheduling problems).

---

## **Grind 75 Problems**

The **Merge Intervals** technique is essential for solving the following **Grind 75** problems:

1. **Merge Intervals** (LeetCode #56)
2. **Meeting Rooms II** (LeetCode #253)

Below, we explore these problems, different solution approaches, and trade-offs.

---

## **Solutions & Trade-offs**

### **1. Merge Intervals**

💡 **Problem:** Given an array of intervals `intervals`, merge all overlapping intervals and return an array of non-overlapping intervals.

### **Brute-Force Approach (Checking All Pairs) – O(n²) Time**

- Compare each interval with every other interval to check for overlaps.
- **Time Complexity:** O(n²) – due to nested comparisons.
- **Space Complexity:** O(n) – for storing merged intervals.

### **Python Implementation (Brute Force, Inefficient)**

```python
def merge(intervals: list[list[int]]) -> list[list[int]]:
    merged = []
    for i in range(len(intervals)):
        for j in range(i + 1, len(intervals)):
            if intervals[i][1] >= intervals[j][0]:  # Overlapping condition
                intervals[j] = [min(intervals[i][0], intervals[j][0]), max(intervals[i][1], intervals[j][1])]
    return merged
```

❌ **Not efficient for large inputs**.

---

### **Optimized Approach (Sorting & Merging) – O(n log n) Time, O(n) Space**

**Steps:**

1. **Sort intervals** based on start time.
2. **Iterate through intervals** and merge overlapping ones.
3. **Keep track of the last merged interval** and modify it if necessary.

**Time Complexity:** O(n log n) – due to sorting.

**Space Complexity:** O(n) – for storing the result.

### **Python Implementation (Sorting & Merging)**

```python
def merge(intervals: list[list[int]]) -> list[list[int]]:
    intervals.sort()  # Sort by start time
    merged = []

    for interval in intervals:
        if not merged or merged[-1][1] < interval[0]:
            merged.append(interval)  # No overlap, add directly
        else:
            merged[-1][1] = max(merged[-1][1], interval[1])  # Merge overlapping intervals

    return merged
```

🚀 **Trade-offs:**

- Sorting is **O(n log n)**, but merging is **O(n)**, making this approach **efficient**.
- **Modifies input** in-place, which can be useful but requires caution.

---

### **2. Meeting Rooms II**

💡 **Problem:** Given an array of meeting time intervals, return the **minimum number of conference rooms** required.

### **Brute-Force Approach (Checking All Overlaps) – O(n²) Time**

- Compare each meeting with every other meeting to count overlaps.
- **Time Complexity:** O(n²) – due to nested loops.
- **Space Complexity:** O(n) – storing overlaps.

### **Python Implementation (Brute Force, Inefficient)**

```python
def minMeetingRooms(intervals: list[list[int]]) -> int:
    max_rooms = 0
    for i in range(len(intervals)):
        count = 1
        for j in range(len(intervals)):
            if i != j and intervals[j][0] < intervals[i][1]:
                count += 1
        max_rooms = max(max_rooms, count)
    return max_rooms
```

❌ **Too slow for large inputs**.

---

### **Optimized Approach (Sorting + Min Heap) – O(n log n) Time, O(n) Space**

**Steps:**

1. **Sort meetings by start time**.
2. Use a **min-heap** to keep track of meeting end times.
3. **If a room is free (earliest end time is ≤ current start time), reuse it**. Otherwise, allocate a new room.

**Time Complexity:** O(n log n) – due to sorting and heap operations.

**Space Complexity:** O(n) – storing end times in a heap.

### **Python Implementation (Min Heap)**

```python
import heapq

def minMeetingRooms(intervals: list[list[int]]) -> int:
    if not intervals:
        return 0

    intervals.sort()  # Sort by start time
    min_heap = []  # Stores end times of meetings

    for interval in intervals:
        if min_heap and min_heap[0] <= interval[0]:
            heapq.heappop(min_heap)  # Free up a room
        heapq.heappush(min_heap, interval[1])  # Allocate new room

    return len(min_heap)  # Number of rooms used
```

🚀 **Trade-offs:**

- Sorting is **O(n log n)**, but heap operations are **O(log n)** per interval, making this approach **efficient**.
- **Heap keeps track of active meetings** in the smallest amount of space possible.

---

## **Key Takeaways**

✅ **Sorting is often necessary** when dealing with **overlapping intervals**.

✅ **Greedy merging** works well for merging intervals but **does not work for counting overlapping events**.

✅ **Min Heaps are useful** when counting **active overlapping intervals** (e.g., meeting room allocation).

Mastering **Merge Intervals** will help you solve **scheduling and range-based problems efficiently!** 🚀
