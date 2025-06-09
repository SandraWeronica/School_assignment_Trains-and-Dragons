import { useState, useCallback } from "react";

export default function usePassengers() {
  const [passengers, setPassengers] = useState([{ id: 1, name: "Resenär 1" }]);

  const handleUpdatePassengers = useCallback(
    (action) => {
      if (action === "add") {
        setPassengers((prev) => [
          ...prev,
          { id: prev.length + 1, name: `Resenär ${prev.length + 1}` },
        ]);
      } else if (action === "remove" && passengers.length > 1) {
        setPassengers((prev) => prev.slice(0, -1));
      }
    },
    [passengers.length]
  );

  const resetPassengers = useCallback(() => {
    setPassengers([{ id: 1, name: "Resenär 1" }]);
  }, []);

  return {
    passengers,
    handleUpdatePassengers,
    resetPassengers,
  };
}
