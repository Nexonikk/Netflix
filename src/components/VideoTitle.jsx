import React from "react";
import { IoPlay } from "react-icons/io5";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video text-white bg-gradient-to-r from-black opacity-90 pt-44 px-12 absolute">
      <h1 className="text-l -mx-2 md:-mx-0 mt-4 md:mt-0  md:text-5xl font-bold md:w-1/4">
        {title}
      </h1>
      <p className="py-2 md:py-4 text-xs hidden md:inline-block md:text-sm md:w-1/4">
        {overview}
      </p>
      {/* <div className="flex">
        <button className="bg-white flex text-black p-4 px-12 text-xl rounded-lg hover:opacity-80 transition-all ">
          <IoPlay className="flex m-1" />
          Play
        </button>
        <button className="mx-2 bg-neutral-700 text-white p-4 px-12 text-xl bg-opacity-50 rounded-lg hover:bg-neutral-600 transition-all">
          More Info
        </button>
      </div> */}
    </div>
  );
};

export default VideoTitle;
