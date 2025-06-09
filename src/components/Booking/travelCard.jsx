import PropTypes from "prop-types";
import TrainSelect from "./train/TrainSelect";
import styled from "styled-components";
import { memo } from "react";

const TravelCard = ({
  departureDestination,
  arrivalDestination,
  departureTime,
  arrivalTime,
  travelTime,
  price,
  isExpanded,
  onClick,
}) => {
  return (
    <>
      <StyledCard
        onClick={onClick}
        $isExpanded={isExpanded}
        role="button"
        aria-expanded={isExpanded}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onClick();
            e.preventDefault();
          }
        }}
      >
        <Info>
          <DepartureInfo>
            <Departure>
              <h2>{departureDestination}</h2>
              <TimeLabel>Avgång:</TimeLabel>
              <TimeValue>{departureTime}</TimeValue>
            </Departure>
            <Time>
              <Line aria-hidden="true" />
              <Duration>{travelTime}</Duration>
              <Line aria-hidden="true" />
            </Time>
            <Arrival>
              <h2>{arrivalDestination}</h2>
              <TimeLabel>Ankomst:</TimeLabel>
              <TimeValue>{arrivalTime}</TimeValue>
            </Arrival>
          </DepartureInfo>
          <Price>Pris: {price} kr</Price>
        </Info>
      </StyledCard>
      {isExpanded && <TrainSelect />}
    </>
  );
};
const StyledCard = styled.article`
  background-color: var(--bg-30);
  padding: 2rem;
  border-radius: ${(props) => (props.$isExpanded ? "16px 16px 0 0" : "16px")};
  color: var(--text-color);

  &:hover {
    cursor: pointer;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: ${(props) =>
      props.$isExpanded ? "var(--bg-30)" : "var(--bg-dark)"};
  }

  &:focus {
    outline: 2px solid var(--el-10);
    outline-offset: 2px;
  }

  & h2,
  p {
    font-family: var(--body-mono);
    font-weight: normal;
    margin: 0;
  }
`;
const TimeLabel = styled.span`
  font-family: var(--body-mono);
  color: var(--text-color);
`;

const TimeValue = styled.time`
  font-weight: 500;
  font-family: var(--body-mono);
`;

const Duration = styled.span`
  white-space: nowrap;
  font-family: var(--body-mono);
`;

const Price = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
`;

const Info = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-family: var(--body-mono);
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
  font-family: var(--body-mono);
`;
const Arrival = styled.div`
  display: flex;
  flex-direction: column;
  font-family: var(--body-mono);
`;
const Time = styled.div`
  padding-top: 6px;
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  font-family: var(--body-mono);
`;
const Line = styled.div`
  width: 36px;
  border-bottom: 1px solid var(--text-color);
  height: 12px;
`;

TravelCard.propTypes = {
  departureDestination: PropTypes.string.isRequired,
  arrivalDestination: PropTypes.string.isRequired,
  departureTime: PropTypes.string.isRequired,
  travelTime: PropTypes.string.isRequired,
  arrivalTime: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  isExpanded: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
export default memo(TravelCard);
