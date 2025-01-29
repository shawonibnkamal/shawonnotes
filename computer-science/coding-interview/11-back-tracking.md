# **Chapter 11: Backtracking**

## **Concept & When to Use**

Backtracking is a general algorithmic technique used for finding all (or some) solutions to computational problems, particularly for problems that involve searching through all possible combinations. The idea behind backtracking is to build the solution incrementally, one piece at a time, and discard partial solutions as soon as it becomes clear they cannot lead to a valid solution.

### **When to Use Backtracking:**

- When solving problems that involve combinatorial search, such as finding permutations, combinations, subsets, or paths.
- In problems that have a constraint that must be satisfied for a solution to be valid (e.g., Sudoku or n-queens).
- When the solution space is large, but it's possible to prune branches early, avoiding unnecessary exploration of invalid solutions.

Backtracking is often used to solve problems where we need to explore all possible solutions but can eliminate many possibilities early (i.e., pruning). It is similar to brute force, but it is more efficient because it avoids trying out solutions that are guaranteed to fail.

## **Grind 75 Problems**

Here are the **Grind 75** problems that are suitable for solving using the backtracking approach:

1. **Subsets**
2. **Permutations**
3. **Sudoku Solver**

## **Solutions & Trade-offs**

### **1. Subsets**

💡 **Problem:** Given an integer array `nums`, return all possible subsets (the power set).

### **Approach:**

Backtracking is a natural choice for solving the subsets problem because it allows us to generate all possible subsets by making a decision at each step: whether to include the current element in the subset or not.

- **Time Complexity:** O(2^n), where n is the number of elements in the input array. This is because we have two choices for each element (include or exclude), and there are 2^n subsets in total.
- **Space Complexity:** O(n), due to the recursive stack space and the storage needed for the output.

### **Python Implementation**

```python
def subsets(nums):
    result = []

    def backtrack(start, current):
        result.append(current[:])  # Append the current subset to the result
        for i in range(start, len(nums)):
            current.append(nums[i])  # Include the element
            backtrack(i + 1, current)  # Recursively explore with the next elements
            current.pop()  # Backtrack and remove the last element

    backtrack(0, [])
    return result
```

### **Trade-offs:**

- **Recursive approach:** Backtracking with recursion is simple and intuitive. However, it can lead to deep recursion for large input arrays, which may cause stack overflow in extreme cases.
- **Iterative approach:** An iterative approach using bit manipulation can also be used for generating subsets in O(2^n) time, but it may be less readable and intuitive than the recursive backtracking approach.

### **2. Permutations**

💡 **Problem:** Given a collection of distinct integers, return all possible permutations.

### **Approach:**

Backtracking works well for generating permutations since we need to decide whether to include an element at each position. The approach typically involves swapping elements in-place and generating all permutations by exploring all possible arrangements.

- **Time Complexity:** O(n!), where n is the number of elements in the input array. This is because there are n! possible permutations of n elements.
- **Space Complexity:** O(n), as we only need space for the current permutation and the recursive call stack.

### **Python Implementation**

```python
def permute(nums):
    result = []

    def backtrack(start):
        if start == len(nums):
            result.append(nums[:])  # Add the current permutation to the result
            return
        for i in range(start, len(nums)):
            nums[start], nums[i] = nums[i], nums[start]  # Swap elements
            backtrack(start + 1)  # Recurse with the next position
            nums[start], nums[i] = nums[i], nums[start]  # Backtrack (restore the swap)

    backtrack(0)
    return result
```

### **Trade-offs:**

- **Recursive approach:** This is the most common and clean solution, but for large arrays, the number of permutations grows factorially, which may become inefficient for larger inputs.
- **Iterative approach:** Permutations can also be generated iteratively using an algorithm like Heap's algorithm, but backtracking is more flexible and easier to understand for many cases.

### **3. Sudoku Solver**

💡 **Problem:** Solve a given Sudoku puzzle by filling the empty cells.

### **Approach:**

Backtracking is ideal for this problem, as it involves trying out possible numbers for each empty cell and "backtracking" when we encounter a conflict (i.e., when a number is repeated in a row, column, or 3x3 grid).

- **Time Complexity:** O(9^m), where m is the number of empty cells. In the worst case, we may need to try all 9 possible digits for each empty cell, though the solution is often found much sooner due to pruning.
- **Space Complexity:** O(m), where m is the number of empty cells. The space is used for the recursive stack and the board state.

### **Python Implementation**

```python
def solveSudoku(board):
    def is_valid(board, row, col, num):
        # Check if the number is not repeated in the row, column, or 3x3 grid
        for i in range(9):
            if board[row][i] == num or board[i][col] == num:
                return False
            if board[3 * (row // 3) + i // 3][3 * (col // 3) + i % 3] == num:
                return False
        return True

    def backtrack(board):
        for row in range(9):
            for col in range(9):
                if board[row][col] == '.':  # Find an empty cell
                    for num in '123456789':
                        if is_valid(board, row, col, num):
                            board[row][col] = num  # Try the number
                            if backtrack(board):  # Recursively fill the next cell
                                return True
                            board[row][col] = '.'  # Backtrack if it leads to a dead-end
                    return False  # No valid number can be placed here
        return True  # All cells are filled

    backtrack(board)
```

### **Trade-offs:**

- **Recursive approach:** The backtracking approach is intuitive and straightforward. However, for large puzzles or complex constraints, it may be inefficient without proper pruning.
- **Iterative approach:** An iterative approach using constraint propagation (like the AC-3 algorithm) can be more efficient, but backtracking is easier to implement and understand for Sudoku puzzles.

## **Recursive vs. Iterative Approaches**

- **Recursive approach (Backtracking):** This approach is generally easier to implement and understand for problems like subsets, permutations, and Sudoku. It allows for elegant exploration of all possibilities and pruning of invalid branches. However, recursion can be inefficient for large inputs due to the deep call stacks, and can sometimes lead to stack overflow errors.
- **Iterative approach:** While iterative solutions like using bit manipulation or generating permutations using an explicit stack can be more efficient in terms of space, they are often more complex to implement and less intuitive. Backtracking via recursion is typically the best approach for problems that naturally fit this paradigm.

## **Summary**

Backtracking is a powerful technique for solving problems that involve exploring all potential solutions, particularly for combinatorial problems such as finding subsets, permutations, or solving puzzles. The key benefits of backtracking are:

- It is often simple to implement using recursion.
- It can prune invalid solutions early, making it more efficient than brute force.
- The trade-off involves dealing with potentially deep recursion or the need for additional optimizations for large inputs.

By understanding how and when to use backtracking, you'll be able to solve a variety of complex problems that require an exhaustive search through possible combinations while efficiently eliminating unfeasible options.
