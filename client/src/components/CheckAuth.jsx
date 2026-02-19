import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, children }) {
  const { pathname } = useLocation();

  const isAuthPage =
    pathname === "/login" || pathname === "/signup";

 
  if (!isAuthenticated && !isAuthPage) {
    return <Navigate to="/login" replace />;
  }

  if (isAuthenticated && isAuthPage) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default CheckAuth;
