import styled from "styled-components";
import PropTypes from "prop-types";
import RadioGroup from "../../RadioGroup";
import { FaLongArrowAltRight } from "react-icons/fa";

const TrainLegend = ({
  passengers,
  selectedSeats,
  currentPassengerIndex,
  onPassengerChange,
  trainType,
  remainingSeats,
  validSeatCount,
}) => {
  const passengerOptions = passengers.map((passenger, index) => {
    const assignedSeat = selectedSeats[index] || "";

    const label = assignedSeat
      ? `${passenger.name} (Plats ${assignedSeat})`
      : `${passenger.name} (Ej vald)`;

    return {
      value: label,
      label: label,
      name: "passenger",
      index: index,
    };
  });

  const passengerCount = passengers.length;

  const currentLabel = passengerOptions[currentPassengerIndex]?.label;

  const handlePassengerChange = (event) => {
    const selectedLabel = event.target.value;
    const selectedOption = passengerOptions.find(
      (option) => option.label === selectedLabel
    );
    if (selectedOption) {
      onPassengerChange({
        target: {
          value: passengers[selectedOption.index]?.name || "",
        },
      });
    }
  };

  return (
    <LegendContainer role="region" aria-label="Tågreseinformation">
      <Legend>
        <TrainInfo>
          <h2 id="train-info-heading" className="sr-only">
            Tåginformation
          </h2>
          <p id="train-type-info">Tåg: {trainType}</p>
          <DirectionContainer>
            <p id="train-direction-info">Tågets färdriktning </p>
            <FaLongArrowAltRight
              aria-hidden="true"
              aria-labelledby="train-direction-info"
            />
          </DirectionContainer>
        </TrainInfo>

        <SeatsCounter role="status" aria-live="polite">
          {validSeatCount > 0
            ? remainingSeats > 0
              ? `${validSeatCount} plats(er) vald. Välj ${remainingSeats} till.`
              : `${validSeatCount} plats(er) vald. Alla platser valda!`
            : `Inga platser valda. Välj ${passengers.length} platser.`}
        </SeatsCounter>

        <div className="flex flex-row">
          <div role="group" aria-labelledby="seat-legend-heading">
            <h3 id="seat-legend-heading" className="sr-only">
              Förklaring av platser
            </h3>
            <LegendItem>
              <LegendColor
                color="var(--color-emerald-100)"
                aria-hidden="true"
              />
              <span>Tillgänglig</span>
            </LegendItem>
            <LegendItem>
              <LegendColor color="var(--el-10)" aria-hidden="true" />
              <span>Vald</span>
            </LegendItem>
            <LegendItem>
              <LegendColor color="var(--color-rose-300)" aria-hidden="true" />
              <span>Otillgänglig</span>
            </LegendItem>
          </div>

          {passengerCount > 1 && (
            <div>
              <h3 id="passenger-selection-heading" className="sr-only">
                Välj passagerare
              </h3>
              <RadioGroup
                options={passengerOptions}
                selectedValue={currentLabel}
                onChange={handlePassengerChange}
                direction="column"
                aria-labelledby="passenger-selection-heading"
              />
            </div>
          )}
        </div>
      </Legend>
    </LegendContainer>
  );
};

TrainLegend.propTypes = {
  passengers: PropTypes.array.isRequired,
  selectedSeats: PropTypes.array.isRequired,
  currentPassengerIndex: PropTypes.number,
  onPassengerChange: PropTypes.func,
  trainType: PropTypes.string,
  remainingSeats: PropTypes.number,
  validSeatCount: PropTypes.number,
};

const Legend = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-left: 0.8rem;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const LegendColor = styled.div`
  width: 1rem;
  height: 1rem;
  background-color: ${(props) => props.color};
  border: 1px solid #9ca3af;
  margin-right: 0.25rem;
`;

const LegendContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  padding-bottom: 0;
  background-color: var(--bg-30);
  border-radius: 4px;
`;

const TrainInfo = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  color: var(--text-color);
  font-size: 1.25rem;
  p {
    margin-bottom: 0px;
  }
`;

const DirectionContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

const SeatsCounter = styled.div`
  margin: 1rem 0;
  background-color: var(--bg-30);
  border-radius: 4px;
  text-align: center;
  font-weight: bold;
`;

const GlobalStyle = styled.div`
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

export { GlobalStyle };
export default TrainLegend;
