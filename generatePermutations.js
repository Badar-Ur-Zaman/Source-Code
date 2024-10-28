/**
 * Generates permutations of a given string, optionally excluding duplicates.
 * 
 * @param {string} str - The input string to generate permutations for.
 * @param {boolean} allowDuplicates - If true, includes duplicate permutations; otherwise, excludes them.
 * @returns {string[]} - An array containing all permutations of the input string.
 */
function generatePermutations(str, allowDuplicates = true) {
    if (str.length <= 1) return [str];

    const permutations = [];
    const addPermutation = allowDuplicates ? (perm) => permutations.push(perm) 
                                           : (perm) => permutations.includes(perm) || permutations.push(perm);

    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        const remainingChars = str.slice(0, i) + str.slice(i + 1);
        const remainingPermutations = generatePermutations(remainingChars, allowDuplicates);

        for (let perm of remainingPermutations) {
            addPermutation(char + perm);
        }
    }

    return permutations;
}

// Usage Example
const str = 'Badar';
console.log("With duplicates:", generatePermutations(str, true));
console.log("Without duplicates:", generatePermutations(str, false));
