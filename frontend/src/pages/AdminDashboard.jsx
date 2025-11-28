import React, { useState, useEffect } from "react";
import { api } from "../lib/api";

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [venue, setVenue] = useState("");
  const [bannerImage, setBannerImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [mode, setMode] = useState("create"); // "create" or "edit"

  // Ticket types
  const [ticketTypes, setTicketTypes] = useState([
    { name: "", price: "", totalAvailable: "" },
  ]);

  // Fetch all events on component mount
  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events");
      setEvents(res.data);
    } catch (err) {
      console.error("Error fetching events:", err);
      alert("Failed to load events");
    }
  };

  const handleTicketChange = (index, field, value) => {
    const updated = [...ticketTypes];
    updated[index][field] = value;
    setTicketTypes(updated);
  };

  const addTicketRow = () => {
    setTicketTypes([...ticketTypes, { name: "", price: "", totalAvailable: "" }]);
  };

  const removeTicketRow = (index) => {
    if (ticketTypes.length > 1) {
      const updated = ticketTypes.filter((_, i) => i !== index);
      setTicketTypes(updated);
    }
  };

  const handleImageChange = (e) => setBannerImage(e.target.files[0]);

  const resetForm = () => {
    setTitle("");
    setDate("");
    setVenue("");
    setBannerImage(null);
    setTicketTypes([{ name: "", price: "", totalAvailable: "" }]);
    setSelectedEvent(null);
    setMode("create");
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setTitle(event.title);
    setDate(event.date.split('T')[0]); // Format date for input
    setVenue(event.venue);
    setTicketTypes(event.ticketTypes || [{ name: "", price: "", totalAvailable: "" }]);
    setMode("edit");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
      return;
    }

    try {
      await api.delete(`/admin/events/${eventId}`);
      alert("Event deleted successfully!");
      fetchEvents(); // Refresh the list
      if (selectedEvent && selectedEvent._id === eventId) {
        resetForm();
      }
    } catch (err) {
      console.error("Error deleting event:", err);
      alert("Failed to delete event");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bannerImage && mode === "create") return alert("Select a banner image.");

    setUploading(true);

    try {
      let imageUrl = selectedEvent?.bannerImage;

      // Upload new image if provided
      if (bannerImage) {
        const formData = new FormData();
        formData.append("file", bannerImage);
        formData.append("upload_preset", "tikosasa");

        const cloudRes = await fetch(
          "https://api.cloudinary.com/v1_1/dawdotwyb/image/upload",
          { method: "POST", body: formData }
        );
        const cloudData = await cloudRes.json();
        imageUrl = cloudData.secure_url;
      }

      // Filter only valid ticket types
      const filteredTickets = ticketTypes.filter(
        (t) => t.name && t.price && t.totalAvailable
      );

      if (mode === "create") {
        // Create new event
        await api.post("/admin/events", {
          title,
          date,
          venue,
          bannerImage: imageUrl,
          ticketTypes: filteredTickets,
        });
        alert("Event created successfully!");
      } else {
        // Update existing event
        await api.put(`/admin/events/${selectedEvent._id}`, {
          title,
          date,
          venue,
          bannerImage: imageUrl,
          ticketTypes: filteredTickets,
        });
        alert("Event updated successfully!");
      }

      resetForm();
      fetchEvents(); // Refresh the list
    } catch (err) {
      console.error("Error saving event:", err);
      alert(`Error ${mode === "create" ? "creating" : "updating"} event.`);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-800 to-gray-900 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-xl text-gray-400">
            {mode === "create" ? "Create New Event" : `Editing: ${selectedEvent?.title}`}
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Event Form */}
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl border-2 border-gray-700 p-6 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Form Header */}
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-2xl font-bold text-white">
                  {mode === "create" ? "Create Event" : "Edit Event"}
                </h2>
                {mode === "edit" && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg transition-all duration-300"
                  >
                    + New Event
                  </button>
                )}
              </div>

              {/* Basic Info */}
              <div className="space-y-4">
                <div>
                  <label className="block text-white font-semibold mb-2 text-lg">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter event title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full p-4 bg-gray-700 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 text-lg"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2 text-lg">
                    Event Date *
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="w-full p-4 bg-gray-700 border-2 border-gray-600 rounded-xl text-white focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 text-lg"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2 text-lg">
                    Venue *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter venue location"
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    required
                    className="w-full p-4 bg-gray-700 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 text-lg"
                  />
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2 text-lg">
                    Banner Image {mode === "create" && "*"}
                  </label>
                  <input
                    type="file"
                    onChange={handleImageChange}
                    required={mode === "create"}
                    className="w-full p-4 bg-gray-700 border-2 border-gray-600 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-cyan-600 file:text-white hover:file:bg-cyan-500 transition-all duration-300"
                  />
                  {mode === "edit" && !bannerImage && (
                    <p className="text-gray-400 text-sm mt-2">Current image will be kept if no new file is selected</p>
                  )}
                </div>
              </div>

              {/* Ticket Types Section */}
              <div className="bg-gray-700/50 rounded-xl p-6 border border-gray-600">
                <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                  <span className="bg-cyan-600 p-2 rounded-lg">🎫</span>
                  Ticket Types
                </h3>

                <div className="space-y-4">
                  {ticketTypes.map((ticket, index) => (
                    <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                      <div className="md:col-span-4">
                        <label className="block text-gray-300 text-sm mb-1">Type</label>
                        <input
                          type="text"
                          placeholder="e.g., VIP, Regular"
                          value={ticket.name}
                          onChange={(e) => handleTicketChange(index, "name", e.target.value)}
                          className="w-full p-3 bg-gray-600 border-2 border-gray-500 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 transition-all duration-300"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label className="block text-gray-300 text-sm mb-1">Price ($)</label>
                        <input
                          type="number"
                          placeholder="0.00"
                          value={ticket.price}
                          onChange={(e) => handleTicketChange(index, "price", e.target.value)}
                          className="w-full p-3 bg-gray-600 border-2 border-gray-500 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 transition-all duration-300"
                        />
                      </div>
                      <div className="md:col-span-3">
                        <label className="block text-gray-300 text-sm mb-1">Quantity</label>
                        <input
                          type="number"
                          placeholder="100"
                          value={ticket.totalAvailable}
                          onChange={(e) => handleTicketChange(index, "totalAvailable", e.target.value)}
                          className="w-full p-3 bg-gray-600 border-2 border-gray-500 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 transition-all duration-300"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <button
                          type="button"
                          onClick={() => removeTicketRow(index)}
                          disabled={ticketTypes.length === 1}
                          className="w-full p-3 bg-red-600 hover:bg-red-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-all duration-300"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addTicketRow}
                  className="mt-4 bg-gray-600 hover:bg-gray-500 text-white px-6 py-3 rounded-lg transition-all duration-300 flex items-center gap-2"
                >
                  <span>+</span>
                  Add Ticket Type
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={uploading}
                className={`w-full py-4 rounded-xl text-xl font-bold shadow-lg transition-all duration-300 transform ${
                  uploading
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 hover:scale-105 hover:shadow-cyan-500/25 text-white"
                }`}
              >
                {uploading ? "⏳ Processing..." : mode === "create" ? "🚀 Create Event" : "💾 Update Event"}
              </button>
            </form>
          </div>

          {/* Right Column - Events List */}
          <div className="bg-gray-800/70 backdrop-blur-sm rounded-2xl border-2 border-gray-700 p-6 shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="bg-cyan-600 p-2 rounded-lg">📋</span>
              Your Events ({events.length})
            </h2>

            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {events.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">📅</div>
                  <p className="text-gray-400 text-lg">No events created yet</p>
                  <p className="text-gray-500">Create your first event to get started!</p>
                </div>
              ) : (
                events.map((event) => (
                  <div
                    key={event._id}
                    className="bg-gray-700/50 rounded-xl p-4 border border-gray-600 hover:border-cyan-500/50 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <img
                        src={event.bannerImage}
                        alt={event.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-1">{event.title}</h3>
                        <p className="text-gray-400 text-sm mb-2">{event.venue}</p>
                        <p className="text-cyan-400 text-sm">
                          {new Date(event.date).toLocaleDateString()} • {event.ticketTypes?.length || 0} ticket types
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <button
                        onClick={() => handleEdit(event)}
                        className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white py-2 rounded-lg transition-all duration-300"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(event._id)}
                        className="flex-1 bg-red-600 hover:bg-red-500 text-white py-2 rounded-lg transition-all duration-300"
                      >
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;