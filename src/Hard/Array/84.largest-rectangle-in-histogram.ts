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
    const stack_value = new Array();
    const stack_index = new Array();

    for (let i = 0; i < heights.length; ++i) {
        let start = 0;
        while (stack_value[stack_value.length - 1] && stack_value[stack_value.length - 1] > heights[i]!) {
            const height = stack_value.pop()
            const index = stack_index.pop()

            start = Math.max(start,index)

            const width = start - index + 1;
            const area = height * width;

            max = Math.max(max, area)
        }
        stack_value.push(heights[i]!)
        stack_index.push(i)
    }

    while (stack_value.length) {
        const height = stack_value.pop()!;
        stack_index.pop();

        const left = stack_index.length
            ? stack_index[stack_index.length - 1] + 1
            : 0;

        const width = heights.length - left;

        max = Math.max(max, height * width);
    }

    return max;
};
