import styled from "styled-components";
import PropTypes from "prop-types";
import TrainSeat from "./TrainSeat";

const SeatSection = ({
  currentCar,
  trainRowsConfig,
  bookedSeats,
  isSeatSelected,
  handleSeatSelection,
}) => {
  return (
    <SeatLayout role="grid" aria-label="Välj sittplats">
      {trainRowsConfig.map((row, rowIndex) => {
        if (row.type === "aisle") {
          return <Aisle key={row.id} aria-hidden="true" />;
        }

        return (
          <SeatRow key={row.id} role="row" aria-rowindex={rowIndex + 1}>
            {currentCar.columns.map((column, colIndex) => {
              const seat = column[row.index];
              const isSelected = isSeatSelected(seat.id);
              const isAvailable =
                seat.isAvailable &&
                (!bookedSeats || !Array.isArray(bookedSeats)
                  ? true
                  : !bookedSeats.some(
                      (booking) =>
                        booking.carId === currentCar.id &&
                        booking.seatIds.includes(seat.id)
                    ));

              return (
                <div key={seat.id} role="gridcell" aria-colindex={colIndex + 1}>
                  <TrainSeat
                    seat={{ ...seat, carId: currentCar.id }}
                    isSeatSelected={isSeatSelected}
                    isSeatAvailable={() => isAvailable}
                    handleSeatClick={handleSeatSelection}
                    ariaDescribedby={`seat-status-${seat.id}`}
                  />
                  <span id={`seat-status-${seat.id}`} className="sr-only">
                    {!isAvailable
                      ? "Upptagen"
                      : isSelected
                      ? "Vald"
                      : "Tillgänglig"}
                  </span>
                </div>
              );
            })}
          </SeatRow>
        );
      })}
    </SeatLayout>
  );
};
const SeatLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
`;

const SeatRow = styled.div`
  display: flex;
  align-items: center;
`;

const Aisle = styled.div`
  height: 1.5rem;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.3rem;
  border-radius: 0.25rem;
`;
SeatSection.propTypes = {
  currentCar: PropTypes.object.isRequired,
  trainRowsConfig: PropTypes.array.isRequired,
  bookedSeats: PropTypes.array,
  isSeatSelected: PropTypes.func.isRequired,
  handleSeatSelection: PropTypes.func.isRequired,
};

export default SeatSection;
