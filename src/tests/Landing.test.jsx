import Landing from "../views/Landing";
import { BrowserRouter as Router } from "react-router";
import { render, screen, waitFor } from "@testing-library/react";
import { expect, test, vi } from "vitest";
globalThis.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: () =>
      Promise.resolve([
        {
          id: 1,
          heading: "Head",
          paragraf: "Paragraf",
          imgs: [
            {
              src: "..",
              alt: "imgs1",
              text: "imgs1",
              page: {
                heading: "..",
                heading2: "..",
                paragraf: "..",
                offers: ["1", "2"],
              },
            },
            {
              src: "..",
              alt: "imgs1-2",
              text: "imgs1",
              page: {
                heading: "..",
                heading2: "..",
                paragraf: "..",
                offers: ["1", "2"],
              },
            },
          ],
        },
        {
          id: 2,
          heading: "Head2",
          paragraf: "Paragraf2",
          imgs: [
            {
              src: "..",
              alt: "imgs2",
              text: "imgs2",
              page: {
                heading: "..",
                heading2: "..",
                paragraf: "..",
                offers: ["1", "2"],
              },
            },
            {
              src: "..",
              alt: "imgs2-2",
              text: "imgs2",
              page: {
                heading: "..",
                heading2: "..",
                paragraf: "..",
                offers: ["1", "2"],
              },
            },
          ],
        },
      ]),
  })
);
// kortens fetch anrop anropas 1 gång
test("fetch is called", async () => {
  render(
    <Router>
      <Landing />
    </Router>
  );
  await waitFor(() => {
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
// kortens fetch anrop funkar och listan renderas
test("fetch is successfully called and renders data", async () => {
  render(
    <Router>
      <Landing />
    </Router>
  );
  await waitFor(() => {
    expect(screen.getByAltText("imgs1")).toBeInTheDocument();
  });
});
// kortens fetch anrop funkar inte - får felmeddelande på sidan
test("fetch-call not working", async () => {
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: false,
    })
  );

  render(
    <Router>
      <Landing />
    </Router>
  );
  await waitFor(() => {
    expect(screen.getByTestId("error-msg")).toBeInTheDocument();
  });
});
