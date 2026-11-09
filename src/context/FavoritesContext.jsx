import { useEffect, useState } from 'react'
import { FavoritesContext } from './favoritesContext'
import {
  addFavorite as addFavoriteToList,
  isFavorite as checkFavorite,
  removeFavorite as removeFavoriteFromList,
} from './favorites'

const FAVORITES_STORAGE_KEY = 'cocktail-finder-favorites'

function getStoredFavorites() {
  const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY)

  if (!storedFavorites) {
    return []
  }

  const favorites = JSON.parse(storedFavorites)
  return Array.isArray(favorites) ? favorites : []
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(getStoredFavorites)

  useEffect(() => {
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  function addFavorite(drink) {
    setFavorites((currentFavorites) => addFavoriteToList(currentFavorites, drink))
  }

  function removeFavorite(drinkId) {
    setFavorites((currentFavorites) =>
      removeFavoriteFromList(currentFavorites, drinkId),
    )
  }

  function isFavorite(drinkId) {
    return checkFavorite(favorites, drinkId)
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}
