import { useEffect, useState } from "react";
import "./App.css";
import { Header } from "./components/Layout/Header";
import { Sidebar } from "./components/Layout/Sidebar";
import { SidebarProvider } from "./contexts/SidebarContext";
import axios from "axios";
import GenereMovieList from "./components/Pages/Movies/ShowMovies/GenreMovieList";
import Slider from "./components/Pages/Movies/ShowMovies/Slider";
import HomeGenre from "./components/Home/HomeGenre";
import FavoriteList from "./components/Lists/FavoriteList/FavoriteList";

function App() {
  // console.log(TvShowsData);

  const BaseURL = "https://api.themoviedb.org/3";
  const NifApiKey = "560092ab89064b4982288bf6673d7996";
  // ------------------------------------------------------------------------------------
  // const MoviesUrlByPage =
  //   "https://api.themoviedb.org/3/trending/tv/day?api_key=560092ab89064b4982288bf6673d7996&page=15";

  // const MoviesUrlByPage =
  //   "https://api.themoviedb.org/3/trending/movie/day?api_key=560092ab89064b4982288bf6673d7996&page=1";

  // const Genre = "https://api.themoviedb.org/3/genre/tv/list?api_key=560092ab89064b4982288bf6673d7996&page=1";
  // const FindShowSeasons =
  //   "https://api.themoviedb.org/3/tv/1429/episode_groups?api_key=560092ab89064b4982288bf6673d7996";
  // ("https://api.themoviedb.org/3/tv/108978/episode_groups?api_key=560092ab89064b4982288bf6673d7996");

  // ------------------------------------------------------------------------------------
  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const fetchData = async () => {
  //   await axios
  //     .get(FindShowSeasons)
  //     .then((response) => response.data.result)
  //     .then((result) => {
  //       console.log(result);
  // const existingDataString = localStorage.getItem("TvShow");
  // const existingData = existingDataString
  //   ? JSON.parse(existingDataString)
  //   : [];
  // console.log(existingData);
  // const combinedData = existingData.concat(result);
  // localStorage.setItem("TvShow", JSON.stringify(combinedData));
  // console.log(combinedData);
  // setData(combinedData);
  //     });
  // };

  // useEffect(() => {
  //   const existingDataString = localStorage.getItem("Movies");

  //   // console.log("Existing data string:", existingDataString);

  //   if (existingDataString) {
  //     const existingData = JSON.parse(existingDataString);
  //     console.log("LocalStorage data:", existingData);

  //     setData(existingData);
  //   } else {
  //     console.log("No data found in localStorage");
  //   }
  // }, []);
  // console.log("Data", data);

  return (
    <SidebarProvider>
      <div className="max-h-screen flex flex-col">
        <Header />
        <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
          <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
            <Sidebar />
          </div>

          <div className="overflow-x-auto px-8 pb-4">
            {/* <Slider /> */}
            <FavoriteList />
            <HomeGenre />
            {/* <div className="grid gap-4 text-white grid-cols-[repeat(auto-fill,minmax(150px,1fr))]">
              {TvShowsData.map((movie: any) => (
                <div className="movies" key={movie.id}>
                  <img
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}></img>
                  <div>{movie.name}</div>
                  <div>{movie.vote_average.toFixed(1)}</div>

                  <br />
                </div>
              ))} */}
            {/* </div> */}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default App;
