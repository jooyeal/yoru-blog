import React from "react";
import { FaSpinner } from "react-icons/fa";

type Props = {};

const Loading = (props: Props) => {
  return (
    <div className="w-screen h-screen fixed bg-black opacity-30 flex justify-center items-center z-50">
      <FaSpinner className="text-5xl text-white animate-spin" />
    </div>
  );
};

export default Loading;
