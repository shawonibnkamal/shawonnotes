# **Chapter 16: Monotonic Stack (Stack-based Problems)**

### **Why Monotonic Stack?**

The **Monotonic Stack** is a specialized stack data structure used in problems that require finding the **next greater element**, **next smaller element**, or solving **range-based calculations** efficiently. It maintains elements in a strictly increasing or decreasing order, allowing us to process elements in linear time instead of quadratic time.

### **Key Use Cases**

- **Next Greater Element Problems**: Efficiently find the next greater or smaller element for each item in an array.
- **Histogram-based Problems**: Solve problems related to **largest rectangle in histogram** or **maximal rectangle**.
- **Sliding Window Problems**: Maintain a stack of useful elements while iterating through a window of values.

### **Example Problems (Grind 75 & Beyond)**

1. **Largest Rectangle in Histogram** (Hard)
2. **Daily Temperatures** (Medium)
3. **Next Greater Element I & II** (Medium)

---

## **Monotonic Stack Implementation & Variants**

### **1. Finding Next Greater Element (NGE)**

The most common monotonic stack application is to find the **Next Greater Element (NGE)** for each index in an array.

### **Brute Force Approach**

A naive way would be to use two nested loops to check for the next greater element, leading to an **O(N²)** time complexity.

```python
# Brute Force: O(N²) Time Complexity
def next_greater_element(nums):
    result = [-1] * len(nums)
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[j] > nums[i]:
                result[i] = nums[j]
                break
    return result
```

### **Optimized Monotonic Stack Approach**

We use a **decreasing stack** (stores indices of elements in decreasing order) to efficiently find the next greater element in **O(N)** time.

```python
# Monotonic Stack: O(N) Time Complexity
def next_greater_element(nums):
    result = [-1] * len(nums)
    stack = []  # Stores indices

    for i in range(len(nums)):
        while stack and nums[i] > nums[stack[-1]]:
            index = stack.pop()
            result[index] = nums[i]
        stack.append(i)

    return result
```

### **2. Largest Rectangle in Histogram**

The **Largest Rectangle in Histogram** problem is a classic example where a **monotonic increasing stack** helps track potential heights efficiently.

### **Optimized Stack Approach**

Instead of recalculating left and right bounds for each bar separately, we use a stack to track indices and compute the maximum area in **O(N)** time.

```python
# Monotonic Stack: O(N) Time Complexity
def largest_rectangle_area(heights):
    heights.append(0)  # Sentinel to flush stack at the end
    stack = []  # Stores indices of histogram bars
    max_area = 0

    for i, h in enumerate(heights):
        while stack and heights[stack[-1]] > h:
            height = heights[stack.pop()]
            width = i if not stack else i - stack[-1] - 1
            max_area = max(max_area, height * width)
        stack.append(i)

    return max_area
```

### **3. Daily Temperatures**

Given a list of daily temperatures, find how many days you have to wait for a warmer temperature.

```python
# Monotonic Stack: O(N) Time Complexity
def daily_temperatures(temperatures):
    result = [0] * len(temperatures)
    stack = []  # Stores indices

    for i, temp in enumerate(temperatures):
        while stack and temp > temperatures[stack[-1]]:
            index = stack.pop()
            result[index] = i - index
        stack.append(i)

    return result
```

---

## **Trade-offs & Complexity Analysis**

| Approach            | Time Complexity | Space Complexity | Notes                             |
| ------------------- | --------------- | ---------------- | --------------------------------- |
| **Brute Force**     | O(N²)           | O(1)             | Inefficient for large input sizes |
| **Monotonic Stack** | O(N)            | O(N)             | Optimal for stack-based problems  |

### **Key Takeaways**

1. **Use monotonic stacks** for problems that require range-based calculations efficiently.
2. **Stack direction matters**: Increasing stacks are used for **finding next smaller elements**, while decreasing stacks help in **next greater element problems**.
3. **Histogram problems** can be solved efficiently using a stack-based approach to keep track of valid widths.

---

### **Practice Problems**

- LeetCode 84: Largest Rectangle in Histogram
- LeetCode 739: Daily Temperatures
- LeetCode 503: Next Greater Element II

### **Conclusion**

The **Monotonic Stack** is an essential tool in tackling stack-based problems efficiently, often reducing the complexity from **O(N²) to O(N)**. Mastering this technique is crucial for solving range queries, histogram problems, and sliding window optimizations effectively.
