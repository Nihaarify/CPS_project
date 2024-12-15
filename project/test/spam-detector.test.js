const assert = require('assert');
const { isSpam } = require('../src/spam-detector');

// Test cases
const tests = [
  {
    input: "Hey, are we still on for lunch today?",
    expected: false,
    description: "Regular message should not be spam"
  },
  {
    input: "WINNER!! As a valued customer you have been selected to receive a £900 prize reward! To claim call now!",
    expected: true,
    description: "Message with multiple spam indicators should be spam"
  },
  {
    input: "Urgent! Your account has been compromised. Reply now to secure it.",
    expected: true,
    description: "Security scam message should be spam"
  }
];

// Run tests
console.log('Running spam detector tests...\n');

tests.forEach(({ input, expected, description }) => {
  try {
    const result = isSpam(input);
    assert.strictEqual(result, expected, description);
    console.log(`✓ ${description}`);
  } catch (error) {
    console.error(`✗ ${description}`);
    console.error(`  Expected: ${expected}`);
    console.error(`  Got: ${!expected}\n`);
  }
});