import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      alert("Please enter both username and password");
      return;
    }

    setLoading(true);

    // Simulate authentication process
    try {
      // Placeholder authentication - replace with actual auth integration
      if (username === "admin" && password === "admin123") {
        // Store auth state (replace with proper token storage)
        localStorage.setItem("adminAuth", "true");
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1000);
      } else {
        alert("Invalid credentials. Try: admin / admin123");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = () => {
    setUsername("admin");
    setPassword("admin123");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center py-12">
      <div className="max-w-md w-full mx-4">
        {/* Login Card */}
        <div className="bg-gray-800/70 backdrop-blur-sm rounded-3xl border-2 border-gray-700 shadow-2xl overflow-hidden">
          
          {/* Header Section */}
          <div className="bg-gradient-to-r from-cyan-600 to-blue-600 p-8 text-center">
            <div className="text-6xl mb-4">🔐</div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Admin Portal
            </h1>
            <p className="text-cyan-100 text-lg">
              Secure Access Required
            </p>
          </div>

          {/* Login Form */}
          <div className="p-8">
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Username Field */}
              <div>
                <label className="block text-white font-semibold mb-3 text-lg">
                  👤 Username
                </label>
                <input
                  type="text"
                  placeholder="Enter admin username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-4 bg-gray-700 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 text-lg"
                  disabled={loading}
                />
              </div>

              {/* Password Field */}
              <div>
                <label className="block text-white font-semibold mb-3 text-lg">
                  🔒 Password
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 bg-gray-700 border-2 border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 transition-all duration-300 text-lg"
                  disabled={loading}
                />
              </div>

              {/* Demo Credentials Hint */}
              <div className="bg-gray-700/50 border border-cyan-500/30 rounded-xl p-4">
                <p className="text-cyan-400 text-sm text-center">
                  💡 Demo credentials: <strong>admin</strong> / <strong>admin123</strong>
                </p>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-4 rounded-xl text-xl font-bold shadow-lg transition-all duration-300 transform ${
                  loading
                    ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 hover:scale-105 hover:shadow-cyan-500/25 text-white"
                }`}
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-3">
                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
                    Authenticating...
                  </div>
                ) : (
                  "🚀 Login to Dashboard"
                )}
              </button>

              {/* Quick Demo Login */}
              <button
                type="button"
                onClick={handleDemoLogin}
                disabled={loading}
                className="w-full py-3 bg-gray-700 hover:bg-gray-600 border-2 border-gray-600 text-gray-300 rounded-xl font-semibold transition-all duration-300 hover:scale-102 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                🎯 Fill Demo Credentials
              </button>
            </form>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-gray-900/50 rounded-xl border border-gray-600">
              <p className="text-gray-400 text-sm text-center">
                ⚠️ This is a protected area. Unauthorized access is prohibited.
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-8">
          <p className="text-gray-500 text-sm">
            TikoSasa Event Management System v1.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;