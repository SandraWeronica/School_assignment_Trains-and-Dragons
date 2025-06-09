import styled from "styled-components";
import PropTypes from "prop-types";

const TrainSeat = ({
  seat,
  isSeatSelected,
  isSeatAvailable,
  handleSeatClick,
  ariaDescribedby,
}) => {
  const isSelected = isSeatSelected(seat.id);
  const isAvailable = isSeatAvailable(seat.id);

  return (
    <SeatContainer
      onClick={() => handleSeatClick(seat)}
      $isSelected={isSelected}
      $isAvailable={isAvailable}
      disabled={!isAvailable}
      aria-label={`Plats ${seat.id}`}
      aria-pressed={isSelected}
      aria-describedby={ariaDescribedby}
    >
      {seat.id}
    </SeatContainer>
  );
};

TrainSeat.propTypes = {
  seat: PropTypes.shape({
    id: PropTypes.string.isRequired,
    isAvailable: PropTypes.bool,
    carId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  isSeatSelected: PropTypes.func.isRequired,
  isSeatAvailable: PropTypes.func.isRequired,
  passengerCount: PropTypes.number,
  handleSeatClick: PropTypes.func.isRequired,
  ariaDescribedby: PropTypes.string,
};

const SeatContainer = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  margin: 0.25rem;
  border-radius: 4px;
  border: 1px solid var(--bg-dark);
  font-weight: 500;
  cursor: ${(props) => (props.$isAvailable ? "pointer" : "not-allowed")};

  background-color: ${(props) => {
    if (!props.$isAvailable) return "var(--color-rose-300)";
    if (props.$isSelected) return "var(--el-10)";
    return "var(--color-emerald-100)";
  }};

  color: ${(props) => {
    if (!props.$isAvailable) return "var(--text-color)";
    if (props.$isSelected) return "var(--text-color)";
    return "var(--text-color-dark)";
  }};

  &:hover {
    background-color: ${(props) => {
      if (!props.$isAvailable) return "var(--color-rose-300)";
      if (props.$isSelected) return "var(--el-hover)";
      return "var(--el-hover)";
    }};
    color: ${(props) => {
      if (!props.$isAvailable) return "var(--text-color)";
      if (props.$isSelected) return "var(--text-color)";
      return "var(--text-color)";
    }};
  }

  &:focus {
    outline: 2px solid var(--el-hover);
    outline-offset: 2px;
  }
`;

export default TrainSeat;
