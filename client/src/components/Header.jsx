import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { logoutUser } from "@/store/auth-slice";

export default function Header() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <header className="border-b px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Invoice App</h1>
      <Link
        to="/"
        className="text-sm font-medium text-gray-700 hover:text-black hover:underline cursor-pointer transition duration-200"
      >
        Home
      </Link>

      <div className="flex gap-3 items-center">
        {!isAuthenticated && (
          <>
            <Link to="/login">
              <Button
                variant="default"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Login
              </Button>
            </Link>

            <Link to="/signup">
              <Button
                variant="secondary"
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Signup
              </Button>
            </Link>
          </>
        )}

        {isAuthenticated && (
          <>
            <span className="text-sm text-muted-foreground">{user?.name}</span>

            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </>
        )}
      </div>
    </header>
  );
}
