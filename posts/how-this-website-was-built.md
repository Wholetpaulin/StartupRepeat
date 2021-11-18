# For the interested web developer:

I started this portfolio/blog with full intentions to use only HTML, CSS, and JavaScript.  "Keep things simple", I told myself.  No JavaScript or CSS frameworks allowed!  I figured rebuilding my portfolio from scratch would be a good opportunity to dust off the ol' fundamentals.

About halfway through building the site, I had a dozen npm packages installed and my simple static site had become a web application. So this article will be covering the simplist portfolio/blog I could bear to build.

# What are we building exactly?

Before we get into the nitty gritty, let's talk about the goal here.  First and foremost, I needed an updated portfolio site that would show potential employers that *I mean business*.  Second, I wanted a place to organize my minutiae ideas for the world to see.  So I figured I would make a blog-portfolio hybrid.  The following are the blog-portfolio's "technical requirements", if you will:
- Keep things as simple and organized as possible. (Use as few technologies as possible.)
- Have a homepage, 4 seperate blog sections, and an about page. (At least 6 pages total)
- Somehow convert markdown files into blog posts and blog pages.

You may have noticed I slipped a not-so-simple requirement onto the end of the technical requirements.  While building the site's layout, I found I was copy and pasting the site's header and footer multiple times for each static page. Doing it six times, one for each page, was dirty.  Copy-pasting **even more** for each blog post was downright *filthy*.  This is what drove the need for that third requirement and the need to use more than vanilla HTML and CSS.

# If you build it...
I started where any self-respecting webmaster would.. **DESIGN!**
Personally, I prefer figma for design mock-ups.  I browsed other portfolios and [blogs](https://www.oakharborwebdesigns.com/blog/articles/how-to-design-a-website.html#blog-post) until I found a color scheme and layout combination I liked. Then I threw together a rough draft on figma based on what I saw. 

![first draft of design](/images/firstdraft.png)

Once I had a mock-up and some ideas on paper, I jumped right into building the top of the site's layout. I used [flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox) for the navigation bar.  For the hamburger menu and to ensure the nav bar was responsive, I followed [this tutorial](https://www.youtube.com/watch?v=gXkqy0b4M5g). The footer was styled much like the header, a flexbox with five or so unordered lists of links. 

I didn't want to spend too much time on the main content area just yet since I knew the main content would mostly depend on which page the user was loading. So I setup a CSS grid with two columns and some placeholder squares around where I wanted my main content to go.  Then I moved onto the problem of page-switching.

# To serve, or not to serve, that is the question

It was after I created the header and footer that I started seriously thinking I might want something more than just a static site.  To recap, there are several ways to skin a cat (or build a blog):

1. **We could use a Content-Management-System** (CMS for short) like Wordpress, Wix, or Squarespace 
    - CMS have the advantage of being very easy to use and set up. They are so easy to use you don't even need to be a developer to build a site!
    - The downsides to CMS solutions are speed and customizability.  It's incredibly hard to do something novel or change your styling to look different than what your theme offered. To get **exactly** what I want, it's oftentimes less work to build a whole new vanilla site from scratch than to contantly fidget with plugins and themes. That's not even mentioning that using the wrong plugin could make your site insecure or vulnerable to attacks.
2. **We could build a vanilla site.**
    - By vanilla site, I'm refering hosting simple HTML, CSS, and JavaScript files on a server. When users visit the site, the server simply retrieves and displays the appropiate HTML file. This solution is simple, secure, will offer decent SEO rankings, and is the cheapest option if you use a free server service like firebase or github-pages. 
    - The disadvantage to a vanilla site is it doesn't scale.  (This is the problem we are having now)  Put another way, if I had a blog with 50 seperate pages and I wanted to update a link in the header I would need make the change the link in every HTML file that contains that header. As the site grows, not only does our development slow down but the loading speed of the site slows down linearly with the amount of content added. (See option 4 for a solution to this)
3. **We could use a static site generator** such as Jekyll, Hugo, Gatsby, or Eleventy.  Static site generators use predefined templates to stitch raw data together into a full static HTML website, kind of like a mad-lib.  So instead of writing 50 unique html files for our 50 different blog posts we could create a single template and let the static site generator fill in our blog post template from a database.
    - The HTML files are stictched together before ever serving to users, so it's faster than using a CMS.  Static site generators also offer developers more cusomizability than a CMS since they define the template and are not limited by the CMS database fields.
    - With great cusomizability comes great responsibility.  Writing custom templates from scratch requires more time and know-how than using a CMS. 
4. **We could build a custom solution** using modern front-end frameworks, tools, and a custom webserver.  This would basically allow us to choose exactly how much we want to trade-off customizability for convience.  We could go as simple as webserver serving a barebones HTML file to building a full blown web application complete with a modern tools, a front-end framework, and a database.
    - Building something custom ourselves would offer us the best "ban" since we're not paying for any services besides domain/hosting.  We also get to learn a **LOT** by building something from scratch.
    - Building a custom solution requires the most work, time, and experience of the four options listed. We (the developers) would be responsible for ensuring our custom server stays secure, online, and up-to-date.   

Since I'm building this site to showcase my skills, I decided on the fourth, custom option.  If I were short on time/patience however, I would just use a static site generator like Jekyll and host my site for [free on github pages](https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll#about-jekyll). 

# The "Nitty Gritty"

Even though we decided to make things hard for ourselves, we're still trying to keep things as *simple* as possible.  This *simple* tech stack is as follows:
- A templating engine that will allow us to break our HTML code into smaller, modular pieces that we can reuse across multiple HTML files. (Example options include EJS, Handlebars.js, Pug.js)
- An express.js webserver to compile our templates into html and serve our content.
- A package to convert markdown files into raw html. (Options include markdown-it or showdown)

I decided to use a combination of pug, express, and markdown-it to build my site.  Since we already have our header and footer written and styled, we just need to convert it into pug.  I followed [this tutorial](https://auth0.com/blog/create-a-simple-and-stylish-node-express-app/) to setup express and pug.  Our final goal is twofold; convert an .md file to a string of raw html -> inject raw html into pug template

Once I had a basic setup from the tutorial working, I added some logic to the express routes to read our dynamic content (the raw html string for each page/post) from a seperate js object file which I called posts.js.  

![express routes file](/images/routes.png)

This GIANT js object file contains the conversion logic that reads markdown files and converts them into a string of raw html.

![first draft of design](/images/posts.png)

This raw html string gets injected into the pug template, unescaped.  

![first draft of design](/images/unescaped.png)

Any seasoned developer should be sweating right now.  Injecting unescaped code into a webpage can be risky, but since this content is never user-defined and we have posts.js protected on our server we should be fine. 

So to recap, the following is a flow chart of our simple setup.
![flowchart of site setup](/images/flow.png)

To host the node server, I decided to use AWS lightsail. I chose lightsail over digital ocean or another VPS simply because it was cheaper at the time and I'm not expecting heavy traffic. ($3.50/month vs $5/month)  My AWS knowledge was rusty, so I just followed [this tutorial](https://www.youtube.com/watch?v=rtshCulV2hk) to host the server and hook up the DNS.

# Wrapping things up

In the end, our setup doesn't have use a database or any fancy front-end frameworks.  I'll admit, it's ~~a little~~ dirty to read everything from a giant JavaScript file. And it will be a pain to manually update that giant file each time we write a new blog post in markdown, but those are improvements for another day.  If you want to learn more or peek around the site, [all of the code](https://github.com/Wholetpaulin/StartupRepeat) is public on github.  Feel free to reach me on the socials with any questions/comments. 
