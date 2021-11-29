# NPM Package Search Tool

Let's get all your NPM Packages :fire:

Live Demo: https://METSearch.edwingrier.com

## Assumptions

1. Does it work?
2. Does the implementation handle loading and error states?
3. Styling should be consistent and make use of best practices.
4. Proper-use of life-cycle events and handlers.
5. Clean, well-commented code.

## Solution formulation

Steps I thought of and executed for solving the get MET Search tool:

1. App contains two child components: search.js and results.js
2. I created a services file in my Utils folder that contains the GET fetch api call syntax and imported it into my app wherever I needed it.
3. I added the tag Chips and made them open a new search with the tag that was clicked.
4. Added the images as url's in src tags of <img> tags
5. Loader is also Progress spinner from Material-UI.

## Libraries/Tools used

* Material-UI and material-ui/icons was used for components.
* Written in js with some ES6+ syntax.
* Used realfavicongenerator.com for favicon.

## How to setup

Run the following commands to setup, given `git` and `npm` is available:

1. git clone project
2. npm install project
3. npm start

## Decisions and tradeoffs

1. I really wanted to write full tests for this project, but time did not permit. I will be adding them in the future.
2. There are places to improve. I Invite any feedback. As software engineers we strive to improve and learn every day.
3. My responsive design and media queries need work.
4. Adding snackbar component for user feedback is a UX must, rather than use the ugly Alert method.

## If it was a bigger project

This is an open-source side project and scope is quite small. If it was a bigger project, doing the following would be better:

1. More focus on architecture and software design would be necesssary. Better project folder and component structure.
2. Choosing typescript would be better (especially with multiple developers on team).
3. Using Redux state management.
4. If I had more time I would add better error handling and responsive design with media queries.
5. I really wanted to add a dark mode theme using the makeStyles theme hook but I totally ran out of time, will impliment in the future probably.
6. For a team project, it will be good to have the project dockerized.
7. 7. Add ability to upload personal collections for users to peruse and share.

Fun project!!
