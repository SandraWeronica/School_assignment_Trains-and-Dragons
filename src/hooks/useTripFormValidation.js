import { useState, useCallback, useEffect } from "react";
import useBooking from "../context/booking/useBooking";

const useTripFormValidation = () => {
  const { step1, handleGoToNextStep } = useBooking();
  const {
    destinations,
    bookingType,
    departureDestination,
    arrivalDestination,
    departureDate,
    returnDate,
    setErrorMessage,
  } = step1;

  const [fieldErrors, setFieldErrors] = useState({
    departureDestination: "",
    arrivalDestination: "",
    departureDate: "",
    returnDate: "",
  });

  const [touchedFields, setTouchedFields] = useState({
    departureDestination: false,
    arrivalDestination: false,
    departureDate: false,
    returnDate: false,
  });

  const markFieldTouched = useCallback((fieldName) => {
    setTouchedFields((prev) => ({
      ...prev,
      [fieldName]: true,
    }));
  }, []);

  const markAllFieldsTouched = useCallback(() => {
    setTouchedFields({
      departureDestination: true,
      arrivalDestination: true,
      departureDate: true,
      returnDate: bookingType === "Tur och retur",
    });
  }, [bookingType]);

  const validateDepartureDestination = useCallback(() => {
    let error = "";

    if (departureDestination === destinations[0]) {
      error = "Du måste välja en avgångsort";
    } else if (
      departureDestination === arrivalDestination &&
      arrivalDestination !== destinations[0]
    ) {
      error = "Avgångs- och ankomstort kan inte vara samma";
    }

    setFieldErrors((prev) => ({
      ...prev,
      departureDestination: error,
    }));

    return !error;
  }, [departureDestination, arrivalDestination, destinations]);

  const validateArrivalDestination = useCallback(() => {
    let error = "";

    if (arrivalDestination === destinations[0]) {
      error = "Du måste välja en ankomstort";
    } else if (
      arrivalDestination === departureDestination &&
      departureDestination !== destinations[0]
    ) {
      error = "Avgångs- och ankomstort kan inte vara samma";
    }

    setFieldErrors((prev) => ({
      ...prev,
      arrivalDestination: error,
    }));

    return !error;
  }, [arrivalDestination, departureDestination, destinations]);

  const validateDepartureDate = useCallback(() => {
    let error = "";

    if (!departureDate) {
      error = "Du måste välja ett avresedatum";
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const selectedDate = new Date(departureDate);
      selectedDate.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        error = "Avresedatum måste vara idag eller i framtiden";
      }
    }

    setFieldErrors((prev) => ({
      ...prev,
      departureDate: error,
    }));

    return !error;
  }, [departureDate]);

  const validateReturnDate = useCallback(() => {
    if (bookingType !== "Tur och retur") {
      setFieldErrors((prev) => ({
        ...prev,
        returnDate: "",
      }));
      return true;
    }

    let error = "";

    if (!returnDate) {
      error = "Du måste välja ett returdatum";
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const selectedDate = new Date(returnDate);
      selectedDate.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        error = "Returdatum måste vara idag eller i framtiden";
      } else if (departureDate) {
        const departureDateTime = new Date(departureDate);
        departureDateTime.setHours(0, 0, 0, 0);

        if (selectedDate < departureDateTime) {
          error = "Returdatum måste vara efter avresedatum";
        }
      }
    }

    setFieldErrors((prev) => ({
      ...prev,
      returnDate: error,
    }));

    return !error;
  }, [bookingType, returnDate, departureDate]);

  useEffect(() => {
    if (touchedFields.departureDestination) {
      validateDepartureDestination();
    }
  }, [
    departureDestination,
    touchedFields.departureDestination,
    validateDepartureDestination,
  ]);

  useEffect(() => {
    if (touchedFields.arrivalDestination) {
      validateArrivalDestination();
    }
  }, [
    arrivalDestination,
    touchedFields.arrivalDestination,
    validateArrivalDestination,
  ]);

  useEffect(() => {
    if (touchedFields.departureDate) {
      validateDepartureDate();
    }
  }, [departureDate, touchedFields.departureDate, validateDepartureDate]);

  useEffect(() => {
    if (touchedFields.returnDate) {
      validateReturnDate();
    }
  }, [returnDate, touchedFields.returnDate, validateReturnDate]);

  const validateForm = useCallback(() => {
    markAllFieldsTouched();

    const isDepartureValid = validateDepartureDestination();
    const isArrivalValid = validateArrivalDestination();
    const isDepartureDateValid = validateDepartureDate();
    const isReturnDateValid = validateReturnDate();

    const isValid =
      isDepartureValid &&
      isArrivalValid &&
      isDepartureDateValid &&
      isReturnDateValid;

    if (!isValid) {
      const errors = [
        fieldErrors.departureDestination,
        fieldErrors.arrivalDestination,
        fieldErrors.departureDate,
        fieldErrors.returnDate,
      ];

      const firstError = errors.find((err) => !!err);
      if (firstError) {
        setErrorMessage(firstError);
      }
    }

    return isValid;
  }, [
    validateDepartureDestination,
    validateArrivalDestination,
    validateDepartureDate,
    validateReturnDate,
    markAllFieldsTouched,
    fieldErrors,
    setErrorMessage,
  ]);

  const handleSubmitForm = useCallback(
    (e) => {
      if (e) e.preventDefault();

      if (validateForm()) {
        handleGoToNextStep();
      }
    },
    [validateForm, handleGoToNextStep]
  );

  const resetValidation = useCallback(() => {
    setFieldErrors({
      departureDestination: "",
      arrivalDestination: "",
      departureDate: "",
      returnDate: "",
    });

    setTouchedFields({
      departureDestination: false,
      arrivalDestination: false,
      departureDate: false,
      returnDate: false,
    });
  }, []);

  return {
    fieldErrors,
    touchedFields,
    markFieldTouched,
    validateForm,
    handleSubmitForm,
    resetValidation,
  };
};

export default useTripFormValidation;
