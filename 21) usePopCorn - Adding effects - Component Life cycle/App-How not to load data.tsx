import { useState } from "react";
/* 
  There are 3 types of components:
    1. Stateless: Can receive props and present the data. Usually small and reusable.
    2. Stateful: Have state. Can still be reusable.
    3. Structural Components: Pages, layouts. Result of composition. Can be huge and non-reusable (but you don't have to).
*/

/* Component Composition:
    If we were to use a component inside another component, what we usually do is:
    function Modal(){
      return (
        <div className="modal">
          <Success />
        </div>
      );
    }

    But now, we have a problem, if we were to use this Modal() somewhere else, we cannot. 
    Because we have the <Success/> coming along with it. So, the solution to this is using the "children" prop.
    function Modal({ children }){
      return (
        <div className="modal">
          {children}
        </div>
      );
    }

    <Modal> <Success /> </Modal> // This is ideal

    function Success(){
      return <p>Well done!</p>
    }
*/

/*
  Prop Drilling: While sending props from parent to child, we pass the props through multiple 
  components that do not actually require those props.
  Prop Drilling problem can be fixed using Component Composition. Component Composition can also be used for reusability.
*/

{
  /*
    COMPONENT LIFE CYCLE:
    1) MOUNT / INITIAL RENDER:  Component is rendered for the first time. Fresh state and props are created
    2) RE-RENDER: State, props changes or parent re-rendered, context changes
    3) UNMOUNT: Component instance is destroyed and removed, state and props are destroyed.
  */
}

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

interface WatchedMovie extends Movie {
  runtime: number;
  imdbRating: number;
  userRating: number;
}

const tempMovieData: Movie[] = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData: WatchedMovie[] = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];
// Having the KEY variable outside of app reduces load on re-renders as this variable is not needed to re-initialize on every re-render by placing this outside the APP component
const KEY:string = '4b678733'

export default function App(): JSX.Element {
  {/* Structural component */}
  const [watched, setWatched] = useState<WatchedMovie[]>(tempWatchedData);
  const [movies, setMovies] = useState<Movie[]>(tempMovieData);
  fetch(`http://www.omdbapi.com/?apiKey=${KEY}&s=interstellar`).then(res => res.json()).then(data => setMovies(data.search));
  // The movies list is fetched but have a look at the Network tab in the dev tools, there are unlimited get() calls to the API, which is something that we dont want.
  //This is the reason why, we should never have the data fetching logic in the render logic, now it is infinite re-renders everytime we get a response from the API call.
  setWatched([]); //React also complains on this, it never reaches this line as there are infinite re-renders on the top of this

  return (
    <>
      <NavBar>
        <Logo />
        <Search />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box element={<MovieList movies={movies} />} />
        <Box
          element={
            <>
              <Summary watched={watched} />
              <WatchedMovieList watched={watched} />
            </>
          }
        />
        {/* 
          We could have done this but instead we can directly accept the element as a prop
          <Box><MovieList movies={movies} /></Box>
          <Box>        
            <Summary watched={watched} />
            <WatchedMovieList watched={watched} />
          </Box> 
        */}
      </Main>
    </>
  );
}

const average = (arr: number[]): number =>
  arr.reduce((acc, cur) => acc + cur, 0) / arr.length;

function NavBar({ children }: { children: React.ReactNode }): JSX.Element {
  {/* Structural Component */}
  return <nav className="nav-bar">{children}</nav>;
}

function NumResults({ movies }: { movies: Movie[] }): JSX.Element {
  {/* Presentational Component: stateless */}
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Logo(): JSX.Element {
  {/* Presentational Component: stateless */}
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function Search(): JSX.Element {
  {/* Stateful Component */}
  const [query, setQuery] = useState<string>("");

  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function Main({ children }: { children: React.ReactNode }): JSX.Element {
  {/* Structural Component */}
  return <main className="main">{children}</main>;
}

/* Component Composition for re-usability by removing ListBox and WatchedListBox */
function Box({ element }: { element: React.ReactNode }): JSX.Element {
  {/* Stateful Component */}
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && element}
    </div>
  );
}

function WatchedMovieList({ watched }: { watched: WatchedMovie[] }): JSX.Element {
  {/* Presentational Component */}
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie }: { movie: WatchedMovie }): JSX.Element {
  {/* Presentational Component */}
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
      </div>
    </li>
  );
}

function Summary({ watched }: { watched: WatchedMovie[] }): JSX.Element {
  {/* Presentational Component */}
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(1)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(1)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime.toFixed(1)} min</span>
        </p>
      </div>
    </div>
  );
}

function MovieList({ movies }: { movies: Movie[] }): JSX.Element {
  {/* Presentational Component */}
  return (
    <ul className="list">
      {movies.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  );
}

function Movie({ movie }: { movie: Movie }): JSX.Element {
  {/* Presentational Component */}
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
