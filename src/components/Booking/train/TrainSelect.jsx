import { memo, useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import TrainCarSelector from "./CarSelector";
import TrainLegend from "./TrainLegend";
import Button from "../../Button";
import useBooking from "../../../context/booking/useBooking";
import ChevronButton from "../../ChevronButton";
import SeatSection from "./SeatSection";

const TrainSelect = () => {
  const { handleGoToNextStep, step2, step1 } = useBooking();
  const {
    currentCar,
    selectedTrain,
    handleCarClick,
    handleGoBackOneCar,
    handleGoForwardOneCar,
    handleSeatClick,
    isSeatSelected,
    trainRowsConfig,
    saveBookingInfo,
    selectedSeats,
    bookedSeats,
    currentPassengerIndex,
    handlePassengerChange,
  } = step2;

  const { passengers } = step1;

  const seatSectionRef = useRef(null);

  const handleSeatSelection = useCallback(
    (seat) => handleSeatClick(seat, passengers),
    [handleSeatClick, passengers]
  );

  const onPassengerChange = useCallback(
    (event) => handlePassengerChange(event, passengers),
    [handlePassengerChange, passengers]
  );

  const handleContinue = useCallback(() => {
    saveBookingInfo(currentCar);
    handleGoToNextStep();
  }, [saveBookingInfo, handleGoToNextStep, currentCar]);

  useEffect(() => {
    if (seatSectionRef.current) {
      seatSectionRef.current.focus();
    }
  }, [currentCar?.id]);

  if (!selectedTrain || !currentCar) {
    return (
      <Container>
        <LoadingMessage role="status" aria-live="polite">
          <span className="sr-only">Loading:</span> Laddar tågdata...
        </LoadingMessage>
      </Container>
    );
  }

  const isFirstCar = selectedTrain.cars.indexOf(currentCar) === 0;
  const isLastCar =
    selectedTrain.cars.indexOf(currentCar) === selectedTrain.cars.length - 1;

  const validSeatCount = selectedSeats.filter(
    (seat) => seat && seat !== ""
  ).length;
  const remainingSeats = passengers.length - validSeatCount;

  return (
    <Container>
      <h2 id="train-selection-heading" className="sr-only">
        Välj dina platser på tåget
      </h2>
      <ResponsiveLayout>
        <TrainSectionWrapper>
          <TrainCarSelector
            train={selectedTrain}
            currentCar={currentCar}
            handleCarClick={handleCarClick}
          />

          <TrainWrapper>
            <ChevronButton
              direction="back"
              onClick={handleGoBackOneCar}
              disabled={isFirstCar}
              aria-label="Föregående vagn"
            />
            <TrainCarOutline
              ref={seatSectionRef}
              tabIndex="-1"
              aria-label={`Sittplatser i vagn ${
                currentCar.name || currentCar.id
              }`}
            >
              <SeatSection
                currentCar={currentCar}
                trainRowsConfig={trainRowsConfig}
                bookedSeats={bookedSeats}
                isSeatSelected={isSeatSelected}
                handleSeatSelection={handleSeatSelection}
              />
            </TrainCarOutline>
            <ChevronButton
              onClick={handleGoForwardOneCar}
              disabled={isLastCar}
              aria-label="Nästa vagn"
            />
          </TrainWrapper>
        </TrainSectionWrapper>

        <TrainLegend
          passengers={passengers}
          selectedSeats={selectedSeats}
          currentPassengerIndex={currentPassengerIndex}
          onPassengerChange={onPassengerChange}
          trainType={selectedTrain.type}
          remainingSeats={remainingSeats}
          validSeatCount={validSeatCount}
        />
      </ResponsiveLayout>

      <ButtonContainer>
        <Button
          onClick={handleContinue}
          text="Gå vidare"
          disabled={validSeatCount < passengers.length}
          aria-disabled={validSeatCount === 0}
        />
      </ButtonContainer>
    </Container>
  );
};

const ResponsiveLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  @media (min-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
    gap: 2rem;
  }
`;

const TrainSectionWrapper = styled.div`
  width: 100%;

  @media (min-width: 1024px) {
    width: 65%;
  }
`;

const Container = styled.div`
  padding: 0.75rem;
  background-color: var(--bg-dark);
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  margin-top: -1px;

  @media (min-width: 768px) {
    padding: 1rem;
  }

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

const TrainWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;

  @media (min-width: 768px) {
    gap: 1rem;
  }
`;

const TrainCarOutline = styled.div`
  background-color: var(--input);
  padding: 0.75rem;
  border-radius: 0.5rem;
  width: 100%;
  overflow-x: auto;

  @media (min-width: 768px) {
    padding: 1rem;
  }

  @media (min-width: 1200px) {
    max-width: 909px;
  }

  &:focus {
    outline: 2px solid var(--el-10);
    outline-offset: 2px;
  }
`;

const ButtonContainer = styled.div`
  /* Mobile-first */
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;

  /* Right-aligned on desktop */
  @media (min-width: 768px) {
    justify-content: flex-end;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 1.5rem;
  font-size: 1rem;
  color: var(--text-color);

  @media (min-width: 768px) {
    padding: 2rem;
    font-size: 1.2rem;
  }
`;

export default memo(TrainSelect);
