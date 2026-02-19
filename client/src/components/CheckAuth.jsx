import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, children }) {
  const { pathname } = useLocation();

  const isAuthPage =
    pathname === "/login" || pathname === "/signup";

  // not logged in + trying protected route
  if (!isAuthenticated && !isAuthPage) {
    return <Navigate to="/login" replace />;
  }

  // 🚫 already logged in + trying login/signup
  if (isAuthenticated && isAuthPage) {
    return <Navigate to="/" replace />;
  }

  // ✅ allowed
  return children;
}

export default CheckAuth;
