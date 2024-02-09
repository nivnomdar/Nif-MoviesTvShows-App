import { useParams } from "react-router-dom";
import { SidebarProvider } from "../../../contexts/SidebarContext";
import { Header } from "../../Layout/Header";
import { Sidebar } from "../../Layout/Sidebar";
import GenereMovieList from "./ShowMovies/GenreMovieList";

function Movies(): JSX.Element {
  return (
    <SidebarProvider>
      <div className="max-h-screen flex flex-col">
        <Header />
        <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
          <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
            <Sidebar />
          </div>

          <div className="overflow-x-hidden px-8 pb-4">
            <GenereMovieList />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default Movies;
