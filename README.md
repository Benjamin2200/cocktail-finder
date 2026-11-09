# Cocktail Finder

Cocktail Finder is a responsive React application for discovering cocktails,
viewing drink details, and saving favorite drinks. It uses TheCocktailDB for
cocktail data and can be deployed to GitHub Pages.

## Features

### Search and discovery

- Search cocktails by name or ingredient.
- Debounced name autocomplete suggestions.
- Filter search results by cocktail category.
- Load more results without starting another search.
- Use **Surprise me** to open a random cocktail.
- View a history of recent random cocktail suggestions.

### Cocktail details

- View cocktail image, category, ingredients, measurements, and instructions.
- Use a fallback image when a remote image cannot be loaded.
- Switch ingredient measurements between Imperial and Metric units.
- Select an ingredient to start a new ingredient search.
- Add or remove a drink from favorites with a prominent detail-page action.

### Favorites

- Save and remove cocktails from search cards or detail pages.
- Persist favorites in browser `localStorage`.
- Display saved cocktails on the Favorites page.
- Show toast notifications when favorites change.

### User experience

- Responsive layout for desktop and mobile screens.
- Light and dark themes with a saved theme preference.
- Lazy-loaded result images for improved performance.
- Accessible labels, buttons, focus states, and empty/error/loading states.
- Custom cocktail-themed favicon and page metadata.
- Hash-based routing for GitHub Pages compatibility.

## Application routes

| Route | Purpose |
| --- | --- |
| `#/` | Search cocktails |
| `#/drink/:id` | View cocktail details |
| `#/favorites` | View saved cocktails |
| `#/*` | Not-found page |

## Requirements

- Node.js 18 or newer
- npm

## Installation

Clone the repository, enter the project directory, and install dependencies:

```bash
git clone git@github-second:Benjamin2200/cocktail-finder.git
cd cocktail-finder
npm install
```

If SSH is not configured, clone using the repository URL provided by GitHub.

## Available commands

Start the development server:

```bash
npm run dev
```

Build the production bundle:

```bash
npm run build
```

Preview the production bundle locally:

```bash
npm run preview
```

Run ESLint:

```bash
npm run lint
```

Run the automated tests:

```bash
npm test
```

## Technology stack

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [Bootstrap](https://getbootstrap.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [React Hot Toast](https://react-hot-toast.com/)
- [Vitest](https://vitest.dev/)
- [gh-pages](https://www.npmjs.com/package/gh-pages)

## API

Cocktail data comes from
[TheCocktailDB](https://www.thecocktaildb.com/api/json/v1/1/), a free REST API
that does not require an API key for this project.

The API helper in `src/api/cocktailApi.js` provides functions for:

- Searching by cocktail name
- Filtering by ingredient
- Filtering by category
- Looking up a cocktail by ID
- Fetching a random cocktail

## Browser storage

The app stores user preferences locally in the browser:

| Key | Stored data |
| --- | --- |
| `cocktail-finder-favorites` | Saved cocktail objects |
| `cocktail-finder-theme` | `light` or `dark` |
| `cocktail-finder-measurements` | `imperial` or `metric` |
| `cocktail-finder-random-history` | Up to 10 random cocktails |

Clearing browser site data removes these saved values.

## Testing

The test suite covers:

- API URL construction and response parsing.
- Empty API responses.
- API request failures.
- Adding, removing, detecting, and preventing duplicate favorites.

Run the tests with:

```bash
npm test
```

## GitHub Pages deployment

The Vite base path is configured as `/cocktail-finder/`, matching the
repository name. The deployment scripts are:

```bash
npm run predeploy
npm run deploy
```

`npm run deploy` automatically runs the production build first, then publishes
the `dist` directory to the `gh-pages` branch.

Before deploying:

1. Ensure the repository is connected to the correct GitHub remote.
2. Enable GitHub Pages for the `gh-pages` branch in repository settings.
3. Run `npm run deploy`.

Expected site URL:

<https://benjamin2200.github.io/cocktail-finder/>

## Project status

The project is configured for deployment, but deployment is intentionally
separate from local development. Do not run `npm run deploy` unless you intend
to publish the current build.
