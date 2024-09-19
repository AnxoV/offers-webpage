const log = function(symbol, file, func, message) {
    console.log(`[${symbol}] ${file}.${func.name}: ${message}`);
}

module.exports = {log}