/*
 * 347. Top K Frequent Elements
 * Difficulty: Medium
 * https://leetcode.com/problems/top-k-frequent-elements/
 * 
 * ──────────────────────────────────────────────────
 * 
 * Given an integer array nums and an integer k, return the k most
 * frequent elements. You may return the answer in any order.
 * 
 *  
 * 
 * Example 1:
 * 
 * Input: nums = [1,1,1,2,2,3], k = 2
 * 
 * Output: [1,2]
 * 
 * Example 2:
 * 
 * Input: nums = [1], k = 1
 * 
 * Output: [1]
 * 
 * Example 3:
 * 
 * Input: nums = [1,2,1,2,1,2,3,1,3,2], k = 2
 * 
 * Output: [1,2]
 * 
 *  
 * 
 * Constraints:
 * 
 * 	• 1 <= nums.length <= 10^5
 * 
 * 	• -10^4 <= nums[i] <= 10^4
 * 
 * 	• k is in the range [1, the number of unique elements in the array].
 * 
 * 	• It is guaranteed that the answer is unique.
 * 
 *  
 * 
 * Follow up: Your algorithm's time complexity must be better than O(n
 * log n), where n is the array's size.
*/

function topKFrequent(nums: number[], k: number): number[] {
    const counter = new Map<number, number>(); // number, [frequency, position]

    for (const num of nums) {
        const count = counter.get(num)
        const newCount = count ? count + 1 : 1;
        counter.set(num, newCount);
    }

    const topKKeys = [...counter.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, k)
        .map(([key]) => key);

    return topKKeys
};


// intended solution with bucket sort:

function topKFrequentBucket(nums: number[], k: number): number[] {
    const counter = new Map<number, number>();
    const buckets = Array.from(
        { length: nums.length + 1 },
        (): number[] => []
    );

    nums.forEach(num => {
        counter.set(num, (counter.get(num) ?? 0) + 1)
    })

    for (const [num, count] of counter) {
        buckets[count]!.push(num);
    }

    const result: number[] = [];

    for (let i = buckets.length - 1; i >= 0 && result.length < k; --i) {
        result.push(...buckets[i]!);
    }

    return result.slice(0, k);
}
