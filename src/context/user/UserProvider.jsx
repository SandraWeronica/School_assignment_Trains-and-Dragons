import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import UserContext from "./UserContext";
import { useNavigate } from "react-router";
import { formatDate, formatTime, isUpcomingTrip } from "../../util/date";

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [bookingsLoading, setBookingsLoading] = useState(false);
  const [bookingsError, setBookingsError] = useState(null);

  const navigate = useNavigate();
  const handleLogin = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const users = await response.json();
      const user = users.find(
        (user) => user.email === email && user.password === password
      );

      if (!user) {
        throw new Error("Login failed");
      }
      setUser(user);
      setIsLoggedIn(true);
      navigate("/profile");
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    navigate("/");
  };

  const handlesignup = async (firstName, lastName, age, email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          age,
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error("Signup failed");
      }

      const user = await response.json();
      setUser(user);
      setIsLoggedIn(true);
      navigate("/profile");
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    const fetchBookings = async () => {
      if (!user || !user.bookings || !Array.isArray(user.bookings)) {
        setBookings([]);
        return;
      }

      setBookingsLoading(true);
      setBookingsError(null);

      try {
        const fetchedBookingIds = new Set();
        const completeBookings = [];

        const uniqueBookingIds = [...new Set(user.bookings)];

        const fetchPromises = uniqueBookingIds.map(async (bookingId) => {
          if (fetchedBookingIds.has(bookingId)) return;
          fetchedBookingIds.add(bookingId);

          try {
            const bookingResponse = await fetch(
              `http://localhost:3000/bookings?id=${bookingId}`
            );
            const bookingData = await bookingResponse.json();

            if (!bookingData.length) {
              console.log(`No booking found with ID: ${bookingId}`);
              return;
            }

            const bookingInfo = bookingData[0];

            const bookedSeatsResponse = await fetch(
              `http://localhost:3000/bookedSeats`
            );
            const allBookedSeats = await bookedSeatsResponse.json();

            const bookedSeatsData = allBookedSeats.filter((seat) => {
              const bookingIdWithoutPrefix = bookingId.replace("booking-", "");
              const seatIdWithoutPrefix = seat.id
                ? seat.id.replace("booking-", "")
                : "";

              return (
                seat.id === bookingId ||
                seat.bookingId === bookingId ||
                (seat.id &&
                  seatIdWithoutPrefix.startsWith(
                    bookingIdWithoutPrefix.substring(0, 6)
                  ))
              );
            });

            const departureResponse = await fetch(
              `http://localhost:3000/departures?id=${bookingInfo.departureId}`
            );
            const departureData = await departureResponse.json();

            const trainResponse = await fetch(
              `http://localhost:3000/trains?id=${bookingInfo.trainId}`
            );
            const trainData = await trainResponse.json();

            const departureInfo = departureData.length
              ? departureData[0]
              : null;

            let departureDate = null;

            if (
              bookedSeatsData.length > 0 &&
              bookedSeatsData[0].departureDate
            ) {
              departureDate = bookedSeatsData[0].departureDate;
            } else if (bookingInfo.departureDate) {
              departureDate = bookingInfo.departureDate;
            } else if (departureInfo && departureInfo.date) {
              departureDate = departureInfo.date;
            } else {
              departureDate = new Date(bookingInfo.timestamp)
                .toISOString()
                .split("T")[0];
            }

            const completeBooking = {
              ...bookingInfo,
              departureInfo,
              trainInfo: trainData.length ? trainData[0] : null,
              departureDate,
            };

            completeBookings.push(completeBooking);
          } catch (err) {
            console.error(`Error fetching booking ${bookingId}:`, err);
          }
        });

        await Promise.all(fetchPromises);

        completeBookings.sort((a, b) => {
          if (a.departureDate && b.departureDate) {
            return new Date(a.departureDate) - new Date(b.departureDate);
          }

          const dateA = a.timestamp ? new Date(a.timestamp) : new Date(0);
          const dateB = b.timestamp ? new Date(b.timestamp) : new Date(0);
          return dateA - dateB;
        });

        setBookings(completeBookings);
      } catch (err) {
        console.error("Error processing bookings:", err);
        setBookingsError("Failed to load bookings. Please try again later.");
      } finally {
        setBookingsLoading(false);
      }
    };

    if (isLoggedIn && user) {
      fetchBookings();
    }
  }, [user, isLoggedIn]);

  const upcomingBookings =
    bookings && Array.isArray(bookings)
      ? bookings.filter((booking) => booking && isUpcomingTrip(booking))
      : [];
  const contextValue = {
    user,
    setUser,
    isLoading,
    error,
    login: handleLogin,
    logout: handleLogout,
    isLoggedIn,
    signup: handlesignup,

    bookings,
    upcomingBookings: upcomingBookings || [],
    bookingsLoading,
    bookingsError,
    formatDate,
    formatTime,
    nextTrip: upcomingBookings.length > 0 ? upcomingBookings[0] : null,
    isUpcomingTrip,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

export default UserProvider;

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
