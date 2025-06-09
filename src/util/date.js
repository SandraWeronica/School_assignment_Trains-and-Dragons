export const formatDate = (dateString) => {
  if (!dateString) return "";

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return dateString;
    }

    return date.toLocaleDateString("sv-SE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
};

export const formatTime = (timeString) => {
  if (!timeString) return "";

  if (timeString.includes(":") && !timeString.includes("T")) {
    return timeString;
  }

  try {
    const date = new Date(timeString);
    if (isNaN(date.getTime())) {
      return timeString;
    }

    return date.toLocaleTimeString("sv-SE", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    console.error("Error formatting time:", error);
    return timeString;
  }
};

export const isUpcomingTrip = (booking) => {
  console.log("isUpcomingTrip called with:", booking);

  if (!booking || !booking.departureDate) {
    console.log("Invalid booking or missing departureDate:", booking);
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const departureDate = new Date(booking.departureDate);
  console.log("Comparing dates:", {
    today: today.toISOString(),
    departureDate: departureDate.toISOString(),
    isUpcoming: departureDate >= today,
  });

  departureDate.setHours(0, 0, 0, 0);

  return departureDate >= today;
};
