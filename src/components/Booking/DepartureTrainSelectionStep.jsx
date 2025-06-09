import TravelCard from "./TravelCard";
import { useState } from "react";
import useBooking from "../../context/booking/useBooking";
import styled from "styled-components";

const DepartureTrainSelectionStep = () => {
  const [expandedCardId, setExpandedCardId] = useState(null);
  const { step2 } = useBooking();
  const {
    availableDepartures,
    isLoadingDepartures,
    selectedDepartureId,
    handleDepartureSelection,
  } = step2;

  const handleCardClick = (id) => {
    if (expandedCardId === id) {
      setExpandedCardId(null);
    } else {
      setExpandedCardId(id);
      handleDepartureSelection(id);
    }
  };

  const departureList = () => {
    if (isLoadingDepartures) {
      return <div className="p-4 text-center">Loading departures...</div>;
    }

    if (availableDepartures.length === 0) {
      return (
        <div className="p-4 text-center">
          No departures found for the selected route. Please try different
          destinations or date.
        </div>
      );
    }

    const sortedDepartures = [...availableDepartures].sort((a, b) =>
      a.departureTime.localeCompare(b.departureTime)
    );

    return sortedDepartures.map((departure) => (
      <li key={departure.id} className="p-4">
        <TravelCard
          departureDestination={departure.from}
          arrivalDestination={departure.to}
          departureTime={departure.departureTime}
          arrivalTime={departure.arrivalTime}
          travelTime={departure.travelTime}
          price={departure.price}
          onClick={() => handleCardClick(departure.id)}
          isExpanded={expandedCardId === departure.id}
          isSelected={selectedDepartureId === departure.id}
        />
      </li>
    ));
  };

  return (
    <div className="py-4 px-10">
      <StyledH2>Välj Avgång:</StyledH2>
      <ul>{departureList()}</ul>v{" "}
    </div>
  );
};

const StyledH2 = styled.h2`
  font-family: var(--heading-font);
  font-weight: lighter;
  margin-bottom: 0px;
  color: var(--text-color);
  letter-spacing: 1.2px;
  font-size: 2.5rem;
`;

export default DepartureTrainSelectionStep;
