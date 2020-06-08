import "@testing-library/jest-dom";
import React from "react";
import { createHistory, LocationProvider } from "@reach/router";
import { render, screen, cleanup } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import Todo from "../components/Todo";
import { ContextProvider } from "../state";
import { theme } from "../theme";

let currentWindowObject = null;
let history = createHistory(window);

function WithContexts(children) {
  return render(
    <ThemeProvider theme={theme}>
      <LocationProvider history={history}>
        <ContextProvider>{children}</ContextProvider>
      </LocationProvider>
    </ThemeProvider>
  );
}

beforeAll(() => {
  jest.spyOn(window, "matchMedia").mockImplementation(() => false);
});

afterEach(cleanup);

it("Mount todo component - success", () => {
  const todoMock = {
    id: "123",
    name: "Payment journey",
    description: "Lorem ipsum...",
    isDone: false,
  };

  const { getByTestId } = WithContexts(<Todo {...todoMock}></Todo>);

  expect(screen.getByText(todoMock.name)).toBeInTheDocument();
  expect(getByTestId("remove-todo")).toBeInTheDocument();
  expect(getByTestId("edit-todo")).toBeInTheDocument();
});
