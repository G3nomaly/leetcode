/*
 * 49. Group Anagrams
 * Difficulty: Medium
 * https://leetcode.com/problems/group-anagrams/
 * 
 * ──────────────────────────────────────────────────
 * 
 * Given an array of strings strs, group the anagrams together. You can
 * return the answer in any order.
 * 
 *  
 * 
 * Example 1:
 * 
 * Input: strs = ["eat","tea","tan","ate","nat","bat"]
 * 
 * Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
 * 
 * Explanation:
 * 
 * 	• There is no string in strs that can be rearranged to form "bat".
 * 
 * • The strings "nat" and "tan" are anagrams as they can be rearranged
 * to form each other.
 * 
 * • The strings "ate", "eat", and "tea" are anagrams as they can be
 * rearranged to form each other.
 * 
 * Example 2:
 * 
 * Input: strs = [""]
 * 
 * Output: [[""]]
 * 
 * Example 3:
 * 
 * Input: strs = ["a"]
 * 
 * Output: [["a"]]
 * 
 *  
 * 
 * Constraints:
 * 
 * 	• 1 <= strs.length <= 10^4
 * 
 * 	• 0 <= strs[i].length <= 100
 * 
 * 	• strs[i] consists of lowercase English letters.
*/

function groupAnagrams(strs: string[]): string[][] {
    const anagramsMap: Map<string, string[]> = new Map();

    const countArray = new Uint16Array(26);

    for (const str of strs) {
        countArray.fill(0); // Reset the count array for each string
        for (let i = 0; i < str.length; i++) {
            const idx = str.charCodeAt(i) - 97;
            countArray[idx] = countArray[idx]! + 1;
        }
        const key = String.fromCharCode(...countArray.map(c => c + 97));
        const items = anagramsMap.get(key);
        if (items) items.push(str)
        else anagramsMap.set(key, [str])
    }

    return Array.from(anagramsMap.values())
};


function groupAnagrams2(strs: string[]): string[][] {
    const anagramsMap = new Map<string,string[]>();

    for (const str of strs) {
        const key = str.split('').sort().join(''); // really interesting way of sorting a string
        const items = anagramsMap.get(key);
        if (items) items.push(str)
        else anagramsMap.set(key, [str])
    }

    return Array.from(anagramsMap.values())
};