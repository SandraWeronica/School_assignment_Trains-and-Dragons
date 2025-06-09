import { useState, useEffect, useCallback } from "react";
import { getDepartures } from "../api/departureApi";

export default function useDepartures(
  departureDestination,
  arrivalDestination,
  departureDate,
  destinations
) {
  const [availableDepartures, setAvailableDepartures] = useState([]);
  const [isLoadingDepartures, setIsLoadingDepartures] = useState(false);
  const [selectedDepartureId, setSelectedDepartureId] = useState(null);

  const clearAvailableDepartures = useCallback(() => {
    setAvailableDepartures([]);
  }, []);

  useEffect(() => {
    const isInvalidSelection =
      departureDestination === destinations[0] ||
      arrivalDestination === destinations[0] ||
      departureDestination === arrivalDestination;

    if (isInvalidSelection) {
      clearAvailableDepartures();
      return;
    }

    const fetchDepartures = async () => {
      setIsLoadingDepartures(true);

      try {
        const data = await getDepartures(
          departureDestination,
          arrivalDestination
        );
        setAvailableDepartures(data);
      } catch (error) {
        console.error("Error fetching departures:", error);
        clearAvailableDepartures();
      } finally {
        setIsLoadingDepartures(false);
      }
    };

    fetchDepartures();
  }, [
    departureDestination,
    arrivalDestination,
    departureDate,
    destinations,
    clearAvailableDepartures,
  ]);

  return {
    availableDepartures,
    isLoadingDepartures,
    selectedDepartureId,
    setSelectedDepartureId,
    clearAvailableDepartures,
  };
}
