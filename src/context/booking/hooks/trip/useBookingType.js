import { useState, useCallback } from "react";

export default function useBookingType(initialBookingType) {
  const [bookingType, setBookingType] = useState(initialBookingType);

  const handleSelectBookingType = useCallback((event) => {
    setBookingType(event.target.value);
  }, []);

  return {
    bookingType,
    setBookingType,
    handleSelectBookingType,
  };
}
