import React from "react";
import { LuCalendarFold } from "react-icons/lu";
import { RiPushpinLine } from "react-icons/ri";
import { RiPushpinFill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

const NoteCard = ({
  title,
  formattedDate,
  weekday,
  content,
  tags,
  isPinned,
  onEdit,
  onDelete,
  onPinNote,
}) => {

  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 ease-in-out overflow-hidden flex flex-col h-full relative hover:-translate-y-1 before:content-[''] before:absolute before:top-0 before:left-0 before:w-1 before:h-full">
      <div className="flex bg-linear-to-r from-indigo-200 via-violet-200 to-purple-200 p-4 items-center justify-between border-b border-indigo-100">
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-2 rounded-full shadow-sm">
          <LuCalendarFold className="text-base text-indigo-600" />
          <span className="text-indigo-700 font-semibold text-sm">
            {formattedDate}
          </span>
          {", "}
          <span className="text-gray-500 text-xs font-medium">{weekday}</span>
        </div>

        {isPinned ? (
          <RiPushpinFill
            className="icon-btn text-2xl transition-all duration-200 hover:scale-110 hover:rotate-12 text-red-500 cursor-pointer"
            onClick={onPinNote}
          />
        ) : (
          <RiPushpinLine
            className="icon-btn text-2xl transition-all duration-200 hover:scale-110 hover:rotate-12 text-gray-400 hover:text-indigo-600 cursor-pointer"
            onClick={onPinNote}
          />
        )}
      </div>

      <h6 className="font-semibold text-xl text-gray-800 px-5 pt-4 truncate">
        {title}
      </h6>

      <p className="text-sm text-gray-600 px-5 pb-1 mt-3 line-clamp-3 wrap-break-word leading-relaxed">
        {content}
      </p>

      <div className="mt-auto flex items-center justify-between px-5 pb-4 pt-4 border-t border-gray-200">
        <div className="flex flex-wrap gap-2 max-w-[70%]">{tags}</div>

        <div className="flex items-center gap-3 shrink-0">
          <span
            className="icon-btn text-indigo-600 transition-all cursor-pointer rounded-md hover:bg-indigo-100 p-1.5 hover:-translate-y-1"
            onClick={onEdit}
          >
            {" "}
            <FiEdit />{" "}
          </span>
          <span
            className="icon-btn text-indigo-600 transition-all cursor-pointer rounded-md hover:bg-indigo-100 p-1.5 hover:-translate-y-1"
            onClick={onDelete}
          >
            {" "}
            <RiDeleteBin6Line />{" "}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
