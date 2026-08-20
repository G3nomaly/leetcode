/*
 * 238. Product of Array Except Self
 * Difficulty: Medium
 * https://leetcode.com/problems/product-of-array-except-self/
 * 
 * ──────────────────────────────────────────────────
 * 
 * Given an integer array nums, return an array answer such that
 * answer[i] is equal to the product of all the elements of nums except
 * nums[i].
 * 
 * The product of any prefix or suffix of nums is guaranteed to fit in a
 * 32-bit integer.
 * 
 * You must write an algorithm that runs in O(n) time and without using
 * the division operation.
 * 
 *  
 * 
 * Example 1:
 * 
 * Input: nums = [1,2,3,4]
 * Output: [24,12,8,6]
 * 
 * Example 2:
 * 
 * Input: nums = [-1,1,0,-3,3]
 * Output: [0,0,9,0,0]
 * 
 *  
 * 
 * Constraints:
 * 
 * 	• 2 <= nums.length <= 10^5
 * 
 * 	• -30 <= nums[i] <= 30
 * 
 * • The input is generated such that answer[i] is guaranteed to fit in
 * a 32-bit integer.
 * 
 *  
 * 
 * Follow up: Can you solve the problem in O(1) extra space complexity?
 * (The output array does not count as extra space for space complexity
 * analysis.)
*/

function productExceptSelfslow(nums: number[]): number[] {
    if (nums.length === 0) return []
    const array: number[] = [];

    for (let i = 0; i < nums.length; ++i ) {
        let product = 1;
        for (let j = 0; j < nums.length; ++j ) {
            if (i === j) continue;
            product = product * nums[j]!;
        }
        array.push(product);
    }
    return array
};

function productExceptSelf(nums: number[]): number[] {
    const counter = new Map<number, number>();
    const power = new Map<number, number>();

    nums.forEach(num => {
        counter.set(num, (counter.get(num) ?? 0) + 1)
    })

    counter.forEach((count, num) => {
        power.set(num, num ** count)
    })

    const result: number[] = new Array(nums.length).fill(1)

    for (let i = 0; i < nums.length; ++i ) {
        counter.forEach((count, num) => {
            if (num !== nums[i]) {
                result[i] = result[i]! * power.get(num)!
            } else {
                result[i] = result[i]! * (num ** (count - 1))
            }
        })
    }

    return result
}


function productExceptSelfLeftRight(nums: number[]): number[] {
    const left = new Array(nums.length).fill(0)
    const right = new Array(nums.length).fill(0)

    left[0] = 1;
    for (let i = 1; i < nums.length; ++i) {
        left[i] = left[i - 1] * nums[i - 1]!
    }
    console.log(left)

    right[nums.length - 1] = 1
    for (let i = nums.length - 2; i >= 0; --i) {
        right[i] = right[i + 1] * nums[i + 1]!
        left[i] *= right[i]
    }
    console.log(right)

    return left
}

function productExceptSelfPrefix(nums: number[]): number[] {
    const result = new Array(nums.length).fill(0)

    // calculates the product left of i
    let prefix = 1;
    for (let i = 0; i < nums.length; ++i) {
        result[i] = prefix;
        prefix *= nums[i]!;
    } // [0] = 1 [1] = 1*1 [2] = 1*1*2 [3] = 1*1*2*3

    // calculates the product right of i
    let suffix = 1;
    for (let i = nums.length - 1; i >= 0; --i) {
        result[i] *= suffix;
        suffix *= nums[i]!
    } // [3] = 6*1 [2] = 2*1*4 [1] = 1*1*4*3 [0] = 1*1*4*3*2 

    return result
}


const result = productExceptSelfPrefix([1,2,3,4]);

console.log(result) 