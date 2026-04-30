import React, { useState, useEffect } from "react";
import MovieCard from "../src/components/MovieCard";
import "../src/css/Home.css";
import { Toaster, toast } from "react-hot-toast";
import { searchMovies, getPopularMovies } from "../src/services/api";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPopularMovies = async () => {
      try {
        const popularMovies = await getPopularMovies();
        console.log("Popular movies response:", popularMovies); //FOR DEBUG
        setMovies(popularMovies);
      } catch (err) {
        console.log("Error fetching movies:", err);
        setError("Failed to load movies...");
        toast.error("Failed to load movies...");
      } finally {
        setLoading(false);
      }
    };

    loadPopularMovies();
  }, []);

  async function handleFormSubmit(e) {
    e.preventDefault();
    if (searchQuery.trim().length === 0) {
      toast.error("Enter a movie name to search");
    } else {
      if (loading) return;
      setLoading(true);
      try {
        const searchResults = await searchMovies(searchQuery);
        setMovies(searchResults);
        setError(null);
      } catch (error) {
        console.log(error);
        setError("Failed to search movies");
      } finally {
        setLoading(false);
      }
      setSearchQuery("");
    }
  }

  return (
    <div className="home">
      <div>
        <Toaster toastOptions={{
    success: {
      duration: 2000,
    },
    error:{
      duration:2000
    }
  }} />
      </div>

      <form onSubmit={handleFormSubmit} className="search-form ">
        <input
          type="text"
          placeholder="Search for a movie..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <button type="submit" className="search-button">
          {" "}
          Search
        </button>
      </form>
      <div className="trending">
        <h2>Trending Movies🔥</h2>
      </div>
      {loading && <p>Loading movies...</p>}
      {error && <p className="error">{error}</p>}
      {movies.length === 0 && !loading && <p>No movies found</p>}
      <div className="movies-grid">
        {movies.map(
          (movie) =>
            (searchQuery === "" ||
              movie.title
                .toLowerCase()
                .startsWith(searchQuery.toLowerCase())) && (
              <MovieCard movie={movie} key={movie.id} />
            ),
        )}
      </div>
    </div>
  );
};

export default Home;
