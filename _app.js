import React, { useEffect, useState } from "react";
import { TRENDING } from "./recommend";

export function MovieDetails(props) {
  return (
    <div className="movie-details">
      <h3>{props.name}</h3>
      <p>{props.overview}</p>
    </div>
  );
}

export function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState([]);
  const [showTrending, setShowTrending] = useState(true);
  const [moviedata, setMovieData] = useState(null);

  const url = `https://api.themoviedb.org/3/search/multi?query=${name}&api_key=6cce05a65685dda77218a229db90d5a9&include_adult=false&language=en-US&page=1`;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setList(data.results))
      .catch((err) => console.error(err));
  }, [url]);

  function change(e) {
    setName(e.target.value);
    setShowTrending(e.target.value === ""); // Show trending if the input is empty or "Home"
  }

  function handleMouseOver(overview) {
    setMovieData(overview);
  }

  return (
    <>
      <div className="nav-bar">
        <img id="image" src="https://img.logoipsum.com/298.svg" alt="Logo" />
        <p id="home" onClick={() => setShowTrending(true)}>
          {" "}
          Home{" "}
        </p>
        <input
          onChange={change}
          type="text"
          className="input-value"
          value={name}
          placeholder="Search Title"
        />
      </div>
      {showTrending && <TRENDING />}{" "}
      {/* Conditional rendering of the TRENDING component */}
      <div className="res">
        {list.map((value) => (
          <div className="movie-container" key={value.id}>
            <div className="image-container">
              <img
                className="image"
                src={"https://image.tmdb.org/t/p/w780" + value.poster_path}
                alt={value.title || value.name}
                onMouseOver={() => handleMouseOver(value.overview)}
              />
              <p className="movie-title">{value.title || value.name}</p>
            </div>
            {/* {moviedata === value.overview && (
              <MovieDetails
                let
                name={value.title || value.name}
                let
                overview={value.overview}
              />
            )} */}
          </div>
        ))}
      </div>
    </>
  );
}
