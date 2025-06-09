export const createBookingData = (
  user,
  selectedDepartureId,
  selectedTrain,
  carInfo,
  selectedSeats,
  totalPrice,
  paymentType
) => {
  return {
    id: `booking-${Date.now()}`,
    userId: user ? user.id : "guest",
    departureId: selectedDepartureId,
    trainId: selectedTrain.id,
    carId: carInfo.id,
    seats: selectedSeats.map((seat) => seat.id),
    totalPrice,
    paymentMethod: paymentType,
    timestamp: new Date().toISOString(),
    status: "confirmed",
    passengers: [
      {
        firstName: user ? user.firstName : "Guest",
        lastName: user ? user.lastName : "User",
        email: user ? user.email : "",
      },
    ],
  };
};

export const createDepartureBookingData = (
  selectedDepartureId,
  selectedTrain,
  carInfo,
  selectedSeats,
  bookingId
) => {
  return {
    departureId: selectedDepartureId,
    trainId: selectedTrain.id,
    bookedSeats: selectedSeats.map((seat) => ({
      carId: carInfo.id,
      seatId: seat.id,
    })),
    bookingId,
  };
};
