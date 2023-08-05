const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

module.exports = function() {
    const dirName = 'localstack-glue';

    const hostMountedPath = `/mnt/d/dev/${dirName}`;
    const containerMountedPath = `/${dirName}`;
    const awsServices = ['sns', 'sqs', 's3', 'dynamodb', 'kinesis'];

    console.log(`Make sure you have the following directories in /mnt/d/dev/localstack-glue: ${awsServices.join(', ')}`);
    console.log(`Make sure Localstack started with the following: LAMBDA_DOCKER_FLAGS='-v ${hostMountedPath}:${containerMountedPath}' localstack start -d`);

    const watchDirectories = awsServices.map(subDir => 
        path.join(containerMountedPath, subDir));

    watchDirectories.forEach(dir => {
        fs.watch(dir, (eventType, filename) => {
            if (filename && eventType === 'change') {
                const filePath = path.join(dir, filename);
                console.log(`Invoking Lambda function with ${filePath}...`);
                try {
                    execSync(`sam local invoke ${lambdaName} --event ${filePath}`);
                } catch (error) {
                    console.error('Error invoking Lambda function:', error);
                }
            }
        });
    });
}