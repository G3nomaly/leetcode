/*
 * 242. Valid Anagram
 * Difficulty: Easy
 * https://leetcode.com/problems/valid-anagram/
 * 
 * ──────────────────────────────────────────────────
 * 
 * Given two strings s and t, return true if t is an anagram of s, and
 * false otherwise.
 * 
 *  
 * 
 * Example 1:
 * 
 * Input: s = "anagram", t = "nagaram"
 * 
 * Output: true
 * 
 * Example 2:
 * 
 * Input: s = "rat", t = "car"
 * 
 * Output: false
 * 
 *  
 * 
 * Constraints:
 * 
 * 	• 1 <= s.length, t.length <= 5 * 10^4
 * 
 * 	• s and t consist of lowercase English letters.
 * 
 *  
 * 
 * Follow up: What if the inputs contain Unicode characters? How would
 * you adapt your solution to such a case?
*/

function isAnagram(s: string, t: string): boolean {
    if (s.length !== t.length) return false;

    const charMap = new Map<string,number>();

    for (const char of s) {
        charMap.set(char, (charMap.get(char) ?? 0) + 1);
    }

    for (const char of t) {
        charMap.set(char, (charMap.get(char) ?? 0) - 1);
    }

    for (const value of charMap.values()) {
        if (value !== 0) return false;
    }
    return true;
};

function isAnagram2(s: string, t: string): boolean {
    const count = new Array(26).fill(0);

    for (const char of s) {
        count[char.charCodeAt(0) - 97]++; // char "a" starts at 97
    }

    for (const char of t) {
        count[char.charCodeAt(0) - 97]--;
    }

    return count.every(x => x === 0);
}