import { useMemo } from "react";

export default function useContextValue(state, handlers) {
  const {
    currentStep,
    tripState,
    destinations,
    radioOptions,
    trainHook,
    departureHook,
  } = state;

  const {
    handleGoToNextStep,
    resetBookingState,
    isSeatAvailable,
    handleDepartureSelection,
    handleSaveBookingInfo,
    paymentAndBookingData,
    trainRowsConfig,
  } = handlers;

  return useMemo(
    () => ({
      currentStep,
      handleGoToNextStep,
      resetBookingState,

      step1: {
        ...tripState,
        ...tripState.handlers,
        radioOptions,
        destinations,
        setCurrentStep: state.setCurrentStep,
        resetBookingState,
      },

      step2: {
        trainRowsConfig,
        currentCar: trainHook.currentCar,
        selectedSeats: trainHook.selectedSeats,
        selectedTrain: trainHook.selectedTrain,
        handleCarClick: trainHook.handleCarClick,
        handleGoBackOneCar: trainHook.handleGoBackOneCar,
        handleGoForwardOneCar: trainHook.handleGoForwardOneCar,
        handleSeatClick: trainHook.handleSeatClick,
        isSeatSelected: trainHook.isSeatSelected,
        bookedSeats: trainHook.bookedSeats,
        isSeatAvailable,
        availableDepartures: departureHook.availableDepartures,
        isLoadingDepartures: departureHook.isLoadingDepartures,
        selectedDepartureId: departureHook.selectedDepartureId,
        handleDepartureSelection,
        saveBookingInfo: handleSaveBookingInfo,
        currentPassengerIndex: trainHook.currentPassengerIndex,
        handlePassengerChange: trainHook.handlePassengerChange,
        resetBookingState,
      },

      step3: paymentAndBookingData,
      step4: paymentAndBookingData,
    }),
    [
      currentStep,
      handleGoToNextStep,
      resetBookingState,
      tripState,
      trainHook,
      departureHook,
      isSeatAvailable,
      handleDepartureSelection,
      handleSaveBookingInfo,
      paymentAndBookingData,
      destinations,
      trainRowsConfig,
      state.setCurrentStep,
      radioOptions,
    ]
  );
}
