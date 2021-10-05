// This is where we serve the music page
// as well as any articales related to music
const express = require("express");
const app = express()
const posts = require('../posts/posts')

// for loop reading every individual blog post and setting up a route for each
for (const key in posts) {
    if (posts[key].category == "Music") {
        // The object key is the post title with dashes inbetween words: title-name
        app.get("/" + key, (req, res) => {
            res.render("article", {
                title: posts[key].title,
                date: posts[key].date,
                markdown: posts[key].markdown,
                img_link: posts[key].img_link,
                category: posts[key].category
            });
        });
    }
}

// Keep this last..
app.get("/", (req, res) => {
    res.render("music", { title: "Music", posts });
});

module.exports = app