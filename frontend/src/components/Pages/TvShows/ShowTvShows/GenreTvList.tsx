import genre from "../../../../data/TvShowsGenre";
import TvList from "./TvList";

function GenereTvList() {
  return (
    <div>
      {genre.TvShowsGenre.map((item, index) => (
        <div key={item.id} className="p-4 px-8 md:px-16">
          <h2 className="text-[20px] text-white font-bold">{item.name}</h2>
          <TvList genreId={item.id} />
        </div>
      ))}
    </div>
  );
}

export default GenereTvList;
