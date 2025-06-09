import { useState, useEffect, useCallback } from "react";
import { getDepartureById } from "../../api/departureApi";
import { getTrainById, getBookedSeatsForDeparture } from "../../api/trainApi";

export default function useTrainData(
  currentDepartureId,
  currentDepartureDate,
  setCurrentDepartureId,
  setCurrentDepartureDate
) {
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [currentCar, setCurrentCar] = useState(null);
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    if (!currentDepartureId || !currentDepartureDate) return;

    const loadBookedSeats = async () => {
      try {
        const seats = await getBookedSeatsForDeparture(
          currentDepartureId,
          currentDepartureDate
        );
        setBookedSeats(seats);
      } catch (error) {
        console.error("Error loading booked seats:", error);
        setBookedSeats([]);
      }
    };

    loadBookedSeats();
  }, [currentDepartureId, currentDepartureDate]);

  const handleDepartureSelection = useCallback(
    async (departureId, departureDate) => {
      setCurrentDepartureId(departureId);
      setCurrentDepartureDate(departureDate);

      try {
        const departure = await getDepartureById(departureId);
        if (!departure) {
          throw new Error("Avgången kunde inte hittas");
        }

        const train = await getTrainById(departure.trainId);
        if (!train) {
          throw new Error("Tåget kunde inte hittas");
        }

        setSelectedTrain(train);
        setCurrentCar(train.cars[0]);
      } catch (error) {
        console.error("Error fetching train data:", error);
        setSelectedTrain(null);
        setCurrentCar(null);
      }
    },
    [setCurrentDepartureId, setCurrentDepartureDate]
  );

  return {
    selectedTrain,
    currentCar,
    bookedSeats,
    handleDepartureSelection,
    setSelectedTrain,
    setCurrentCar,
    setBookedSeats,
  };
}
