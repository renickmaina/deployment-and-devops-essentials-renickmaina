import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../lib/api";

const Checkout = () => {
  const { id } = useParams(); // Event ID
  const navigate = useNavigate();

  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [cart, setCart] = useState({ tickets: [], eventId: null });
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load cart from localStorage
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) setCart(storedCart);

    // Fetch event info
    const fetchEvent = async () => {
      try {
        const res = await api.get(`/events/${id}`);
        setEvent(res.data);
      } catch (err) {
        console.error("Error fetching event:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handlePurchase = async () => {
    if (!buyerName) return alert("Name is required");
    if (!cart.tickets.length) return alert("Your cart is empty");

    try {
      const res = await api.post("/tickets/purchase", {
        eventId: cart.eventId,
        buyerName,
        buyerEmail,
        buyerPhone,
        tickets: cart.tickets,
      });
      localStorage.removeItem("cart");
      navigate(`/ticket/${res.data._id}`);
    } catch (err) {
      console.error("Purchase error:", err);
      alert("Error completing purchase");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-xl text-gray-300">Loading checkout details...</p>
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
          <p className="text-gray-300">Unable to load event details.</p>
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

  const totalAmount = cart.tickets.reduce((sum, ticket) => sum + (ticket.price * ticket.quantity), 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Checkout
          </h1>
          <p className="text-xl text-gray-400">Complete your purchase and secure your tickets</p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Event & Tickets */}
          <div className="space-y-6">
            {/* Event Card */}
            <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl border-2 border-gray-700 p-6 shadow-xl">
              <div className="flex items-start gap-4">
                <img
                  src={event.bannerImage}
                  alt={event.title}
                  className="w-24 h-24 object-cover rounded-xl"
                />
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{event.title}</h2>
                  <p className="text-gray-400 mb-1">📍 {event.venue}</p>
                  <p className="text-gray-400">
                    🗓️ {new Date(event.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Tickets Summary */}
            <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl border-2 border-gray-700 p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <span className="bg-cyan-600 p-2 rounded-lg">🎫</span>
                Your Tickets
              </h2>
              
              {cart.tickets.length ? (
                <div className="space-y-4">
                  {cart.tickets.map((ticket, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-700/50 p-4 rounded-xl border border-gray-600">
                      <div>
                        <h3 className="text-lg font-semibold text-white">{ticket.ticketType}</h3>
                        <p className="text-gray-400 text-sm">Quantity: {ticket.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-cyan-400">${ticket.price * ticket.quantity}</p>
                        <p className="text-gray-400 text-sm">${ticket.price} each</p>
                      </div>
                    </div>
                  ))}
                  
                  {/* Total */}
                  <div className="border-t border-gray-600 pt-4 mt-4">
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span className="text-white">Total Amount</span>
                      <span className="text-cyan-400">${totalAmount}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">🛒</div>
                  <p className="text-gray-400 text-lg">Your cart is empty</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Buyer Info */}
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl border-2 border-gray-700 p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="bg-cyan-600 p-2 rounded-lg">👤</span>
              Your Information
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-white font-semibold mb-3 text-lg">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={buyerName}
                  onChange={e => setBuyerName(e.target.value)}
                  className="w-full p-4 bg-gray-700 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 text-lg"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-3 text-lg">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  value={buyerEmail}
                  onChange={e => setBuyerEmail(e.target.value)}
                  className="w-full p-4 bg-gray-700 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 text-lg"
                />
              </div>

              <div>
                <label className="block text-gray-300 font-semibold mb-3 text-lg">
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="+1 (555) 123-4567"
                  value={buyerPhone}
                  onChange={e => setBuyerPhone(e.target.value)}
                  className="w-full p-4 bg-gray-700 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 text-lg"
                />
              </div>

              <button
                onClick={handlePurchase}
                disabled={!buyerName || !cart.tickets.length}
                className={`w-full py-4 rounded-xl text-xl font-bold shadow-lg transition-all duration-300 transform ${
                  buyerName && cart.tickets.length
                    ? "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 hover:scale-105 hover:shadow-cyan-500/25 text-white"
                    : "bg-gray-600 text-gray-400 cursor-not-allowed"
                }`}
              >
                {buyerName && cart.tickets.length ? "✅ Confirm Purchase" : "Complete Your Information"}
              </button>

              <p className="text-gray-400 text-sm text-center mt-4">
                * Required fields. Your tickets will be emailed to you after purchase.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;