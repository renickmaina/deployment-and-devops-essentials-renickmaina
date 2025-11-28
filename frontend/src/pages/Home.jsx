import React from "react";
import { Link } from "react-router-dom";

const Home = () => (
  <div className="bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 min-h-screen flex flex-col justify-center items-center text-center px-6">
    <h1 className="text-6xl md:text-7xl font-extrabold mb-6 text-white drop-shadow-lg">
      Welcome to <span className="text-cyan-400">TikoSasa</span>
    </h1>

    <p className="text-2xl md:text-3xl text-gray-300 mb-10 max-w-2xl leading-relaxed">
      Discover unforgettable events and get your tickets instantly.
    </p>

    <Link
      to="/events"
      className="bg-gray-700 hover:bg-gray-600 text-white px-10 py-4 rounded-xl text-2xl font-semibold shadow-xl transition-all duration-300 transform hover:scale-105 border border-gray-500 hover:border-cyan-400 hover:shadow-cyan-500/20"
    >
      Browse Events
    </Link>
  </div>
);

export default Home;