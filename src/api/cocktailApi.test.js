import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  filterCocktailsByIngredient,
  getCocktailById,
  searchCocktailsByName,
} from './cocktailApi'

afterEach(() => {
  vi.restoreAllMocks()
})

describe('cocktail API helpers', () => {
  it('searches by name and returns drinks', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ drinks: [{ idDrink: '1' }] }), {
        status: 200,
      }),
    )

    await expect(searchCocktailsByName('  margarita ')).resolves.toEqual([
      { idDrink: '1' },
    ])
    expect(fetch).toHaveBeenCalledWith(
      'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita',
    )
  })

  it('filters by ingredient and returns an empty list for no results', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ drinks: null }), { status: 200 }),
    )

    await expect(filterCocktailsByIngredient('fresh lime')).resolves.toEqual([])
  })

  it('returns a drink by id and throws for failed responses', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response(JSON.stringify({ drinks: [{ idDrink: '42' }] }), {
        status: 200,
      }),
    )
    await expect(getCocktailById('42')).resolves.toEqual({ idDrink: '42' })

    vi.spyOn(globalThis, 'fetch').mockResolvedValue(
      new Response('', { status: 500 }),
    )
    await expect(getCocktailById('42')).rejects.toThrow(
      'Cocktail API request failed: 500',
    )
  })
})
