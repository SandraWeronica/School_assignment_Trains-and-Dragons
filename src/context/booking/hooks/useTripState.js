import { useMemo } from "react";
import useBookingType from "./trip/useBookingType";
import useDestinations from "./trip/useDestinations";
import useDateSelection from "./trip/useDateSelection";
import useErrorHandling from "./trip/useErrorHandling";
import usePassengers from "./trip/usePassengers";
import useValidation from "./trip/useValidation";

const useTripState = (destinations, initialBookingType) => {
  const {
    errorMessage,
    fieldErrors,
    updateFieldError,
    setError,
    clearAllErrors,
    setErrorMessage,
  } = useErrorHandling();

  const { bookingType, setBookingType, handleSelectBookingType } =
    useBookingType(initialBookingType);

  const {
    departureDestination,
    arrivalDestination,
    returnDepartureDestination,
    returnArrivalDestination,
    setDepartureDestination,
    setArrivalDestination,
    setReturnDepartureDestination,
    setReturnArrivalDestination,
    handleSelectDepartureDestination,
    handleSelectArrivalDestination,
  } = useDestinations(destinations, bookingType, setError, clearAllErrors);

  const {
    departureDate,
    returnDate,
    setDepartureDate,
    setReturnDate,
    handleSelectDepartureDate,
    handleSelectReturnDate,
  } = useDateSelection(updateFieldError);

  const { passengers, handleUpdatePassengers, resetPassengers } =
    usePassengers();

  const { validateTripSelection } = useValidation(
    departureDestination,
    arrivalDestination,
    departureDate,
    returnDate,
    bookingType,
    destinations,
    setError,
    updateFieldError,
    clearAllErrors
  );

  const handlers = useMemo(
    () => ({
      handleSelectBookingType,
      handleSelectDepartureDestination,
      handleSelectArrivalDestination,
      handleSelectDepartureDate,
      handleSelectReturnDate,
      handleUpdatePassengers,
      setTripType: setBookingType,
      setDepartureDestination,
      setArrivalDestination,
      setReturnDepartureDestination,
      setReturnArrivalDestination,
      setDepartureDate,
      setReturnDate,
      resetPassengers,
      setErrorMessage,
      clearAllErrors,
      validateTripSelection,
    }),
    [
      handleSelectBookingType,
      handleSelectDepartureDestination,
      handleSelectArrivalDestination,
      handleSelectDepartureDate,
      handleSelectReturnDate,
      handleUpdatePassengers,
      setBookingType,
      setDepartureDestination,
      setArrivalDestination,
      setReturnDepartureDestination,
      setReturnArrivalDestination,
      setDepartureDate,
      setReturnDate,
      resetPassengers,
      setErrorMessage,
      clearAllErrors,
      validateTripSelection,
    ]
  );

  return {
    bookingType,
    departureDestination,
    arrivalDestination,
    returnDepartureDestination,
    returnArrivalDestination,
    errorMessage,
    fieldErrors,
    departureDate,
    returnDate,
    passengers,
    handlers,
  };
};

export default useTripState;
