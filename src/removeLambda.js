module.exports = async function(lambda, functionConfig) {
    try {
      console.log('Removing Lambda function from LocalStack...');
      await lambda.deleteFunction({ FunctionName: functionConfig.FunctionName }).promise();
      console.log('Lambda function removed successfully.');
    } catch (error) {
      console.error('Error removing Lambda function:', error);
      process.exit(1);
    }
}