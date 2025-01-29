# **Chapter 5: Cyclic Sort**

## **Concept & When to Use**

The **Cyclic Sort** pattern is useful when dealing with problems that involve a **range of numbers from `1` to `N`**, where the goal is to **rearrange the numbers into their correct positions** with minimal extra space. This technique is especially helpful in problems involving **finding duplicates, missing numbers, or misplaced elements** in an array.

### **When to Use Cyclic Sort**

✔ The input consists of numbers **in a fixed range** (e.g., `1` to `N`).

✔ The problem requires finding **missing, duplicate, or misplaced numbers**.

✔ The array should be **sorted with constant extra space**.

✔ The values **can be used as indices** for in-place swapping.

### **Key Idea**

🔹 **Iterate through the array** and swap each number to its correct index (`nums[i]` should be at `nums[nums[i] - 1]`).

🔹 **Continue swapping** until every number is in its correct position or a cycle is detected.

🔹 **After sorting, iterate again** to identify missing or duplicate numbers.

---

## **Grind 75 Problems**

The **Cyclic Sort** technique is essential for solving the following **Grind 75** problems:

1. **Find All Duplicates in an Array** (LeetCode #442)
2. **First Missing Positive** (LeetCode #41)

Below, we explore these problems, different solution approaches, and trade-offs.

---

## **Solutions & Trade-offs**

### **1. Find All Duplicates in an Array**

💡 **Problem:** Given an integer array `nums` where `1 ≤ nums[i] ≤ n` (where `n` is the array's length), return **all the numbers that appear twice**.

### **Brute-Force Approach (Sorting or Hash Set) – O(n log n) or O(n) Space**

- Sort the array and check adjacent elements for duplicates (**O(n log n)**).
- Use a **hash set** to track seen elements (**O(n) space**).

### **Python Implementation (Hash Set)**

```python
def findDuplicates(nums: list[int]) -> list[int]:
    seen = set()
    duplicates = []
    for num in nums:
        if num in seen:
            duplicates.append(num)
        else:
            seen.add(num)
    return duplicates
```

✅ **Correct, but uses extra space (O(n)).**

❌ **Does not modify the array in-place.**

---

### **Optimized Approach (Cyclic Sort) – O(n) Time, O(1) Space**

**Steps:**

1. **Use Cyclic Sort** to place each number in its correct position.
2. **After sorting, iterate through the array** to find misplaced numbers.

**Time Complexity:** O(n) – single pass sorting.

**Space Complexity:** O(1) – modifies input in-place.

### **Python Implementation (Cyclic Sort)**

```python
def findDuplicates(nums: list[int]) -> list[int]:
    result = []

    for i in range(len(nums)):
        while nums[i] != nums[nums[i] - 1]:  # Place the number at the correct index
            nums[nums[i] - 1], nums[i] = nums[i], nums[nums[i] - 1]

    for i in range(len(nums)):
        if nums[i] != i + 1:
            result.append(nums[i])  # Misplaced number is a duplicate

    return result
```

🚀 **Trade-offs:**

- **Faster than sorting (O(n) vs. O(n log n)).**
- **Uses no extra space.**
- **Modifies the input array in-place.**

---

### **2. First Missing Positive**

💡 **Problem:** Given an unsorted integer array `nums`, return the **smallest missing positive integer**.

### **Brute-Force Approach (Sorting or Hash Set) – O(n log n) or O(n) Space**

- **Sorting:** Sort and iterate to find the first missing positive number (**O(n log n)**).
- **Hash Set:** Store numbers and check for missing ones (**O(n) space**).

### **Python Implementation (Sorting)**

```python
def firstMissingPositive(nums: list[int]) -> int:
    nums.sort()
    smallest = 1
    for num in nums:
        if num == smallest:
            smallest += 1
    return smallest
```

✅ **Correct, but slow (O(n log n)).**

❌ **Extra space if using a set.**

---

### **Optimized Approach (Cyclic Sort) – O(n) Time, O(1) Space**

**Steps:**

1. **Use Cyclic Sort** to place each positive number at its correct index (`nums[i] = i + 1`).
2. **Iterate again** to find the first missing number.

**Time Complexity:** O(n) – single pass sorting.

**Space Complexity:** O(1) – modifies input in-place.

### **Python Implementation (Cyclic Sort)**

```python
def firstMissingPositive(nums: list[int]) -> int:
    n = len(nums)

    for i in range(n):
        while 1 <= nums[i] <= n and nums[i] != nums[nums[i] - 1]:  # Place numbers in correct index
            nums[nums[i] - 1], nums[i] = nums[i], nums[nums[i] - 1]

    for i in range(n):
        if nums[i] != i + 1:
            return i + 1  # First missing positive number

    return n + 1  # If all are in place, return next positive number
```

🚀 **Trade-offs:**

- **O(n) time complexity is optimal.**
- **Uses no extra space.**
- **Modifies input array in-place.**

---

## **Key Takeaways**

✅ **Cyclic Sort works best for problems involving numbers within a specific range.**

✅ **Sorting in O(n) time with constant space is achievable when modifying the array in-place.**

✅ **This pattern is powerful for missing/duplicate number problems.**

Mastering **Cyclic Sort** will help you solve **sorting and missing number problems efficiently!** 🚀
