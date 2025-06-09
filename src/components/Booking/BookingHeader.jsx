import { memo, useCallback } from "react";
import RadioGroup from "../RadioGroup";
import Input from "../Input";
import useBooking from "../../context/booking/useBooking";
import Select from "../Select";
import styled from "styled-components";
import Line from "./Line";

const BookingHeader = () => {
  const { step1 } = useBooking();
  const {
    radioOptions,
    handleSelectBookingType,
    destinations,
    handleSelectDepartureDestination,
    handleSelectArrivalDestination,
    handleSelectDepartureDate,
    handleSelectReturnDate,
    bookingType,
    departureDestination,
    arrivalDestination,
    departureDate,
    returnDate,
    passengers,
  } = step1;

  const onDepartureDestinationChange = useCallback(
    (event) => handleSelectDepartureDestination(event),
    [handleSelectDepartureDestination]
  );

  const onArrivalDestinationChange = useCallback(
    (event) => handleSelectArrivalDestination(event),
    [handleSelectArrivalDestination]
  );

  const onDepartureDateChange = useCallback(
    (event) => handleSelectDepartureDate(event),
    [handleSelectDepartureDate]
  );

  const onReturnDateChange = useCallback(
    (event) => handleSelectReturnDate(event),
    [handleSelectReturnDate]
  );

  const today = new Date().toISOString().split("T")[0];

  return (
    <StyledBookingHeader>
      <TripTypeSection>
        <RadioGroup
          direction="column"
          options={radioOptions}
          onChange={handleSelectBookingType}
          selectedValue={bookingType}
          aria-label="Välj typ av resa"
        />
      </TripTypeSection>

      <TripDetailsSection>
        <FlexRow>
          <Select
            options={destinations}
            onChange={onDepartureDestinationChange}
            value={departureDestination}
            aria-label="Avreseort"
          />
          <Line />
          <Select
            options={destinations}
            onChange={onArrivalDestinationChange}
            value={arrivalDestination}
            aria-label="Destination"
          />
        </FlexRow>

        <FlexRow>
          <Input
            label="Utresa"
            type="date"
            name="departureDate"
            onChange={onDepartureDateChange}
            value={departureDate}
            min={today}
            aria-label="Välj utresedatum"
          />
          {bookingType === "Tur och retur" && (
            <>
              <Line />
              <Input
                label="Hemresa"
                type="date"
                name="returnDate"
                onChange={onReturnDateChange}
                value={returnDate}
                min={departureDate || today}
                aria-label="Välj hemresedatum"
                disabled={!departureDate}
              />
            </>
          )}
        </FlexRow>
      </TripDetailsSection>

      <PassengersSection>
        <PassengerCount aria-live="polite">
          Antal resenärer: {passengers.length}
        </PassengerCount>
      </PassengersSection>
    </StyledBookingHeader>
  );
};

const StyledBookingHeader = styled.header`
  background-color: var(--bg-dark);
  padding: 0.5rem 2rem;
  display: flex;
  gap: 1rem;
  flex-wrap: nowrap;

  @media (max-width: 1024px) {
    flex-direction: column;
    padding: 1rem;
  }
`;

const TripTypeSection = styled.div`
  min-width: 120px;
  display: flex;
  align-items: flex-start;

  @media (max-width: 1024px) {
    flex-direction: row;
    width: 100%;
  }
`;

const PassengersSection = styled.div`
  align-items: start;
  min-width: 150px;
  padding-top: 0.5rem;

  @media (max-width: 1024px) {
    width: 100%;
    justify-content: flex-end;
  }
`;

const PassengerCount = styled.p`
  margin-bottom: 0;
  margin-top: 0;
  padding: 0.5rem;
  background-color: var(--bg-30);
  border-radius: 4px;
  font-weight: 500;
`;

const FlexRow = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  flex-wrap: nowrap;
  align-items: center;
  padding: 0.5rem 0;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;

    & > div:not(:last-child) {
      width: 100%;
    }
  }
`;

const FlexStack = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;
const TripDetailsSection = styled(FlexStack)`
  flex: 1;
`;

export default memo(BookingHeader);
