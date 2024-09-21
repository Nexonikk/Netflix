/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { API_OPTIONS, IMG_CDN_URL } from "../utils/constant";
import { IoPlay } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";

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

  function ShowTrailer() {
    useEffect(() => {
      document.body.style.overflowY = "hidden";
      return () => {
        document.body.style.overflowY = "scroll";
      };
    }, []);


    return (
      <>
        <div className="fixed left-0 right-0 top-0 bottom-0 bg-gradient-to-t from-black z-20"></div>
      <div
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20
"
        >
          <IoCloseOutline
            onClick={() => setShowModal(false)}
            // onMouseOver={({ target }) => (target.style.color = "#c9c8c8")}
            // onMouseOut={(target) => (target.style.color = "white")}
            className="fixed bottom-[100%] left-[95%] size-10 justify-end hover:bg-red-600 transition-all ease-in"
            color="white"
          />
          <iframe
            className="z-30 rounded-lg"
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${id}?si=jgtyHhLKDpuK2XY5`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </>
    );
  }

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
      {showModal && <ShowTrailer />}
    </>
  );
};

export default MovieCard;
