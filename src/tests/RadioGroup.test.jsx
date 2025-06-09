import { describe, test, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import RadioGroup from "../components/RadioGroup";

describe("RadioGroup", () => {
  const testOptions = [
    { label: "Red", name: "color" },
    { label: "Blue", name: "color" },
    { label: "Green", name: "color" },
  ];

  test("renders all radio options", () => {
    render(<RadioGroup options={testOptions} onChange={() => {}} />);

    expect(screen.getByLabelText("Red")).toBeInTheDocument();
    expect(screen.getByLabelText("Blue")).toBeInTheDocument();
    expect(screen.getByLabelText("Green")).toBeInTheDocument();
  });

  test("renders with legend when provided", () => {
    render(
      <RadioGroup
        options={testOptions}
        legend="Choose a color"
        onChange={() => {}}
      />
    );

    expect(screen.getByText("Choose a color")).toBeInTheDocument();
  });

  test("selects the correct option based on selectedValue", () => {
    render(
      <RadioGroup
        options={testOptions}
        selectedValue="Blue"
        onChange={() => {}}
      />
    );

    expect(screen.getByLabelText("Red")).not.toBeChecked();
    expect(screen.getByLabelText("Blue")).toBeChecked();
    expect(screen.getByLabelText("Green")).not.toBeChecked();
  });

  test("calls onChange handler when an option is selected", () => {
    const handleChange = vi.fn();
    render(<RadioGroup options={testOptions} onChange={handleChange} />);

    fireEvent.click(screen.getByLabelText("Green"));
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test("applies direction styling correctly", () => {
    const { rerender } = render(
      <RadioGroup
        options={testOptions}
        direction="column"
        onChange={() => {}}
      />
    );

    const wrapper = screen.getByTestId("radio-group-wrapper");
    expect(wrapper).toHaveStyle("flex-direction: column");

    rerender(
      <RadioGroup options={testOptions} direction="row" onChange={() => {}} />
    );
    expect(wrapper).toHaveStyle("flex-direction: row");
  });

  test("sets required attribute on all radio inputs when required is true", () => {
    render(
      <RadioGroup options={testOptions} required={true} onChange={() => {}} />
    );

    const radioInputs = screen.getAllByRole("radio");
    radioInputs.forEach((input) => {
      expect(input).toHaveAttribute("aria-required", "true");
    });
  });

  test("applies common name to all radio options when group name is provided", () => {
    render(
      <RadioGroup
        options={testOptions}
        name="color-group"
        onChange={() => {}}
      />
    );

    const radioInputs = screen.getAllByRole("radio");
    radioInputs.forEach((input) => {
      expect(input).toHaveAttribute("name", "color-group");
    });
  });

  test("generates correct id attribute for fieldset", () => {
    render(
      <RadioGroup
        options={testOptions}
        legend="Choose a color"
        onChange={() => {}}
      />
    );

    const fieldset = document.querySelector("fieldset");
    expect(fieldset).toHaveAttribute("id", "radio-group-choose-a-color");
  });

  test("uses custom id when provided", () => {
    render(
      <RadioGroup
        options={testOptions}
        legend="Choose a color"
        id="custom-radio-group"
        onChange={() => {}}
      />
    );

    const fieldset = document.querySelector("fieldset");
    expect(fieldset).toHaveAttribute("id", "custom-radio-group");
  });
});
