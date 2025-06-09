import styled from "styled-components";
import PropTypes from "prop-types";
import { formatDate } from "../../util/date";

const TripModal = ({ booking }) => {
  return (
    <TripModalContent role="dialog" aria-labelledby="trip-modal-title">
      <TripModalHeader>
        <Info>
          <DepartureInfo>
            <Departure>
              <LocationHeading id="trip-modal-title">
                {booking.departureInfo?.from || "N/A"}
              </LocationHeading>
            </Departure>
            <Line aria-hidden="true" />
            <Arrival>
              <LocationHeading>
                {booking.departureInfo?.to || "N/A"}
              </LocationHeading>
            </Arrival>
          </DepartureInfo>
        </Info>
      </TripModalHeader>

      <TripModalSection>
        <TripModalSectionTitle>Reseinformation:</TripModalSectionTitle>
        <TripModalInfo role="table" aria-label="Reseinformation">
          <TripModalLabel as="div" role="rowheader">
            Tåg:
          </TripModalLabel>
          <TripModalValue as="div" role="cell">
            {booking.trainInfo?.type || "N/A"}
          </TripModalValue>

          <TripModalLabel as="div" role="rowheader">
            Datum:
          </TripModalLabel>
          <TripModalValue as="div" role="cell">
            {booking.departureDate || formatDate(booking.timestamp) || "N/A"}
          </TripModalValue>

          <TripModalLabel as="div" role="rowheader">
            Avgång:
          </TripModalLabel>
          <TripModalValue as="div" role="cell">
            {booking.departureInfo?.departureTime || "N/A"}
          </TripModalValue>

          <TripModalLabel as="div" role="rowheader">
            Ankomst:
          </TripModalLabel>
          <TripModalValue as="div" role="cell">
            {booking.departureInfo?.arrivalTime || "N/A"}
          </TripModalValue>

          <TripModalLabel as="div" role="rowheader">
            Total restid:
          </TripModalLabel>
          <TripModalValue as="div" role="cell">
            {booking.departureInfo?.travelTime || "N/A"}
          </TripModalValue>
        </TripModalInfo>
      </TripModalSection>

      <TripModalSection>
        <TripModalSectionTitle>Platsinformation</TripModalSectionTitle>
        <TripModalInfo>
          <TripModalLabel>Vagn:</TripModalLabel>
          <TripModalValue>{booking.carId || "N/A"}</TripModalValue>

          <TripModalLabel>Plats:</TripModalLabel>
          <TripModalValue>
            {Array.isArray(booking.seats) ? booking.seats.join(", ") : "N/A"}
          </TripModalValue>
        </TripModalInfo>
      </TripModalSection>

      <TripModalSection>
        <TripModalSectionTitle>Bokningsinformation</TripModalSectionTitle>
        <TripModalInfo>
          <TripModalLabel>Bokningsnummer:</TripModalLabel>
          <TripModalValue>{booking.id || "N/A"}</TripModalValue>

          <TripModalLabel>Pris:</TripModalLabel>
          <TripModalValue>{booking.totalPrice || "N/A"} SEK</TripModalValue>

          <TripModalLabel>Betalningsmetod:</TripModalLabel>
          <TripModalValue>{booking.paymentMethod || "N/A"}</TripModalValue>
        </TripModalInfo>
      </TripModalSection>

      {booking.passengers && booking.passengers.length > 0 && (
        <TripModalSection>
          <TripModalSectionTitle>Resenärer</TripModalSectionTitle>
          {booking.passengers.map((passenger, index) => (
            <TripModalPassenger key={index}>
              <TripModalPassengerName>
                {passenger.firstName} {passenger.lastName}
              </TripModalPassengerName>
              {passenger.email && (
                <TripModalPassengerEmail>
                  {passenger.email}
                </TripModalPassengerEmail>
              )}
            </TripModalPassenger>
          ))}
        </TripModalSection>
      )}
    </TripModalContent>
  );
};

TripModal.propTypes = {
  booking: PropTypes.shape({
    departureInfo: PropTypes.shape({
      from: PropTypes.string,
      to: PropTypes.string,
      date: PropTypes.string,
      departureTime: PropTypes.string,
      arrivalTime: PropTypes.string,
      travelTime: PropTypes.string,
    }),
    trainInfo: PropTypes.shape({
      type: PropTypes.string,
    }),
    carId: PropTypes.string,
    seats: PropTypes.arrayOf(PropTypes.string),
    id: PropTypes.string,
    totalPrice: PropTypes.number,
    paymentMethod: PropTypes.string,
    status: PropTypes.string,
    departureDate: PropTypes.string,
    passengers: PropTypes.arrayOf(
      PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
      })
    ),
    timestamp: PropTypes.number,
  }).isRequired,
};

const Info = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  h3 {
    font-family: var(--font-mono);
    font-size: 1.75rem;
    color: var(--text-color);
  }
`;
const DepartureInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 1rem;
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
  height: 22px;
`;

const TripModalContent = styled.div`
  padding: 1.5rem;
  max-height: 80vh;
  overflow-y: auto;
  background-color: var(--bg-30);
`;

const TripModalHeader = styled.div`
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--text-color);
`;

const TripModalSection = styled.section`
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--text-color);

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const TripModalSectionTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1rem 0;
  color: var(--text-color);
`;

const TripModalInfo = styled.div`
  display: grid;
  grid-template-columns: 40% 60%;
  row-gap: 0.75rem;
  align-items: center;
`;

const TripModalLabel = styled.span`
  font-weight: 600;
  color: var(--text-color);
  font-size: 0.875rem;
`;

const TripModalValue = styled.span`
  font-weight: 500;
  font-size: 1rem;
  color: var(--text-color);
`;

const TripModalPassenger = styled.div`
  margin-bottom: 0.75rem;
  padding: 0.75rem;
  border-radius: 0.5rem;

  &:last-child {
    margin-bottom: 0;
  }
`;

const TripModalPassengerName = styled.div`
  font-weight: 600;
  color: var(--text-color);
  font-size: 1rem;
`;

const TripModalPassengerEmail = styled.div`
  font-size: 0.875rem;
  color: var(--text-color);
  margin-top: 0.25rem;
`;

const LocationHeading = styled.h3`
  font-family: var(--font-mono);
  font-size: 1.75rem;
  color: var(--text-color);
`;

export default TripModal;
