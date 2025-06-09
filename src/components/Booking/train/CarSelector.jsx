import styled from "styled-components";
import PropTypes from "prop-types";

const TrainCarSelector = ({ train, currentCar, handleCarClick }) => {
  return (
    <Container>
      <label id="car-selector-label" className="sr-only">
        Välj tågvagn
      </label>
      <CarButtons role="tablist" aria-labelledby="car-selector-label">
        {train.cars.map((car, index) => (
          <CarButton
            key={car.id}
            onClick={() => handleCarClick(car)}
            $active={currentCar.id === car.id}
            aria-selected={currentCar.id === car.id}
            role="tab"
            tabIndex={currentCar.id === car.id ? 0 : -1}
            $isFirst={index === 0}
            $isLast={index === train.cars.length - 1}
            id={`car-tab-${car.id}`}
            aria-controls={`car-panel-${car.id}`}
          >
            {car.name || `Vagn ${car.id}`}
          </CarButton>
        ))}
      </CarButtons>
    </Container>
  );
};

TrainCarSelector.propTypes = {
  train: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    type: PropTypes.string.isRequired,
    cars: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        name: PropTypes.string,
      })
    ).isRequired,
  }).isRequired,
  currentCar: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  handleCarClick: PropTypes.func.isRequired,
};

const Container = styled.div`
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

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

const CarButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;

const CarButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: ${(props) =>
    props.$active ? "var(--el-10)" : "var(--input)"};
  color: ${(props) =>
    props.$active ? "var(--text-color)" : "var(--text-color-dark)"};
  cursor: pointer;
  transition: all 0.2s;
  border-radius: ${(props) => {
    if (props.$isFirst) {
      return "1rem 0.25rem 0.25rem 1rem"; /* Left side curved */
    } else if (props.$isLast) {
      return "0.25rem 1rem 1rem 0.25rem"; /* Right side curved */
    } else {
      return "0.25rem"; /* Middle buttons */
    }
  }};

  &:hover {
    background-color: ${(props) =>
      props.$active ? "var(--el-10)" : "var(--el-hover)"};
    color: var(--text-color);
  }

  &:focus {
    outline: 2px solid var(--el-hover);
    outline-offset: 2px;
  }
`;

export default TrainCarSelector;
