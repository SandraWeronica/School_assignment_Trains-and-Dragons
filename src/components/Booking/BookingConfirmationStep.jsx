import { memo, useEffect } from "react";
import styled from "styled-components";
import useBooking from "../../context/booking/useBooking";
import { useNavigate } from "react-router";
import Button from "../Button";
import confirmation from "../../assets/images/confirmation.png";

const BookingConfirmationStep = () => {
  const { step4, resetBookingState } = useBooking();
  const { bookingInfo } = step4;
  const navigate = useNavigate();

  const formattedPrice = new Intl.NumberFormat("sv-SE", {
    style: "currency",
    currency: "SEK",
  })
    .format(bookingInfo.price)
    .replace("SEK", "")
    .trim();

  useEffect(() => {
    document.title = "Tågbokning - Bekräftelse";

    return () => {
      document.title = "Tågbokning";
    };
  }, []);

  const handleReturnToHome = () => {
    resetBookingState();
    navigate("/");
  };

  const handlePrintConfirmation = () => {
    window.print();
  };

  return (
    <Container>
      <h2>Packa väskorna, din resa är bokad!</h2>
      <BookingSummary>
        <BookingDate>
          <Label>Datum: </Label>
          <Value>
            <time dateTime={bookingInfo.departureInfo.date}>
              {bookingInfo.departureInfo.date}
            </time>
          </Value>
        </BookingDate>

        <Wrapper>
          <Info>
            <Section>
              <SectionTitle>Resväg</SectionTitle>
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
            </Section>

            <Section>
              <SectionTitle>Bokningsdetaljer</SectionTitle>
              <Summary>
                <SummaryItem>
                  <Label>Tåg:</Label>{" "}
                  <Value>{bookingInfo.trainInfo.type}</Value>
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
                <SummaryItem>
                  <Label>Bokningsnummer:</Label>{" "}
                  <Value>{bookingInfo.bookingId}</Value>
                </SummaryItem>
                <SummaryItem className="total">
                  <Label>Totalt pris:</Label>
                  <Value>{formattedPrice}</Value>
                </SummaryItem>
              </Summary>
            </Section>
          </Info>

          <ConfirmationImageWrapper>
            <StyledImg
              src={confirmation}
              alt="Bokningsbekräftelse illustration"
            />
          </ConfirmationImageWrapper>
        </Wrapper>

        <ButtonGroup>
          <Button
            onClick={handlePrintConfirmation}
            text="Skriv ut"
            variant="secondary"
          />
          <Button onClick={handleReturnToHome} text="Gå hem" />
        </ButtonGroup>
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
    text-align: center;
    margin-bottom: 1rem;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }

  h3 {
    font-size: 3rem;
    font-family: var(--font-mono);
    margin: 0;

    @media (max-width: 768px) {
      font-size: 2rem;
    }
  }
`;

const BookingSummary = styled.div`
  margin-top: 1rem;
  padding: 2rem;
  border-radius: 8px;
  background-color: var(--bg-30);
  width: 80%;
  font-size: 1.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  @media print {
    box-shadow: none;
    width: 100%;
    padding: 0;
  }

  @media (max-width: 1024px) {
    width: 90%;
    font-size: 1.2rem;
  }

  @media (max-width: 768px) {
    width: 95%;
    padding: 1rem;
  }
`;

const BookingDate = styled.div`
  margin-bottom: 1rem;
  display: flex;
  font-family: var(--font-mono);
  padding-bottom: 0.5rem;
  border-bottom: 1px dashed var(--bg-50);
`;

const Label = styled.span`
  font-weight: 600;
  margin-right: 0.5rem;
`;

const Value = styled.span`
  font-family: var(--font-mono);
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

const SummaryItem = styled.div`
  padding: 0.5rem 0;
  display: flex;
  justify-content: space-between;

  &.total {
    font-weight: bold;
    margin-top: 1rem;
    border-top: 2px solid var(--primary);
    padding-top: 1rem;
  }
`;

const Summary = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
`;

const Info = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding-bottom: 1rem;
`;

const DepartureInfo = styled.div`
  display: flex;
  flex-direction: row;
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

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  justify-content: space-between;

  @media print {
    display: none;
  }

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const StyledImg = styled.img`
  max-width: 60%;
  height: auto;
  border-radius: 8px;

  @media print {
    max-width: 300px;
  }
`;

const ConfirmationImageWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 0 1rem;

  @media (max-width: 768px) {
    display: none;
  }

  @media print {
    display: flex;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export default memo(BookingConfirmationStep);
