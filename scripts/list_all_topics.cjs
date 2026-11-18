const fs = require('fs');

function extractTopicDetails(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, 'utf8');
  const regex = /id:\s*['"]([a-z0-9-]+)['"],\s*(?:\r?\n\s*)?(?:slug:\s*['"][^'"]+['"],\s*(?:\r?\n\s*)?)?title:\s*['"]([^'"]+)['"],\s*(?:\r?\n\s*)?(?:subtitle:\s*['"][^'"]+['"],\s*(?:\r?\n\s*)?)?subjectId:\s*['"]([^'"]+)['"]/g;
  const list = [];
  let m;
  while ((m = regex.exec(content)) !== null) {
    list.push({ id: m[1], title: m[2], subjectId: m[3], source: filePath });
  }
  return list;
}

const all = [
  ...extractTopicDetails('src/data/topics.ts'),
  ...extractTopicDetails('src/data/topics/class6Topics.ts'),
  ...extractTopicDetails('src/data/topics/class7Topics.ts'),
  ...extractTopicDetails('src/data/topics/class8Topics.ts'),
  ...extractTopicDetails('src/data/topics/class11Topics.ts'),
  ...extractTopicDetails('src/data/topics/class12Topics.ts'),
];

console.log('Extracted topics count:', all.length);
const ids = all.map(t => t.id);
const unique = new Set(ids);
console.log('Unique topic IDs:', unique.size);

const bySubject = {};
for (const t of all) {
  bySubject[t.subjectId] = (bySubject[t.subjectId] || 0) + 1;
}
console.log('Topics by Subject:', bySubject);

// Output sample
fs.writeFileSync('scripts/topic_inventory.json', JSON.stringify(all, null, 2));
console.log('Wrote inventory to scripts/topic_inventory.json');
