import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useRef,
  LegacyRef,
} from "react";
import StarRating from "./StarRating";
import "./index.css";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKey } from "./useKey";

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

{
  /* 
    Custom hooks:
                    I need to reuse
              ----------------------------------
              |                                |
              UI                             Logic
              |                        ------------------
          Component                    Does it have hooks?
                                                |
                                       --------------------
                                       | No              | Yes
                                    Regular          Custpm Hook
                                    Function  
  
  
  
  - Non visual logic in multi-purpose components
  - One custom hook should have one purpose to make ot reusable and portable even across multiple projects
  - Rules of hooks apply to custom hooks to
  - This need to show one or more hooks making it different from a regular function
  - Unlike components, can recieve and return data(usually [] or {})
  - Needs to start with the word use
  
   */
}

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export interface WatchedMovie extends Movie {
  runtime: number;
  imdbRating: number;
  userRating: number;
}

export const KEY: string = "4b678733";

export default function App(): JSX.Element {
  {
    /* Structural component */
  }
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");
  // const [watched, setWatched] = useState<WatchedMovie[] | []>(tempWatchedData); refer to the hook for the useState computation and initialization using a function.
  const [watched, setWatched] = useLocalStorageState<WatchedMovie[]>(
    [],
    "watched"
  );

  // In the useState() only a pure function needs to be passed,it shouldnt have any parameters, here on this function execution, we get the previously stored added to watched list movies and display them on initial render as useState() is initialized with the stored values.
  // When ever the initial value of the state is depending on some computation, make use of a function inside useState()

  // As we already saw how not to write the fetch() here in the App-How not to load data.tsx, Now let us look at the real way for fetching the data.
  // The side effects registered with useEffect() wil be only rendered after certain renders eg: initial render, which we are exactly looking at in this situation.
  // We will learn more about this hook later, also about the dependency array later, for now leave the dependency array empty meaning: it will render only on mount.

  const { movies, isLoading, error } = useMovies(query, handleClose);
  function handleSelectMovie(id: string): void {
    setSelectedId((selectedId) => (id === selectedId ? null : id));
  }
  function handleClose(): void {
    setSelectedId(null);
  }
  function handleAddWatched(movie: WatchedMovie) {
    setWatched((watched) => [...watched, movie]);
    // localStorage.setItem("watched", JSON.stringify([...watched, movie]));
    //Doing his here will not make the data re-usable, so we want this to be written in an effect outside of the event handler.
  }
  function handleDeleteWatched(id: string) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  // There is no need of spread operator because we already have it in the dependency array and useEffect() is called everytime the watched array changes

  {
    /* 
    useEffect(function(){
    console.log("A");}, [])

    useEffect(function(){
    console.log("B")});

    console.log("C")
    Initial output order is 
    C -> Because useEffect output is only after the browser paints
    A -> Code piece written above B
    B -> code piece written below A


    Once we start typing in search bar, the App component is re-rendered and then we see
    C -> useEffect output is shown after the browser paints
    B -> There is no dependency array meaning it is dependent on every thing
    

    Note: A is not logged because it has an empty dependency array, meaning it only shows up on initial render and not on re-renders.
    Therefore we can modify it as 

    useEffect(function(){
    console.log("After initial render");}, [])

    useEffect(function(){
    console.log("After every render")});

    console.log("During render")


    Now say we have one more effect as follows,
    useeffect(function(){
      console.log("D");
    },[query])

    Now, everytime we start to search something in search bar, on every query change,
    We have the following printed out.

    */
  }

  // Now on using useEffect, there are no infinite requests from fetch() to the API as we placed the data fetching logic inside useEffect() and useEffect() is running only on mount as we have the dependency array empty.
  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box
          element={
            <>
              {isLoading && <Loader />}
              {!isLoading && !error && (
                <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
              )}
              {error && <ErrorMessage message={error} />}
            </>
          }
        />
        <Box
          element={
            <>
              {selectedId ? (
                <MovieDetails
                  selectedId={selectedId}
                  onClose={handleClose}
                  onAddWatched={handleAddWatched}
                  watched={watched}
                />
              ) : (
                <>
                  <Summary watched={watched} />
                  <WatchedMovieList
                    watched={watched}
                    onDeleteWatched={handleDeleteWatched}
                  />
                </>
              )}
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
interface MovieDes {
  Title: string;
  Year: string;
  Poster: string;
  Runtime: string;
  imdbRating: string;
  Plot: string;
  Released: string;
  Actors: string;
  Director: string;
  Genre: string;
}
function MovieDetails({
  selectedId,
  onClose,
  onAddWatched,
  watched,
}: {
  selectedId: string;
  onClose: () => void;
  onAddWatched: (movie: WatchedMovie) => void;
  watched: WatchedMovie[];
}): JSX.Element {
  const [movie, setMovie] = useState<MovieDes>({
    Title: "Inception",
    Year: "2010",
    Poster: "http://example.com/poster.jpg",
    Runtime: "148 min",
    imdbRating: "8.8",
    Plot: "A thief who steals corporate secrets through the use of dream-sharing technology...",
    Released: "16 Jul 2010",
    Actors: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page",
    Director: "Christopher Nolan",
    Genre: "Action, Adventure, Sci-Fi",
  });
  useKey("Escape", onClose);
  const [userRating, setUserRating] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isWatched: boolean = watched
    .map((movie) => movie.imdbID)
    .includes(selectedId);
  const watchedUserRating: number | undefined = watched.find(
    (movie) => movie.imdbID === selectedId
  )?.userRating;
  useEffect(
    function () {
      async function getMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apiKey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
        setIsLoading(false);
      }
      getMovieDetails();
    },
    [selectedId]
  );
  {
    /* Say we need t0 keep a count of everytime user clicked on rating behind the scenes, useRef is a perfect useCase
      and also, we should not update ref inside render logic so we make use of useEffect()
      Now let us add this in handleAdd(){}
      If we used a normal variable it always goes back to it's initialized value which is naturally 0. and we cannot keep a track of previous render.
      Usually refs are used to store the ids
    */
  }
  const countRef = useRef<number>(0);
  useEffect(
    function () {
      if (userRating) countRef.current = countRef.current + 1;
    },
    [userRating]
  );
  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  }: MovieDes = movie;

  /* 
    If we did something like this here
    if(imdbRating > 8) const[isTop setIsTop] = useState<boolean>(true);
    it is violation of the rule that hooks cannot be declared in conditionals.
    Hooks can only be used in the top level of the component not in loops or conditionals, because
    it is because hooks are called as linkedlists and if we used a hook in a conditional, the next one's would loose a link if this hook is not called.
    Therefore, always use hooks in the top level f the component
    Rule 2: Never write hooks outside of component


    Instead what we could do is:
    const [isTop, setIsTop] = useState<boolean>(imdbRating > 8);
    console.log(isTop);
    useEffect(function(){
    setIsTop(imdbRating > 8);},[imdbRating]);

    But we shouldn't have even used a hook here, instead what we could do is
    use a derived state
    const isTop = idbRating > 8;
    console.log(isTop);
  */
  interface handleAddProps extends WatchedMovie {
    countRatingDecisions: number;
  }

  function handleAdd(): void {
    const newWatchedMovie: handleAddProps = {
      imdbID: selectedId,
      Title: title,
      Year: year,
      Poster: poster,
      runtime: Number(runtime.split(" ")[0]),
      imdbRating: Number(imdbRating),
      userRating: Number(userRating),
      countRatingDecisions: countRef.current,
    };
    onAddWatched(newWatchedMovie);
    onClose();
  }

  useEffect(
    function () {
      if (!title) return;
      document.title = `Movie | ${title}`;
      return function () {
        document.title = "usePopcorn";
      };
    },
    [title]
  );

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className="btn-back" onClick={onClose}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie}`} />
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDB Rating
              </p>
            </div>
          </header>
          <div className="rating">
            {!isWatched ? (
              <>
                <StarRating
                  maxRating={10}
                  size={24}
                  onSetRating={setUserRating}
                />
                {Number(userRating) > 0 && (
                  <button className="btn-add" onClick={handleAdd}>
                    + Add to list
                  </button>
                )}
              </>
            ) : (
              <p>
                You rated this movie {watchedUserRating} <span>⭐</span>
              </p>
            )}
          </div>
          <section>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
}
function ErrorMessage({ message }: { message: string }) {
  return (
    <p className="error">
      <span>⛔</span>
      {message}
    </p>
  );
}
function Loader(): JSX.Element {
  return <p className="loader">Loading</p>;
}
const average = (arr: number[]): number =>
  arr.reduce((acc, cur) => acc + cur, 0) / arr.length;

function NavBar({ children }: { children: React.ReactNode }): JSX.Element {
  {
    /* Structural Component */
  }
  return <nav className="nav-bar">{children}</nav>;
}

function NumResults({ movies }: { movies: Movie[] }): JSX.Element {
  {
    /* Presentational Component: stateless */
  }
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Logo(): JSX.Element {
  {
    /* Presentational Component: stateless */
  }
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}
function Search({
  query,
  setQuery,
}: {
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
}): JSX.Element {
  {
    /* Stateful component */
  }
  const inputElement = useRef<HTMLInputElement | null>(null);
  useKey("enter", function () {
    if (document.activeElement === inputElement.current) return;
    if (inputElement.current) inputElement.current.focus();
    setQuery("");
  });
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputElement}
    />
  );
}

function Main({ children }: { children: React.ReactNode }): JSX.Element {
  {
    /* Structural Component */
  }
  return <main className="main">{children}</main>;
}

/* Component Composition for re-usability by removing ListBox and WatchedListBox */
function Box({ element }: { element: React.ReactNode }): JSX.Element {
  {
    /* Stateful Component */
  }
  const [isOpen, setIsOpen] = useState<boolean>(true);

  return (
    <div className="box">
      <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && element}
    </div>
  );
}

function WatchedMovieList({
  watched,
  onDeleteWatched,
}: {
  watched: WatchedMovie[];
  onDeleteWatched: (id: string) => void;
}): JSX.Element {
  {
    /* Presentational Component */
  }
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({
  movie,
  onDeleteWatched,
}: {
  movie: WatchedMovie;
  onDeleteWatched: (id: string) => void;
}): JSX.Element {
  {
    /* Presentational Component */
  }
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
        <button
          className="btn-delete"
          onClick={() => onDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}

function Summary({ watched }: { watched: WatchedMovie[] }): JSX.Element {
  {
    /* Presentational Component */
  }
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
          <span>{avgImdbRating ? avgImdbRating.toFixed(1) : 0}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating ? avgUserRating.toFixed(1) : 0}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime ? avgRuntime.toFixed(1) : 0} min</span>
        </p>
      </div>
    </div>
  );
}

function MovieList({
  movies,
  onSelectMovie,
}: {
  movies: Movie[];
  onSelectMovie: (id: string) => void;
}): JSX.Element {
  {
    /* Presentational Component */
  }
  return (
    <ul className="list list-movies">
      {movies.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
}

function Movie({
  movie,
  onSelectMovie,
}: {
  movie: Movie;
  onSelectMovie: (id: string) => void;
}): JSX.Element {
  {
    /* Presentational Component */
  }
  return (
    <li key={movie.imdbID} onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>📅</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}
