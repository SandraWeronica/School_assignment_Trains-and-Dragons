import { useCallback } from "react";

export default function useValidation(
  departureDestination,
  arrivalDestination,
  departureDate,
  returnDate,
  bookingType,
  destinations,
  setError,
  updateFieldError,
  clearAllErrors
) {
  const validateDateRange = useCallback(
    (depDate, retDate, isRoundTrip) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const depDateObj = new Date(depDate);
      depDateObj.setHours(0, 0, 0, 0);

      if (depDateObj < today) {
        setError(
          "Avresedatum måste vara idag eller i framtiden",
          "departureDate"
        );
        return false;
      }

      if (isRoundTrip) {
        if (!retDate) {
          setError("Du måste välja ett returdatum", "returnDate");
          return false;
        }

        const retDateObj = new Date(retDate);
        retDateObj.setHours(0, 0, 0, 0);

        if (retDateObj < today) {
          setError(
            "Returdatum måste vara idag eller i framtiden",
            "returnDate"
          );
          return false;
        }

        if (retDateObj < depDateObj) {
          setError("Returdatum måste vara efter avresedatum", "returnDate");
          return false;
        }
      }

      return true;
    },
    [setError]
  );

  const validateTripSelection = useCallback(() => {
    clearAllErrors();

    if (departureDestination === destinations[0]) {
      setError("Du måste välja en avgångsort", "departureDestination");
      return false;
    }

    if (arrivalDestination === destinations[0]) {
      setError("Du måste välja en ankomstort", "arrivalDestination");
      return false;
    }

    if (departureDestination === arrivalDestination) {
      setError(
        "Avgångs- och ankomstort kan inte vara samma",
        "departureDestination"
      );
      updateFieldError(
        "arrivalDestination",
        "Avgångs- och ankomstort kan inte vara samma"
      );
      return false;
    }

    if (!departureDate) {
      setError("Du måste välja ett avresedatum", "departureDate");
      return false;
    }

    return validateDateRange(
      departureDate,
      returnDate,
      bookingType === "Tur och retur"
    );
  }, [
    clearAllErrors,
    departureDestination,
    arrivalDestination,
    departureDate,
    returnDate,
    bookingType,
    destinations,
    setError,
    updateFieldError,
    validateDateRange,
  ]);

  return {
    validateTripSelection,
  };
}
