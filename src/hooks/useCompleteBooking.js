import { useState } from "react";

const useCompleteBooking = ({
  handleCompleteBooking,
  handleGoToNextStep,
  bookingError,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [localError, setLocalError] = useState(null);

  const onCompleteBooking = async (bookingData) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setLocalError(null);

    console.log("Starting booking completion with data:", bookingData);

    try {
      const success = await handleCompleteBooking(bookingData);

      if (success) {
        console.log("Booking completed successfully");

        handleGoToNextStep();
        return true;
      } else {
        const errorMessage =
          bookingError || "Failed to complete booking. Please try again.";
        console.error("Booking failed:", errorMessage);
        setLocalError(errorMessage);
        return false;
      }
    } catch (error) {
      const errorMessage = error.message || "An unexpected error occurred";
      console.error("Error during booking completion:", errorMessage);
      setLocalError(errorMessage);
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const clearError = () => setLocalError(null);

  return {
    onCompleteBooking,
    isSubmitting,
    localError,
    clearError,
  };
};

export default useCompleteBooking;
