import React from "react";
import {
  createHistory,
  LocationProvider,
  createMemorySource,
} from "@reach/router";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import App from "../App";
import { ContextProvider } from "../state";
import { theme } from "../theme";

function renderWithRouter(
  ui,
  { route = "/", history = createHistory(createMemorySource(route)) } = {}
) {
  return {
    ...render(
      <ThemeProvider theme={theme}>
        <LocationProvider history={history}>
          <ContextProvider>{ui}</ContextProvider>
        </LocationProvider>
      </ThemeProvider>
    ),
    // adding `history` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    history,
  };
}

beforeAll(() => {
  jest.spyOn(window, "matchMedia").mockImplementation(() => false);
});

afterEach(cleanup);

it("Add todo - success", async () => {
  const {
    container,
    history: { navigate },
  } = renderWithRouter(<App />);

  await navigate("/add");
  await waitFor(() =>
    expect(screen.getByPlaceholderText("Insert a title")).toBeInTheDocument()
  );

  fireEvent.change(screen.getByPlaceholderText("Insert a title"), {
    target: { value: "Lorem ipsum" },
  });
  expect(screen.getByDisplayValue("Lorem ipsum")).toBeInTheDocument();

  fireEvent.click(screen.getByDisplayValue("Add"));
  await navigate("/");
  await waitFor(() =>
    expect(document.querySelector("article")).toBeInTheDocument()
  );
});

it("Remove todo - success", async () => {
  const {
    getByTestId,
    history: { navigate },
  } = renderWithRouter(<App />);

  await navigate("/add");
  await waitFor(() =>
    expect(screen.getByPlaceholderText("Insert a title")).toBeInTheDocument()
  );

  fireEvent.change(screen.getByPlaceholderText("Insert a title"), {
    target: { value: "Lorem ipsum" },
  });
  expect(screen.getByDisplayValue("Lorem ipsum")).toBeInTheDocument();

  fireEvent.click(screen.getByDisplayValue("Add"));
  await navigate("/");
  await waitFor(() =>
    expect(document.querySelector("article")).toBeInTheDocument()
  );

  fireEvent.click(getByTestId("remove-todo"));
  await waitFor(() =>
    expect(document.querySelector("article")).not.toBeInTheDocument()
  );
});

it("Edit todo - success", async () => {
  const {
    getByTestId,
    history: { navigate },
  } = renderWithRouter(<App />);

  await navigate("/add");
  await waitFor(() =>
    expect(screen.getByPlaceholderText("Insert a title")).toBeInTheDocument()
  );

  fireEvent.change(screen.getByPlaceholderText("Insert a title"), {
    target: { value: "Lorem ipsum test" },
  });
  expect(screen.getByDisplayValue("Lorem ipsum test")).toBeInTheDocument();

  fireEvent.click(screen.getByDisplayValue("Add"));
  await navigate("/");
  await waitFor(() =>
    expect(document.querySelector("article")).toBeInTheDocument()
  );

  fireEvent.click(getByTestId("edit-todo"));
  const id = document.querySelector("article").id;

  await navigate(`/detail/${id}`);
  await waitFor(() =>
    expect(screen.getByDisplayValue("Lorem ipsum test")).toBeInTheDocument()
  );

  const newName = "Dummy name";
  fireEvent.change(document.querySelector("input"), {
    target: { value: newName },
  });

  fireEvent.submit(document.querySelector("form"));
  await waitFor(() =>
    expect(screen.getByDisplayValue(newName)).toBeInTheDocument()
  );
});
