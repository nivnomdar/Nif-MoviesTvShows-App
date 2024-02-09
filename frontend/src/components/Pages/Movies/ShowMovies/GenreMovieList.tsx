import genre from "../../../../data/MoviesGenre";
import MovieList from "./MovieList";

function GenereMovieList() {
  return (
    <div>
      {genre.MoviesGenre.map((item, index) => (
        <div key={item.id} className="p-8 px-8 md:px-16">
          <h2 className="text-[20px] text-white font-bold">{item.name}</h2>
          <MovieList genreId={item.id} />
        </div>
      ))}
    </div>
  );
}

export default GenereMovieList;
