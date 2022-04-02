const fs = require('fs'),
      path = './gulp-config/tasks',
      arrayPathFiles =fs.readdirSync(path).map(cell => cell = path + '/' + cell);
// console.log(arrayPathFiles);
module.exports = arrayPathFiles;  