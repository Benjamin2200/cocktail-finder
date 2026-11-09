import { Container, Nav, Navbar } from 'react-bootstrap'
import {
  HashRouter,
  NavLink,
  Route,
  Routes,
  Link,
} from 'react-router-dom'
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
  return (
    <PageIntro
      label="Cocktail Finder"
      title="Find your next favorite drink"
      description="Search cocktails by name or ingredient."
    />
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
