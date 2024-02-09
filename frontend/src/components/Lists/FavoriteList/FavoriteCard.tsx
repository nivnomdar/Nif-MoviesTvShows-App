import { useNavigate } from "react-router-dom";
import Favorite from "../../Modals/FavoriteModel";

interface FavoriteCardProps {
  item: Favorite;
}

function FavoriteCard({ item }: FavoriteCardProps) {
  const navigate = useNavigate();

  return (
    <>
      <img
        src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
        onClick={() => {
          item.media_type === "tv"
            ? navigate(`/tvshows/${item.movieorshow_id}`)
            : navigate(`/movies/${item.movieorshow_id}`);
        }}
        className="w-[150px] md:w-[200px] rounded-lg
        hover:border-[3px] border-blue-400 cursor-pointer
        hover:scale-110 transition-all duration-150 ease-in"
      />
    </>
  );
}

export default FavoriteCard;
