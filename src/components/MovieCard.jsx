/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { API_OPTIONS, IMG_CDN_URL } from "../utils/constant";
import { IoPlay } from "react-icons/io5";
// import { IoCloseOutline } from "react-icons/io5";
import ShowTrailer from "./ShowTrailer";

const MovieCard = ({ idx ,posterPath}) => {
  const [showModal, setShowModal] = useState(false);
  // const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  const [id, setId]= useState(null)
  
  useEffect(() => {
    if (!idx) return
    console.log(idx + "   KEEYEYYEYEYEYYEYEYEYEYEY")
    const getMoviesVideo = async () => {
      const data = await fetch(
        "https://api.themoviedb.org/3/movie/" +
        idx +
        "/videos?language=en-US",
        API_OPTIONS
      );
      const response = await data.json();
      console.log(response + "Responseee")

      const filterData = response.results?.filter(
        (video) => video.type === "Trailer"
      );
      console.log(filterData + "filterdtatatattata")
      const trailer = filterData.length ? filterData[0] : response.results[0];
      setId(trailer.key)
      console.log(trailer+"TRAILERX")
    };
    getMoviesVideo();
  }, [idx]);


  return (
    <>
      <div className="w-32 md:w-44 pr-4 transform hover:scale-105 transition duration-500 ease-in-out">
        <img
          src={IMG_CDN_URL + posterPath}
          alt="Movie Card"
          // onMouseOver={handleMouseOver}
        />
        <IoPlay size={30} color="white" onClick={() => setShowModal(true)} />
      </div>
      {showModal && <ShowTrailer id={id} setShowModal={setShowModal} />}
    </>
  );
};

export default MovieCard;
