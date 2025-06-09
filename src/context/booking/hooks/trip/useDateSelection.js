import { useState, useCallback } from "react";

export default function useDateSelection(updateFieldError) {
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");

  const handleSelectDepartureDate = useCallback(
    (event) => {
      const newDate = event.target.value;
      setDepartureDate(newDate);

      updateFieldError("departureDate", "");

      if (returnDate) {
        const newDepDate = new Date(newDate);
        const currentRetDate = new Date(returnDate);

        if (currentRetDate < newDepDate) {
          updateFieldError(
            "returnDate",
            "Returdatum måste vara efter avresedatum"
          );
        } else {
          updateFieldError("returnDate", "");
        }
      }
    },
    [returnDate, updateFieldError]
  );

  const handleSelectReturnDate = useCallback(
    (event) => {
      setReturnDate(event.target.value);
      updateFieldError("returnDate", "");
    },
    [updateFieldError]
  );

  return {
    departureDate,
    returnDate,
    setDepartureDate,
    setReturnDate,
    handleSelectDepartureDate,
    handleSelectReturnDate,
  };
}
