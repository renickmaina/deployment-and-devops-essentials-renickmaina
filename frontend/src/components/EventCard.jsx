import React from "react";
import { useNavigate } from "react-router-dom";

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    const eventId = event._id || event.id;
    navigate(`/events/${eventId}/tickets`);
  };

  return (
    <div
      onClick={handleClick}
      className="
        bg-white dark:bg-gray-800 
        rounded-xl border border-gray-200 dark:border-gray-700
        shadow-md hover:shadow-xl 
        cursor-pointer transition-all duration-300
        max-w-[260px]   /* 🔥 keeps the card small */
        mx-auto overflow-hidden
        group
      "
    >
      {/* Image */}
      <div className="h-28 overflow-hidden"> 
        <img
          src={event.bannerImage || 'https://via.placeholder.com/400x200'}
          alt={event.title}
          className="
            w-full h-full object-cover 
            transition-transform duration-300 
            group-hover:scale-110
          "
        />
      </div>

      {/* Content */}
      <div className="p-4">
        <h2 className="text-md font-bold mb-1 truncate">{event.title}</h2>

        <p className="text-gray-600 dark:text-gray-300 text-xs">
          📅 {new Date(event.date).toLocaleDateString()}
        </p>

        <p className="text-gray-600 dark:text-gray-300 text-xs mb-3">
          📍 {event.venue}
        </p>

        {/* View Event Button */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // prevents parent card click from firing
            handleClick();
          }}
          className="
            bg-blue-600 hover:bg-blue-700 
            text-white px-4 py-1.5 rounded-lg 
            text-xs font-medium transition-all duration-300
            w-full
          "
        >
          View Event
        </button>
      </div>
    </div>
  );
};

export default EventCard;
