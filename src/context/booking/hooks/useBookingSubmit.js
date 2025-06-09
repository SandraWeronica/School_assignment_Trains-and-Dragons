import { useState, useCallback } from "react";
import {
  createBooking,
  createDepartureBooking,
  getUserBookings,
  updateUserBookings,
} from "../api/bookingApi";
import { bookTrainSeats } from "../api/trainApi";

export default function useBookingSubmit() {
  const [bookingState, setBookingState] = useState({
    info: {
      departureInfo: null,
      trainInfo: null,
      carInfo: null,
      seatInfo: [],
      passengers: [],
      paymentMethod: null,
      price: 0,
      bookingId: null,
    },
    status: "idle", // idle, pending, success, error
    error: null,
  });

  const saveBookingInfo = useCallback(
    (
      selectedDeparture,
      selectedTrain,
      currentCar,
      selectedSeats,
      departureDate,
      paymentType
    ) => {
      if (
        !selectedDeparture ||
        !selectedTrain ||
        !currentCar ||
        selectedSeats.length === 0
      ) {
        console.error("Missing required booking information");
        return;
      }

      const totalPrice = selectedDeparture.price * selectedSeats.length;

      setBookingState((prev) => ({
        ...prev,
        info: {
          ...prev.info,
          departureInfo: {
            id: selectedDeparture.id,
            from: selectedDeparture.from,
            to: selectedDeparture.to,
            departureTime: selectedDeparture.departureTime,
            arrivalTime: selectedDeparture.arrivalTime,
            travelTime: selectedDeparture.travelTime,
            date: departureDate,
          },
          trainInfo: {
            id: selectedTrain.id,
            type: selectedTrain.type,
          },
          carInfo: {
            id: currentCar.id || selectedTrain.cars.indexOf(currentCar) + 1,
          },
          seatInfo: selectedSeats.map((seat) => ({
            id: seat.id,
            position: seat.position || "window",
          })),
          price: totalPrice,
          paymentMethod: paymentType,
          bookingDate: new Date().toISOString(),
        },
      }));
    },
    []
  );

  const submitBooking = useCallback(
    async (
      selectedDepartureId,
      selectedTrain,
      selectedSeats,
      paymentType,
      user
    ) => {
      const { info } = bookingState;

      if (!info || !info.departureInfo || selectedSeats.length === 0) {
        console.error("Missing booking information:", info);
        setBookingState((prev) => ({
          ...prev,
          error: "Bokningsinformation saknas",
          status: "error",
        }));
        return false;
      }

      setBookingState((prev) => ({ ...prev, status: "pending", error: null }));

      try {
        const bookingId = `booking-${Date.now()}`;

        const bookingData = {
          id: bookingId,
          userId: user?.id || "guest",
          departureId: selectedDepartureId,
          trainId: selectedTrain.id,
          carId: info.carInfo.id,
          seats: selectedSeats.map((seat) =>
            typeof seat === "object" ? seat.id : seat
          ),
          totalPrice: info.price,
          paymentMethod: paymentType,
          timestamp: new Date().toISOString(),
          status: "confirmed",
          passengers: [
            {
              firstName: user?.firstName || "Guest",
              lastName: user?.lastName || "User",
              email: user?.email || "",
            },
          ],
        };

        const savedBooking = await createBooking(bookingData);
        const finalBookingId = savedBooking.id || bookingId;

        setBookingState((prev) => ({
          ...prev,
          info: {
            ...prev.info,
            bookingId: finalBookingId,
          },
        }));

        await bookTrainSeats(
          selectedTrain.id,
          info.carInfo.id,
          selectedSeats,
          selectedDepartureId,
          info.departureInfo.date
        );

        const departureBookingData = {
          departureId: selectedDepartureId,
          trainId: selectedTrain.id,
          bookedSeats: selectedSeats.map((seat) => ({
            carId: info.carInfo.id,
            seatId: typeof seat === "object" ? seat.id : seat,
          })),
          bookingId: finalBookingId,
        };

        await createDepartureBooking(departureBookingData);

        if (user) {
          const userData = await getUserBookings(user.id);
          if (userData) {
            await updateUserBookings(user.id, {
              ...userData,
              bookings: [...(userData.bookings || []), finalBookingId],
            });
          }
        }

        setBookingState((prev) => ({ ...prev, status: "success" }));
        return true;
      } catch (error) {
        setBookingState((prev) => ({
          ...prev,
          error: error?.message || "Okänt fel inträffade",
          status: "error",
        }));
        return false;
      }
    },
    [bookingState]
  );

  const resetBookingInfo = useCallback(() => {
    setBookingState({
      info: {
        departureInfo: null,
        trainInfo: null,
        carInfo: null,
        seatInfo: [],
        passengers: [],
        paymentMethod: null,
        price: 0,
      },
      status: "idle",
      error: null,
    });
  }, []);

  return {
    bookingInfo: bookingState.info,
    bookingStatus: bookingState.status,
    bookingError: bookingState.error,
    saveBookingInfo,
    submitBooking,
    resetBookingInfo,
  };
}
