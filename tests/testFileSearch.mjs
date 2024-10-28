import fileSearchModule from '../fileSearch.js';
const { searchFiles } = fileSearchModule;

import { expect } from 'chai';
import path from 'path';

describe('Recursive File Search', function() {
    let output = [];
    const originalConsoleLog = console.log;

    // Capture console.log output
    beforeEach(() => {
        output = [];
        console.log = (message) => output.push(message);
    });

    // Restore console.log after each test
    afterEach(() => {
        console.log = originalConsoleLog;
    });

    it('should find a file if it exists in the directory', function() {
        const directory = './testDir';  
        const fileName = 'testFile.txt'; 
        searchFiles(directory, [fileName]);

        const expectedFilePath = path.join(directory, fileName);
        expect(output).to.include(`File found: ${expectedFilePath}`);
        expect(output).to.include(`File "${fileName}" found 1 time(s).`);
    });

    it('should not find a file if it does not exist', function() {
        const directory = './testDir';
        const fileName = 'nonExistentFile.txt';
        searchFiles(directory, [fileName]);

        expect(output).to.include(`File "${fileName}" not found.`);
    });

    it('should count occurrences of a file correctly', function() {
        const directory = './testDir';
        const fileName = 'duplicateFile.txt';
        searchFiles(directory, [fileName]);

        const expectedFilePath = path.join(directory, 'subDir', fileName);
        expect(output).to.include(`File found: ${expectedFilePath}`);
        expect(output).to.include(`File "${fileName}" found 1 time(s).`);
    });
});
