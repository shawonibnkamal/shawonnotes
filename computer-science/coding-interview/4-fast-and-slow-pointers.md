# **Chapter 4: Fast & Slow Pointers (Cycle Detection)**

## **Concept & When to Use**

The **Fast & Slow Pointers** (also known as the **Tortoise and Hare**) technique is a fundamental algorithm used in problems involving **linked lists and cyclic detection**. It efficiently detects cycles and finds entry points in problems related to **linked lists and repeated sequences**.

### **When to Use Fast & Slow Pointers**

✔ The problem involves **linked lists** (e.g., "detect if a linked list has a cycle").

✔ The problem involves **repeated numbers or sequences** (e.g., "find the duplicate in an array").

✔ The problem needs to detect **loops or intersections** (e.g., "find the start of a cycle").

### **Key Idea**

🔹 Use two pointers:

- A **slow pointer (`slow`)** that moves **one step** at a time.
- A **fast pointer (`fast`)** that moves **two steps** at a time.
- If the two pointers meet, there is a **cycle**.

### **Mathematical Insight**

- The fast pointer moves **twice as fast** as the slow pointer.
- If a cycle exists, the fast pointer will eventually **catch up** to the slow pointer.

## **Grind 75 Problems**

The **Fast & Slow Pointers** technique is essential for solving the following **Grind 75** problems:

1. **Linked List Cycle** (LeetCode #141)
2. **Find Duplicate Number** (LeetCode #287)

Below, we explore these problems, along with different solution approaches and trade-offs.

## **Solutions & Trade-offs**

### **1. Linked List Cycle**

💡 **Problem:** Given the head of a linked list, determine if it contains a cycle.

### **Brute-Force Approach (Using a Hash Set) – O(n) Space**

- Store visited nodes in a **hash set**.
- If we encounter a node we’ve seen before, a cycle exists.
- **Time Complexity:** O(n) – traversing the linked list once.
- **Space Complexity:** O(n) – storing all visited nodes.

### **Python Implementation (Using Hash Set)**

```python
def hasCycle(head: ListNode) -> bool:
    visited = set()
    while head:
        if head in visited:
            return True
        visited.add(head)
        head = head.next
    return False
```

### **Optimized Approach (Floyd’s Cycle Detection) – O(1) Space**

- Use **fast and slow pointers**.
- If a cycle exists, they will eventually meet.
- **Time Complexity:** O(n) – each node is visited at most twice.
- **Space Complexity:** O(1) – no extra storage is used.

### **Python Implementation (Floyd’s Cycle Detection)**

```python
def hasCycle(head: ListNode) -> bool:
    slow, fast = head, head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True  # Cycle detected
    return False
```

🚀 **Trade-offs:**

- **Floyd’s Algorithm is optimal (O(1) space)** but requires careful pointer movement.
- **Hash Set method is easier to understand** but requires **O(n) extra space**.

### **2. Find Duplicate Number**

💡 **Problem:** Given an array `nums` with `n + 1` integers where each number is in the range `[1, n]`, find the duplicate number **without modifying the array** and using only **O(1) extra space**.

### **Brute-Force Approach (Sorting) – O(n log n) Time, O(1) Space**

- Sort the array and find consecutive duplicates.
- **Time Complexity:** O(n log n) – due to sorting.
- **Space Complexity:** O(1) – sorting in-place.

### **Python Implementation (Sorting)**

```python
def findDuplicate(nums: list[int]) -> int:
    nums.sort()
    for i in range(1, len(nums)):
        if nums[i] == nums[i - 1]:
            return nums[i]
    return -1
```

### **Better Approach (Using Hash Set) – O(n) Space**

- Use a **set** to track visited numbers.
- **Time Complexity:** O(n) – each element is checked once.
- **Space Complexity:** O(n) – storing visited numbers.

### **Python Implementation (Using Hash Set)**

```python
def findDuplicate(nums: list[int]) -> int:
    seen = set()
    for num in nums:
        if num in seen:
            return num
        seen.add(num)
    return -1
```

### **Optimized Approach (Floyd’s Cycle Detection) – O(1) Space**

**Observation:**

- Think of the array as a **linked list** where `nums[i]` points to `nums[nums[i]]`.
- The duplicate number forms a **cycle** because it appears more than once.

### **Algorithm Steps:**

1. Use **fast and slow pointers** to detect a cycle.
2. Move `slow` one step and `fast` two steps.
3. If they meet, reset `slow` to `0` and move both pointers **one step at a time** to find the **start of the cycle (duplicate number)**.

### **Python Implementation (Floyd’s Cycle Detection)**

```python
def findDuplicate(nums: list[int]) -> int:
    slow, fast = nums[0], nums[0]

    # Phase 1: Detect the cycle
    while True:
        slow = nums[slow]
        fast = nums[nums[fast]]
        if slow == fast:
            break

    # Phase 2: Find cycle start (duplicate)
    slow = nums[0]
    while slow != fast:
        slow = nums[slow]
        fast = nums[fast]

    return slow
```

🚀 **Trade-offs:**

- **Floyd’s Cycle Detection is O(n) time, O(1) space** (optimal).
- **Hash Set method is simpler but uses O(n) extra space**.

## **Key Takeaways**

✅ **Fast & Slow Pointers detect cycles efficiently without extra space**.

✅ **Floyd’s Algorithm works for both linked lists and repeated sequences**.

✅ **This technique is critical for problems involving cycles or repeated numbers**.

Mastering **Fast & Slow Pointers** will help you solve many **cycle detection problems efficiently!** 🚀
