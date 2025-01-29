# **Chapter 3: Two Pointers**

## **Concept & When to Use**

The **Two Pointers** technique is an efficient approach used to solve problems involving **pairs or sequences of elements in an array or linked list**. Instead of using nested loops, we maintain **two pointers** that traverse the data structure in different ways to optimize time complexity.

### **When to Use Two Pointers**

✔ The problem involves **pairs** or **triplets** (e.g., "find two numbers that sum to a target").

✔ The input is **sorted** or can be sorted (e.g., "find the closest pair of numbers").

✔ The problem requires **removal, merging, or partitioning** elements in-place (e.g., "remove duplicates from sorted array").

✔ The problem can be solved using a **left-right** or **fast-slow** traversal (e.g., "find the middle of a linked list").

### **Types of Two Pointers Approaches**

🔹 **Left-Right Pointers:** Used for problems involving **sorted arrays** or **bounding conditions** (e.g., "find two numbers that sum to X").

🔹 **Fast-Slow Pointers:** Used for problems involving **linked lists** or **cyclic detection** (e.g., "detect a cycle in a linked list").

## **Grind 75 Problems**

The **Two Pointers** pattern appears in multiple **Grind 75 problems**, such as:

1. **Two Sum II (sorted)** (LeetCode #167)
2. **Three Sum** (LeetCode #15)
3. **Container With Most Water** (LeetCode #11)

Each of these problems benefits from the **Two Pointers** technique. Below, we analyze each problem and discuss brute-force vs. optimized solutions.

## **Solutions & Trade-offs**

### **1. Two Sum II (Sorted)**

💡 **Problem:** Given a sorted array `nums` and a target sum `target`, return the indices of two numbers such that they add up to `target`.

### **Brute-Force Approach** (O(n²))

- Use **two nested loops** to find the pair that sums to `target`.
- **Time Complexity:** O(n²) – checking all pairs is slow for large arrays.
- **Space Complexity:** O(1) – no extra space used.

### **Optimized Two Pointers Approach** (O(n))

- Since the array is **sorted**, we use **left (`l`) and right (`r`) pointers** to find the target sum.
- **If sum is too small**, move `l` right.
- **If sum is too large**, move `r` left.
- **Time Complexity:** O(n) – each element is checked once.
- **Space Complexity:** O(1) – no extra storage needed.

### **Python Implementation**

```python
def twoSum(nums: list[int], target: int) -> list[int]:
    l, r = 0, len(nums) - 1

    while l < r:
        current_sum = nums[l] + nums[r]
        if current_sum == target:
            return [l + 1, r + 1]  # 1-based index
        elif current_sum < target:
            l += 1
        else:
            r -= 1

    return []
```

🚀 **Trade-offs:**

- **Sorting helps reduce complexity** to O(n), but it only works if the input is already sorted.
- If the array was **unsorted**, we would need **O(n log n) sorting time** or use a **hash map** (O(n) but requires extra space).

### **2. Three Sum**

💡 **Problem:** Given an array `nums`, return all unique triplets `(a, b, c)` such that `a + b + c = 0`.

### **Brute-Force Approach** (O(n³))

- Try **all triplets** and check if they sum to `0`.
- **Time Complexity:** O(n³) – extremely slow for large inputs.
- **Space Complexity:** O(n) – storing triplets in a result list.

### **Optimized Sorting + Two Pointers Approach** (O(n²))

- **Sort the array** and **fix one element (`nums[i]`)**.
- Use **two pointers (`l` and `r`)** to find the remaining two numbers that sum to `nums[i]`.
- **Avoid duplicates** by skipping repeated values.
- **Time Complexity:** O(n²) – sorting takes O(n log n), and the two-pointer search is O(n).
- **Space Complexity:** O(n) – required for the result set.

### **Python Implementation**

```python
def threeSum(nums: list[int]) -> list[list[int]]:
    nums.sort()
    result = []

    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i - 1]:  # Skip duplicates
            continue

        l, r = i + 1, len(nums) - 1
        while l < r:
            three_sum = nums[i] + nums[l] + nums[r]
            if three_sum == 0:
                result.append([nums[i], nums[l], nums[r]])
                l += 1
                r -= 1
                while l < r and nums[l] == nums[l - 1]:  # Skip duplicates
                    l += 1
            elif three_sum < 0:
                l += 1
            else:
                r -= 1

    return result
```

🚀 **Trade-offs:**

- **Sorting speeds up** the solution but requires **O(n log n)** time.
- **Avoiding duplicate triplets** ensures correct output.

### **3. Container With Most Water**

💡 **Problem:** Given an array `height`, find the two lines that **hold the most water**.

### **Brute-Force Approach** (O(n²))

- Try **all pairs** and calculate water capacity.
- **Time Complexity:** O(n²) – checking all pairs is inefficient.
- **Space Complexity:** O(1) – no extra storage needed.

### **Optimized Two Pointers Approach** (O(n))

- Start with **left (`l`) and right (`r`) pointers** at both ends of the array.
- **Move the pointer pointing to the smaller height** (since increasing width won’t help if the height is small).
- **Time Complexity:** O(n) – each element is checked once.
- **Space Complexity:** O(1) – no extra storage needed.

### **Python Implementation**

```python
def maxArea(height: list[int]) -> int:
    l, r = 0, len(height) - 1
    max_water = 0

    while l < r:
        max_water = max(max_water, min(height[l], height[r]) * (r - l))
        if height[l] < height[r]:
            l += 1
        else:
            r -= 1

    return max_water
```

🚀 **Trade-offs:**

- **Optimized approach ensures O(n) performance** by eliminating unnecessary comparisons.
- Moving **only the smaller height pointer** guarantees maximization of the water area.

## **Key Takeaways**

✅ **Two Pointers improve efficiency** in problems involving **pairs, triplets, or partitions**.

✅ **Sorting + Two Pointers** is a common strategy for sum problems.

✅ **Fast-Slow Pointers** are useful for **linked list cycle detection**.

✅ **Trade-offs include sorting time vs. extra space for hash maps.**

Mastering **Two Pointers** will help you solve many **array and linked list problems efficiently!** 🚀
