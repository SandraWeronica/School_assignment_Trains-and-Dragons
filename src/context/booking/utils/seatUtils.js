export const isSeatSelected = (selectedSeats, seatId) => {
  return selectedSeats.some((seat) => seat.id === seatId);
};

export const updateSeatAvailability = (trainData, selectedSeats, carId) => {
  const updatedTrainData = JSON.parse(JSON.stringify(trainData));

  selectedSeats.forEach((seat) => {
    const carIndex = updatedTrainData.cars.findIndex((car) => car.id === carId);
    if (carIndex === -1) return;

    for (let i = 0; i < updatedTrainData.cars[carIndex].columns.length; i++) {
      const column = updatedTrainData.cars[carIndex].columns[i];
      for (let j = 0; j < column.length; j++) {
        if (column[j].id === seat.id) {
          updatedTrainData.cars[carIndex].columns[i][j].isAvailable = false;
          break;
        }
      }
    }
  });

  return updatedTrainData;
};
