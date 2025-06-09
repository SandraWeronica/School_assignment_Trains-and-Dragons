import { API_URL, fetchJson } from "../utils/apiUtil";

export const getTrainById = async (trainId) => {
  const trains = await fetchJson(`${API_URL}/trains?id=${trainId}`);
  return trains[0];
};

export const bookTrainSeats = async (
  trainId,
  carId,
  seats,
  departureId,
  departureDate
) => {
  console.log("bookTrainSeats called with:", {
    trainId,
    carId,
    seats,
    departureId,
    departureDate,
  });

  const bookedSeatsEntry = {
    id: `booking-${Date.now()}`,
    trainId,
    carId,
    seatIds: seats.map((seat) => (typeof seat === "object" ? seat.id : seat)),
    departureId,
    departureDate,
    bookingTimestamp: new Date().toISOString(),
  };

  console.log("Creating booked seats entry:", bookedSeatsEntry);

  return fetchJson(`${API_URL}/bookedSeats`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookedSeatsEntry),
  });
};

export const getBookedSeatsForDeparture = async (
  departureId,
  departureDate
) => {
  if (!departureId) {
    console.warn("getBookedSeatsForDeparture called without departureId");
    return [];
  }

  let url = `${API_URL}/bookedSeats?departureId=${departureId}`;

  if (departureDate) {
    url += `&departureDate=${departureDate}`;
  }

  console.log("Fetching booked seats with URL:", url);
  return fetchJson(url);
};

export const isSeatBooked = (bookedSeats, carId, seatId) => {
  if (!bookedSeats || !Array.isArray(bookedSeats)) {
    return false;
  }

  return bookedSeats.some(
    (booking) => booking.carId === carId && booking.seatIds.includes(seatId)
  );
};
