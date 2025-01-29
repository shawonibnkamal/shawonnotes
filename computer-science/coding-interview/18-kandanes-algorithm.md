# **Chapter 18: Kadane’s Algorithm (Maximum Subarray)**

### **Why?**

Kadane’s Algorithm is a **greedy + dynamic programming** technique that efficiently finds the **maximum sum subarray** in an array. It is commonly used when:

- **Finding the largest contiguous sum in an array** (e.g., stock market analysis, gaming scores).
- **Solving DP problems with subarray constraints** in **O(N) time** instead of **O(N²) or O(N³)** brute-force approaches.
- **Handling problems that require maintaining local/global optimal values** efficiently.

Kadane’s Algorithm works because **a maximum subarray ending at index `i` must either**:

1. Extend the previous subarray (accumulate sum).
2. Start a new subarray at index `i` (if previous sum is negative).

This simple **"keep or restart"** decision makes Kadane’s Algorithm both **greedy and optimal**.

---

### **Core Idea**

We maintain two variables:

- **`max_sum`** → Tracks the maximum subarray sum found so far.
- **`current_sum`** → Tracks the current running sum.

At each index, update `current_sum` as:

\text{current_sum} = \max(\text{current_sum} + \text{nums}[i], \text{nums}[i])

Update `max_sum` if `current_sum` is larger.

---

### **Example Problems and Solutions**

### **1. Maximum Subarray (Medium)**

**Problem:** Given an array `nums`, find the contiguous subarray with the maximum sum.

**Approach:**

- Iterate through the array, maintaining `current_sum` and `max_sum`.
- If `current_sum` drops below 0, restart the subarray at the current index.
- Return `max_sum`.

**Python Solution:**

```python
def maxSubArray(nums):
    max_sum = float('-inf')
    current_sum = 0

    for num in nums:
        current_sum = max(current_sum + num, num)
        max_sum = max(max_sum, current_sum)

    return max_sum

# Example
nums = [-2,1,-3,4,-1,2,1,-5,4]
print(maxSubArray(nums))  # Output: 6  (Subarray: [4,-1,2,1])

```

**Trade-offs:**

✅ **O(N) time complexity** (optimal).

✅ **Constant space** (no extra storage needed).

⚠️ **Only works for sum-based problems** (modifications needed for other variations).

---

### **2. Maximum Product Subarray (Medium)**

**Problem:** Find the contiguous subarray with the **maximum product**.

**Challenge:**

- Unlike sums, **products can flip signs** (negative × negative = positive).
- We must track both **maximum** and **minimum** products at each step.

**Approach:**

- Maintain **`max_product`** and **`min_product`** (since a negative min product can turn into a large positive).
- At each step, update:
  \text{temp_max} = \max(\text{num}, \text{max_product} \times \text{num}, \text{min_product} \times \text{num})
  \text{min_product} = \min(\text{num}, \text{max_product} \times \text{num}, \text{min_product} \times \text{num})
- `max_product` becomes `temp_max`.

**Python Solution:**

```python
def maxProduct(nums):
    max_product = min_product = result = nums[0]

    for num in nums[1:]:
        temp_max = max(num, max_product * num, min_product * num)
        min_product = min(num, max_product * num, min_product * num)
        max_product = temp_max

        result = max(result, max_product)

    return result

# Example
nums = [2,3,-2,4]
print(maxProduct(nums))  # Output: 6  (Subarray: [2,3])

```

**Trade-offs:**

✅ **Handles negative numbers correctly**.

✅ **O(N) time complexity** (optimal).

⚠️ **Requires extra tracking (min & max products)**.

---

### **When to Use Kadane’s Algorithm**

| **Problem Type**              | **Kadane’s Algorithm?** | **Why?**                                        |
| ----------------------------- | ----------------------- | ----------------------------------------------- |
| Maximum Sum Subarray          | ✅ Yes                  | Standard Kadane’s Algorithm.                    |
| Maximum Product Subarray      | ✅ Yes (Modified)       | Track both min & max.                           |
| Subarrays with Constraints    | ⚠️ Maybe                | Needs variations (e.g., at most K elements).    |
| Maximum Subarray with Removal | ❌ No                   | DP may be better.                               |
| 2D Grid (Max Sum)             | ❌ No                   | Use **Kadane’s on rows**, then **prefix sums**. |

---

### **Conclusion**

Kadane’s Algorithm is a **powerful greedy DP technique** for finding maximum subarrays in **O(N) time**. With minor modifications, it can handle **product subarrays, constraints, and grid problems**.
