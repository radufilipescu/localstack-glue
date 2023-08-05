const fs = require('fs');

module.exports = function(filePath) {
    if (fs.existsSync(filePath)) {
        return require(filePath);
    }
    return {};
}