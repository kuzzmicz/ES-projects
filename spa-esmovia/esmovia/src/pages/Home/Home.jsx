import { useState, useEffect } from "react";
import "./Home.css";
import { bringMovies } from "../../services/api-calls";

function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (movies.length === 0) {
      const getMovies = async () => {
        bringMovies()
          .then((res) => {
            setMovies(res.results);
          })
          .catch((error) => console.log(error));
      };
      setTimeout(() => {
        getMovies();
      }, 2000);
    }

    console.log(movies);
  }, [movies]);

  return (
    <div className="home-design">
      {movies.length > 0 ? (
        <div className="movies-container">
          {movies.map((movie) => {
            return (
              <div className="movie-card" key={movie.id}>
                <img src={"https://image.tmdb.org/t/p/w500/"+ movie.poster_path} alt={movie.title} />
                <h3>{movie.title}</h3>
                <p>{movie.release_date}</p>
              </div>
            );
          })}
        </div>
      ) : (
        <div>LOADING.......</div>
      )}
    </div>
  );
}

export default Home;
