const { format } = require("date-fns");
const { v4: uuid } = require("uuid");

const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");

const logEvent = async function(message, name) {
    const dateTime = format(new Date(), "yyyy-MM-dd\tHH:mm:ss");
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
    
    try {
        logDirectoryExists = fs.existsSync(path.join(__dirname, "..", "logs"));
        if(!logDirectoryExists) {
            await fsPromises.mkdir(path.join(__dirname, "..", "logs"));
        }

        await fsPromises.appendFile(
            path.join(__dirname, "..", "logs", name),
            logItem
        );
    } catch(error) {
        console.error(error);
    }
}

const logger = function(request, response, next) {
    logEvent(`${request.method}\t${request.headers.origin}\t${request.url}`, "requests.txt");
    next();
}

module.exports = { logEvent, logger }