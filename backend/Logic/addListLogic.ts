import { OkPacket } from "mysql";
import dal_mysql from "../Utils/dal_mysql";
import Favorite from "../Models/FavoriteModel";



const getAllList = async () => {
  const SQLcmd = `SELECT * FROM favorite`;
  const data = await dal_mysql.execute(SQLcmd);
  console.log("Fetching the list of favorites...");
  console.log(data);
  return data;
}; // http://localhost:4000/nifweb/api/v1/mylist


const deleteFromMyList = async (movieorshow_id: number) => {
  const SQLcmd = `DELETE FROM favorite WHERE movieorshow_id=${movieorshow_id}`;
  const data = await dal_mysql.execute(SQLcmd);
  return data;
};


const checkIfInList = async (movieorshow_id: number): Promise<boolean> => {
  const SQLcmd = `SELECT * FROM favorite WHERE movieorshow_id=${movieorshow_id}`;
  const data = await dal_mysql.execute(SQLcmd);

  // If there is any row returned, it means the show is already in the list
  return data.length > 0;
};

const addToMyList = async (addFavorite: Favorite) => {
  const SQLcmd = `
  INSERT INTO favorite
  (movieorshow_id, title, media_type, poster_path, backdrop_path, genre_ids, release_date, vote_average)
  VALUES
  (
  ${addFavorite.movieorshow_id},
  '${addFavorite.title}',
  '${addFavorite.media_type}',
  '${addFavorite.poster_path}',
  '${addFavorite.backdrop_path}',
  '${JSON.stringify(addFavorite.genre_ids)}',
  '${addFavorite.release_date}',
  ${addFavorite.vote_average}
  );
  `;
  //   INSERT INTO favorite
  //  (movieorshow_id, title, media_type)
  //   VALUES 
  //   (
  //   245,
	//   "test",
  //   "movie");

  // {
  //   "movieorshow_id": 555,
  //   "title": "Test",
  //   "media_type": "movie"
  // }
  console.log(SQLcmd);
  const result: OkPacket = await dal_mysql.execute(SQLcmd);
  return result.insertId;
};  // http://localhost:4000/nifweb/api/v1/addToList






export { getAllList, addToMyList, deleteFromMyList, checkIfInList };
