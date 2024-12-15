const spamPatterns = require('./patterns');
const { normalizeText } = require('./utils');

function isSpam(text) {
  const normalizedText = normalizeText(text);
  
  // Check for spam indicators
  const spamScore = spamPatterns.reduce((score, pattern) => {
    if (normalizedText.includes(pattern.toLowerCase())) {
      return score + 1;
    }
    return score;
  }, 0);

  // If more than 2 spam patterns are found, classify as spam
  return spamScore >= 2;
}

module.exports = {
  isSpam
};