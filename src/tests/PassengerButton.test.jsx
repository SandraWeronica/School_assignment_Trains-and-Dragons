import { fireEvent, render, screen } from "@testing-library/react";
import { expect, test, vi, beforeEach } from "vitest";
import Passengers from "../components/Passengers";
import useBooking from "../context/booking/useBooking";




vi.mock("../context/booking/useBooking");

const mockHandleUpdatePassengers = vi.fn();

beforeEach(() => {
    mockHandleUpdatePassengers.mockClear();
});




// testar rendering av +knapp
test("visar +knapp", () => {
    useBooking.mockReturnValue({
        step1: { passengers: [], handleUpdatePassengers: mockHandleUpdatePassengers }
    });
    
    render(<Passengers />);
    expect(screen.getByText("+")).toBeInTheDocument();
});




 // testar rendering av -knapp
 test("visar -knapp", () => {
     useBooking.mockReturnValue({
         step1: { passengers: [{ id: 1, name: "Passenger 1" }], handleUpdatePassengers: mockHandleUpdatePassengers }
     });
    
     render(<Passengers />);
     expect(screen.getByText("-")).toBeInTheDocument();
});




 // testar att +knapp räknar uppåt
 test("+knapp ökar antal passagerare", () => {
     useBooking.mockReturnValue({
         step1: { passengers: [{ id: 1, name: "Passenger 1" }], handleUpdatePassengers: mockHandleUpdatePassengers }
     });
    
     render(<Passengers />);
     fireEvent.click(screen.getByText("+"));
     expect(mockHandleUpdatePassengers).toHaveBeenCalledWith("add");
 });




 // testar att +knapp räknar uppåt vid flera klick
 test("+knapp ökar antal passagerare vid flera klick", () => {
     useBooking.mockReturnValue({
         step1: { passengers: [{ id: 1, name: "Passenger 1" }], handleUpdatePassengers: mockHandleUpdatePassengers }
     });
    
     render(<Passengers />);
     const addButton = screen.getByText("+");
     fireEvent.click(addButton);
     fireEvent.click(addButton);
     fireEvent.click(addButton);
     expect(mockHandleUpdatePassengers).toHaveBeenCalledTimes(3);
 });




 // testar att -knapp aktiveras först när man lagt till en passagerare
 test("-knapp är inaktiv vid en passagerare", () => {
     useBooking.mockReturnValue({
         step1: { passengers: [{ id: 1, name: "Passenger 1" }], handleUpdatePassengers: mockHandleUpdatePassengers }
     });
    
     render(<Passengers />);
     expect(screen.getByText("-")).toBeDisabled();
 });




 // testar att -knapp räknar nedåt
 test("-knapp minskar antal passagerare", () => {
     useBooking.mockReturnValue({
         step1: { passengers: [{ id: 1, name: "Passenger 1" }, { id: 2, name: "Passenger 2" }], handleUpdatePassengers: mockHandleUpdatePassengers }
     });
    
     render(<Passengers />);
     fireEvent.click(screen.getByText("-"));
     expect(mockHandleUpdatePassengers).toHaveBeenCalledWith("remove");
 });




 // testar att -knapp räknar nedåt vid flera klick
 test("-knapp minskar antal passagerare vid flera klick", () => {
     useBooking.mockReturnValue({
         step1: { passengers: [{ id: 1, name: "Passenger 1" }, { id: 2, name: "Passenger 2" }, { id: 3, name: "Passenger 3" }], handleUpdatePassengers: mockHandleUpdatePassengers }
     });
    
     render(<Passengers />);
     const removeButton = screen.getByText("-");
     fireEvent.click(removeButton);
     fireEvent.click(removeButton);
     expect(mockHandleUpdatePassengers).toHaveBeenCalledTimes(2);
 });




 // testar att -knapp inaktiveras vid 1 vid nedräkning
 test("-knapp blir inaktiv vid en passagerare efter nedräkning", () => {
  const { rerender } = render(<Passengers />);

  useBooking.mockReturnValue({
      step1: { passengers: [{ id: 1, name: "Passenger 1" }, { id: 2, name: "Passenger 2" }], handleUpdatePassengers: mockHandleUpdatePassengers }
  });

  rerender(<Passengers />);

  const removeButton = screen.getByText("-");
  fireEvent.click(removeButton);

  useBooking.mockReturnValue({
      step1: { passengers: [{ id: 1, name: "Passenger 1" }], handleUpdatePassengers: mockHandleUpdatePassengers }
  });

  rerender(<Passengers />);

  expect(screen.getByText("-")).toBeDisabled();
});

