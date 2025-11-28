import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../lib/api";

const TicketSuccess = () => {
  const { id } = useParams(); // Ticket ID from Checkout
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const res = await api.get(`/tickets/${id}`);
        console.log("Ticket data fetched:", res.data); // <-- debugging
        setTicket(res.data);
      } catch (err) {
        console.error("Error fetching ticket:", err);
        setError("Failed to load ticket. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchTicket();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <p className="text-xl text-gray-300">Loading your ticket...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center bg-gray-800/50 p-8 rounded-2xl border border-red-500/30">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-red-400 mb-2">Ticket Not Found</h2>
          <p className="text-gray-300">{error}</p>
        </div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center bg-gray-800/50 p-8 rounded-2xl border border-yellow-500/30">
          <div className="text-6xl mb-4">🎫</div>
          <h2 className="text-2xl font-bold text-yellow-400 mb-2">No Ticket Data</h2>
          <p className="text-gray-300">Unable to load ticket information.</p>
        </div>
      </div>
    );
  }

  const totalAmount = ticket.ticketsPurchased?.reduce((sum, t) => sum + (t.price * t.quantity), 0) || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 py-12">
      <div className="container mx-auto px-4">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="text-8xl mb-6">Congratulations🎉</div>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
            Ticket Confirmed!
          </h1>
          <p className="text-2xl text-gray-400 max-w-2xl mx-auto">
            Thank you <span className="text-cyan-400 font-semibold">{ticket.buyerName}</span>! 
            Your tickets are ready and have been sent to your email.
          </p>
        </div>

        {/* Main Ticket Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-3xl border-2 border-cyan-500/30 shadow-2xl overflow-hidden">
            
            {/* Ticket Header */}
            <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-6 text-center">
              <h2 className="text-3xl font-bold text-white mb-2">Your E-Ticket</h2>
              <p className="text-cyan-100">Present this at the event entrance</p>
            </div>

            {/* Ticket Content */}
            <div className="p-8">
              {/* Buyer Info */}
              <div className="bg-gray-700/50 rounded-xl p-6 mb-6 border border-gray-600">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="bg-cyan-600 p-2 rounded-lg">👤</span>
                  Ticket Holder
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
                  <div>
                    <p className="text-gray-400">Name</p>
                    <p className="text-white font-semibold">{ticket.buyerName}</p>
                  </div>
                  {ticket.buyerEmail && (
                    <div>
                      <p className="text-gray-400">Email</p>
                      <p className="text-white font-semibold">{ticket.buyerEmail}</p>
                    </div>
                  )}
                  {ticket.buyerPhone && (
                    <div>
                      <p className="text-gray-400">Phone</p>
                      <p className="text-white font-semibold">{ticket.buyerPhone}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Tickets Purchased */}
              <div className="bg-gray-700/50 rounded-xl p-6 mb-6 border border-gray-600">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="bg-green-600 p-2 rounded-lg">🎫</span>
                  Tickets Purchased
                </h3>
                <div className="space-y-3">
                  {ticket.ticketsPurchased?.map((t, index) => (
                    <div key={index} className="flex justify-between items-center bg-gray-600/50 p-4 rounded-lg">
                      <div>
                        <h4 className="text-lg font-semibold text-white">{t.ticketType}</h4>
                        <p className="text-gray-400">Quantity: {t.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-cyan-400">${t.price * t.quantity}</p>
                        <p className="text-gray-400 text-sm">${t.price} each</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Total */}
                <div className="border-t border-gray-600 pt-4 mt-4">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span className="text-white">Total Paid</span>
                    <span className="text-green-400">${totalAmount}</span>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              {ticket.qrCode && (
                <div className="text-center">
                  <div className="bg-white p-6 rounded-2xl inline-block border-4 border-cyan-400 shadow-lg">
                    <img
                      src={ticket.qrCode}
                      alt="Ticket QR Code"
                      className="w-64 h-64 object-contain mx-auto"
                    />
                  </div>
                  <p className="text-gray-400 mt-4 text-lg font-semibold">
                    📱 Show this QR code at the event entrance
                  </p>
                </div>
              )}

              {/* Event ID */}
              <div className="text-center mt-6 p-4 bg-gray-700/30 rounded-xl">
                <p className="text-gray-400">Ticket Reference</p>
                <p className="text-cyan-400 font-mono text-sm">{ticket._id}</p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center mt-8">
            <p className="text-gray-400 text-lg">
              Your tickets have been emailed to you. See you at the event! 🎊
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketSuccess;