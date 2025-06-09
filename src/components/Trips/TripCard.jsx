import PropTypes from "prop-types";
import styled from "styled-components";
import useModal from "../../context/modal/UseModal";
import TripModal from "./TripModal";
import { formatDate } from "../../util/date";

const TripCard = ({ booking }) => {
  const { openModal } = useModal();

  const openTripDetailsModal = () => {
    const TripDetailsContent = () => <TripModal booking={booking} />;
    openModal(TripDetailsContent);
  };

  return (
    <StyledTripCard
      onClick={openTripDetailsModal}
      tabIndex="0"
      role="button"
      aria-label={`Resa från ${booking.departureInfo?.from || "N/A"} till ${
        booking.departureInfo?.to || "N/A"
      } den ${booking.departureDate}`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openTripDetailsModal();
        }
      }}
    >
      <Info>
        <DepartureInfo>
          <Departure>
            <LocationName>{booking.departureInfo?.from || "N/A"}</LocationName>
            <Label>Avgång:</Label>
            <Time>{booking.departureInfo.departureTime}</Time>
          </Departure>
          <Line aria-hidden="true" />
          <Arrival>
            <LocationName>{booking.departureInfo?.to || "N/A"}</LocationName>
            <Label>Ankomst:</Label>
            <Time>{booking.departureInfo.arrivalTime}</Time>
          </Arrival>
        </DepartureInfo>
        <BookingDate>{formatDate(booking.departureDate)}</BookingDate>
      </Info>
    </StyledTripCard>
  );
};

const Info = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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

const LocationName = styled.h3`
  font-family: var(--font-mono);
  font-size: 1.75rem;
`;

const Label = styled.p`
  margin: 0;
  font-size: 1.25rem;
  font-family: var(--font-mono);
`;

const Time = styled.p`
  margin: 0;
  font-size: 1.25rem;
  font-family: var(--font-mono);
`;

const StyledTripCard = styled.div`
  background-color: var(--bg-dark);
  color: var(--text-color);
  font-family: var(--font-mono);
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    border: 1px solid var(--el-hover);
    cursor: pointer;
  }
`;

const BookingDate = styled.p`
  padding-top: 4px;
  font-weight: 500;
`;

TripCard.propTypes = {
  booking: PropTypes.shape({
    id: PropTypes.string,
    departureDate: PropTypes.string,
    departureInfo: PropTypes.shape({
      from: PropTypes.string,
      to: PropTypes.string,
      departureTime: PropTypes.string,
      arrivalTime: PropTypes.string,
      travelTime: PropTypes.string,
    }),
    trainInfo: PropTypes.shape({
      type: PropTypes.string,
    }),
    timestamp: PropTypes.string,
    carId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    seats: PropTypes.arrayOf(PropTypes.string),
    totalPrice: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    status: PropTypes.string,
    paymentMethod: PropTypes.string,
    passengers: PropTypes.arrayOf(
      PropTypes.shape({
        firstName: PropTypes.string,
        lastName: PropTypes.string,
        email: PropTypes.string,
      })
    ),
  }),
};

export default TripCard;
