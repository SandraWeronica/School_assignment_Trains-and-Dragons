import { useState, useCallback, useEffect } from "react";

export default function useDestinations(
  destinations,
  bookingType,
  setError,
  clearAllErrors
) {
  const [departureDestination, setDepartureDestination] = useState(
    destinations[0]
  );
  const [arrivalDestination, setArrivalDestination] = useState(destinations[0]);
  const [returnDepartureDestination, setReturnDepartureDestination] =
    useState("");
  const [returnArrivalDestination, setReturnArrivalDestination] = useState("");

  useEffect(() => {
    if (bookingType === "Tur och retur") {
      setReturnArrivalDestination(departureDestination);
      setReturnDepartureDestination(arrivalDestination);
    }
  }, [bookingType, departureDestination, arrivalDestination]);

  const handleSelectDepartureDestination = useCallback(
    (event) => {
      const newDestination = event.target.value;

      if (
        newDestination === arrivalDestination &&
        newDestination !== destinations[0]
      ) {
        setError(
          "Avgångs- och ankomstort kan inte vara samma",
          "departureDestination"
        );
        return;
      }

      clearAllErrors();
      setDepartureDestination(newDestination);
    },
    [arrivalDestination, destinations, setError, clearAllErrors]
  );

  const handleSelectArrivalDestination = useCallback(
    (event) => {
      const newDestination = event.target.value;

      if (
        newDestination === departureDestination &&
        newDestination !== destinations[0]
      ) {
        setError(
          "Avgångs- och ankomstort kan inte vara samma",
          "arrivalDestination"
        );
        return;
      }

      clearAllErrors();
      setArrivalDestination(newDestination);
    },
    [departureDestination, destinations, setError, clearAllErrors]
  );

  return {
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
  };
}
