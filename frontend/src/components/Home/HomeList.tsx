import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Movie } from "../Modals/MovieModal";
import { TvShow } from "../Modals/TvShowModal";
import { ChevronLeft, ChevronRight } from "lucide-react";
import HomeCard from "./HomeCard";

// interface HomeListProps {
//   genreId: any;
// }

function HomeList({ genreId }: { genreId: any }) {
  const [allItemsByGenre, setAllItemsByGenre] = useState<TvShow[] | Movie[]>(
    []
  );
  const elementRef = useRef<HTMLDivElement | null>(null); // Specify the type

  const NifApiKey = "560092ab89064b4982288bf6673d7996";
  const TMDbBaseUrl = "https://api.themoviedb.org/3";

  useEffect(() => {
    findResults();
  }, []);

  const findResults = async () => {
    try {
      if (genreId) {
        const movies = await fetchMoviesByGenre(genreId);
        const tvShows = await fetchTvShowsByGenre(genreId);
        const allResults = [...movies, ...tvShows];
        // console.log(allResults);
        setAllItemsByGenre(allResults);
      } else {
        setAllItemsByGenre([]);
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

  const calculateScrollDistance = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1024) {
      // Large screen
      return 1392;
    } else if (screenWidth >= 768) {
      // Medium screen
      return 695;
    } else {
      // Small screen
      return 465;
    }
  };

  const slideRight = () => {
    if (elementRef.current) {
      elementRef.current.scrollLeft += calculateScrollDistance();
    }
  };
  const slideLeft = () => {
    if (elementRef.current) {
      elementRef.current.scrollLeft -= calculateScrollDistance();
    }
  };

  return (
    <div className="relative">
      <ChevronLeft
        onClick={slideLeft}
        className="hidden md:block text-[30px] text-white mx-3 cursor-pointer z-10 absolute mt-[155px]"
      />
      <ChevronRight
        onClick={slideRight}
        className="hidden md:block text-[30px] text-white mx-15 cursor-pointer z-10 absolute right-0 mt-[155px]"
      />
      <div
        ref={elementRef}
        className="flex overflow-x-auto gap-8
        scrollbar-none scroll-smooth pt-5 px-3 pb-5">
        {allItemsByGenre.map((item, index) => (
          <HomeCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default HomeList;
