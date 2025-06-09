import { useEffect, useCallback } from "react";
import RadioGroup from "../RadioGroup";
import Input from "../Input";
import useBooking from "../../context/booking/useBooking";
import Select from "../Select";
import Passengers from "../Passengers";
import styled from "styled-components";
import Line from "./Line";
import Button from "../Button";
import useTripFormValidation from "../../hooks/useTripFormValidation";

const TripSelectionStep = () => {
  const { step1 } = useBooking();
  const {
    radioOptions,
    handleSelectBookingType,
    destinations,
    handleSelectDepartureDestination,
    handleSelectArrivalDestination,
    errorMessage,
    handleSelectDepartureDate,
    handleSelectReturnDate,
    bookingType,
    departureDestination,
    arrivalDestination,
    departureDate,
    returnDate,
  } = step1;

  const {
    fieldErrors,
    touchedFields,
    markFieldTouched,
    handleSubmitForm,
    resetValidation,
  } = useTripFormValidation();

  useEffect(() => {
    return () => resetValidation();
  }, [resetValidation]);

  const handleDepartureDestinationChange = useCallback(
    (e) => {
      handleSelectDepartureDestination(e);
      markFieldTouched("departureDestination");
    },
    [handleSelectDepartureDestination, markFieldTouched]
  );

  const handleArrivalDestinationChange = useCallback(
    (e) => {
      handleSelectArrivalDestination(e);
      markFieldTouched("arrivalDestination");
    },
    [handleSelectArrivalDestination, markFieldTouched]
  );

  const handleDepartureDateChange = useCallback(
    (e) => {
      handleSelectDepartureDate(e);
      markFieldTouched("departureDate");
    },
    [handleSelectDepartureDate, markFieldTouched]
  );

  const handleReturnDateChange = useCallback(
    (e) => {
      handleSelectReturnDate(e);
      markFieldTouched("returnDate");
    },
    [handleSelectReturnDate, markFieldTouched]
  );

  const today = new Date().toISOString().split("T")[0];

  return (
    <TripSelectionsContainer>
      <TripSelection onSubmit={handleSubmitForm} noValidate>
        <h2>Sök resa</h2>
        <RadioGroup
          direction="row"
          options={radioOptions}
          onChange={handleSelectBookingType}
          selectedValue={bookingType}
        />
        <FlexRow>
          <FormGroup>
            <Select
              options={destinations}
              onChange={handleDepartureDestinationChange}
              value={departureDestination}
              aria-required="true"
              aria-invalid={
                touchedFields.departureDestination &&
                !!fieldErrors.departureDestination
              }
              aria-label="Avreseort"
              label="Avreseort"
            />
            {touchedFields.departureDestination &&
              fieldErrors.departureDestination && (
                <FieldError role="alert">
                  {fieldErrors.departureDestination}
                </FieldError>
              )}
          </FormGroup>
          <Line />
          <FormGroup>
            <Select
              options={destinations}
              onChange={handleArrivalDestinationChange}
              value={arrivalDestination}
              aria-required="true"
              aria-invalid={
                touchedFields.arrivalDestination &&
                !!fieldErrors.arrivalDestination
              }
              aria-label="Destination"
              label="Destination"
            />
            {touchedFields.arrivalDestination &&
              fieldErrors.arrivalDestination && (
                <FieldError role="alert">
                  {fieldErrors.arrivalDestination}
                </FieldError>
              )}
          </FormGroup>
        </FlexRow>
        <FlexRow>
          <FormGroup>
            <Input
              label="Utresa"
              type="date"
              name="departureDate"
              onChange={handleDepartureDateChange}
              value={departureDate}
              min={today}
              aria-required="true"
              aria-invalid={
                touchedFields.departureDate && !!fieldErrors.departureDate
              }
              className={
                touchedFields.departureDate && !fieldErrors.departureDate
                  ? "valid-field"
                  : ""
              }
            />
            {touchedFields.departureDate && fieldErrors.departureDate && (
              <FieldError role="alert">{fieldErrors.departureDate}</FieldError>
            )}
          </FormGroup>
          {bookingType === "Tur och retur" && (
            <>
              <Line />
              <FormGroup>
                <Input
                  label="Hemresa"
                  type="date"
                  name="returnDate"
                  onChange={handleReturnDateChange}
                  value={returnDate}
                  min={departureDate || today}
                  aria-required={bookingType === "Tur och retur"}
                  aria-invalid={
                    touchedFields.returnDate && !!fieldErrors.returnDate
                  }
                  className={
                    touchedFields.returnDate && !fieldErrors.returnDate
                      ? "valid-field"
                      : ""
                  }
                />
                {touchedFields.returnDate && fieldErrors.returnDate && (
                  <FieldError role="alert">{fieldErrors.returnDate}</FieldError>
                )}
              </FormGroup>
            </>
          )}
        </FlexRow>
        {errorMessage && (
          <ErrorMessage role="alert">{errorMessage}</ErrorMessage>
        )}
        <Passengers />
        <div className="flex justify-end px-8">
          <Button type="submit" text="Gå vidare" />
        </div>
      </TripSelection>
    </TripSelectionsContainer>
  );
};

const TripSelectionsContainer = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: center;
  padding: 3rem;
  h2 {
    font-family: var(--heading-font);
    font-weight: lighter;
    font-size: 3rem;
    text-align: center;
  }
`;

const TripSelection = styled.form`
  background-color: var(--bg-30);
  padding: 2rem;
  width: 40%;
  border-radius: 1rem;

  @media (max-width: 1024px) {
    width: 60%;
  }

  @media (max-width: 768px) {
    width: 90%;
    padding: 1.5rem;
  }
`;

const FlexRow = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 1rem 0;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ErrorMessage = styled.p`
  color: var(--color-rose-300);
  font-weight: 500;
  margin: 0.5rem 0;
`;

const FieldError = styled.span`
  color: var(--color-rose-300);
  font-size: 0.8rem;
  margin-top: 0.25rem;
`;

export default TripSelectionStep;
