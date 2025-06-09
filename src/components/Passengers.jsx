import styles from "../styles/Passengers.module.css";
import Button from "./Button";
import useBooking from "../context/booking/useBooking";

const Passengers = () => {
  const { step1 } = useBooking();
  const { passengers, handleUpdatePassengers } = step1;

  return (
    <div className={styles.passengersContainer}>
      <h3 id="passengers-heading" className="sr-only">Passengers</h3>
      <ul
        className="flex flex-col gap-3"
        aria-labelledby="passengers-heading"
      >
        {passengers.map((passenger) => (
          <li key={passenger.id} className={styles.textContainer}>
            {passenger.name}
          </li>
        ))}
      </ul>

      <div
        className="flex justify-end gap-3 py-2 w-full pr-8"
        role="group"
        aria-label="Adjust number of passengers"
      >
        <Button
          onClick={() => handleUpdatePassengers("remove")}
          disabled={passengers.length === 1}
          aria-label="Ta bort passagerare"
          text="-"
          extraStyles="w-10 h-10"
        />
        <Button
          onClick={() => handleUpdatePassengers("add")}
          aria-label="Lägg till passagerare"
          text="+"
          extraStyles="w-10 h-10"
        />
      </div>
    </div>
  );
};

export default Passengers;
