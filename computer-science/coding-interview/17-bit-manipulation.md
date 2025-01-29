# **Chapter 17: Bit Manipulation**

## **Concept & When to Use**

Bit manipulation involves directly manipulating bits (the 0s and 1s) that make up data. It is a low-level operation that can be used for efficient problem-solving, especially when space or time complexity is a concern. Bit manipulation problems often involve performing operations such as AND, OR, XOR, shifting, and toggling to solve specific challenges.

### **Common Bit Manipulation Operations:**

1. **AND (&):** Performs a logical AND between two bits. Only returns 1 when both bits are 1.
2. **OR (|):** Performs a logical OR between two bits. Returns 1 if at least one bit is 1.
3. **XOR (^):** Performs a logical XOR between two bits. Returns 1 if the bits are different.
4. **NOT (~):** Inverts all the bits (i.e., turns 0s to 1s and vice versa).
5. **Bit Shifts:** Moves the bits left (<<) or right (>>). This is often used to multiply or divide by powers of 2.

### **When to Use Bit Manipulation:**

- When a problem requires working with binary numbers or flags.
- To reduce space or time complexity, especially in problems that involve checking subsets, counting bits, or performing bitwise arithmetic.
- When dealing with large datasets where other methods may be too slow or inefficient.

## **Grind 75 Problems**

Here are the **Grind 75** problems that make use of bit manipulation techniques:

1. **Single Number**
2. **Reverse Bits**

## **Solutions & Trade-offs**

### **1. Single Number**

💡 **Problem:** Given a non-empty array of integers, every element appears twice except for one. Find that single one.

### **Approach: XOR**

One of the most common and efficient bit manipulation techniques for this problem is XOR. The XOR operation has the following properties:

- `a ^ a = 0`: XORing a number with itself results in 0.
- `a ^ 0 = a`: XORing a number with 0 results in the number itself.
- XOR is commutative and associative.

If we XOR all the numbers together, the pairs will cancel out because of the first property (`a ^ a = 0`), leaving only the single number.

- **Time Complexity:** O(n), where n is the number of elements in the array.
- **Space Complexity:** O(1), as we only need a single variable to store the result.

### **Python Implementation**

```python
def singleNumber(nums):
    result = 0
    for num in nums:
        result ^= num  # XOR operation
    return result
```

### **Trade-offs:**

- **XOR approach:** This approach is highly efficient in terms of time and space complexity. It is simple and works perfectly for this type of problem.
- **Set-based approach:** A more naive approach would involve using a set to store the numbers that have been seen and check for duplicates. However, this solution would have O(n) time complexity with O(n) space complexity, which is less efficient compared to the XOR approach.

### **2. Reverse Bits**

💡 **Problem:** Reverse bits of a given 32-bit unsigned integer.

### **Approach: Bit Shifting**

The approach involves reversing the bits by repeatedly shifting the bits from the input number and placing them into a new number. You can achieve this by shifting the result to the left and shifting the input number to the right while checking and extracting the rightmost bit.

- **Time Complexity:** O(1) (since we only need 32 operations for a 32-bit number).
- **Space Complexity:** O(1), as we only need a fixed amount of space for the result.

### **Python Implementation**

```python
def reverseBits(n):
    result = 0
    for _ in range(32):
        result = (result << 1) | (n & 1)  # Shift result left and add the rightmost bit of n
        n >>= 1  # Shift n right by 1
    return result
```

### **Trade-offs:**

- **Bit shifting approach:** This is the most efficient approach for reversing bits because it operates in constant time (O(1)) and space (O(1)). It also doesn't require additional space for storing the binary representation or performing unnecessary calculations.
- **Set-based approach:** Another method might involve converting the number to binary and reversing the string representation, but this is less efficient in terms of both time and space, and it involves additional steps like converting back to an integer.

## **XOR vs. Set-based Approach**

- **XOR** is a powerful operation for problems where elements appear in pairs or need to be canceled out. It offers optimal time and space complexity (O(n) and O(1), respectively) and is often the best choice for problems like finding the single number or detecting duplicates.
- **Set-based approach** is less efficient when dealing with problems that involve bit-level operations. While simple to implement, it has a higher space complexity (O(n)) and can be slower for large inputs, as it requires extra space and operations like inserting and checking for duplicates.

### **When to Use XOR:**

- When the problem involves finding unique numbers in an array where duplicates cancel each other out.
- XOR is highly efficient for problems involving pairs, like "Single Number," "Find the Two Non-Repeating Numbers," or parity-related tasks.

### **When to Use a Set-based Approach:**

- When dealing with problems that don't have the properties that make XOR efficient (e.g., problems where you need to track all unique elements or don't have a clear cancellation property).
- Set-based solutions are easier to understand and can be helpful for simpler problems or when learning bit manipulation concepts.

## **Summary**

- **Bit Manipulation** is a highly efficient way to solve problems that deal with binary operations and bits.
- **XOR** is often the optimal approach for problems where elements cancel each other out, such as in the "Single Number" problem.
- **Bit Shifting** is a powerful technique for reversing bits and other bit-level operations.
- **Set-based approaches** are less efficient than bit manipulation but can be used for simpler problems or as a stepping stone to learning bit manipulation.

By mastering these bit manipulation techniques, you'll be able to solve a variety of problems efficiently, especially those that require handling binary representations or optimizing space and time complexity.
