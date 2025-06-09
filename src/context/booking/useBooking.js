import { use } from "react";
import BookingContext from "./BookingContext";

const useBooking = () => {
  return use(BookingContext);
};

export default useBooking;
