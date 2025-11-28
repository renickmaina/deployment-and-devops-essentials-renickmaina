// Placeholder for Clerk admin auth
// You would integrate Clerk here to protect admin routes

const adminAuth = (req, res, next) => {
  // Check if request is authenticated via Clerk
  // For now, just allow
  next();
};

module.exports = adminAuth;
