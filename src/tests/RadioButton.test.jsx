import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import RadioButton from "../components/RadioButton";

describe("RadioButton", () => {
  test("renders with label", () => {
    render(<RadioButton id="test-radio" label="Test Option" />);

    expect(screen.getByLabelText("Test Option")).toBeInTheDocument();
    expect(screen.getByRole("radio")).toBeInTheDocument();
  });

  test("handles checked state", () => {
    const { rerender } = render(
      <RadioButton id="test-radio" label="Test Option" checked={false} />
    );

    const radioInput = screen.getByRole("radio");
    expect(radioInput).not.toBeChecked();

    rerender(
      <RadioButton id="test-radio" label="Test Option" checked={true} />
    );
    expect(radioInput).toBeChecked();
  });

  test("calls onChange handler when clicked", () => {
    const handleChange = vi.fn();
    render(
      <RadioButton
        id="test-radio"
        label="Test Option"
        onChange={handleChange}
      />
    );

    fireEvent.click(screen.getByLabelText("Test Option"));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test("displays required indicator for required fields", () => {
    render(<RadioButton id="test-radio" label="Test Option" required={true} />);

    expect(screen.getByText("(required)")).toBeInTheDocument();
    expect(screen.getByRole("radio")).toHaveAttribute("aria-required", "true");
  });

  test("applies name attribute correctly", () => {
    render(
      <RadioButton id="test-radio" label="Test Option" name="color-selection" />
    );

    expect(screen.getByRole("radio")).toHaveAttribute(
      "name",
      "color-selection"
    );
  });
});
