const path = require('path');
const dbDumpFile = path.resolve(__dirname, './db/dump.json');

module.exports = {
    dbDumpFile: dbDumpFile,
    assetsPath: path.resolve(__dirname, './src/assets'),
}