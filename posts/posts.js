const md = require('markdown-it')();
const fs = require('fs')
const path = require('path')
/* 
  This file is a bridge between the raw markdown files and express.js serving the converted html
  The workflow to create a new post is twofold:
  1. Write a markdown file and slap it into this posts folder
  2. Add an entry to the "posts" object below
*/

// List of all posts residing in this folder. 
const howThisWebsiteWasBuilt = fs.readFileSync(path.resolve(__dirname, 'how-this-website-was-built.md'), 'utf8')
const expWithTheCodingBootCamp = fs.readFileSync(path.resolve(__dirname, 'exp-with-the-coding-boot-camp.md'), 'utf8')
const wheelOfTime = fs.readFileSync(path.resolve(__dirname, 'wheel-of-time.md'), 'utf8')
const gettingThingsDone = fs.readFileSync(path.resolve(__dirname, 'getting-things-done.md'), 'utf8')
const october2021Songs = fs.readFileSync(path.resolve(__dirname, 'october-2021-songs.md'), 'utf8')
const texasam = fs.readFileSync(path.resolve(__dirname, 'my-experience-with-texas-am.md'), 'utf8')

// TODO: Could build a "summarizer mixin so we don't have to keep track of summaries.."
const posts = {
  'october-2021-songs': {
    'title': 'October 2021 Recommended Music',
    'date': '10/1/2021',
    'img_link': '/images/october.jpeg',
    'summary': "<ul><li><strong>Chill Vibes</strong>: \"Lonely Shade of Blue\" by Nick Leng</li> <li><strong>Pop/Hip-Hop</strong>: \"The Other Side\" by SZA and Justin Timberlake</li> <li><strong>Classic Rock</strong>: \"Mother\" by Danzig</li> <li><strong>Classic Hits</strong>: \"Bad\" by Michael Jackson</li> <li><strong>Spooky Rock Album</strong>: <i>...Like Clockwork</i> by Queens of the Stone Age</li></ul>",
    'markdown': md.render(october2021Songs),
    'category': 'Music'
  },
  'how-this-website-was-built': {
    'title': 'How this Website was Built',
    'date': '9/26/2021',
    'img_link': '/images/tools.jpg',
    'summary': '<p>I started this portfolio/blog with full intentions to use only html, css, and JavaScript.  "Keep things simple", I told myself.  No JavaScript or css frameworks allowed!  I figured rebuilding my portfolio from scratch would be a good opportunity to dust off the ol\' fundamentals...</p>',
    'markdown': md.render(howThisWebsiteWasBuilt),
    'category': 'Programming'
  },
  'wheel-of-time': {
    'title': 'Book Series Review: "The Wheel of Time"',
    'date': '9/24/2021',
    'img_link': '/images/wheeloftime.jpg',
    'summary': "<p><strong>Rating</strong>: 8/10</p>  <p>The Wheel of Time is a juggernaut in the fantasy-fiction genre.  The epic story spans 14 books and two authors. (Robert Jordan passed before the release of book 12)  I thoroughly enjoyed reading this series, and can't wait to share my thoughts on it...</p>",
    'markdown': md.render(wheelOfTime),
    'category': 'Reviews'
  },
  'getting-things-done': {
    'title': 'Book Review: "Getting Things Done"',
    'date': '9/24/2021',
    'img_link': '/images/gtd.jpg',
    'summary': "<p></p>",
    'markdown': md.render(gettingThingsDone),
    'category': 'Reviews'
  },
  'my-experience-with-texas-am': {
    'title': 'My Experience With Texas A&M',
    'date': '9/24/2021',
    'img_link': '/images/tamu.jpg',
    'summary': "<p>Have you ever wondered what it would be like to attend Texas A&M University?  In this article, I'll go over the pros the cons of attending of the largest university in Texas. I'll also talk generally about attending college in the US, and if it's still worth the investment. </p>",
    'markdown': md.render(texasam),
    'category': 'Random'
  },
  'exp-with-the-coding-boot-camp': {
    'title': 'Paul’s Experience with a Coding Boot Camp',
    'date': '12/21/2017',
    'img_link': '/images/codingbootcamp.jpg',
    'summary': "Three months ago I quit my day job and enrolled full-time at The Coding Boot Camp at UT Austin. Yesterday, I graduated and received my certificate of completion and I wanted to share the great experience I had...",
    'markdown': md.render(expWithTheCodingBootCamp),
    'category': 'Programming'
  },
};

module.exports = posts