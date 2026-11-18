const fs = require('fs');

function countTopicsInFile(filePath) {
  if (!fs.existsSync(filePath)) return 0;
  const content = fs.readFileSync(filePath, 'utf8');
  // Match `id: 'xxx',` where it's a topic id
  const matches = content.match(/id:\s*['"]([a-z0-9-]+)['"],\s*(?:\r?\n\s*)?(?:slug|title):/g) || [];
  return matches.length;
}

const baseCount = countTopicsInFile('src/data/topics.ts');
const c6 = countTopicsInFile('src/data/topics/class6Topics.ts');
const c7 = countTopicsInFile('src/data/topics/class7Topics.ts');
const c8 = countTopicsInFile('src/data/topics/class8Topics.ts');
const c11 = countTopicsInFile('src/data/topics/class11Topics.ts');
const c12 = countTopicsInFile('src/data/topics/class12Topics.ts');

console.log('--- CURRICULUM TOPIC BREAKDOWN ---');
console.log('BASE_TOPICS (Class 9/10):', baseCount);
console.log('Class 6 Topics:', c6);
console.log('Class 7 Topics:', c7);
console.log('Class 8 Topics:', c8);
console.log('Class 11 Topics:', c11);
console.log('Class 12 Topics:', c12);
console.log('TOTAL CANONICAL TOPICS:', baseCount + c6 + c7 + c8 + c11 + c12);
