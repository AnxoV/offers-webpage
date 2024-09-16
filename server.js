require("dotenv").config();

const express = require("express");

const app = express();
const path = require("path");

const { logger } = require("./middleware/logEvent");
const errorHandler = require("./middleware/errorHandler");

const mongoose = require("mongoose");
const connectDB = require("./config/dbConnection");

const cookieParser = require("cookie-parser");

const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const credentials = require("./middleware/credentials");

const verifyJWT = require("./middleware/verifyJWT");


const PORT = process.env.PORT || 3500;


// DB connection
connectDB();

/**
 * Middleware
 */
// Logger
app.use(logger);
// Handle options credentials check - before CORS
// and fetch cookies credentials requirement
app.use(credentials);
// Cross Origin Resource Sharing
app.use(cors(corsOptions));
// Form data
app.use(express.urlencoded({extended: false}));
// Json data
app.use(express.json());
// Cookies
app.use(cookieParser());
// Static files
app.use(express.static(path.join(__dirname, "public")));
// Routes
app.use("/", require("./routes/root"));
app.use("/register", require("./routes/register"));
app.use("/login", require("./routes/login"));
app.use("/logout", require("./routes/logout"));
app.use("/offers", require("./routes/offers"));

app.use("/request", require("./routes/api/request"));
app.use("/auth", require("./routes/api/auth"));
app.use("/emailauth", require("./routes/api/emailauth"));
app.use("/refresh", require("./routes/api/refresh"));

app.use(verifyJWT);
app.use("/offers", require("./routes/api/offers"));

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