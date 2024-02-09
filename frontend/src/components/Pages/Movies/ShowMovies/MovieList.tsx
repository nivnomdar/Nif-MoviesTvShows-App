import { useEffect, useRef, useState } from "react";
import { MoviesData } from "../../../../data/MoviesData";
import MovieCard from "./MovieCard";
import { Movie } from "../../../Modals/MovieModal";
import { ChevronRight, ChevronLeft } from "lucide-react";

function MovieList({ genreId }: { genreId: any }) {
  const [filteredMovies, setFilteredMovies] = useState<Movie[]>([]);
  const elementRef = useRef<HTMLDivElement | null>(null); // Specify the type

  useEffect(() => {
    getMoviesByGenreId();
  }, []);

  const getMoviesByGenreId = () => {
    const filteredMovies = MoviesData.filter((movie) =>
      movie.genre_ids.includes(genreId)
    );
    setFilteredMovies(filteredMovies);
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
        {filteredMovies.map((item, index) => (
          <MovieCard key={item.id} movie={item} />
        ))}
      </div>
    </div>
  );
}

export default MovieList;
