import React, { useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";
import { MdLibraryAdd } from "react-icons/md";


const TagInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  function addNewTag() {
    if (inputValue.trim() !== "") {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      addNewTag();
    }
  }

  function handleRemovetag(tagToRemove) {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  }

  return (
    <div>
      {tags?.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap mt-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className=" bg-indigo-100 flex gap-3 items-center text-indigo-700 px-3 py-1 rounded-2xl text-sm font-medium hover:bg-indigo-600 hover:text-white transition-all duration-200 cursor-pointer"
            >
              # {tag}
              <button
                onClick={() => {
                  handleRemovetag(tag);
                }}
              >
                <MdClose className="cursor-pointer" />
              </button>
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 mt-3">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className=" text-sm bg-indigo-50/50 border border-indigo-200 text-indigo-700 font-medium px-3 py-2 rounded-md outline-none"
          placeholder="Add tags"
        />

        <button
          className=" w-8 h-8 flex items-center justify-center rounded border-2 border-indigo-200 hover:border-indigo-500 hover:border hover:bg-indigo-500 "
          onClick={() => {
            addNewTag();
          }}
        >
          <MdAdd className="text-2xl w-full h-full text-indigo-500 hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
