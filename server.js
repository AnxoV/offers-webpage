const express = require("express");
const app = express();
const path = require("path");
const { logger } = require("./middleware/logger");

const PORT = process.env.PORT || 3500;


/**
 * Middleware
 */
// Logger
app.use(logger);
// Static files
app.use("/", express.static(path.join(__dirname, "public")));
// Routes
app.use("/", require("./routes/root"));

// Page not found
app.all("*", function(request, response) {
    response.status(404);
    if (request.accepts("html")) {
        response.sendFile(path.join(__dirname, "views", "404.html"));
    } else if (request.accepts("json")) {
        response.json({
            "error": "404 Not Found"
        });
    } else {
        response.type("txt");
        response.send("404 Not Found");
    }
});


app.listen(PORT, function() {
    console.log(`Server running on port ${PORT}`);
});