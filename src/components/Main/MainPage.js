import React, { useEffect, useState } from 'react';
import Movie from './Movie';
import { POPULAR_MOVIES_API } from '../../constants/APIs';

function MainPage() {
  const [featuredMovies, setFeaturedMovies] = useState([]);
  useEffect(() => {
    fetch(POPULAR_MOVIES_API)
      .then((response) => response.json())
      .then((result) => {
        console.log(result, 'Movie RESULT');
        setFeaturedMovies(result.results);
      });
  }, []);

  return (
    <div>
      <h1>Featured Movies</h1>

      {featuredMovies.map((movie) => (
        <Movie
          key={movie.id}
          title={movie.title}
          release_date={movie.release_date}
          overview={movie.overview}
          image={movie.poster_path}
        />
      ))}
    </div>
  );
}

export default MainPage;
