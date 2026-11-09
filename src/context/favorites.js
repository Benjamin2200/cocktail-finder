export function addFavorite(favorites, drink) {
  if (favorites.some((favorite) => favorite.idDrink === drink.idDrink)) {
    return favorites
  }

  return [...favorites, drink]
}

export function removeFavorite(favorites, drinkId) {
  return favorites.filter((favorite) => favorite.idDrink !== drinkId)
}

export function isFavorite(favorites, drinkId) {
  return favorites.some((favorite) => favorite.idDrink === drinkId)
}
