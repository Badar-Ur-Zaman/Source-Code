import permutationsModule from '../generatePermutations.js';
const { generateUniquePermutations} = permutationsModule;

import { expect } from 'chai';

describe('Recursive String Permutations', function() {
    it('should return all unique permutations for a string with duplicates', function() {
        const inputString = 'aab';
        const result = generateUniquePermutations(inputString);

        expect(result).to.have.members(['aab', 'aba', 'baa']);
    });

    it('should handle single character strings', function() {
        const inputString = 'a';
        const result = generateUniquePermutations(inputString);

        expect(result).to.deep.equal(['a']);
    });

    it('should handle empty strings', function() {
        const inputString = '';
        const result = generateUniquePermutations(inputString);

        expect(result).to.deep.equal(['']);
    });
});
