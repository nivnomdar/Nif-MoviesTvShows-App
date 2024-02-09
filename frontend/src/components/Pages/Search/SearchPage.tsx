import { useParams } from "react-router-dom";
import { SidebarProvider } from "../../../contexts/SidebarContext";
import { Header } from "../../Layout/Header";
import { Sidebar } from "../../Layout/Sidebar";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { TvShow } from "../../Modals/TvShowModal";
import { Movie } from "../../Modals/MovieModal";
import SearchCard from "./ShowSearch/SearchCard";

function SearchPage() {
  const params = useParams();
  const NifApiKey = "560092ab89064b4982288bf6673d7996";
  const SearchAPI = `https://api.themoviedb.org/3/search/multi?query=${params.searchtext}&api_key=${NifApiKey}`;
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [searchResult, setSearchResult] = useState<Movie[] | TvShow[]>([]);
  // console.log("Params: ", params.searchtext);

  useEffect(() => {
    getSearchApi();
  }, [params]);
  console.log("searchResult", searchResult);

  const getSearchApi = async () => {
    await axios
      .get(SearchAPI)
      .then((response) => response.data.results)
      .then((result) => {
        // console.log(result);
        setSearchResult(result);
      });
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
              <div>
                Results for: <b>{params.searchtext}</b>
              </div>
            </div>

            <div
              ref={elementRef}
              className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 scrollbar-none gap-8 pt-5 px-3 pb-5">
              {searchResult.map((item, index) => (
                <SearchCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default SearchPage;
