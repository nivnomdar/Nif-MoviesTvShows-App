import { useParams } from "react-router-dom";
import { Sidebar } from "../../Layout/Sidebar";
import { Header } from "../../Layout/Header";
import { SidebarProvider } from "../../../contexts/SidebarContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { FullTvShow } from "../../Modals/FullTvShowModal";
import { Plus } from "lucide-react";
import { Button } from "../../Buttons/Buttons";

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

function TvPlayer() {
  const params = useParams();

  const NifApiKey = "560092ab89064b4982288bf6673d7996";
  const SearchAPI = `https://api.themoviedb.org/3/tv/${params.id}?api_key=${NifApiKey}`;
  const [thisTvPlayer, setThisTvPlayer] = useState<FullTvShow>();
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchTvData = async () => {
      try {
        await axios
          .get(SearchAPI)
          .then((response) => response.data)
          .then((result) => {
            console.log("API has found the tv-show", result);
            setThisTvPlayer(result);
          });
      } catch (error) {
        console.log("Error fetching tv-show data:", error);
      }
    };
    fetchTvData();
    checkIfFavorite();
  }, [params.id, SearchAPI]);

  const checkIfFavorite = async () => {
    try {
      // checking if the show is already in the list
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
      movieorshow_id: thisTvPlayer?.id!,
      title: thisTvPlayer?.name || "",
      media_type: "tv",
      poster_path: thisTvPlayer?.poster_path || "",
      backdrop_path: thisTvPlayer?.backdrop_path || "",
      genre_ids: thisTvPlayer?.genres || [],
      release_date: thisTvPlayer?.first_air_date || "",
      vote_average: thisTvPlayer?.vote_average || 0,
    };

    try {
      if (isFavorite === false) {
        // add to my list
        const response = await axios.post(
          "http://localhost:4000/nifweb/api/v1/addToList",
          newFavorite
        );
        console.log("added successfully to your list!", response.data);
      } else {
        // delete from my list
        const response = await axios.delete(
          `http://localhost:4000/nifweb/api/v1/deleteFromList/${thisTvPlayer?.id}`
        );
        console.log("Deleted from your list!", response.data);
      }
      // Toggle isInList state after the API call
      setIsFavorite(!isFavorite);
      console.log("Changed to: ", !isFavorite);
    } catch (error) {
      console.error(error);
    }
  };

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
              src={`https://image.tmdb.org/t/p/w500${thisTvPlayer?.poster_path}`}
              alt={thisTvPlayer?.name}
            />

            <Button
              onClick={handleAddFavrotie}
              className="flex items-center rounded-lg gap-4 p-3">
              <Plus className="w-6 h-6" />
              <div className="whitespace-nowrap overflow-hidden text-ellipsis">
                {isFavorite ? "Remove from list" : "Add to list"}
              </div>
            </Button>

            <div className="text-2xl font-bold text-white mb-2">
              {thisTvPlayer?.name}
            </div>
            <div className="text-white mb-2">{thisTvPlayer?.overview}</div>
            <div className="text-white mb-2">
              <strong>Original Language:</strong>{" "}
              {thisTvPlayer?.original_language}
            </div>
            <div className="text-white mb-2">
              <strong>First Air Date:</strong> {thisTvPlayer?.first_air_date}
            </div>
            <div className="text-white mb-2">
              <strong>Vote Average:</strong>{" "}
              {thisTvPlayer?.vote_average.toFixed(1)}
            </div>
            <div className="text-white mb-2">
              <strong>Seasons:</strong> {thisTvPlayer?.number_of_seasons}
            </div>
            <div className="text-white mb-2">
              <strong>Episods:</strong> {thisTvPlayer?.number_of_episodes}
            </div>
            <div className="text-white mb-2">
              <strong>Home page website:</strong>{" "}
              <a
                className="underline"
                href={thisTvPlayer?.homepage}
                target="_blank">
                {thisTvPlayer?.homepage}
              </a>
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default TvPlayer;
