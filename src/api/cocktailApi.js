const API_BASE_URL =
  'https://www.thecocktaildb.com/api/json/v1/1'

async function request(endpoint) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`)

  if (!response.ok) {
    throw new Error(`Cocktail API request failed: ${response.status}`)
  }

  const data = await response.json()
  return data.drinks ?? []
}

export async function searchCocktailsByName(name) {
  return request(`/search.php?s=${encodeURIComponent(name.trim())}`)
}

export async function filterCocktailsByIngredient(ingredient) {
  return request(`/filter.php?i=${encodeURIComponent(ingredient.trim())}`)
}

export async function filterCocktailsByCategory(category) {
  return request(`/filter.php?c=${encodeURIComponent(category.trim())}`)
}

export async function getCocktailById(id) {
  const drinks = await request(`/lookup.php?i=${encodeURIComponent(id)}`)
  return drinks[0] ?? null
}

export async function getRandomCocktail() {
  const drinks = await request('/random.php')
  return drinks[0] ?? null
}
