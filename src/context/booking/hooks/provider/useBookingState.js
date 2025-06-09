import { useState, useMemo } from "react";
import useUser from "../../../user/useUser";
import useDepartures from "../useDepartures";
import useTrainSelection from "../useTrainSelection";
import useBookingSubmit from "../useBookingSubmit";
import useTripState from "../useTripState";
import {
  bookingSteps,
  radioOptions,
  paymentOptions,
} from "../../../../util/BookingConfig";

export default function useBookingState() {
  const destinations = useMemo(
    () => ["---Välj ort---", "Malmö", "Göteborg", "Stockholm"],
    []
  );

  const { user = null } = useUser() || {};

  const [currentStep, setCurrentStep] = useState(bookingSteps[0]);

  const tripState = useTripState(destinations, radioOptions[0].label);
  const [paymentType, setPaymentType] = useState(paymentOptions[0].label);

  const departureHook = useDepartures(
    tripState.departureDestination,
    tripState.arrivalDestination,
    tripState.departureDate,
    destinations
  );
  const trainHook = useTrainSelection();
  const bookingHook = useBookingSubmit();

  const selectedDepartureInfo = useMemo(
    () =>
      departureHook.availableDepartures.find(
        (d) => d.id === departureHook.selectedDepartureId
      ),
    [departureHook.availableDepartures, departureHook.selectedDepartureId]
  );

  const validSelectedSeats = useMemo(
    () => trainHook.selectedSeats.filter((seat) => seat && seat !== ""),
    [trainHook.selectedSeats]
  );

  return {
    user,
    destinations,
    currentStep,
    setCurrentStep,
    tripState,
    paymentType,
    setPaymentType,
    departureHook,
    trainHook,
    bookingHook,
    selectedDepartureInfo,
    validSelectedSeats,
    radioOptions,
    paymentOptions,
    bookingSteps,
  };
}
