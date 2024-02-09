import { Route, Routes } from "react-router-dom";
import App from "../../App";
import Page404 from "../Pages/Page404/Page404";
import Movies from "../Pages/Movies/Movies";
import { TvShows } from "../Pages/TvShows/TvShows";
import Categories from "../Pages/Categories/Categories";
import TvPlayer from "../Pages/TvShows/TvPlayer";
import { MoviePlayer } from "../Pages/Movies/MoviePlayer";
import SearchPage from "../Pages/Search/SearchPage";
import CategoryPlayer from "../Pages/Categories/CategoryPlayer";
import MyList from "../Pages/MyList/MyList";

function MainRoute(): JSX.Element {
  return (
    <div className="MainRoute">
      <Routes>
        {/* <Route index element={<App />} /> */}
        <Route path="/" element={<App />} />
        <Route path="/home" element={<App />} />
        {/* <Route path="/register" element={<App />} /> */}
        {/* <Route path="/login" element={<App />} /> */}
        <Route path="/tvShows" element={<TvShows />} />
        <Route path="/tvShows/:id" element={<TvPlayer />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/movies/:id" element={<MoviePlayer />} />
        <Route path="/search/:searchtext" element={<SearchPage />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/categories/:categoryid" element={<CategoryPlayer />} />
        <Route path="/MyList" element={<MyList />} />

        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default MainRoute;
