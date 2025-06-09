import { useState, useCallback } from "react";
import { isSeatBooked } from "../../api/trainApi";

export default function useSeatSelection(
  bookedSeats,
  currentPassengerIndex,
  setCurrentPassengerIndex
) {
  const [selectedSeats, setSelectedSeats] = useState([]);

  const isSeatAvailable = useCallback(
    (carId, seatId) => !isSeatBooked(bookedSeats, carId, seatId),
    [bookedSeats]
  );

  const isSeatSelected = useCallback(
    (seatId) => selectedSeats.includes(seatId) && seatId !== "",
    [selectedSeats]
  );

  const handleSeatClick = useCallback(
    (seat, passengers) => {
      if (!seat || !passengers?.length) return false;

      const seatId = seat.id;
      const totalPassengers = passengers.length;

      setSelectedSeats((prevSelectedSeats) => {
        const updatedSeats = [...prevSelectedSeats];
        while (updatedSeats.length < totalPassengers) {
          updatedSeats.push("");
        }

        const existingPassengerIndex = updatedSeats.indexOf(seatId);

        if (
          existingPassengerIndex !== -1 &&
          existingPassengerIndex !== currentPassengerIndex
        ) {
          updatedSeats[existingPassengerIndex] = "";
        }

        updatedSeats[currentPassengerIndex] =
          updatedSeats[currentPassengerIndex] === seatId ? "" : seatId;

        return updatedSeats;
      });

      if (currentPassengerIndex < totalPassengers - 1) {
        setTimeout(() => {
          setSelectedSeats((currentSeats) => {
            if (currentSeats[currentPassengerIndex]) {
              for (
                let i = currentPassengerIndex + 1;
                i < totalPassengers;
                i++
              ) {
                if (!currentSeats[i]) {
                  setCurrentPassengerIndex(i);
                  break;
                }
              }
            }
            return currentSeats;
          });
        }, 0);
      }

      return true;
    },
    [currentPassengerIndex, setCurrentPassengerIndex]
  );

  return {
    selectedSeats,
    isSeatSelected,
    isSeatAvailable,
    handleSeatClick,
    setSelectedSeats,
  };
}
