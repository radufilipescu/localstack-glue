const path = require('path');
const getArg = require('./getArg');
const loadSettings = require('./loadSettings');

module.exports = function() {
    const settings = loadSettings(path.join(__dirname, 'settings.json'));

    let eventsDir = getArg('events-dir') ?? settings.eventsDir;
    let localstackPort = getArg('localstack-port') ?? settings.localstackPort ?? 4566;

    if (!eventsDir || !localstackPort) {
        console.error('Missing required parameters. Please provide them via command-line arguments or in a JSON file.');
        process.exit(1);
    }

    return {
        eventsDir,
        localstackPort,
    };
}