import { useNavigate } from "react-router-dom";
import { Movie } from "../Modals/MovieModal";
import { TvShow } from "../Modals/TvShowModal";

interface HomeCardProps {
  item: Movie | TvShow;
}

function HomeCard({ item }: HomeCardProps) {
  const navigate = useNavigate();

  return (
    <>
      <img
        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
        className="w-[150px] md:w-[200px] rounded-lg
        hover:border-[3px] border-blue-400 cursor-pointer
        hover:scale-110 transition-all duration-150 ease-in"
        onClick={() => {
          item.media_type === "tv"
            ? navigate(`/tvshows/${item.id}`)
            : navigate(`/movies/${item.id}`);
        }}
      />
    </>
  );
}
export default HomeCard;
