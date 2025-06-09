import styled from "styled-components";
import TripCard from "./TripCard";
import PropTypes from "prop-types";

const AllTripsModal = ({ bookings }) => {
  return (
    <AllTripsModalContent
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-subtitle"
    >
      <AllTripsModalHeader>
        <AllTripsModalTitle id="modal-title">
          Alla dina resor
        </AllTripsModalTitle>
        <AllTripsModalSubtitle id="modal-subtitle">
          {bookings.length} {bookings.length === 1 ? "resa" : "resor"} totalt
        </AllTripsModalSubtitle>
      </AllTripsModalHeader>

      <AllTripsList aria-label="Lista över resor">
        {bookings.map((booking) => (
          <li key={booking.id}>
            <TripCard booking={booking} />
          </li>
        ))}
      </AllTripsList>
    </AllTripsModalContent>
  );
};

AllTripsModal.propTypes = {
  bookings: PropTypes.array.isRequired,
};

const AllTripsModalContent = styled.div`
  padding: 1.5rem;
  max-width: 700px;
  width: 100%;
  max-height: 80vh;
  overflow-y: auto;
  background-color: var(--bg-30);
`;

const AllTripsModalHeader = styled.div`
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border-color);
  text-align: center;
`;

const AllTripsModalTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  color: var(--text-color);
`;

const AllTripsModalSubtitle = styled.p`
  font-size: 1rem;
  color: var(--text-color-light);
  margin: 0;
`;

const AllTripsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  & > li:last-child > div {
    margin-bottom: 0;
  }
`;

export default AllTripsModal;
