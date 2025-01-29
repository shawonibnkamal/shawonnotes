# **Chapter 9: Dynamic Programming (Top-down & Bottom-up)**

## **Concept & When to Use**

Dynamic Programming (DP) is a powerful technique for solving optimization problems by breaking them down into smaller subproblems. It is useful when the problem exhibits the following two properties:

1. **Optimal Substructure:** The optimal solution to a problem can be constructed from the optimal solutions of its subproblems.
2. **Overlapping Subproblems:** The problem can be divided into subproblems that are solved multiple times. Instead of recalculating the solutions to the subproblems each time, DP saves the results and reuses them.

There are two primary approaches in DP:

- **Top-down approach (Memoization):** This approach starts from the original problem and solves it by recursively breaking it down into smaller subproblems. The results of these subproblems are stored to avoid redundant calculations.
- **Bottom-up approach (Tabulation):** This approach solves all the subproblems first and builds the solution to the original problem incrementally.

### **When to Use DP:**

- When a problem involves making decisions over time or in stages.
- When a problem can be broken down into overlapping subproblems.
- When an optimal solution to a problem can be constructed from solutions to subproblems.

---

## **Grind 75 Problems**

Here are the **Grind 75** problems that make use of dynamic programming techniques:

1. **Coin Change**
2. **Longest Increasing Subsequence**
3. **Edit Distance**

---

## **Solutions & Trade-offs**

### **1. Coin Change**

💡 **Problem:** Given an integer array `coins` representing coins of different denominations and an integer `amount`, return the fewest number of coins needed to make up that amount. If that amount of money cannot be made up by any combination of the coins, return `-1`.

### **Approach: Bottom-up DP (Tabulation)**

This problem can be solved by defining a DP array `dp[i]` that represents the minimum number of coins needed to make up amount `i`. The idea is to fill this DP array by considering each coin and checking if using that coin results in a smaller number of coins than previously known.

- **Time Complexity:** O(n \* amount) where n is the number of coin denominations.
- **Space Complexity:** O(amount) due to the DP array.

### **Python Implementation (Bottom-up Tabulation)**

```python
def coinChange(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0  # 0 coins needed to make amount 0

    for i in range(1, amount + 1):
        for coin in coins:
            if i - coin >= 0:
                dp[i] = min(dp[i], dp[i - coin] + 1)

    return dp[amount] if dp[amount] != float('inf') else -1
```

### **Trade-offs:**

- **Top-down (Memoization)**: Involves recursion with memoization, which can be intuitive but has overhead due to recursive calls. It can be more difficult to implement for large input sizes compared to the bottom-up approach.
- **Bottom-up (Tabulation)**: It avoids recursion, which can lead to stack overflow in the top-down approach. It is more efficient in terms of both time and space, especially for larger input sizes, and is generally the preferred approach.

---

### **2. Longest Increasing Subsequence**

💡 **Problem:** Given an integer array `nums`, return the length of the longest strictly increasing subsequence.

### **Approach: Bottom-up DP (Tabulation)**

This problem involves building a DP table where each entry `dp[i]` represents the length of the longest increasing subsequence ending at index `i`. For each element, we check all previous elements to see if they can form an increasing subsequence.

- **Time Complexity:** O(n^2), where n is the length of the array.
- **Space Complexity:** O(n) due to the DP array.

### **Python Implementation (Bottom-up Tabulation)**

```python
def lengthOfLIS(nums):
    if not nums:
        return 0

    dp = [1] * len(nums)  # Initialize DP array with 1

    for i in range(1, len(nums)):
        for j in range(i):
            if nums[i] > nums[j]:
                dp[i] = max(dp[i], dp[j] + 1)

    return max(dp)
```

### **Trade-offs:**

- **Top-down (Memoization)**: You can solve this problem using recursion with memoization, but the time complexity will still be O(n^2), and managing the recursive state and bounds could be cumbersome.
- **Bottom-up (Tabulation)**: The bottom-up approach is more intuitive and avoids recursion. It ensures better memory usage because it doesn’t store the recursive call stack. For large inputs, the bottom-up approach is usually more practical.

---

### **3. Edit Distance**

💡 **Problem:** Given two strings `word1` and `word2`, return the minimum number of operations required to convert `word1` to `word2`. You have three possible operations: insert a character, delete a character, or replace a character.

### **Approach: Bottom-up DP (Tabulation)**

The DP array `dp[i][j]` represents the minimum number of operations required to convert the first `i` characters of `word1` to the first `j` characters of `word2`. The transitions depend on whether the characters match or not.

- **Time Complexity:** O(m \* n), where m and n are the lengths of `word1` and `word2`.
- **Space Complexity:** O(m \* n) due to the DP table.

### **Python Implementation (Bottom-up Tabulation)**

```python
def minDistance(word1, word2):
    m, n = len(word1), len(word2)

    # Create a DP table
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    # Initialize base cases
    for i in range(m + 1):
        dp[i][0] = i  # Deleting all characters from word1

    for j in range(n + 1):
        dp[0][j] = j  # Inserting all characters into word1

    # Fill the DP table
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i - 1] == word2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]  # No operation needed
            else:
                dp[i][j] = min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1  # Min operation

    return dp[m][n]
```

### **Trade-offs:**

- **Top-down (Memoization):** This can be more intuitive, especially for recursion lovers. However, it uses extra space for recursion and might have performance drawbacks for larger strings due to function call overhead.
- **Bottom-up (Tabulation):** The bottom-up approach is more efficient in terms of both time and space and avoids the pitfalls of recursion. It’s generally the preferred choice for problems like this, especially for large inputs.

---

## **Recursion vs. Memoization vs. Tabulation**

- **Recursion** is the most intuitive approach for DP problems but can lead to inefficient solutions due to redundant calculations. It also risks exceeding the recursion limit on larger inputs.
- **Memoization** (top-down DP) saves the results of subproblems to avoid recomputing them. It combines the clarity of recursion with the efficiency of storing results but still suffers from the overhead of recursive calls.
- **Tabulation** (bottom-up DP) builds the solution iteratively and is generally more efficient because it avoids recursion depth issues and function call overhead. It’s the preferred approach for most DP problems due to its simplicity and efficiency.

---

## **Summary**

- **Dynamic Programming** is a powerful technique for solving problems with overlapping subproblems and optimal substructure.
- **Top-down (Memoization)** is recursive and intuitive, but can be less efficient due to overhead.
- **Bottom-up (Tabulation)** builds the solution iteratively and is generally more space and time-efficient, especially for larger inputs.
