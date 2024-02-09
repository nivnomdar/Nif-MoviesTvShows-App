import { useEffect, useRef, useState } from "react";
import { TvShow } from "../../../Modals/TvShowModal";
import { ChevronLeft, ChevronRight } from "lucide-react";
import TvShowCard from "./TvShowCard";
import axios from "axios";
import { shuffleArray } from "../../../../contexts/ShuffleArray";

function TvList({ genreId }: { genreId: any }) {
  const [allTvShowsByGenre, setAllTvShowsByGenre] = useState<TvShow[]>([]);
  const elementRef = useRef<HTMLDivElement | null>(null); // Specify the type
  const NifApiKey = "560092ab89064b4982288bf6673d7996";
  const TMDbBaseUrl = "https://api.themoviedb.org/3";

  useEffect(() => {
    fetchTvShowsByGenre();
  }, [genreId]);

  const fetchTvShowsByGenre = async () => {
    try {
      if (genreId) {
        const response = await axios.get(
          `${TMDbBaseUrl}/discover/tv?api_key=${NifApiKey}&with_genres=${genreId}`
        );
        // console.log("response", response);
        const result = response.data.results;
        const shuffledResults = shuffleArray(result);
        setAllTvShowsByGenre(shuffledResults);
      } else {
        setAllTvShowsByGenre([]);
      }
    } catch (error) {
      console.error(error);
    }
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
        {allTvShowsByGenre.map((item, index) => (
          <TvShowCard key={item.id} tvShow={item} />
        ))}
      </div>
    </div>
  );
}

export default TvList;
