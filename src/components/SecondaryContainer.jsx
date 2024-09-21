import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);
  console.log(movies);

  // const nowPlayingMoviesId = movies.nowPlayingMovies?.map((movie) => movie.id);
  // console.log(nowPlayingMoviesId);

  return (
    <div className="mt-0 md:-mt-48 relative pl-10 z-20">
      <MovieList
        title={"Now Playing"}
        movies={movies.nowPlayingMovies}
      />
      <MovieList title={"Trending Movies"} movies={movies.trendingMovies} />
      <MovieList title={"Popular Movies"} movies={movies.popularMovies} />
      <MovieList title={"Upcoming Movies"} movies={movies.upcomingMovies} />
    </div>
  );
};

export default SecondaryContainer;
