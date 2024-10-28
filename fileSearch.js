const fs = require('fs');
const path = require('path');

/**
 * Searches for specified files within a directory and its subdirectories.
 * 
 * @param {string} directory - The starting directory path for the search.
 * @param {string[]} fileNames - An array of file names to search for.
 * @param {boolean} [caseSensitive=true] - If true, performs a case-sensitive search; otherwise, case-insensitive.
 * 
 * The function initializes an object to count occurrences of each file name.
 * For each file found, it updates the count and logs the path. If the directory
 * or file does not exist, an error is logged instead.
 * 
 * Example usage:
 * searchFiles('/path/to/dir', ['file1.txt', 'file2.txt'], false);
 */
function searchFiles(directory, fileNames, caseSensitive = true) {
    const fileCounts = {};

    fileNames.forEach(file => {
        fileCounts[file] = 0;
    });

    /**
     * Recursively searches for files within subdirectories.
     * 
     * @param {string} dir - The current directory path.
     * 
     * Iterates through directory contents. If an item is a directory, calls itself
     * recursively; if a file, checks if it matches any of the specified file names.
     */
    function search(dir) {
        try {
            const files = fs.readdirSync(dir);

            for (let file of files) {
                const filePath = path.join(dir, file);
                const stats = fs.statSync(filePath);

                if (stats.isDirectory()) {
                    search(filePath);  // Recursive call for subdirectories
                } else {
                    const compareFileName = caseSensitive ? file : file.toLowerCase();
                    fileNames.forEach(name => {
                        const compareName = caseSensitive ? name : name.toLowerCase();
                        if (compareFileName === compareName) {
                            console.log(`File found: ${filePath}`);
                            fileCounts[name] += 1;  // Count occurrences
                        }
                    });
                }
            }
        } catch (err) {
            console.error(`Error reading directory: ${err.message}`);
        }
    }

    search(directory);

    fileNames.forEach(file => {
        if (fileCounts[file] === 0) {
            console.log(`File "${file}" not found.`);
        } else {
            console.log(`File "${file}" found ${fileCounts[file]} time(s).`);
        }
    });
}

// Usage
const directory = process.argv[2];
const fileNames = process.argv.slice(3); // Accept multiple file names
searchFiles(directory, fileNames, false); // Set to true for case-sensitive search

module.exports = { searchFiles };