import { render, screen } from "@testing-library/react";
import Card from "../components/Card";
import { expect, test } from "vitest";

test("The card-image is in the DOM", () => {
  render(<Card />);
  const image = screen.getByTestId("card-image");
  expect(image).toBeInTheDocument();
});
