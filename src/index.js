"use strict";

const isLocalstackRunning = require('./isLocalstackRunning');
const archiveGlueLambda = require('./archiveGlueLambda');
const run = require('./run');
const getArgs = require('./getArgs');

isLocalstackRunning().then(isRunning => {
    if (!isRunning) {
        console.error('LocalStack is not running. Stopping...');
        process.exit(1);
    }
    const args = getArgs();
    archiveGlueLambda();
    run(args.localstackPort).catch(error => { 
        console.error(error); 
    });
});
