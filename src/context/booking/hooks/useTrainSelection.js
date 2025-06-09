import { useState } from "react";
import useTrainData from "./train/useTrainData";
import useSeatSelection from "./train/useSeatSelection";
import useCarNavigation from "./train/useCarNavigation";
import usePassengerManagement from "./train/usePassengerManagement";

export default function useTrainSelection() {
  const [currentDepartureId, setCurrentDepartureId] = useState(null);
  const [currentDepartureDate, setCurrentDepartureDate] = useState(null);

  const {
    selectedTrain,
    currentCar,
    bookedSeats,
    handleDepartureSelection,
    setSelectedTrain,
    setCurrentCar,
    setBookedSeats,
  } = useTrainData(
    currentDepartureId,
    currentDepartureDate,
    setCurrentDepartureId,
    setCurrentDepartureDate
  );

  const {
    currentPassengerIndex,
    handlePassengerChange,
    setCurrentPassengerIndex,
  } = usePassengerManagement();

  const {
    selectedSeats,
    handleSeatClick,
    isSeatSelected,
    isSeatAvailable,
    setSelectedSeats,
  } = useSeatSelection(
    bookedSeats,
    currentPassengerIndex,
    setCurrentPassengerIndex
  );

  const { handleCarClick, handleGoBackOneCar, handleGoForwardOneCar } =
    useCarNavigation(
      selectedTrain,
      currentCar,
      setCurrentCar,
      setSelectedSeats
    );

  return {
    selectedTrain,
    currentCar,
    selectedSeats,
    bookedSeats,
    handleDepartureSelection,
    handleCarClick,
    handleGoBackOneCar,
    handleGoForwardOneCar,
    handleSeatClick,
    isSeatSelected,
    isSeatAvailable,
    setSelectedSeats,
    currentDepartureId,
    currentDepartureDate,
    currentPassengerIndex,
    handlePassengerChange,
    setSelectedTrain,
    setCurrentCar,
    setBookedSeats,
    setCurrentPassengerIndex,
  };
}
