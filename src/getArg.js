module.exports = function (parameterName) {
    const index = process.argv.indexOf(`--${parameterName}`);
    return (index === -1) ? null : process.argv[index + 1];
}