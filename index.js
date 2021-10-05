// index.js

// Required External Modules
const express = require("express");
const path = require("path");

// App Variables
const app = express();
const port = process.env.PORT || "8000";
const programmingRoutes = require('./routes/programming');
const reviewRoutes = require('./routes/reviews');
const musicRoutes = require('./routes/music');
const randomRoutes = require('./routes/random');
const posts = require('./posts/posts')

// App Configuration
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug"); // Tells express to use pug and look in views folder
app.use(express.static(path.join(__dirname, "assets")));

// Routes Definitions
// Other definitions are defined in seperate files found in the routes folder...
app.use('/programming', programmingRoutes)
app.use('/reviews', reviewRoutes)
app.use('/music', musicRoutes)
app.use('/random', randomRoutes)

app.get("/about", (req, res) => {
    res.render("about", { title: "About" });
});

app.get("/", (req, res) => {
    res.render("home", { title: "Home", posts });
});

// Server Activation
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});