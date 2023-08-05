module.exports = async function deployLambda(lambda, functionConfig) {
    try {
      console.log('Deploying Lambda function to LocalStack...');
      await lambda.createFunction(functionConfig);
      console.log('Lambda function deployed successfully.');
    } catch (error) {
      console.error('Error deploying Lambda function:', error);
      process.exit(1);
    }
}