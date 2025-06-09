import { useCallback } from "react";

export default function useCarNavigation(
  selectedTrain,
  currentCar,
  setCurrentCar,
  setSelectedSeats
) {
  const handleCarClick = useCallback(
    (car) => {
      setCurrentCar(car);
      setSelectedSeats([]);
    },
    [setCurrentCar, setSelectedSeats]
  );

  const handleGoBackOneCar = useCallback(() => {
    if (!selectedTrain || !currentCar) return;

    const currentIndex = selectedTrain.cars.findIndex(
      (car) => car.id === currentCar.id
    );
    if (currentIndex > 0) {
      setCurrentCar(selectedTrain.cars[currentIndex - 1]);
      setSelectedSeats([]);
    }
  }, [selectedTrain, currentCar, setCurrentCar, setSelectedSeats]);

  const handleGoForwardOneCar = useCallback(() => {
    if (!selectedTrain || !currentCar) return;

    const currentIndex = selectedTrain.cars.findIndex(
      (car) => car.id === currentCar.id
    );
    if (currentIndex < selectedTrain.cars.length - 1) {
      setCurrentCar(selectedTrain.cars[currentIndex + 1]);
      setSelectedSeats([]);
    }
  }, [selectedTrain, currentCar, setCurrentCar, setSelectedSeats]);

  return {
    handleCarClick,
    handleGoBackOneCar,
    handleGoForwardOneCar,
  };
}
