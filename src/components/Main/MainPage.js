import React, { useEffect, useState } from "react";
import Movie from "./Movie";

const FEATURED_API =
  "https://api.themoviedb.org/3/discover/movie?api_key=6241e31f828487ad21497bc364be7041&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=6241e31f828487ad21497bc364be7041&language=en-US&page=1&include_adult=false";
const IMG_API =
  "https://api.themoviedb.org/3/movie/{movie_id}/images?api_key=6241e31f828487ad21497bc364be7041&language=en-US";

function MainPage() {
  const [globalData, setGlobalData] = useState([]);
  useEffect(() => {
    fetch(
      "https://api.themoviedb.org/3/movie/6/similar?api_key=6241e31f828487ad21497bc364be7041&language=en-US&page=1"
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result.results, "Movie RESULT");
        setGlobalData(result.results);
      });
  }, []);

  return (
    <div>
      {globalData.map((movie) => (
        <Movie
          key={movie.id}
          title={movie.title}
          popularity={movie.popularity}
          release_date={movie.release_date}
          image={movie.poster_path}
        />
      ))}
    </div>
  );
}

export default MainPage;
