import React, { Dispatch, SetStateAction, useState } from "react";

interface Props {
  selected: Array<string>;
  setSelected: Dispatch<SetStateAction<Array<string>>>;
}

const CategoryBar: React.FC<Props> = ({ selected, setSelected }) => {
  const categories = ["daily", "development", "food", "travel", "gurume"];
  const onClick = (e: any) => {
    setSelected((prev) => {
      if (prev?.includes(e.target.innerHTML)) {
        return prev.filter((category) => category !== e.target.innerHTML);
      } else {
        if (prev) return [...prev, e.target.innerHTML];
        else return [e.target.innerHTML];
      }
    });
  };
  return (
    <div className="p-4 flex flex-wrap gap-2">
      {categories.map((category, index) => {
        if (selected?.includes(category)) {
          return (
            <button
              key={index}
              type="button"
              id={category}
              className="p-2 rounded-xl border-2 border-purple-400 font-bold text-lg cursor-pointer text-white bg-purple-400"
              onClick={onClick}
            >
              {category}
            </button>
          );
        } else {
          return (
            <button
              key={index}
              type="button"
              id={category}
              className="p-2 rounded-xl border-2 font-bold text-lg cursor-pointer"
              onClick={onClick}
            >
              {category}
            </button>
          );
        }
      })}
    </div>
  );
};

export default CategoryBar;
