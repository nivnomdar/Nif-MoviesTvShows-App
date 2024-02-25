import "./App.css";
import { Header } from "./components/Layout/Header";
import { Sidebar } from "./components/Layout/Sidebar";
import { SidebarProvider } from "./contexts/SidebarContext";
import HomeGenre from "./components/Home/HomeGenre";
import FavoriteList from "./components/Lists/FavoriteList/FavoriteList";

function App() {
  // console.log(TvShowsData);

  return (
    <SidebarProvider>
      <div className="max-h-screen flex flex-col">
        <Header />
        <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
          <div className="grid grid-cols-[auto,1fr] flex-grow-1 overflow-auto">
            <Sidebar />
          </div>

          <div className="overflow-x-auto px-8 pb-4">
            {/* <Slider /> */}
            <FavoriteList />
            <HomeGenre />
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default App;
