# Checklist for Northcoders News Front End

## README - write your own and make sure that it:

- [ ] has a link to the deployed version
- [ ] provides general info about your app
- [ ] includes links to your back end repo
- [ ] specifies the minimum version of Node required to run locally (check your Node version, `node --version` and use the major version that you are on)
- [ ] has clear instructions on how to run your project locally (`git clone <repo-url>, cd ...`)

## UX

- [✅] Basic styling added
- [✅] Responsive design
- [✅] Items aligned
- [✅] Content legible (not too wide, obstructed, etc)
- [✅] Refreshing doesn’t cause an issue on sub-pages
- [ ] No errors in the console
- [ ] Votes / Posts / Deletions happen instantly _OR_ give user indication of loading

## Functionality

### Login

- [✅] Some indication of who is logged in (this can be hardcoded)

### Articles

- [✅] Serves all articles / top articles
- [✅] Can vote on articles
- [ ] Can vote a maximum of once in either direction per page load
- [✅] Votes are persistent when page is refreshed
- [✅] Topic pages load only relevant articles (especially when navigating from one topic page to another)
- [✅] Can sort articles by date created / comment_count / votes

### Individual Article / Comments

- [✅] Individual articles are served with comments
- [ ] Can vote on comments
- [ ] Can vote a maximum of once in either direction per page load
- [ ] Votes are persistent when page is refreshed
- [✅] Can post new comments, which are persistent

### Additional functionality:

- [ ] Can only delete comments of logged in user
- [ ] Deleted comments don’t re-appear on re-render/refresh
- [ ] sort comments by date created / votes
- [ ] navigate over pages of articles (if implemented in back-end)
- [ ] navigate over pages of comments (if implemented in back-end)
- [ ] filter / display articles by specific user
- [ ] post new article
- [ ] delete logged in user's articles

## Error Handling

- [✅] Bad url
- [✅] Bad topic slug in url
- [✅] Bad article id in url
- [✅] Post comment: (No text in comment body / Can you post without logging in?)

## Code

- [✅] Well named components
- [✅] Components reused where possible (`Articles` / `Voter`...)
- [ ] Minimal state - don't hold derivable data in state

---

**_You could see if you can bring the setArticles state down into the articles component and try using a react context for the logged in user. This would tidy up your App.js a bit and the lower state is kept the better :)_**

---

- [✅] Set state correctly, using previous state where possible
- [ ] Handle asynchronicity clearly (i.e. isLoading pattern)

---

**_Try integrating some isLoading state and rendering something that shows the page is loading for those with slow internet_**

---

- [✅] Functions are DRY (`handleChange` for controlled components / api calls)
- [✅] Use object destructuring where possible
- [ ] Tidy? If not: ESLint / Prettier
- [✅] `node_modules` git ignored
- [ ] No `console.log`s / comments
- [✅] remove unnecessary files (e.g. App.test.js)

## MAKE SURE ALL TESTS ARE STILL PASSING IN BACK END

## Once everything else is complete, here are some extra challenges:

- [ ] Use `aXe` extension to check for a11y issues
- [ ] Make sure any pure functions are extracted and tested with `Jest`
- [ ] Use Context API for sharing logged in user amongst components
- [ ] Create a user page where you can change their profile information if they are "logged in as the right user". This will require having an additional PATCH endpoint on your backend
- [ ] Create a view for all the articles a user has liked. This will require additional functionality on your backend
- [ ] Make use of [web sockets](https://en.wikipedia.org/wiki/WebSocket) to allow your page to automatically update with a little notification if there have been any recent posts. [socket.io](https://socket.io/) is quite a good one to use and has some good getting started guides. This will require additional functionality on your backend for recent articles e.g. last 10 minutes

---

**_This is a really nice piece of work Joel!_**
</br>
A few tips:
</br>

- Have a think about how you can limit votes to +/-1 unless you want users to be able to vote more than once.
- You could have some kind of Voter component that can be reused for articles and comments, if it's implemented in your backend you could do the same for a Sorter :)
  </br>

**_Keep at it, this will look really good as a portfolio piece!_**

---
