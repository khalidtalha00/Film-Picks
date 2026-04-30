import "../src/css/Favourites.css";
import { useMovieContext } from "../src/contexts/movieContext";
import MovieCard from "../src/components/MovieCard";
import { Toaster } from "react-hot-toast";

function Favorites() {
  const { favorites } = useMovieContext();

  if (favorites.length > 0) {
    return (
      <div className="favorites">
        <Toaster
          toastOptions={{
            success: {
              duration: 2000,
            },
            error: {
              duration: 2000,
            },
          }}
        />
        <h2>Your Favorites</h2>
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div>
        <Toaster />
      </div>
      <div className="favorites-empty">
        <h2>No Favorite Movies Yet</h2>
        <p>Start adding movies to your favorites and they will appear here!</p>
      </div>
    </>
  );
}

export default Favorites;
