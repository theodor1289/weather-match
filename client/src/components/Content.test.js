import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Content from "./Content";

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

const fakeCityList = [
    {name:"Bucharest", id:1, image:"random_image.png", country:"RO", temperature:"34", humidity:"31", windspeed:"3", timestamp:"12-01-1998 12:00"}, 
    {name:"New York", id:2, image:"random_image2.png", country:"US", temperature:"-12", humidity:"0", windspeed:"6", timestamp:"12-01-1997 12:00"}
];
const manyCitiesFakeList = [
    {name:"Bucharest", id:1, image:"random_image.png", country:"RO", temperature:"34", humidity:"31", windspeed:"3", timestamp:"12-01-1998 12:00"}, 
    {name:"New York", id:2, image:"random_image2.png", country:"US", temperature:"-12", humidity:"0", windspeed:"6", timestamp:"12-01-1997 12:00"}, 
    {name:"New York", id:3, image:"random_image2.png", country:"US", temperature:"-12", humidity:"0", windspeed:"6", timestamp:"12-01-1997 12:00"}, 
    {name:"New York", id:4, image:"random_image2.png", country:"US", temperature:"-12", humidity:"0", windspeed:"6", timestamp:"12-01-1997 12:00"}, 
    {name:"New York", id:5, image:"random_image2.png", country:"US", temperature:"-12", humidity:"0", windspeed:"6", timestamp:"12-01-1997 12:00"}, 
    {name:"New York", id:6, image:"random_image2.png", country:"US", temperature:"-12", humidity:"0", windspeed:"6", timestamp:"12-01-1997 12:00"}, 
    {name:"New York", id:7, image:"random_image2.png", country:"US", temperature:"-12", humidity:"0", windspeed:"6", timestamp:"12-01-1997 12:00"}
];
  
it("renders 2 cities and their correct content", () => {
act(() => {
    render(<Content filteredCities={fakeCityList}/>, container);
  });
  expect(container.textContent).toBe("BucharestCountry: ROWeather: Temperature: 34 °CHumidity: 31 %Wind speed: 3 m/sDate: 12-01-1998Time: 12:00New YorkCountry: USWeather: Temperature: -12 °CHumidity: 0 %Wind speed: 6 m/sDate: 12-01-1997Time: 12:00NaN-NaN of ");
  expect(container.children[0].children[1].childElementCount).toBe(2);
});

it("renders 7 cities", () => {
act(() => {
    render(<Content filteredCities={manyCitiesFakeList}/>, container);
  });
    expect(container.children[0].children[1].children[0].childElementCount).toBe(7);
});

it("displays correct message when city list is empty", () => {
act(() => {
    render(<Content filteredCities={[]}/>, container);
  });
  expect(container.textContent).toBe("No results...We could not find any results.Please consider different match options.Retry");
  expect(container.children[0].children[1].childElementCount).toBe(1);
});

it("hides loader when indicated by properties", () => {
   act(() => {
      render(<Content showLoader={false} filteredCities={fakeCityList}/>, container);
    });
    expect(container.children[0].children[1].childElementCount).toBe(2);

    act(() => {
       render(<Content showLoader={true} filteredCities={fakeCityList}/>, container);
     });
     expect(container.children[0].children[1].childElementCount).toBe(3);
});