import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 shadow-xl border-b border-gray-700">
    <div className="container mx-auto flex justify-between items-center">
      <Link to="/" className="font-bold text-2xl bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent hover:from-cyan-300 hover:to-blue-400 transition-all duration-300">
        TikoSasa
      </Link>
      <div className="space-x-6">
        <Link 
          to="/events" 
          className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-cyan-400 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
        >
          Events
        </Link>
      </div>
    </div>
  </nav>
);

export default Navbar;