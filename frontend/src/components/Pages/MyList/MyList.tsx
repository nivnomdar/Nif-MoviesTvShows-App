import { useEffect, useRef, useState } from "react";
import { SidebarProvider } from "../../../contexts/SidebarContext";
import { Header } from "../../Layout/Header";
import { Sidebar } from "../../Layout/Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { WatchWeb } from "../../Redux/Store";
import { downloadFavoritesAction } from "../../Redux/ListReducer";
import ListShowCard from "./ShowMyList/ListCard";

interface Favorite {
  id: number;
  movieorshow_id: number;
  title: string;
  media_type: string;
  poster_path: string;
  backdrop_path: string;
  genre_ids: { id: number; name: string }[];
  release_date: string;
  vote_average: number;
  date_added: string;
}

function MyList() {
  const navigate = useNavigate();
  const [detailedList, setDetailedList] = useState<Favorite[]>([]);
  const elementRef = useRef<HTMLDivElement | null>(null); // Specify the type

  useEffect(() => {
    getAllTvList();
  }, []);

  const getAllTvList = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/nifweb/api/v1/mylist"
      );
      const result = response.data;
      console.log(result);
      setDetailedList(result);
      WatchWeb.dispatch(downloadFavoritesAction(result));
    } catch (error) {
      console.error("Error fetching the list of favorites:", error);
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

          <div className="overflow-x-hidden p-8 px-8 md:px-16">
            <div className="text-white text-left text-2xl mb-4 underline">
              <div>My list</div>
            </div>

            <div
              ref={elementRef}
              className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 scrollbar-none gap-8 pt-5 px-3 pb-5">
              {detailedList.map((item, index) => (
                <ListShowCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default MyList;
