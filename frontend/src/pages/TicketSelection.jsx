import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../lib/api";

const TicketSelection = () => {
  const { id } = useParams(); // Event ID
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        console.error("Error loading event:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const handleProceed = () => {
    if (!selectedTicket) {
      alert("Please select a ticket type to continue");
      return;
    }

    const ticketInfo = event.ticketTypes.find(t => t.name === selectedTicket);
    const cart = {
      eventId: event._id,
      eventTitle: event.title,
      eventDate: event.date,
      eventVenue: event.venue,
      tickets: [{ ticketType: ticketInfo.name, quantity: 1, price: ticketInfo.price }]
    };
    localStorage.setItem("cart", JSON.stringify(cart));

    navigate(`/checkout/${event._id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-xl text-gray-300">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center bg-gray-800/50 p-8 rounded-2xl border border-red-500/30">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-red-400 mb-2">Event Not Found</h2>
          <p className="text-gray-300">The event you're looking for doesn't exist.</p>
          <button 
            onClick={() => navigate("/events")}
            className="mt-4 bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg transition-all duration-300"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Select Your Tickets
          </h1>
          <p className="text-xl text-gray-400">Choose your preferred ticket type and proceed to checkout</p>
        </div>

        {/* Main Card Container */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-3xl border-2 border-gray-700 shadow-2xl overflow-hidden">
            
            {/* Event Banner */}
            <div className="relative">
              <img
                src={event.bannerImage}
                alt={event.title}
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
              <div className="absolute bottom-4 left-6 right-6">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-lg">
                  {event.title}
                </h1>
                <div className="flex flex-wrap gap-4 text-gray-300">
                  <span className="flex items-center gap-2">
                    📍 {event.venue}
                  </span>
                  <span className="flex items-center gap-2">
                    🗓️ {new Date(event.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="p-8">
              {/* Ticket Selection */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <span className="bg-cyan-600 p-2 rounded-lg">🎫</span>
                  Available Ticket Types
                </h2>
                <div className="space-y-4">
                  {event.ticketTypes?.map(ticket => (
                    <button
                      key={ticket.name}
                      onClick={() => setSelectedTicket(ticket.name)}
                      className={`w-full p-6 rounded-xl border-2 transition-all duration-300 flex justify-between items-center text-left group ${
                        selectedTicket === ticket.name
                          ? "bg-cyan-600/20 border-cyan-400 shadow-lg shadow-cyan-500/20 transform scale-105"
                          : "bg-gray-700/50 border-gray-600 hover:bg-gray-700 hover:border-gray-500 hover:transform hover:scale-102"
                      }`}
                    >
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-1">
                          {ticket.name}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {ticket.description || "Standard admission ticket"}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-cyan-400">
                          ${ticket.price}
                        </div>
                        <div className="text-sm text-gray-400 mt-1">
                          {ticket.available !== undefined && `${ticket.available} available`}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Ticket Summary */}
              {selectedTicket && (
                <div className="bg-gray-700/50 border border-cyan-500/30 rounded-xl p-6 mb-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Selected Ticket</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">{selectedTicket}</span>
                    <span className="text-xl font-bold text-cyan-400">
                      ${event.ticketTypes.find(t => t.name === selectedTicket)?.price}
                    </span>
                  </div>
                </div>
              )}

              {/* Proceed Button */}
              <button
                onClick={handleProceed}
                disabled={!selectedTicket}
                className={`w-full py-4 rounded-xl text-xl font-bold shadow-lg transition-all duration-300 transform ${
                  selectedTicket
                    ? "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 hover:scale-105 hover:shadow-cyan-500/25 text-white"
                    : "bg-gray-600 text-gray-400 cursor-not-allowed"
                }`}
              >
                {selectedTicket ? "🎟️ Proceed to Checkout" : "Select a Ticket Type"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketSelection;