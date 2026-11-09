import { useEffect, useState } from 'react'
import {
  Alert,
  Card,
  Col,
  Container,
  Form,
  Nav,
  Navbar,
  Row,
  Spinner,
} from 'react-bootstrap'
import {
  HashRouter,
  NavLink,
  Route,
  Routes,
  Link,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import toast, { Toaster } from 'react-hot-toast'
import cocktailPlaceholder from './assets/cocktail-placeholder.svg'
import {
  filterCocktailsByIngredient,
  filterCocktailsByCategory,
  getCocktailById,
  getRandomCocktail,
  searchCocktailsByName,
} from './api/cocktailApi'
import { useFavorites } from './context/useFavorites'
import './App.css'

function DrinkImage({ src, alt, className, loading = 'lazy' }) {
  function handleImageError(event) {
    event.currentTarget.onerror = null
    event.currentTarget.src = cocktailPlaceholder
  }

  return (
    <img
      src={src || cocktailPlaceholder}
      alt={alt}
      className={className}
      loading={loading}
      onError={handleImageError}
    />
  )
}

function FavoriteButton({ drink }) {
  const { addFavorite, removeFavorite, isFavorite } = useFavorites()
  const favorite = isFavorite(drink.idDrink)

  function handleClick() {
    if (favorite) {
      removeFavorite(drink.idDrink)
      toast.success(`${drink.strDrink} removed from favorites`)
    } else {
      addFavorite(drink)
      toast.success(`${drink.strDrink} added to favorites`)
    }
  }

  return (
    <button
      type="button"
      className="btn btn-link favorite-button"
      onClick={handleClick}
      aria-label={favorite ? `Remove ${drink.strDrink} from favorites` : `Add ${drink.strDrink} to favorites`}
      aria-pressed={favorite}
    >
      {favorite ? <FaHeart /> : <FaRegHeart />}
    </button>
  )
}

function DrinkCard({ drink }) {
  return (
    <Card className="h-100 shadow-sm">
      <div className="drink-card-image">
        <DrinkImage
          src={drink.strDrinkThumb}
          alt=""
          className="card-img-top"
        />
        <FavoriteButton drink={drink} />
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title>{drink.strDrink}</Card.Title>
        <Link
          className="btn btn-outline-primary mt-auto"
          to={`/drink/${drink.idDrink}`}
        >
          View details
        </Link>
      </Card.Body>
    </Card>
  )
}

function HomePage() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [searchType, setSearchType] = useState('name')
  const [category, setCategory] = useState('')
  const [drinks, setDrinks] = useState([])
  const [visibleCount, setVisibleCount] = useState(6)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [hasSearched, setHasSearched] = useState(false)
  const [isRandomLoading, setIsRandomLoading] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    if (!query.trim()) {
      setError('Enter a cocktail name or ingredient to search.')
      return
    }

    setIsLoading(true)
    setError('')
    setHasSearched(true)

    try {
      let results =
        searchType === 'name'
          ? await searchCocktailsByName(query)
          : await filterCocktailsByIngredient(query)

      const categoryResults = category
        ? await filterCocktailsByCategory(category)
        : null

      if (categoryResults) {
        const categoryIds = new Set(
          categoryResults.map((drink) => drink.idDrink),
        )
        results = results.filter((drink) => categoryIds.has(drink.idDrink))
      }

      setDrinks(results)
      setVisibleCount(6)
    } catch (requestError) {
      setDrinks([])
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Unable to search for cocktails.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSurpriseMe() {
    setIsRandomLoading(true)
    setError('')

    try {
      const drink = await getRandomCocktail()

      if (!drink) {
        throw new Error('No random cocktail was returned. Please try again.')
      }

      navigate(`/drink/${drink.idDrink}`)
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : 'Unable to load a random cocktail.',
      )
    } finally {
      setIsRandomLoading(false)
    }
  }

  return (
    <main className="container py-5">
      <section className="app-intro text-center">
        <p className="text-uppercase text-muted fw-semibold small mb-2">
          Cocktail Finder
        </p>
        <h1 className="display-4 fw-bold">Find your next favorite drink</h1>
        <p className="lead text-secondary mb-4">
          Search cocktails by name or ingredient.
        </p>

        <Form onSubmit={handleSubmit} className="search-form">
          <div className="d-flex flex-column flex-md-row gap-2">
            <Form.Label htmlFor="search-query" className="visually-hidden">
              Search cocktails
            </Form.Label>
            <Form.Control
              id="search-query"
              type="search"
              placeholder={
                searchType === 'name'
                  ? 'Search by cocktail name'
                  : 'Search by ingredient'
              }
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Form.Select
              aria-label="Search type"
              value={searchType}
              onChange={(event) => setSearchType(event.target.value)}
            >
              <option value="name">Name</option>
              <option value="ingredient">Ingredient</option>
            </Form.Select>
            <Form.Select
              aria-label="Filter by category"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option value="">All categories</option>
              <option value="Ordinary Drink">Ordinary Drink</option>
              <option value="Cocktail">Cocktail</option>
              <option value="Shake">Shake</option>
              <option value="Other/Unknown">Other/Unknown</option>
              <option value="Cocoa">Cocoa</option>
              <option value="Shot">Shot</option>
              <option value="Coffee / Tea">Coffee / Tea</option>
              <option value="Homemade Liqueur">Homemade Liqueur</option>
              <option value="Punch / Party Drink">Punch / Party Drink</option>
              <option value="Beer">Beer</option>
              <option value="Soft Drink / Soda">Soft Drink / Soda</option>
            </Form.Select>
            <button
              type="submit"
              className="btn btn-primary px-4"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Spinner
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Searching
                </>
              ) : (
                'Search'
              )}
            </button>
          </div>
          <button
            type="button"
            className="btn btn-outline-secondary mt-3"
            onClick={handleSurpriseMe}
            disabled={isLoading || isRandomLoading}
          >
            {isRandomLoading ? (
              <>
                <Spinner
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Finding a cocktail
              </>
            ) : (
              'Surprise me'
            )}
          </button>
        </Form>
      </section>

      {error && (
        <Alert variant="danger" className="search-feedback mt-4">
          {error}
        </Alert>
      )}

      {hasSearched && !isLoading && !error && drinks.length === 0 && (
        <Alert variant="info" className="search-feedback mt-4">
          No cocktails found. Try a different search term.
        </Alert>
      )}

      {!isLoading && drinks.length > 0 && (
        <Row className="g-4 mt-4">
          {drinks.slice(0, visibleCount).map((drink) => (
            <Col key={drink.idDrink} xs={12} sm={6} lg={4}>
              <DrinkCard drink={drink} />
            </Col>
          ))}
        </Row>
      )}

      {!isLoading && visibleCount < drinks.length && (
        <div className="text-center mt-4">
          <button
            type="button"
            className="btn btn-outline-primary"
            onClick={() => setVisibleCount((count) => count + 6)}
          >
            Load more
          </button>
        </div>
      )}
    </main>
  )
}

function DetailPage() {
  const { id } = useParams()
  const [drink, setDrink] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let isCurrent = true

    async function loadDrink() {
      setIsLoading(true)
      setError('')

      try {
        const result = await getCocktailById(id)

        if (isCurrent) {
          setDrink(result)
        }
      } catch (requestError) {
        if (isCurrent) {
          setDrink(null)
          setError(
            requestError instanceof Error
              ? requestError.message
              : 'Unable to load this cocktail.',
          )
        }
      } finally {
        if (isCurrent) {
          setIsLoading(false)
        }
      }
    }

    loadDrink()

    return () => {
      isCurrent = false
    }
  }, [id])

  if (isLoading) {
    return (
      <main className="container py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading cocktail details</span>
        </Spinner>
      </main>
    )
  }

  if (error) {
    return (
      <main className="container py-5">
        <Alert variant="danger">{error}</Alert>
      </main>
    )
  }

  if (!drink) {
    return (
      <main className="container py-5">
        <Alert variant="info">This cocktail could not be found.</Alert>
      </main>
    )
  }

  const ingredients = Array.from({ length: 15 }, (_, index) => {
    const ingredient = drink[`strIngredient${index + 1}`]
    const measure = drink[`strMeasure${index + 1}`]

    if (!ingredient?.trim()) {
      return null
    }

    return `${measure?.trim() ? `${measure.trim()} ` : ''}${ingredient.trim()}`
  }).filter(Boolean)

  return (
    <main className="container py-5">
      <Row className="g-4">
        <Col md={5}>
          <DrinkImage
            src={drink.strDrinkThumb}
            alt={drink.strDrink}
            className="img-fluid rounded shadow-sm"
            loading="eager"
          />
        </Col>
        <Col md={7}>
          <p className="text-uppercase text-muted fw-semibold small mb-2">
            {drink.strCategory || 'Cocktail'}
          </p>
          <div className="d-flex align-items-center gap-2">
            <h1 className="display-5 fw-bold mb-0">{drink.strDrink}</h1>
            <FavoriteButton drink={drink} />
          </div>
          <h2 className="h4 mt-4">Ingredients</h2>
          <ul>
            {ingredients.map((ingredient) => (
              <li key={ingredient}>{ingredient}</li>
            ))}
          </ul>
          <h2 className="h4 mt-4">Instructions</h2>
          <p className="text-secondary">{drink.strInstructions}</p>
        </Col>
      </Row>
    </main>
  )
}

function FavoritesPage() {
  const { favorites } = useFavorites()

  return (
    <main className="container py-5">
      <section className="app-intro text-center">
        <p className="text-uppercase text-muted fw-semibold small mb-2">
          Favorites
        </p>
        <h1 className="display-4 fw-bold">Your favorite cocktails</h1>
        <p className="lead text-secondary mb-0">
          Drinks you save will appear here.
        </p>
      </section>

      {favorites.length === 0 ? (
        <Alert variant="info" className="mt-4">
          You have not saved any cocktails yet.
        </Alert>
      ) : (
        <Row className="g-4 mt-4">
          {favorites.map((drink) => (
            <Col key={drink.idDrink} xs={12} sm={6} lg={4}>
              <DrinkCard drink={drink} />
            </Col>
          ))}
        </Row>
      )}
    </main>
  )
}

function NotFoundPage() {
  return (
    <main className="container py-5">
      <section className="app-intro text-center">
        <p className="text-uppercase text-muted fw-semibold small mb-2">404</p>
        <h1 className="display-4 fw-bold">Page not found</h1>
        <p className="lead text-secondary mb-4">
          The page you requested does not exist.
        </p>
        <Link className="btn btn-primary" to="/">
          Back to search
        </Link>
      </section>
    </main>
  )
}

function AppNavbar({ darkMode, onToggleDarkMode }) {
  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand as={NavLink} to="/">
          Cocktail Finder
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="cocktail-navbar" />
        <Navbar.Collapse id="cocktail-navbar">
          <Nav className="ms-auto">
            <Nav.Link as={NavLink} to="/" end>
              Search
            </Nav.Link>
            <Nav.Link as={NavLink} to="/favorites">
              Favorites
            </Nav.Link>
            <button
              type="button"
              className="btn btn-sm btn-outline-light ms-lg-3 mt-2 mt-lg-0"
              onClick={onToggleDarkMode}
            >
              {darkMode ? 'Light mode' : 'Dark mode'}
            </button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

function App() {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('cocktail-finder-theme') === 'dark',
  )

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light'
    localStorage.setItem('cocktail-finder-theme', darkMode ? 'dark' : 'light')
  }, [darkMode])

  return (
    <HashRouter>
      <Toaster position="bottom-right" />
      <AppNavbar
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((current) => !current)}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/drink/:id" element={<DetailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  )
}

export default App
