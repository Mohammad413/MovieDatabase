import React, { useState, useEffect } from "react";

export function TRENDING() {
  const [list, setList] = useState([]);
  const [tv, setTv] = useState();
  const [mov, setMov] = useState();
  const [url, setUrl] = useState(
    "https://api.themoviedb.org/3/trending/movie/day?api_key=6cce05a65685dda77218a229db90d5a9"
  );
  const [moviedata, setMovieData] = useState(null);
  const changeurl = (isTv) => {
    if (isTv) {
      setUrl(
        "https://api.themoviedb.org/3/trending/tv/day?api_key=6cce05a65685dda77218a229db90d5a9"
      );
      setTv(true);
    } else {
      setUrl(
        "https://api.themoviedb.org/3/trending/movie/day?api_key=6cce05a65685dda77218a229db90d5a9"
      );
      setTv(false);
    }
  };
  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setList(data.results));
  }, [url]);

  function handleMouseOver(overview) {
    setMovieData(overview);
  }

  return (
    <>
      <div className="recommend_section">
        <h1 id="recommend_title"> TRENDING </h1>
        <button
          id="button_movie"
          autoFocus={!tv}
          onClick={() => changeurl(false)} // Pass false for the movie button
        >
          {" "}
          MOVIE
        </button>
        <button id="button_tv" value="naruto" onClick={() => changeurl(true)}>
          {" "}
          {/* Pass true for the TV button */}
          TV
        </button>
      </div>
      <div className="res">
        {list.map((value) => (
          <div className="movie-container" key={value.id}>
            <div className="image-container">
              <img
                className="image"
                src={"https://image.tmdb.org/t/p/w780" + value.poster_path}
                alt={value.title || value.name}
                onMouseOver={() => handleMouseOver(value.overview)} // Add onMouseOver to show movie summary
              />
              <p> {value.title || value.name} </p>
              {moviedata === value.overview && ( // Check if moviedata matches the current movie's overview
                <div className="movie-summary">
                  <h3>{value.title || value.name}</h3>
                  <p>{value.overview}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
