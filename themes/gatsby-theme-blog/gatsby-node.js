const fs = require('fs');

// Assert that content directories exist.
// Second argument: options.
module.exports.onPreBootstrap = (
  { reporter },
  { assetPath = 'content/assets/posts', contentPath = 'content/posts' }
) => {
  const dirs = [assetPath, contentPath];
  dirs.forEach(dir => {
    if (fs.existsSync(dir)) return;
    reporter.info(`creating the ${dir} directory`);
    fs.mkdirSync(dir, { recursive: true });
  });
};
