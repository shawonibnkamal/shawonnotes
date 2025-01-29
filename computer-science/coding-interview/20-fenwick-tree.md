# **Chapter 20: Fenwick Tree / Segment Tree (Advanced Data Structures)**

### **Why?**

Some problems require **efficient range queries** (e.g., sum, min, max) while allowing **fast updates** to the data.

For such scenarios, **Fenwick Tree (Binary Indexed Tree, BIT)** and **Segment Tree** provide powerful solutions.

They are particularly useful for:

- **Prefix sum / range sum queries** with updates.
- **Range minimum / maximum queries (RMQ)**.
- **Dynamic problems where values are frequently modified** (e.g., stock prices, competitive programming).

| Data Structure         | Updates (`update()`) | Queries (`query()`) | Space Complexity |
| ---------------------- | -------------------- | ------------------- | ---------------- |
| **Fenwick Tree (BIT)** | O(log N)             | O(log N)            | O(N)             |
| **Segment Tree**       | O(log N)             | O(log N)            | O(2N)            |

---

### **Fenwick Tree (Binary Indexed Tree - BIT)**

A **Fenwick Tree** efficiently supports **prefix sum queries** and **point updates** in **O(log N)** time using bitwise operations.

It is **simpler and more memory-efficient** than a Segment Tree but **cannot handle range updates efficiently**.

### **Operations**

1. **Update an index (`update(idx, val)`)** → Adds `val` to `arr[idx]` and propagates changes.
2. **Prefix sum query (`query(idx)`)** → Computes the sum of `arr[0]` to `arr[idx]`.
3. **Range sum query (`range_sum(left, right)`)** → Uses `query(right) - query(left-1)`.

### **Python Implementation**

```python
class FenwickTree:
    def __init__(self, n):
        self.size = n
        self.tree = [0] * (n + 1)

    def update(self, index, value):
        while index <= self.size:
            self.tree[index] += value
            index += index & -index  # Move to parent

    def query(self, index):
        total = 0
        while index > 0:
            total += self.tree[index]
            index -= index & -index  # Move to previous index
        return total

    def range_sum(self, left, right):
        return self.query(right) - self.query(left - 1)

# Example Usage
arr = [1, 3, 5]
fenwick = FenwickTree(len(arr))

for i, num in enumerate(arr):
    fenwick.update(i + 1, num)  # BIT uses 1-based indexing

print(fenwick.range_sum(1, 2))  # Output: 4 (1 + 3)

```

✅ **Fast updates and queries in O(log N)**.

⚠️ **Cannot efficiently handle range updates (use Segment Tree instead)**.

---

### **Segment Tree**

A **Segment Tree** is a **divide-and-conquer** data structure that stores information about array segments.

Unlike a Fenwick Tree, a **Segment Tree supports range queries on various operations** (sum, min, max, GCD, etc.).

### **Operations**

1. **Build the tree (`build()`)** → Constructs the Segment Tree in **O(N)**.
2. **Point update (`update(idx, val)`)** → Modifies a value and updates affected segments.
3. **Range query (`query(left, right)`)** → Recursively queries segments in **O(log N)**.

### **Python Implementation**

```python
class SegmentTree:
    def __init__(self, nums):
        self.n = len(nums)
        self.tree = [0] * (2 * self.n)  # Segment tree array
        self.build(nums)

    def build(self, nums):
        # Fill the leaves
        for i in range(self.n):
            self.tree[self.n + i] = nums[i]
        # Build the tree by calculating parents
        for i in range(self.n - 1, 0, -1):
            self.tree[i] = self.tree[2 * i] + self.tree[2 * i + 1]

    def update(self, index, value):
        index += self.n  # Move to leaf
        self.tree[index] = value  # Update leaf
        # Propagate updates to the root
        while index > 1:
            index //= 2
            self.tree[index] = self.tree[2 * index] + self.tree[2 * index + 1]

    def query(self, left, right):
        left += self.n  # Move to leaf range
        right += self.n
        total = 0
        while left <= right:
            if left % 2 == 1:  # If left is a right child, include it
                total += self.tree[left]
                left += 1
            if right % 2 == 0:  # If right is a left child, include it
                total += self.tree[right]
                right -= 1
            left //= 2
            right //= 2
        return total

# Example Usage
arr = [1, 3, 5]
seg_tree = SegmentTree(arr)

print(seg_tree.query(0, 2))  # Output: 9 (1 + 3 + 5)
seg_tree.update(1, 2)  # Update index 1 to 2
print(seg_tree.query(0, 2))  # Output: 8 (1 + 2 + 5)

```

✅ **Supports a variety of range queries (sum, min, max, etc.).**

✅ **Efficient for large-scale dynamic data updates.**

⚠️ **Takes more space (2N instead of N for Fenwick Tree).**

---

### **When to Use Fenwick Tree vs. Segment Tree**

| **Use Case**                           | **Fenwick Tree** | **Segment Tree**      |
| -------------------------------------- | ---------------- | --------------------- |
| **Point updates + prefix sum queries** | ✅ Best Choice   | ✅ Works but overkill |
| **Range sum queries**                  | ✅ Yes           | ✅ Yes                |
| **Range min/max/GCD queries**          | ❌ No            | ✅ Best Choice        |
| **Range updates (lazy propagation)**   | ❌ No            | ✅ Yes                |
| **Space efficiency**                   | ✅ O(N)          | ❌ O(2N)              |

---

### **Example Problem: Range Sum Query - Mutable**

**Problem:** Given an array, efficiently perform:

1. `update(index, value)`: Change `arr[index] = value`.
2. `sumRange(left, right)`: Return sum of `arr[left:right]`.

| Approach                             | Time Complexity               |
| ------------------------------------ | ----------------------------- |
| **Brute Force (Iterate Every Time)** | **O(N)** per query            |
| **Fenwick Tree / BIT**               | **O(log N)** per update/query |
| **Segment Tree**                     | **O(log N)** per update/query |

**Optimized Python Solution (Fenwick Tree)**

```python
class NumArray:
    def __init__(self, nums):
        self.nums = nums
        self.bit = FenwickTree(len(nums))
        for i, num in enumerate(nums):
            self.bit.update(i + 1, num)

    def update(self, index, val):
        self.bit.update(index + 1, val - self.nums[index])  # Difference update
        self.nums[index] = val

    def sumRange(self, left, right):
        return self.bit.range_sum(left + 1, right + 1)

# Example
nums = [1, 3, 5]
numArray = NumArray(nums)
print(numArray.sumRange(0, 2))  # Output: 9
numArray.update(1, 2)
print(numArray.sumRange(0, 2))  # Output: 8

```

✅ **Faster than brute force**.

⚠️ **Fenwick Tree works well for sum queries but not min/max queries**.

---

### **Conclusion**

- **Fenwick Tree** is simple and memory-efficient but limited to **prefix sum queries**.
- **Segment Tree** is more versatile but requires **more space**.
- **Both structures provide O(log N) updates and queries**, making them crucial for **competitive programming** and **real-time range queries**.
