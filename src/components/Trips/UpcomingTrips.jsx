import PropTypes from "prop-types";
import styled from "styled-components";
import TripCard from "./TripCard";
import useModal from "../../context/modal/UseModal";
import AllTripsModal from "./AllTripsModal";
import useUser from "../../context/user/useUser";

const UpcomingTrips = () => {
  const { openModal } = useModal();
  const { upcomingBookings: bookings } = useUser();

  const hasMoreBookings = bookings.length > 3;

  const openAllTripsModal = () => {
    const AllTripsContent = () => <AllTripsModal bookings={bookings} />;

    openModal(AllTripsContent);
  };

  return (
    <TripsSection aria-labelledby="upcoming-trips-title">
      <TripsHeader>
        <TripsTitle id="upcoming-trips-title">Kommande resor:</TripsTitle>
      </TripsHeader>

      {bookings.length > 0 ? (
        <>
          <TripsList aria-label="Kommande resebokningar">
            {bookings.slice(0, 3).map((booking) => (
              <TripCard booking={booking} key={booking.id} />
            ))}
          </TripsList>

          {hasMoreBookings && (
            <ViewAllButton
              onClick={openAllTripsModal}
              aria-label="Visa alla resor"
              type="button"
            >
              Visa alla resor
            </ViewAllButton>
          )}
        </>
      ) : (
        <EmptyState role="status">Du har inga bokningar ännu.</EmptyState>
      )}
    </TripsSection>
  );
};

UpcomingTrips.propTypes = {
  bookings: PropTypes.array.isRequired,
  formatDate: PropTypes.func.isRequired,
};

const TripsSection = styled.section`
  margin: 2rem 0;
  background-color: var(--bg-30);
  width: 80%;
  padding: 1rem;
  border-radius: 0.5rem;
`;

const TripsHeader = styled.div`
  display: flex;
  justify-content: center;
`;

const TripsTitle = styled.h2`
  font-size: 1.75rem;
  margin: 0;
  margin-bottom: 0.5rem;
  font-family: var(--heading-font);
`;

const TripsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ViewAllButton = styled.button`
  background-color: var(--bg-dark);
  color: var(--text-color);
  font-family: var(--font-mono);
  width: 100%;
  border-radius: 0.5rem;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  font-size: 1rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    color: var(--el-hover);
  }
`;

const EmptyState = styled.p`
  text-align: center;
  color: var(--text-color-light);
  font-size: 1rem;
  padding: 3rem 1rem;
  background-color: var(--bg-darker);
  border-radius: 0.5rem;
  font-style: italic;
`;

export default UpcomingTrips;
