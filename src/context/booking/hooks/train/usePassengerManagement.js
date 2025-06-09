import { useState, useCallback } from "react";

export default function usePassengerManagement() {
  const [currentPassengerIndex, setCurrentPassengerIndex] = useState(0);

  const handlePassengerChange = useCallback((event, passengers) => {
    const selectedName = event.target.value;
    const selectedIndex = passengers.findIndex((p) => p.name === selectedName);
    if (selectedIndex !== -1) {
      setCurrentPassengerIndex(selectedIndex);
    }
  }, []);

  return {
    currentPassengerIndex,
    handlePassengerChange,
    setCurrentPassengerIndex,
  };
}
