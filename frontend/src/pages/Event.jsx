import React, { useEffect, useState } from "react";
import { api } from "../lib/api";
import EventCard from "../components/EventCard";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");
        setEvents(res.data);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-xl text-gray-300">Loading amazing events...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center bg-gray-800/50 p-8 rounded-2xl border border-red-500/30">
          <div className="text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-red-400 mb-2">Oops!</h2>
          <p className="text-gray-300 text-lg">{error}</p>
        </div>
      </div>
    );
  }

  // Empty State
  if (events.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center bg-gray-800/50 p-8 rounded-2xl border border-gray-600">
          <div className="text-6xl mb-4">🎭</div>
          <h2 className="text-2xl font-bold text-gray-300 mb-2">No Events Yet</h2>
          <p className="text-gray-400">Check back later for exciting events!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 py-12">
      <div className="container mx-auto px-4">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Upcoming Events
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Discover unforgettable experiences and secure your spot at the most anticipated events
          </p>
        </div>

        {/* Enhanced Grid with Larger Cards */}
        <div className="
          grid 
          grid-cols-1 
          lg:grid-cols-2 
          xl:grid-cols-3 
          gap-10
          max-w-7xl 
          mx-auto
        ">
          {events.map((event) => (
            <EventCard key={event._id || event.id} event={event} />
          ))}
        </div>

        {/* Events Count */}
        <div className="text-center mt-16">
          <p className="text-gray-400 text-lg">
            Showing <span className="text-cyan-400 font-semibold">{events.length}</span> amazing events
          </p>
        </div>
      </div>
    </div>
  );
};

export default Events;