import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addTrendingMovies } from "../utils/moviesSlice";

const useTrendingMovies = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getTrendingMovies = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        API_OPTIONS
      );
      const response = await data.json();
      console.log(response);
      dispatch(addTrendingMovies(response.results));
    };
    getTrendingMovies();
  }, []);
};
export default useTrendingMovies;
