## Mock Ups

Sign In Page
<p align="center">
  <img src="./docs/images/signin_desktop_mock.png" alt="Sign In Desktop" height="400px">
  <img src="./docs/images/signin_mobile_mock.png" alt="Sign In Mobile" height="400px">
</p>

Books
<p align="center">
  <img src="./docs/images/books_desktop_mock.png" alt="Books Desktop" height="400px">
  <img src="./docs/images/books_mobile_mock.png" alt="Books Mobile" height="400px">
</p>

Sheet
<p align="center">
  <img src="./docs/images/sheet_desktop_mock.png" alt="Sheet Desktop" height="400px">
  <img src="./docs/images/sheet_mobile_mock.png" alt="Sheet Mobile" height="400px">
</p>

## Design consideration: Whether to use React framework Next.js

Benefits of using Next.js:
- Better performance, eg bundling, code splitting for faster page loads
  - Our attendance application handles a lot of data, and could benefit from the performance benefits of using Next.js.
- Search engine optimization
  - There's not a lot of content in our application, and growing the usage of our application is not really the main goal of our project.
- Server-side rendering, pre-rendering of pages
  - Can have performance benefits, but learning curve and short timeline for project likely doesn't justify the performance benefits
- Page based routing system
  - reported issues with dynamic routing, backend seems to want dynamic routing
- Built in CSS and Sass support

The benefits of using the Next.js framework doesn't outweigh the costs of using it, so I decided not to use it.

## Design consideration: Whether to use TypeScript with React for type checking

Benefits of using TypeScript:
- Can define prop types, reducing potential for bugs
- Better code completion with jsx and better intellisense, auto import
- More readable and confidence in code

Costs:
- Learning curve
- third party libraries might not support typescript
- Slightly longer compilation time
- Need to write more code

The benefits of using Typescript with React is also not significant enough, so I decided not to use it.

## URL Path Design

- Avoid adding data that are internal to the component and shouldn't be accessed from outside
- Places where users should start from the beginning

I think that attendance sheets should be able to be accessed from outside.

**(NOT SELECTED) Option 1:** `www.attendex.com/cs1010-tutorial/1-10-22` where `cs1010-tutorial` is the name of the attendance book, `1-10-22` is the date accessed. But when accessing such a page, we must make sure that the authentication token saved in the browser is valid, then we get the userid from the token and try and automatically load the specified attendance book and date. (Evaluation: It might be inefficient to be checking authentication first, then checking whether the specified attendance book and date exists)

**(SELECTED) Option 2:** `www.attendex.com/lily/cs1010-tutorial/1-10-22` where `lily` is the userid, `cs1010-tutorial` is the name of the attendance book, `1-10-22` is the date accessed. But when accessing such a page, we must make sure that the authentication token saved in the browser matches the userid before allowing access to the page. (Evaluation: Users usually know their userid, so it makes sense for them to be accessing this page from outside.)

Note for backend: auth token needs to contain userid

**(NOT SELECTED) Option 3:** `www.attendex.com/attendance-sheets` a generic, static path, where the data about which attendance book and date will be passed through other means. The problem with this approach is, when users try and access the attendance sheet from outside the website, there will probably be an error, since the data about which attendance sheet and which date isn't passed properly.
