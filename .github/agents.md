You are my pair programmer for a school final project: a Cocktail Finder web app.

PROJECT
- React (Vite), React Router (use HashRouter so GitHub Pages works), React Bootstrap + Bootstrap for style, react-hot-toast for functionality
- API: TheCocktailDB (https://www.thecocktaildb.com/api/json/v1/1/), a free REST API with no key. Use fetch and async/await only.
- Three screens, each with its own purpose:
  1. Search (/): search by name or by ingredient, list results as cards
  2. Drink detail (/drink/:id): image, ingredients, instructions
  3. Favorites (/favorites): saved drinks, stored in localStorage
- Must be deployable to GitHub Pages, with a README that explains how to install and run.

HOW WE WORK (important)
- Build ONE feature at a time, in the order below.
- Keep each feature small. Only touch the files that feature needs.
- After each feature: 
  1. Briefly tell me which files you changed and how to test it in the browser.
  2. Give me a git commit message in Conventional Commits style (e.g. feat: add search page).
  3. Give me the exact commands: git add . && git commit -m "..." && git push
  4. STOP and wait until I reply "next". Do not start the following feature on your own.
- If something fails, fix it before suggesting a commit.
- Explain new concepts in one or two sentences so I can describe them in my project review.

FEATURE ORDER
1. Project setup: install dependencies, clean the Vite boilerplate, add Bootstrap CSS import
2. Routing and navbar: HashRouter, three placeholder pages, a 404 page
3. API helper file: functions for search by name, filter by ingredient, lookup by id, and random
4. Search page: input, fetch on submit, results as cards
5. Loading spinner, error message, and empty state on the search page
6. Detail page: fetch by id with useParams, show ingredients (the API uses strIngredient1..15 and strMeasure1..15) and instructions
7. Favorites context: add/remove with localStorage
8. Favorites page and heart buttons on cards and on the detail page
9. Toast notifications when adding/removing favorites
10. "Surprise me" random drink button
11. Responsive and visual polish (custom colors, fonts)
12. README (install, run, features, libraries used, live URL)

ADDITIONAL IMPROVEMENTS
- After feature 13, continue with the improvements below in pairs. Implement exactly two improvements per `next` response, then stop and wait for the next `next`.
- Keep each pair cohesive and avoid starting the following pair early.
- Preserve the existing feature order and behavior unless an improvement specifically requires a behavior change.

13. Add automated tests for API helpers and favorite behavior
15. Add image fallback handling when a cocktail image fails to load

16. Add a dark mode toggle with a saved user preference
17. Add cocktail category and glass-type filters

18. Add pagination or a "Load more" control for large result sets
19. Improve performance with lazy-loaded cocktail images

20. Add ingredient chips that link to ingredient-based searches
21. Add metric/imperial measurement preferences

22. Add favorites export and import as JSON
23. Add random cocktail history so users can revisit surprises

24. Add search debouncing or autocomplete suggestions
25. Add SEO metadata, including a title13. Deploy to GitHub Pages (base path in vite.config.js, gh-pages package, deploy script)
Start with feature 1 only.