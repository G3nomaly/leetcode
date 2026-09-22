/*
 * 739. Daily Temperatures
 * Difficulty: Medium
 * https://leetcode.com/problems/daily-temperatures/
 * 
 * ──────────────────────────────────────────────────
 * 
 * Given an array of integers temperatures represents the daily
 * temperatures, return an array answer such that answer[i] is the number
 * of days you have to wait after the i^th day to get a warmer
 * temperature. If there is no future day for which this is possible,
 * keep answer[i] == 0 instead.
 * 
 *  
 * 
 * Example 1:
 * 
 * Input: temperatures = [73,74,75,71,69,72,76,73]
 * i = 7 result [0] stack: [7] 
 * i = 6 stack: [] result: [0,0] stack: [6]
 * i = 5 stack [6] result: [0,0,1] stack [6,5]
 * i = 4 stack [6,5] result [0,0,1,1] stack [6,5,4]
 * i = 3 stack [6,5] result [0,0,1,1,2] stack [6,5,3]
 * i = 2 stack [6] result [0,0,1,1,2,4] stack [6,2]
 * i = 1 stack [6,2] result [0,0,1,1,2,4,1] stack [6,2,1]
 * i = 0 stack [6,2,1] result [0,0,1,1,2,4,1,1] stack [6,2,1,0]
 * Output: [1,1,4,2,1,1,0,0]
 * 
 * Example 2:
 * 
 * Input: temperatures = [30,40,50,60]
 * Output: [1,1,1,0]
 * 
 * Example 3:
 * 
 * Input: temperatures = [30,60,90]
 * Output: [1,1,0]
 * 
 *  
 * 
 * Constraints:
 * 
 * 	• 1 <= temperatures.length <= 10^5
 * 
 * 	• 30 <= temperatures[i] <= 100
*/

function dailyTemperatures(temperatures: number[]): number[] {
    const stack = new Array<number>();
    const result = new Array<number>(temperatures.length).fill(0)

    for (let i = temperatures.length - 1; i >= 0 ; --i) {
        while (stack.length && temperatures[i]! >= temperatures[stack[stack.length - 1]!]!) {
            stack.pop()
        }
        if (stack.length) {
            result[i] = stack[stack.length - 1]! - i;
        }
        stack.push(i)
    }

    return result
};
