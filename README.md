# Markdown To HTML Convertor

I know you are excited. You just can't wait to try this out.

It will really tie the room together (promising nothing).

### Dependencies

1. A Computer

1. Some version of Node. I'm using v16.13.2.  We live in exciting times.

1. Some version of npm. Less exciting than above. Version 8.1.2.

1. The will to continue.

### Steps to get this beast working.

1. Clone to your desktop

1. From the root, run npm install.

1. Create an .env file at root level.

1. Include the following (yes I know I'm sharing contents of an .env -- The Internet knows my secret)

    > NODE_ENV=development
    > SERVER_PORT=3000

1. Npm run build (here's hoping you don't have weird ESLint rules enabled globally) it will be running on port 3000, unless you changed the 3000 to something else, in which case it will be that. (Don't do that)

1. Open an instance of Postman (if you don't have Postman -- Why are you reading this?)

1. Do the following setup:
    1. Set the URL to `http://localhost:3000/convert`
    1. Set the Method to `POST`
    1. Under the **Headers** tab, create a header with the following info `Content-Type: text\plain`
    1. Under the **Body** tab, set to **raw** and make the dropdown say **text** (this is important)
    1. Send something through.

### Sample To try

``` # RoboCop is the greatest film ever
## The Big Lebowski is also Great
### This will be a p tag...cuz reasons
#changemymind (this will be a p tage too)

[www.rottentomatoes.com](Look for a movie to watch)

Will be a regular p tag, for sensible reasons.

###### You can Embed links: [www.google.com](Look up how)

[www.AbadLink.com(Will not become a link)

This <strong>RUG</strong> really ties the room together.
```

### The result will be
```
<h1>RoboCop is the greatest film ever</h1>
<h2>The Big Lebowski is also Great</h2>
<p>### This will be a p tag...cuz reasons</p>
<p>#changemymind (this will be a p tage too)</p>
<p><a href="Look for a movie to watch">www.rottentomatoes.com</a></p>
<p>Will be a regular p tag, for sensible reasons.</p>
<h6>You can Embed links: <a href="Look up how">www.google.com</a></h6>
<p>[www.AbadLink.com(Will not become a link)</p>
<p>This &lt;strong&gt;RUG&lt;/strong&gt; really ties the room together.</p>
```

###### Enjoy!