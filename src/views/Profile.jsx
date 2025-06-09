import styled from "styled-components";
import useUser from "../context/user/useUser";
import styles from "../styles/Profile.module.css";
import UpcomingTrips from "../components/Trips/UpcomingTrips";

const Profile = () => {
  const { user, bookingsLoading, nextTrip } = useUser();

  if (bookingsLoading) return <p>Loading your bookings...</p>;
  
  return (
    <main className={styles.profileContainer}>
      <header className={styles.profileHeader}>
        <figure className={styles.profilePicture}>
          {/* Empty figure element should be removed if not used */}
        </figure>
        <section className={styles.userInfo} aria-labelledby="greeting">
          <h1 id="greeting" className={styles.greeting}>
            Hej {user?.firstName || ""}!
          </h1>
          <article className={styles.travelInfo}>
            {nextTrip ? (
              <>
                <h2 id="next-trip-heading">Nästa resa:</h2>
                <Info>
                  <DepartureInfo>
                    <Departure>
                      <LocationName>
                        {nextTrip.departureInfo?.from || "N/A"}
                      </LocationName>
                      <Label>Avgång:</Label>
                      <Time>{nextTrip.departureInfo.departureTime}</Time>
                    </Departure>
                    <Line aria-hidden="true" />
                    <Arrival>
                      <LocationName>
                        {nextTrip.departureInfo?.to || "N/A"}
                      </LocationName>
                      <Label>Ankomst:</Label>
                      <Time>{nextTrip.departureInfo.arrivalTime}</Time>
                    </Arrival>
                  </DepartureInfo>
                  <BookingDate>{nextTrip.departureDate}</BookingDate>
                </Info>
              </>
            ) : (
              <h2>Inga resor bokade ännu</h2>
            )}
          </article>
        </section>
      </header>
      <section
        className={styles.upcomingTrips}
        aria-labelledby="upcoming-trips-heading"
      >
        <h2 id="upcoming-trips-heading" className="sr-only">
          Upcoming Trips
        </h2>
        <UpcomingTrips />
      </section>
    </main>
  );
};

const Info = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const DepartureInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
const BookingDate = styled.p`
  padding-top: 0.5rem;
  font-weight: 500;
`;

export default Profile;
