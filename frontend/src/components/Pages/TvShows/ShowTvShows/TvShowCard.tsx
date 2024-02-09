import { useNavigate, useParams } from "react-router-dom";
import { TvShow } from "../../../Modals/TvShowModal";

function TvShowCard({ tvShow }: { tvShow: TvShow }) {
  const navigate = useNavigate();

  return (
    <>
      <img
        src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`}
        onClick={() => {
          console.log("Clicked! ID: ", tvShow.id);
          navigate(`/tvShows/${tvShow.id}`);
        }}
        className="w-[150px] md:w-[200px] rounded-lg
        hover:border-[3px] border-blue-400 cursor-pointer
        hover:scale-110 transition-all duration-150 ease-in"
      />
    </>
  );
}

export default TvShowCard;
