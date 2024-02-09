class Favorite {
  public id: number;
  public movieorshow_id: number;
  public title: string;
  public media_type: string;
  public poster_path: string;
  public backdrop_path: string;
  public genre_ids: Array<{ id: number; name: string }>;
  public release_date: string;
  public vote_average: number;
  public date_added: string;

  constructor(
    id: number,
    movieorshow_id: number,
    title: string,
    media_type: string,
    poster_path: string,
    backdrop_path: string,
    genre_ids: Array<{ id: number; name: string }>,
    release_date: string,
    vote_average: number,
    date_added: string
  ) {
    this.id = id;
    this.movieorshow_id = movieorshow_id;
    this.title = title;
    this.media_type = media_type;
    this.poster_path = poster_path;
    this.backdrop_path = backdrop_path;
    this.genre_ids = genre_ids;
    this.release_date = release_date;
    this.vote_average = vote_average;
    this.date_added = date_added;
  }
}

export default Favorite;
