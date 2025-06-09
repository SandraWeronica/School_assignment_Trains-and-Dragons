import { useEffect, memo } from "react";
import styled from "styled-components";
import useBooking from "../../context/booking/useBooking";
import useCompleteBooking from "../../hooks/useCompleteBooking";
import Button from "../Button";
import RadioGroup from "../RadioGroup";

const PaymentReviewStep = () => {
  const { step4, handleGoToNextStep } = useBooking();
  const {
    paymentType,
    paymentOptions,
    handleSelectPaymentType,
    bookingInfo,
    departureInfo,
    trainInfo,
    selectedSeats,
    bookingError,
    bookingStatus,
    handleCompleteBooking,
  } = step4;

  const formattedPaymentOptions = paymentOptions.map((option) => ({
    label: option.label,
    value: option.label,
    name: option.name,
  }));

  const { onCompleteBooking, isSubmitting, localError, clearError } =
    useCompleteBooking({
      handleCompleteBooking,
      handleGoToNextStep,
      bookingError,
    });

  const handleBookingSubmit = () => {
    if (!paymentType) {
      clearError();
      return;
    }

    const bookingData = {
      departureInfo,
      trainInfo,
      selectedSeats,
      paymentType,
    };

    onCompleteBooking(bookingData);
  };

  useEffect(() => {
    if (bookingStatus === "success") {
      console.log("Booking was successful");
    } else if (bookingStatus === "error" && bookingError) {
      console.error("Booking error:", bookingError);
    }
  }, [bookingStatus, bookingError]);

  return (
    <Container>
      <h2 id="booking-summary-heading">Reseinformation och betalning</h2>
      <BookingSummary aria-labelledby="booking-summary-heading">
        <BookingDate>
          <Label>Datum: </Label>
          <Value>
            <time dateTime={bookingInfo.departureInfo.date}>
              {bookingInfo.departureInfo.date}
            </time>
          </Value>
        </BookingDate>

        <Section>
          <Info>
            <DepartureInfo>
              <Departure>
                <h3>{bookingInfo.departureInfo.from}</h3>
                <Label>Avgång:</Label>
                <Value>{bookingInfo.departureInfo.departureTime}</Value>
              </Departure>
              <Line aria-hidden="true" />
              <Arrival>
                <h3>{bookingInfo.departureInfo.to}</h3>
                <Label>Ankomst:</Label>
                <Value>{bookingInfo.departureInfo.arrivalTime}</Value>
              </Arrival>
            </DepartureInfo>
          </Info>
        </Section>

        <Section>
          <SectionTitle>Bokningsdetaljer</SectionTitle>
          <Summary>
            <SummaryItem>
              <Label>Tåg:</Label> <Value>{bookingInfo.trainInfo.type}</Value>
            </SummaryItem>
            <SummaryItem>
              <Label>Vagn:</Label> <Value>{bookingInfo.carInfo.id}</Value>
            </SummaryItem>
            <SummaryItem>
              <Label>
                {bookingInfo.seatInfo.length > 1 ? "Platser: " : "Plats: "}
              </Label>
              <Value>
                {bookingInfo.seatInfo.map((seat) => seat.id).join(", ")}
              </Value>
            </SummaryItem>
            <SummaryItem className="total">
              <Label>Totalt pris:</Label>
              <Value>
                {new Intl.NumberFormat("sv-SE", {
                  style: "currency",
                  currency: "SEK",
                })
                  .format(bookingInfo.price)
                  .replace("SEK", "")
                  .trim()}{" "}
              </Value>
            </SummaryItem>
          </Summary>
        </Section>

        <PaymentSection>
          <SectionTitle>Betalningsmetod:</SectionTitle>
          <Payment>
            <RadioGroup
              options={formattedPaymentOptions}
              selectedValue={paymentType}
              onChange={handleSelectPaymentType}
              direction="column"
            />
          </Payment>
        </PaymentSection>

        {localError && (
          <ErrorMessage role="alert">
            <p>{localError}</p>
          </ErrorMessage>
        )}

        <ButtonContainer>
          <Button
            onClick={handleBookingSubmit}
            text={isSubmitting ? "Slutför bokning..." : "Slutför bokning"}
            disabled={isSubmitting || bookingStatus === "pending"}
            aria-busy={isSubmitting || bookingStatus === "pending"}
          />
        </ButtonContainer>

        {bookingStatus === "pending" && (
          <LoadingMessage role="status">
            Behandlar din bokning...
          </LoadingMessage>
        )}
      </BookingSummary>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 2rem;

  h2 {
    font-family: var(--heading-font);
    font-weight: lighter;
    font-size: 3rem;
  }
  h3 {
    font-size: 3rem;
    font-family: var(--font-mono);
    margin: 0;
  }
  p {
    margin-bottom: 0px;
    font-family: var(--font-mono);
  }
`;

const BookingSummary = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  border-radius: 8px;
  background-color: var(--bg-30);
  width: 60%;
  font-size: 1.5rem;

  @media (max-width: 1024px) {
    width: 80%;
  }

  @media (max-width: 768px) {
    width: 95%;
    font-size: 1.3rem;
  }
`;

const BookingDate = styled.div`
  margin-bottom: 1rem;
  display: flex;
  gap: 0.5rem;
`;

const Section = styled.section`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h4`
  font-family: var(--heading-font);
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid var(--bg-40);
  padding-bottom: 0.5rem;
`;

const Label = styled.span`
  font-weight: 600;
`;

const Value = styled.span`
  font-family: var(--font-mono);
`;

const SummaryItem = styled.div`
  padding: 0.5rem 0;
  display: flex;
  justify-content: space-between;

  &.total {
    font-weight: bold;
    margin-top: 1rem;
    border-top: 2px solid var(--primary);
    border-bottom: none;
    padding-top: 1rem;
  }
`;

const PaymentSection = styled.div`
  margin-top: 2rem;
  border-top: 1px solid var(--text-color);
  padding: 1rem;
`;

const Summary = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
`;

const Payment = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const LoadingMessage = styled.div`
  color: var(--primary);
  text-align: center;
  font-weight: bold;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &::before {
    content: "";
    display: inline-block;
    width: 1rem;
    height: 1rem;
    border: 2px solid var(--primary);
    border-radius: 50%;
    border-top-color: transparent;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const ErrorMessage = styled.div`
  margin: 1rem 0;
  padding: 0.75rem 1rem;
  border-radius: 4px;
  color: var(--color-rose-300);
  display: flex;
  justify-content: space-between;
  align-items: center;
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  p {
    margin: 0;
    font-family: var(--font-mono);
  }
`;

const Info = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid var(--text-color);
  padding-bottom: 1rem;
`;

const DepartureInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Departure = styled.div`
  display: flex;
  flex-direction: column;
`;

const Arrival = styled.div`
  display: flex;
  flex-direction: column;
`;

const Line = styled.div`
  width: 128px;
  border-bottom: 1px solid var(--text-color);
  height: 38px;

  @media (max-width: 768px) {
    width: 2px;
    height: 60px;
    border-bottom: none;
    border-left: 1px solid var(--text-color);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 2rem;
`;

export default memo(PaymentReviewStep);
