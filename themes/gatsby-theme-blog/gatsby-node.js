const fs = require('fs');

// Assert that required content directories exist.
module.exports.onPreBootstrap = ({ reporter }) => {
  const dirs = ['content/posts', 'content/assets/posts'];
  dirs.forEach(dir => {
    if (fs.existsSync(dir)) return;
    reporter.info(`creating the ${dir} directory`);
    fs.mkdirSync(dir, { recursive: true });
  });
};
