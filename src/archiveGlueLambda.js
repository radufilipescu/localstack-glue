const fs = require('fs');
const archiver = require('archiver');

module.exports = function() {
    const zipWriteStream = fs.createWriteStream('glueLambda.zip');
    const archive = archiver('zip');
    archive.on('error', function(err) {
        console.error('Error creating glueLambda archive');
        throw err;
    });
    archive.pipe(zipWriteStream);
    archive.file('glueLambda.js', { name: 'glueLambda.js' });
    archive.finalize();
}