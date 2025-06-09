import PropTypes from "prop-types";
import BookingContext from "./BookingContext";
import useBookingState from "./hooks/provider/useBookingState";
import useBookingHandlers from "./hooks/provider/useBookingHandlers";
import useContextValue from "./hooks/provider/useContextValue";

const BookingProvider = ({ children }) => {
  const bookingState = useBookingState();
  const handlers = useBookingHandlers(bookingState);
  const contextValue = useContextValue(bookingState, handlers);

  return (
    <BookingContext.Provider value={contextValue}>
      {children}
    </BookingContext.Provider>
  );
};

BookingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BookingProvider;
