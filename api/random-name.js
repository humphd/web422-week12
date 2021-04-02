const { uniqueNamesGenerator, colors, animals } = require('unique-names-generator');
const { titleCase } = require('title-case');

// Generate a random name "Red Whale"
module.exports = function() {
  const randomName = uniqueNamesGenerator({ dictionaries: [colors, animals] });
  // "red_panda" -> "Red Panda"
  return titleCase(randomName.replace(/_/g, ' '));
};
