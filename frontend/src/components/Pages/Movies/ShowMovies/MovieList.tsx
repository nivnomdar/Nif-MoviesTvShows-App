import { useEffect, useRef, useState } from "react";
import MovieCard from "./MovieCard";
import { Movie } from "../../../Modals/MovieModal";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { shuffleArray } from "../../../../contexts/ShuffleArray";
import axios from "axios";

function MovieList({ genreId }: { genreId: any }) {
  const [allMoviesByGenre, setAllMoviesByGenre] = useState<Movie[]>([]);
  const elementRef = useRef<HTMLDivElement | null>(null); // Specify the type
  const NifApiKey = "560092ab89064b4982288bf6673d7996";
  const TMDbBaseUrl = "https://api.themoviedb.org/3";

  useEffect(() => {
    fetchMoviesByGenreId();
  }, [genreId]);

  const fetchMoviesByGenreId = async () => {
    try {
      if (genreId) {
        const response = await axios.get(
          `${TMDbBaseUrl}/discover/movie?api_key=${NifApiKey}&with_genres=${genreId}`
        );
        const result = response.data.results;
        const shuffledResults = shuffleArray(result);
        setAllMoviesByGenre(shuffledResults);
      } else {
        setAllMoviesByGenre([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const calculateScrollDistance = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1100) {
      // Large screen
      return 1392;
    } else if (screenWidth >= 980) {
      // Medium screen
      return 695;
    } else if (screenWidth >= 768) {
      // Medium screen
      return 465;
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
        {allMoviesByGenre.map((item, index) => (
          <MovieCard key={item.id} movie={item} />
        ))}
      </div>
    </div>
  );
}

export default MovieList;
