import { useRef } from "react";
import { Movie } from "../../../Modals/MovieModal";
import { useNavigate } from "react-router-dom";
import { TvShow } from "../../../Modals/TvShowModal";

interface CategoriesCardProps {
  item: Movie | TvShow;
}

function CategoriesCard({ item }: CategoriesCardProps) {
  const elementRef = useRef<HTMLDivElement | null>(null); // Specify the type
  const navigate = useNavigate();

  return (
    <>
      <div
        ref={elementRef}
        className="flex overflow-x-auto gap-8
        scrollbar-none scroll-smooth pt-5 px-3 pb-5">
        <img
          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          onClick={() => {
            item.media_type === "tv"
              ? navigate(`/tvshows/${item.id}`)
              : navigate(`/movies/${item.id}`);
          }}
          className="w-[150px] md:w-[200px] rounded-lg
        hover:border-[3px] border-blue-400 cursor-pointer
        hover:scale-110 transition-all duration-150 ease-in"
        />
      </div>
    </>
  );
}

export default CategoriesCard;
