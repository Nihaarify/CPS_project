const { isSpam } = require('./src/spam-detector');

// Example messages to classify
const messages = [
  "Hey, are we still on for lunch today?",
  "WINNER!! As a valued customer you have been selected to receive a £900 prize reward! To claim call now!",
  "Urgent! Your account has been compromised. Reply now to secure it.",
  "I'll bring the documents to the meeting tomorrow.",
  "Congratulations! You've won a free iPhone! Click here to claim your prize now!"
];

console.log('Spam Detection Results:\n');

messages.forEach(message => {
  const result = isSpam(message);
  console.log(`Text: "${message}"`);
  console.log(`Classification: ${result ? 'SPAM' : 'NOT SPAM'}\n`);
});