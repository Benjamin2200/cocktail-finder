import { useEffect, useState } from 'react'
import { FavoritesContext } from './favoritesContext'

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
    setFavorites((currentFavorites) => {
      if (currentFavorites.some((favorite) => favorite.idDrink === drink.idDrink)) {
        return currentFavorites
      }

      return [...currentFavorites, drink]
    })
  }

  function removeFavorite(drinkId) {
    setFavorites((currentFavorites) =>
      currentFavorites.filter((favorite) => favorite.idDrink !== drinkId),
    )
  }

  function isFavorite(drinkId) {
    return favorites.some((favorite) => favorite.idDrink === drinkId)
  }

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}
