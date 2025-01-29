# **Chapter 8: Tree Traversal (BFS & DFS)**

## **Concept & When to Use**

Tree traversal is a fundamental technique in **binary trees and graphs**, used to explore nodes in a structured manner. There are two primary traversal methods:

1. **Breadth-First Search (BFS)** – Explores all nodes at the same depth before moving deeper.
2. **Depth-First Search (DFS)** – Explores as deep as possible before backtracking.

These approaches help solve problems related to **tree structure, hierarchy, and relationships** efficiently.

---

### **When to Use BFS vs. DFS**

| **Criteria**                  | **BFS (Level Order Traversal)**             | **DFS (Preorder, Inorder, Postorder)**          |
| ----------------------------- | ------------------------------------------- | ----------------------------------------------- |
| **When to use?**              | Finding shortest path, level-wise traversal | Finding ancestors, validating BST, path-finding |
| **Space Complexity**          | O(N) (queue holds all nodes at a level)     | O(H) (stack holds recursion depth, H=height)    |
| **Best for**                  | Problems needing level-wise relationships   | Problems requiring full tree exploration        |
| **Iterative Implementation?** | Uses a queue (FIFO)                         | Uses a stack (LIFO) or recursion                |

---

## **Grind 75 Problems**

The **Tree Traversal** pattern is crucial for solving the following **Grind 75** problems:

1. **Binary Tree Level Order Traversal** (BFS)
2. **Lowest Common Ancestor** (DFS)
3. **Validate Binary Search Tree** (DFS)

We explore different solutions and trade-offs for these problems.

---

## **Solutions & Trade-offs**

### **1. Binary Tree Level Order Traversal (BFS)**

💡 **Problem:** Given a binary tree, return its **level-order traversal** (left to right, level by level).

### **Approach: BFS (Queue) – O(N) Time, O(N) Space**

- Use a **queue (FIFO)** to process nodes level by level.
- Maintain a list of nodes for each level.

### **Python Implementation (BFS)**

```python
from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def levelOrder(root: TreeNode) -> list[list[int]]:
    if not root:
        return []

    result, queue = [], deque([root])

    while queue:
        level = []
        for _ in range(len(queue)):  # Process all nodes at the current level
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        result.append(level)

    return result
```

✅ **Trade-offs:**

- **O(N) time complexity** (each node is visited once).
- **O(N) space complexity** (stores all nodes at the deepest level).
- **BFS ensures level-wise traversal, but uses more memory than DFS**.

---

### **2. Lowest Common Ancestor (DFS)**

💡 **Problem:** Given a binary tree and two nodes `p` and `q`, find their **Lowest Common Ancestor (LCA)**.

### **Approach: DFS (Recursive) – O(N) Time, O(H) Space**

- Traverse the tree using **DFS** until `p` or `q` is found.
- If a node is an ancestor of both `p` and `q`, return it as the LCA.

### **Python Implementation (DFS)**

```python
def lowestCommonAncestor(root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:
    if not root or root == p or root == q:
        return root  # Found p or q, return current node

    left = lowestCommonAncestor(root.left, p, q)
    right = lowestCommonAncestor(root.right, p, q)

    if left and right:
        return root  # This is the LCA

    return left if left else right  # Return non-null subtree
```

✅ **Trade-offs:**

- **O(N) time complexity** (DFS visits each node once).
- **O(H) space complexity** (recursive stack depth is the tree height).
- **Recursive DFS is elegant, but may cause stack overflow in deep trees**.

---

### **3. Validate Binary Search Tree (DFS)**

💡 **Problem:** Given a binary tree, determine if it is a **valid Binary Search Tree (BST)**.

### **Approach: DFS (Inorder Traversal) – O(N) Time, O(H) Space**

- Perform an **inorder traversal** (left → root → right).
- Ensure values are strictly increasing.

### **Python Implementation (DFS)**

```python
def isValidBST(root: TreeNode) -> bool:
    def inorder(node, lower=float('-inf'), upper=float('inf')):
        if not node:
            return True

        if node.val <= lower or node.val >= upper:
            return False  # Violates BST property

        return inorder(node.left, lower, node.val) and inorder(node.right, node.val, upper)

    return inorder(root)
```

✅ **Trade-offs:**

- **O(N) time complexity** (visits each node once).
- **O(H) space complexity** (recursive depth depends on tree height).
- **DFS is memory-efficient for balanced trees but can cause stack overflows in skewed trees**.

---

## **BFS vs. DFS: Which One to Use?**

| **Scenario**                         | **Use BFS (Queue)**              | **Use DFS (Stack/Recursion)**         |
| ------------------------------------ | -------------------------------- | ------------------------------------- |
| **Level-wise traversal required?**   | ✅ Yes                           | ❌ No                                 |
| **Searching for shortest path?**     | ✅ Yes (e.g., unweighted graphs) | ❌ No                                 |
| **Tree structure validation (BST)?** | ❌ No                            | ✅ Yes (inorder traversal)            |
| **Tree depth-related problems?**     | ❌ No                            | ✅ Yes (finding ancestors, recursion) |
| **Memory constraints?**              | ❌ More memory                   | ✅ Less memory in balanced trees      |

---

## **Key Takeaways**

✅ **BFS (Queue) is best for level-wise traversal and shortest paths.**

✅ **DFS (Recursion/Stack) is efficient for ancestor, validation, and search problems.**

✅ **Iterative solutions avoid recursion depth limits but may be harder to implement.**

✅ **DFS (Inorder) is ideal for checking BST validity.**

Mastering **BFS & DFS** will help you efficiently traverse trees and solve **search, validation, and relationship-based problems!** 🚀
