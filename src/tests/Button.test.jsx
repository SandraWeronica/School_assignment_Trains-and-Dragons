import { fireEvent, render, screen } from "@testing-library/react";
import Button from "../components/Button";
import { expect, test, vi } from "vitest";


// testar att knappen renderas
test("visar knappen med rätt text", () => {
    const mockClick = vi.fn();
    render(<Button text="Klicka här" onClick={mockClick} />);

    const button = screen.getByText("Klicka här");
    expect(button).toBeInTheDocument();
});

// testar att knappen är klickbar
test("aktiverar onClick vid klick", () => {
    const mockClick = vi.fn();
    render(<Button text="Testknapp" onClick={mockClick} />);

    const button = screen.getByText("Testknapp");
    fireEvent.click(button);

    expect(mockClick).toHaveBeenCalled();
});

// testar att knappen är inaktiv
test("ignorerar onClick när knappen inaktiv", () => {
    const mockClick = vi.fn();
    render(<Button text="Testknapp" onClick={mockClick} disabled />);

    const button = screen.getByText("Testknapp");
    fireEvent.click(button);

    expect(mockClick).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
});

// visar children-element
test("visar children-element", () => {
    const mockClick = vi.fn();
    render(
        <Button text="med ikon" onClick={mockClick}>
            <span data-testid="icon">🐉</span>
        </Button>
    );

    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByText("med ikon")).toBeInTheDocument();
});

// testar attt inaktiv knapp använder disabledStyles
test("använder inte extraStyles när inaktiv", () => {
    const mockClick = vi.fn();
    const extraStyles = "bg-green-500";

    render(
        <Button text="inaktiverad stylar" onClick={mockClick} disabled={true} extraStyles={extraStyles} />
    );

    const button = screen.getByText("inaktiverad stylar");
    expect(button.className).toContain("bg-gray-700");
    expect(button.className).not.toContain(extraStyles);
});

// testar att aktiv knapp använder extraStyles
test("använder extraStyles när aktiv", () => {
    const mockClick = vi.fn();
    const extraStyles = "bg-green-500";

    render(
        <Button text="aktiv stylar" onClick={mockClick} extraStyles={extraStyles} />
    );

    const button = screen.getByText("aktiv stylar");
    expect(button.className).toContain(extraStyles);
});

// testar att skickas vidare extra props
test("skickar vidare extra props", () => {
    const mockClick = vi.fn();
    render(<Button text="Test" onClick={mockClick} data-testid="extra-prop" />);

    const button = screen.getByText("Test");
    expect(button).toHaveAttribute("data-testid", "extra-prop");
});