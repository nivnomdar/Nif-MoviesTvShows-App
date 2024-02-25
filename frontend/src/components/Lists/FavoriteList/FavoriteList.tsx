import { useEffect, useRef, useState } from "react";
import Favorite from "../../Modals/FavoriteModel";
import { useNavigate } from "react-router-dom";
import { WatchWeb } from "../../Redux/Store";
import axios from "axios";
import { downloadFavoritesAction } from "../../Redux/ListReducer";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FavoriteCard from "./FavoriteCard";

function FavoriteList() {
  const [Favorites, setFavorites] = useState<Favorite[]>([]);
  const elementRef = useRef<HTMLDivElement | null>(null); // Specify the type

  useEffect(() => {
    getAllFavorites();
  }, []);

  const getAllFavorites = async () => {
    try {
      const respose = await axios.get(
        "http://localhost:4000/nifweb/api/v1/mylist"
      );
      const result = respose.data;
      console.log(result);

      setFavorites(result);
      WatchWeb.dispatch(downloadFavoritesAction(result));
    } catch (error) {
      console.error("Error fetching the list of favorites:", error);
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
    <div className="p-4 px-8 md:px-16">
      <h2 className="text-[20px] text-white font-bold">Favorites</h2>

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
          {Favorites.map((item, index) => (
            <FavoriteCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default FavoriteList;
