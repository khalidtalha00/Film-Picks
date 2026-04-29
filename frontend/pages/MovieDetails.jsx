import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getMovieDetails } from "../src/services/api";
import "../src/css/MovieDetails.css";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const loadMovie = async () => {
      const data = await getMovieDetails(id);
      setMovie(data);
    };

    loadMovie();
  }, [id]);

  if (!movie) return <p className="movie-details-loading">Loading...</p>;

  return (
    <section className="movie-details">
      <Link to="/" className="movie-details-back">
        ← Back to movies
      </Link>

      <div className="movie-details-card">
        <div className="movie-details-poster">
          {movie.poster_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
            />
          ) : (
            <div className="movie-details-placeholder">No image available</div>
          )}
        </div>

        <div className="movie-details-info">
          <h1>{movie.title}</h1>
          <p className="movie-details-overview">{movie.overview}</p>

          <div className="movie-details-meta">
            <p><strong>Rating:</strong> {movie.vote_average}</p>
            <p><strong>Release date:</strong> {movie.release_date}</p>
            <p><strong>Runtime:</strong> {movie.runtime} min</p>
          </div>
        </div>
      </div>
    </section>
  );
}