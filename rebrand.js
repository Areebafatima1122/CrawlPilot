const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Perform replacements
    content = content.replace(/IndexJump/g, 'Crawl Pilot');
    content = content.replace(/INDEXJUMP/g, 'CRAWL PILOT');
    content = content.replace(/indexjump\.com/g, 'crawlpilot.io');
    content = content.replace(/indexjump/g, 'crawlpilot');

    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
                walkDir(filePath);
            }
        } else if (/\.(js|jsx|ts|tsx|css|json|md)$/.test(file)) {
            replaceInFile(filePath);
        }
    });
}

const targetDir = process.argv[2] || './src';
console.log(`Starting replacement in: ${targetDir}`);
walkDir(targetDir);
console.log('Done!');
