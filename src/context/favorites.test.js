import { describe, expect, it } from 'vitest'
import { addFavorite, isFavorite, removeFavorite } from './favorites'

const margarita = { idDrink: '1' }
const mojito = { idDrink: '2' }

describe('favorite behavior', () => {
  it('adds a drink once and detects it', () => {
    const favorites = addFavorite([], margarita)

    expect(addFavorite(favorites, margarita)).toEqual(favorites)
    expect(isFavorite(favorites, margarita.idDrink)).toBe(true)
  })

  it('removes a drink without changing other favorites', () => {
    const favorites = [margarita, mojito]

    expect(removeFavorite(favorites, margarita.idDrink)).toEqual([mojito])
    expect(isFavorite(favorites, '3')).toBe(false)
  })
})
