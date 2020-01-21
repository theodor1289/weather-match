import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Bar from "./Bar";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders", () => {
  act(() => {
    render(<Bar drawerIsOpen={true}/>, container);
  });
  expect(container.textContent).toBe("Weather Match");
});

it("hides button when drawer toggled", () => {
  const toggleDrawer = jest.fn();
  act(() => {
    render(<Bar toggleDrawer={toggleDrawer} />, container);
  });

  // get ahold of the button element, and trigger some clicks on it
  const button = document.querySelector("[data-testid=toggleDrawerTestId]");
//   expect(button.className).toBe("MuiButtonBase-root MuiIconButton-root makeStyles-menuButtonLeft-135 MuiIconButton-colorInherit");

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(toggleDrawer).toHaveBeenCalledTimes(1);
  
  act(() => {
    for (let i = 0; i < 5; i++) {
      button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    }
  });

  expect(toggleDrawer).toHaveBeenCalledTimes(6);
});