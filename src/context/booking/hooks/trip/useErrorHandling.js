import { useState, useCallback, useEffect } from "react";

export default function useErrorHandling() {
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({
    departureDestination: "",
    arrivalDestination: "",
    departureDate: "",
    returnDate: "",
  });

  const updateFieldError = useCallback((field, message) => {
    setFieldErrors((prev) => ({
      ...prev,
      [field]: message,
    }));
  }, []);

  const setError = useCallback(
    (message, field = null) => {
      setErrorMessage(message);

      if (field) {
        updateFieldError(field, message);
      }
    },
    [updateFieldError]
  );

  const clearAllErrors = useCallback(() => {
    setErrorMessage("");
    setFieldErrors({
      departureDestination: "",
      arrivalDestination: "",
      departureDate: "",
      returnDate: "",
    });
  }, []);

  useEffect(() => {
    if (!errorMessage) return;

    if (errorMessage.includes("avgångsort")) {
      updateFieldError("departureDestination", errorMessage);
    } else if (errorMessage.includes("ankomstort")) {
      updateFieldError("arrivalDestination", errorMessage);
    } else if (errorMessage.includes("avresedatum")) {
      updateFieldError("departureDate", errorMessage);
    } else if (errorMessage.includes("returdatum")) {
      updateFieldError("returnDate", errorMessage);
    }
  }, [errorMessage, updateFieldError]);

  return {
    errorMessage,
    fieldErrors,
    updateFieldError,
    setError,
    clearAllErrors,
    setErrorMessage,
  };
}
