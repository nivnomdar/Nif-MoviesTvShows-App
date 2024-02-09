import { useParams } from "react-router-dom";
import { SidebarProvider } from "../../../contexts/SidebarContext";
import { Header } from "../../Layout/Header";
import { Sidebar } from "../../Layout/Sidebar";
import { useEffect, useState } from "react";
import CategoriesCard from "./ShowCategories/CategoriesCard";
import axios from "axios";
import { TvShow } from "../../Modals/TvShowModal";
import { Movie } from "../../Modals/MovieModal";
import { shuffleArray } from "../../../contexts/ShuffleArray";

function CategoryPlayer() {
  const params = useParams();
  const NifApiKey = "560092ab89064b4982288bf6673d7996";
  const TMDbBaseUrl = "https://api.themoviedb.org/3";

  const [allResultsByGenre, setAllResultsByGenre] = useState<
    Movie[] | TvShow[]
  >([]);
  const genreId = params.categoryid?.toString(); // Ensure genreId is a string

  useEffect(() => {
    findResults();
  }, [genreId]);

  const findResults = async () => {
    try {
      // console.log("genreId -", genreId);
      if (genreId) {
        const movies = await fetchMoviesByGenre(genreId);
        const tvShows = await fetchTvShowsByGenre(genreId);
        const allResults = [...movies, ...tvShows];
        const shuffledResults = shuffleArray(allResults);

        // console.log("allResults -", allResults);

        setAllResultsByGenre(shuffledResults);
      } else {
        setAllResultsByGenre([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchMoviesByGenre = async (genreId: any) => {
    const response = await axios.get(
      `${TMDbBaseUrl}/discover/movie?api_key=${NifApiKey}&with_genres=${genreId}`
    );
    const movies = response.data.results.map((movie: Movie) => ({
      ...movie,
      media_type: "movie",
    }));
    return movies;
  };

  const fetchTvShowsByGenre = async (genreId: any) => {
    const response = await axios.get(
      `${TMDbBaseUrl}/discover/tv?api_key=${NifApiKey}&with_genres=${genreId}`
    );
    const tvShows = response.data.results.map((tvShow: TvShow) => ({
      ...tvShow,
      media_type: "tv",
    }));
    return tvShows;
  };

  return (
    <SidebarProvider>
      <div className="max-h-screen flex flex-col">
        <Header />
        <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
          <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
            <Sidebar />
          </div>

          <div className="overflow-x-hidden p-8 px-8 md:px-16">
            <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 scrollbar-none gap-8 pt-5 px-3 pb-5">
              {allResultsByGenre.map((item, index) => (
                <CategoriesCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default CategoryPlayer;
