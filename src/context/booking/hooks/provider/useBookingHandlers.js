import { useCallback, useMemo } from "react";
import { trainRowsConfig } from "../../../../util/BookingConfig";

export default function useBookingHandlers(state) {
  const {
    setCurrentStep,
    tripState,
    paymentType,
    setPaymentType,
    departureHook,
    trainHook,
    bookingHook,
    user,
    destinations,
    radioOptions,
    paymentOptions,
    bookingSteps,
    selectedDepartureInfo,
    validSelectedSeats,
  } = state;

  const handleGoToNextStep = useCallback(() => {
    setCurrentStep((prevStep) => prevStep + 1);
  }, [setCurrentStep]);

  const handleSelectPaymentType = useCallback(
    (event) => {
      setPaymentType(event.target.value);
    },
    [setPaymentType]
  );

  const resetBookingState = useCallback(() => {
    setCurrentStep(bookingSteps[0]);

    tripState.handlers.setDepartureDestination(destinations[0]);
    tripState.handlers.setArrivalDestination(destinations[0]);
    tripState.handlers.setDepartureDate("");
    tripState.handlers.setTripType(radioOptions[0].label);
    tripState.handlers.setReturnDate("");
    tripState.handlers.setReturnDepartureDestination("");
    tripState.handlers.setReturnArrivalDestination("");
    tripState.handlers.resetPassengers();
    tripState.handlers.clearAllErrors();

    departureHook.setSelectedDepartureId(null);
    departureHook.clearAvailableDepartures();

    trainHook.setSelectedTrain(null);
    trainHook.setCurrentCar(null);
    trainHook.setSelectedSeats([]);
    trainHook.setBookedSeats([]);
    trainHook.setCurrentPassengerIndex(0);

    setPaymentType(paymentOptions[0].label);
    bookingHook.resetBookingInfo();
  }, [
    setCurrentStep,
    bookingSteps,
    tripState.handlers,
    destinations,
    radioOptions,
    departureHook,
    trainHook,
    setPaymentType,
    paymentOptions,
    bookingHook,
  ]);

  const handleDepartureSelection = useCallback(
    async (departureId) => {
      departureHook.setSelectedDepartureId(departureId);
      const selectedDeparture = departureHook.availableDepartures.find(
        (departure) => departure.id === departureId
      );

      await trainHook.handleDepartureSelection(
        departureId,
        tripState.departureDate || selectedDeparture?.date
      );
    },
    [departureHook, trainHook, tripState.departureDate]
  );

  const handleSaveBookingInfo = useCallback(() => {
    const selectedDeparture = departureHook.availableDepartures.find(
      (departure) => departure.id === departureHook.selectedDepartureId
    );

    if (
      !selectedDeparture ||
      !trainHook.selectedTrain ||
      !trainHook.currentCar
    ) {
      return;
    }

    const validSeats = trainHook.selectedSeats.filter(
      (seatId) => seatId && seatId !== ""
    );

    if (validSeats.length === 0) {
      return;
    }

    const seatObjects = validSeats.map((seatId) => ({
      id: seatId,
      carId: trainHook.currentCar.id,
    }));

    bookingHook.saveBookingInfo(
      selectedDeparture,
      trainHook.selectedTrain,
      trainHook.currentCar,
      seatObjects,
      tripState.departureDate,
      paymentType
    );
  }, [
    departureHook,
    trainHook,
    bookingHook,
    tripState.departureDate,
    paymentType,
  ]);

  const handleCompleteBooking = useCallback(async () => {
    const validSeats = trainHook.selectedSeats.filter(
      (seat) => seat && seat !== ""
    );

    const success = await bookingHook.submitBooking(
      departureHook.selectedDepartureId,
      trainHook.selectedTrain,
      validSeats,
      paymentType,
      user
    );

    if (success) {
      setCurrentStep(4);
    }

    return success;
  }, [
    bookingHook,
    departureHook,
    trainHook,
    paymentType,
    user,
    setCurrentStep,
  ]);

  const isSeatAvailable = useCallback(
    (seatId) => {
      const { bookedSeats, currentCar } = trainHook;
      if (!bookedSeats || !Array.isArray(bookedSeats)) {
        return true;
      }
      return !bookedSeats.some(
        (booking) =>
          booking.carId === currentCar?.id && booking.seatIds.includes(seatId)
      );
    },
    [trainHook]
  );

  const paymentAndBookingData = useMemo(
    () => ({
      paymentType,
      paymentOptions,
      handleSelectPaymentType,
      handleGoToNextStep,
      bookingInfo: bookingHook.bookingInfo,
      departureInfo: selectedDepartureInfo,
      trainInfo: trainHook.selectedTrain,
      selectedSeats: validSelectedSeats,
      bookingError: bookingHook.bookingError,
      bookingStatus: bookingHook.bookingStatus,
      handleCompleteBooking,
      resetBookingState,
    }),
    [
      paymentType,
      paymentOptions,
      handleSelectPaymentType,
      handleGoToNextStep,
      bookingHook.bookingInfo,
      bookingHook.bookingError,
      bookingHook.bookingStatus,
      selectedDepartureInfo,
      trainHook.selectedTrain,
      validSelectedSeats,
      handleCompleteBooking,
      resetBookingState,
    ]
  );

  return {
    handleGoToNextStep,
    handleSelectPaymentType,
    resetBookingState,
    handleDepartureSelection,
    handleSaveBookingInfo,
    handleCompleteBooking,
    isSeatAvailable,
    paymentAndBookingData,
    trainRowsConfig,
  };
}
