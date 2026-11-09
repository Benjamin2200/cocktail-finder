import { useState } from 'react'
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
} from 'react-router-dom'
import {
  filterCocktailsByIngredient,
  searchCocktailsByName,
} from './api/cocktailApi'
import './App.css'

function PageIntro({ label, title, description }) {
  return (
    <main className="container py-5">
      <section className="app-intro text-center">
        <p className="text-uppercase text-muted fw-semibold small mb-2">
          {label}
        </p>
        <h1 className="display-4 fw-bold">{title}</h1>
        <p className="lead text-secondary mb-0">{description}</p>
      </section>
    </main>
  )
}

function HomePage() {
  const [query, setQuery] = useState('')
  const [searchType, setSearchType] = useState('name')
  const [drinks, setDrinks] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [hasSearched, setHasSearched] = useState(false)

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
      const results =
        searchType === 'name'
          ? await searchCocktailsByName(query)
          : await filterCocktailsByIngredient(query)

      setDrinks(results)
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
          {drinks.map((drink) => (
            <Col key={drink.idDrink} xs={12} sm={6} lg={4}>
              <Card className="h-100 shadow-sm">
                <Card.Img variant="top" src={drink.strDrinkThumb} alt="" />
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
            </Col>
          ))}
        </Row>
      )}
    </main>
  )
}

function DetailPage() {
  return (
    <PageIntro
      label="Drink detail"
      title="Cocktail details"
      description="Choose a drink from the search results to see its ingredients and instructions."
    />
  )
}

function FavoritesPage() {
  return (
    <PageIntro
      label="Favorites"
      title="Your favorite cocktails"
      description="Your saved drinks will appear here."
    />
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

function AppNavbar() {
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

function App() {
  return (
    <HashRouter>
      <AppNavbar />
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
