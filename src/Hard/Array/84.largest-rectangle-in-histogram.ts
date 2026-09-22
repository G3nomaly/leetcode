/*
 * 84. Largest Rectangle in Histogram
 * Difficulty: Hard
 * https://leetcode.com/problems/largest-rectangle-in-histogram/
 * 
 * ──────────────────────────────────────────────────
 * 
 * Given an array of integers heights representing the histogram's bar
 * height where the width of each bar is 1, return the area of the
 * largest rectangle in the histogram.
 * 
 *  
 * 
 * Example 1:
 * 
 * Input: heights = [2,1,5,6,2,3]
 * Output: 10
 * Explanation: The above is a histogram where width of each bar is 1.
 * The largest rectangle is shown in the red area, which has an area =
 * 10 units.
 * 
 * Example 2:
 * 
 * Input: heights = [2,4]
 * Output: 4
 * 
 * 
 * 
 * Constraints:
 * 
 * 	• 1 <= heights.length <= 10^5
 * 
 * 	• 0 <= heights[i] <= 10^4
*/

function largestRectangleArea(heights: number[]): number {
    let max = 0;
    const stack_index = new Array();

    for (let i = 0; i < heights.length; ++i) {
        while (stack_index.length && heights[stack_index[stack_index.length - 1]!]! > heights[i]!) {
            const index = stack_index.pop()
            const height = heights[index]!

            const left = stack_index.length > 0
                ? stack_index[stack_index.length - 1] + 1
                : 0;

            const width = i - left;

            max = Math.max(max, height * width)
        }
        stack_index.push(i)
    }

    while (stack_index.length) {
        const index = stack_index.pop()
        const height = heights[index]!

        const left = stack_index.length
            ? stack_index[stack_index.length - 1] + 1
            : 0;

        const width = heights.length - left;

        max = Math.max(max, height * width);
    }

    return max;
};
