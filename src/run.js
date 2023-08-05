const fs = require('fs');
const path = require('path');

const { Lambda, Config } = require("@aws-sdk/client-lambda");
const deployLambda = require('./deployLambda');
const removeLambda = require('./removeLambda');

const watch = require('./watch');

module.exports = async function(localstackPort) {
    //watch();

    const functionConfig = {
        FunctionName: 'glueLambda',
        Handler: 'glueLambda.handler',
        Role: 'arn:aws:iam::000000000000:role/irrelevant', // Role ARN (irrelevant for LocalStack)
        Runtime: 'nodejs18.x',
        Code: {
            ZipFile: fs.readFileSync(path.join(`${__dirname}/../`, 'glueLambda.zip')),
        },
    };

    const lambda = new Lambda({
        accessKeyId: 'localstack-key-id', 
        secretAccessKey: 'localstack-secret-key', 
        region: 'us-east-1',
        endpoint: `http://localhost:${localstackPort}`,
    });

    await deployLambda(lambda, functionConfig);
    
    // Keep the script running until the user presses CTRL-C
    // process.stdin.resume();
    process.on('SIGINT', async () => {
        await removeLambda(lambda, functionConfig);
        process.exit();
    });
}