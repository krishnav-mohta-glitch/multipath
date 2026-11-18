const fs = require('fs');

// Simple regex to parse topics from src/data/topics.ts
const content = fs.readFileSync('src/data/topics.ts', 'utf8');

// Match `id: 'xxx',` where it defines a top-level topic
// In Topic definition:
// export const TOPICS: Topic[] = [
//   {
//     id: '...',
//     title: '...',
//     subjectId: '...',
const topicBlocks = content.split(/\{\s*id:\s*'/).slice(1);
const topics = [];

for (const block of topicBlocks) {
  const idMatch = block.match(/^([^']+)'/);
  const titleMatch = block.match(/title:\s*'([^']+)'/);
  const subjectMatch = block.match(/subjectId:\s*'([^']+)'/);
  const difficultyMatch = block.match(/difficulty:\s*'([^']+)'/);
  if (idMatch && titleMatch && subjectMatch) {
    topics.push({
      id: idMatch[1],
      title: titleMatch[1],
      subjectId: subjectMatch[1],
      difficulty: difficultyMatch ? difficultyMatch[1] : 'intermediate'
    });
  }
}

console.log('--- CURRICULUM TOPICS AUDIT ---');
console.log('Total Canonical Topics in TOPICS array:', topics.length);

const subjectCounts = {};
for (const t of topics) {
  subjectCounts[t.subjectId] = (subjectCounts[t.subjectId] || 0) + 1;
}
console.log('By Subject:', subjectCounts);

// Also check curriculumMappings.ts
const mappingContent = fs.readFileSync('src/data/curriculumMappings.ts', 'utf8');
const mappedTopicMatches = mappingContent.match(/topicId:\s*'([^']+)'/g) || [];
const uniqueMappedTopics = [...new Set(mappedTopicMatches.map(m => m.replace(/topicId:\s*'/, '').replace("'", '')))];
console.log('Unique topic IDs mapped to CBSE/ICSE curriculum:', uniqueMappedTopics.length);
console.log('Total curriculum mappings:', mappedTopicMatches.length);
