# Cocktail Finder

Cocktail Finder is a React web app for discovering cocktails by name or
ingredient. Users can view drink details, save favorites, and get a random
cocktail suggestion.

## Features

- Search cocktails by name or ingredient
- View ingredients, measurements, and preparation instructions
- Save and remove favorite cocktails
- Persist favorites in browser `localStorage`
- Receive toast notifications for favorite changes
- Get a random cocktail with “Surprise me”
- Responsive Bootstrap layout
- Hash-based routing for GitHub Pages compatibility

## Getting started

### Requirements

- Node.js 18 or newer
- npm

### Install

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open the local URL printed by Vite in your browser.

### Build for production

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

### Run linting

```bash
npm run lint
```

## Libraries used

- React
- Vite
- React Router
- React Bootstrap and Bootstrap
- React Icons
- React Hot Toast

## API

Cocktail data comes from
[TheCocktailDB](https://www.thecocktaildb.com/api/json/v1/1/), a free REST API
that does not require an API key for this project.

## Deployment

The application is designed to deploy to GitHub Pages. The production URL will
be added here after the deployment setup is completed.
