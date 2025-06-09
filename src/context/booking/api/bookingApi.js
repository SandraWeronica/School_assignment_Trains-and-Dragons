import { API_URL, fetchJson } from "../utils/apiUtil";

export const createBooking = (bookingData) => {
  return fetchJson(`${API_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(bookingData),
  });
};

export const createDepartureBooking = (departureBookingData) => {
  return fetchJson(`${API_URL}/departureBookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(departureBookingData),
  });
};

export const getUserBookings = async (userId) => {
  const users = await fetchJson(`${API_URL}/users?id=${userId}`);
  return users[0];
};

export const updateUserBookings = async (userId, userData) => {
  const users = await fetchJson(`${API_URL}/users?id=${userId}`);
  if (!users || users.length === 0) {
    throw new Error("User not found");
  }

  const actualUser = users[0];
  return await fetchJson(`${API_URL}/users/${actualUser.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
};
