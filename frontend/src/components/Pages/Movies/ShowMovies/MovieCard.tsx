import { useNavigate } from "react-router-dom";
import { Movie } from "../../../Modals/MovieModal";

function MovieCard({ movie }: { movie: Movie }) {
  const navigate = useNavigate();

  //   console.log(movie);
  return (
    <>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        onClick={() => {
          // console.log("Clicked! ID: ", movie.id);
          navigate(`/movies/${movie.id}`);
        }}
        className="w-[150px] md:w-[160px] rounded-lg
        hover:border-[3px] border-blue-400 cursor-pointer
        hover:scale-110 transition-all duration-150 ease-in"
      />
    </>
  );
}

export default MovieCard;
