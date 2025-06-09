import { BrowserRouter as Router, Routes, Route } from "react-router";
import Landing from "./views/Landing";
import About from "./views/About";
import Booking from "./views/Booking";
import Login from "./views/Login";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { ModalProvider } from "./context/modal/ModalProvider";
import UserProvider from "./context/user/UserProvider";
import Profile from "./views/Profile";
import RequireAuth from "./components/RequireAuth";
import BookingProvider from "./context/booking/BookingProvider";
import LandingCard from "./views/CardArticle";
import { useLocation } from "react-router";
import { useEffect, useRef } from "react";
import useBooking from "./context/booking/useBooking";

const BookingRouteObserver = () => {
  const location = useLocation();
  const { resetBookingState } = useBooking();
  const prevPath = useRef(location.pathname);
  const resetTimeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (prevPath.current === "/booking" && location.pathname !== "/booking") {
      console.log("Navigated away from booking - resetting state");

      resetTimeoutRef.current = setTimeout(() => {
        resetBookingState();
        console.log("Booking state has been reset");
      }, 100);
    }

    prevPath.current = location.pathname;
  }, [location.pathname, resetBookingState]);

  return null;
};

const AppContent = () => {
  const location = useLocation();
  const showFooter = location.pathname !== "/booking";

  return (
    <>
      <NavBar />
      <BookingRouteObserver />
      <main>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/login" element={<Login />} />
          <Route path="/card" element={<LandingCard />} />
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />
        </Routes>
      </main>
      {showFooter && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <ModalProvider>
      <Router>
        <UserProvider>
          <BookingProvider>
            <AppContent />
          </BookingProvider>
        </UserProvider>
      </Router>
    </ModalProvider>
  );
};

export default App;
