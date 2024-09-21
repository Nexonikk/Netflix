/* eslint-disable react/prop-types */
import { useEffect, useRef, useState, useCallback } from "react";
import MovieCard from "./MovieCard";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";

const MovieList = ({ title, movies}) => {
  const scrollContainerRef = useRef(null);
  const [atStart, setAtStart] = useState(true);


  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
      setAtStart(false);
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
      if (scrollContainerRef.current.scrollLeft <= 100) {
        setAtStart(true);
      }
    }
  };

  // Memoize handleScroll to prevent re-creation on every render
  const handleScroll = useCallback(() => {
    if (scrollContainerRef.current) {
      setAtStart(scrollContainerRef.current.scrollLeft === 0);
    }
  }, []);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  useEffect(() => {
    console.log(movies);
  }, [movies]);

  return (
    <div className="px-0 md:px-6 md:pb-2">
      <h1 className="text-xl md:text-3xl py-4 text-white">{title}</h1>
      {!atStart && (
          <button
            onClick={scrollLeft}
            className="hidden md:flex absolute z-10 left-16 mt-28"
          >
            <MdArrowBackIos size={45} color="white" />
          </button>
        )}
      <div className="relative flex overflow-x-auto no-scrollbar" ref={scrollContainerRef}>
        <div className="flex space-x-4">
          {movies?.map((movie) => (
            <MovieCard  key={movie.id} idx={movie.id}  posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
      <button
          onClick={scrollRight}
          className="hidden md:flex absolute right-10 -mt-40"
          >
          <MdArrowForwardIos size={45} color="white" />
        </button>
    </div>
  );
};

export default MovieList;
