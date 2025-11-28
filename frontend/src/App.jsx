import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Events from "./pages/Event";
import TicketSelection from "./pages/TicketSelection";
import Checkout from "./pages/Checkout";
import TicketSuccess from "./pages/TicketSuccess";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} /> 
        <Route path="/events/:id/tickets" element={<TicketSelection />} />
        <Route path="/checkout/:id" element={<Checkout />} /> {/* <- param matches Checkout */}
        <Route path="/ticket/:id" element={<TicketSuccess />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
