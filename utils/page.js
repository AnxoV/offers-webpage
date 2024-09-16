const path = require("path");

const load = function(...paths) {
    return function(request, response) {
        console.log(`[*] page.load: loading page /${paths.join("/")}`);
        response.sendFile(path.join(__dirname, "..", "views", ...paths));
    }
}

module.exports = {load};