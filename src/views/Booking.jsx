import useBooking from "../context/booking/useBooking";
import BookingHeader from "../components/Booking/BookingHeader";
import TripSelectionStep from "../components/Booking/TripSelectionStep";
import DepartureTrainSelectionStep from "../components/Booking/DepartureTrainSelectionStep";
import PaymentReviewStep from "../components/Booking/PaymentReviewStep";
import BookingConfirmationStep from "../components/Booking/BookingConfirmationStep";

const STEP_COMPONENTS = {
  1: { Component: TripSelectionStep, showHeader: false },
  2: { Component: DepartureTrainSelectionStep, showHeader: true },
  // 3: { Component: ReturnTrainSelectionStep, showHeader: true },
  3: { Component: PaymentReviewStep, showHeader: false },
  4: { Component: BookingConfirmationStep, showHeader: false },
};

const Booking = () => {
  const { currentStep } = useBooking();

  const { Component, showHeader } = STEP_COMPONENTS[currentStep] || {};

  if (currentStep === 5) {
    return <BookingConfirmationStep />;
  }

  return (
    <>
      {showHeader && <BookingHeader />}
      {Component && <Component />}
    </>
  );
};

export default Booking;
