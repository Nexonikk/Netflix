import React, { useEffect, useState } from "react";
import { IMG_CDN_URL } from "../utils/constant";
import { IoPlay } from "react-icons/io5";
import { IoCloseOutline } from "react-icons/io5";

const MovieCard = ({ posterPath }) => {
  const [showModal, setShowModal] = useState(false);

  function ShowTrailer() {
    useEffect(() => {
      document.body.style.overflowY = "hidden";
      return () => {
        document.body.style.overflowY = "scroll";
      };
    }, []);
    return (
      <>
        <div className="fixed left-0 right-0 top-0 bottom-0 bg-gradient-to-t from-black  z-20"></div>

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
            src="https://www.youtube.com/embed/EDzJnQqliEo?si=jgtyHhLKDpuK2XY5"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          ></iframe>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="w-32 md:w-44 pr-4 z-10 transform hover:scale-105 transition duration-500 ease-in-out">
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
