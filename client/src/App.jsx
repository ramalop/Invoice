import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CheckAuth from "./components/CheckAuth";
import { Toaster } from "@/components/ui/toaster";

import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice";
import InvoiceDetailsPage from "./pages/InvoiceDetailsPage";
import CreateInvoice from "./components/CreateInvoice";
import Archive from "./pages/Archive";

function App() {
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Header />

      <Routes>
        <Route
        path="/"
        element={
          <CheckAuth isAuthenticated={isAuthenticated}>
            <CreateInvoice/>
          </CheckAuth>
        }
      />

        <Route
          path="/login"
          element={
            <CheckAuth isAuthenticated={isAuthenticated}>
              <Login />
            </CheckAuth>
          }
        />

        <Route
          path="/signup"
          element={
            <CheckAuth isAuthenticated={isAuthenticated}>
              <Signup />
            </CheckAuth>
          }
        />
         <Route
        path="/invoices/:id"
        element={
          <CheckAuth isAuthenticated={isAuthenticated}>
            <InvoiceDetailsPage />
          </CheckAuth>
        }
      />
       <Route
        path="/archive"
        element={
          <CheckAuth isAuthenticated={isAuthenticated}>
            <Archive/>
          </CheckAuth>
        }
      />

        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
