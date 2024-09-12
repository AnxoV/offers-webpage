require("dotenv").config();

const express = require("express");

const app = express();
const path = require("path");

const { logger } = require("./middleware/logEvent");
const errorHandler = require("./middleware/errorHandler");

const mongoose = require("mongoose");
const connectDB = require("./config/dbConnection");

const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 3500;


// DB connection
connectDB();

/**
 * Middleware
 */
// Logger
app.use(logger);
// Form data
app.use(express.urlencoded({extended: false}));
// Json data
app.use(express.json());
// Cookies
app.use(cookieParser());
// Static files
app.use("/", express.static(path.join(__dirname, "public")));
// Routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/auth", require("./routes/auth"));
app.use("/logout", require("./routes/logout"));
// Api
app.use("/users", require("./routes/api/users"));


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


app.use(errorHandler);

mongoose.connection.once("open", function() {
    console.log("Connectted to MongoDB");
    app.listen(PORT, function() {
        console.log(`Server running on port ${PORT}`);
    });
});