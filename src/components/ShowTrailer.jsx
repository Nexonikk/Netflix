import { useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";

export default  function ShowTrailer({id, setShowModal}) {
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