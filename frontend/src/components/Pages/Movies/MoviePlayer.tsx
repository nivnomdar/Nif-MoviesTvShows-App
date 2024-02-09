import { useParams } from "react-router-dom";
import { SidebarProvider } from "../../../contexts/SidebarContext";
import { Header } from "../../Layout/Header";
import { Sidebar } from "../../Layout/Sidebar";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "../../Buttons/Buttons";
import { MinusCircle, PlusCircle } from "lucide-react";
import { FullMovieModel } from "../../Modals/FullMovieModel";

interface Favorite {
  movieorshow_id: number;
  title: string;
  media_type: string;
  poster_path: string;
  backdrop_path: string;
  genre_ids: Array<{ id: number; name: string }>;
  release_date: string;
  vote_average: number;
}

export function MoviePlayer() {
  const params = useParams();

  const NifApiKey = "560092ab89064b4982288bf6673d7996";
  //https://api.themoviedb.org/3/movie/9453?api_key=560092ab89064b4982288bf6673d7996
  const SearchAPI = `https://api.themoviedb.org/3/movie/${params.id}?api_key=${NifApiKey}`;
  const [thisMoviePlayer, setThisMoviePlayer] = useState<FullMovieModel>();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        await axios
          .get(SearchAPI)
          .then((response) => response.data)
          .then((result) => {
            console.log("API has found the movie", result);
            setThisMoviePlayer(result);
          });
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };
    fetchMovieData();
    checkIfFavrotie();
  }, [params.id, SearchAPI]);

  const checkIfFavrotie = async () => {
    try {
      const isFavoriteResponse = await axios.get(
        `http://localhost:4000/nifweb/api/v1/checkIfInList/${params.id}`
      );
      const isCurrentlyFavorite = isFavoriteResponse.data;
      setIsFavorite(isCurrentlyFavorite);
      console.log("Currenty: ", isCurrentlyFavorite);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddFavrotie = async () => {
    const newFavorite: Favorite = {
      movieorshow_id: thisMoviePlayer?.id!,
      title: thisMoviePlayer?.title || "",
      media_type: "movie",
      poster_path: thisMoviePlayer?.poster_path || "",
      backdrop_path: thisMoviePlayer?.backdrop_path || "",
      genre_ids: thisMoviePlayer?.genres || [],
      release_date: thisMoviePlayer?.release_date || "",
      vote_average: thisMoviePlayer?.vote_average || 0,
    };

    try {
      if (isFavorite === false) {
        const response = await axios.post(
          "http://localhost:4000/nifweb/api/v1/addToList",
          newFavorite
        );
        console.log("added successfully to your list!", response.data);
      } else {
        const response = await axios.delete(
          `http://localhost:4000/nifweb/api/v1/deleteFromList/${thisMoviePlayer?.id}`
        );
        console.log("Deleted from your list!", response.data);
      }
      setIsFavorite(!isFavorite);
      console.log("Changed to: ", !isFavorite);
    } catch (error) {
      console.error(error);
    }
  };

  // console.log(thisMoviePlayer);
  return (
    <SidebarProvider>
      <div className="max-h-screen flex flex-col">
        <Header />
        <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
          <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
            <Sidebar />
          </div>
          <div className="overflow-x-auto px-8 pb-4">
            <img
              src={`https://image.tmdb.org/t/p/w500/${thisMoviePlayer?.poster_path}`}
              alt={thisMoviePlayer?.original_title}
            />

            {isFavorite ? (
              <Button
                onClick={handleAddFavrotie}
                className="flex items-center rounded-lg p-3">
                <MinusCircle size={32} className="w-6 h-6" strokeWidth={1.75} />
                <div className="whitespace-nowrap overflow-hidden text-ellipsis"></div>
              </Button>
            ) : (
              <Button
                onClick={handleAddFavrotie}
                className="flex items-center rounded-lg p-3">
                <PlusCircle size={32} className="w-6 h-6" />
                <div className="whitespace-nowrap overflow-hidden text-ellipsis "></div>
              </Button>
            )}

            <div className="text-2xl font-bold text-white mb-2">
              {thisMoviePlayer?.original_title}
            </div>
            <div className="text-white mb-2">{thisMoviePlayer?.overview}</div>
            <div className="text-white mb-2">
              <strong>Original Language:</strong>
              {thisMoviePlayer?.original_language}
            </div>
            <div className="text-white mb-2">
              <strong>Length of the movie:</strong>
              {thisMoviePlayer?.runtime} minutes
            </div>

            <div className="text-white mb-2">
              <strong>First Air Date:</strong> {thisMoviePlayer?.release_date}
            </div>
            <div className="text-white mb-2">
              <strong>Vote Average:</strong>{" "}
              {thisMoviePlayer?.vote_average.toFixed(1)}
            </div>
            <div className="text-white mb-2"></div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
