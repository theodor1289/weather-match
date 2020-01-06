import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Bar from './Bar';
import LeftDrawer from './LeftDrawer';
import Content from './Content';
import axios from 'axios';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';

function importAll(image) {
  return image.keys().map(image);
}

const atmosphere = importAll(require.context('../assets/Atmosphere/', false, /\.(png|jpe?g|svg)$/));
const clear = importAll(require.context('../assets/Clear/Day/', false, /\.(png|jpe?g|svg)$/));
const clouds = importAll(require.context('../assets/Clouds/Day/', false, /\.(png|jpe?g|svg)$/));
const rain = importAll(require.context('../assets/Rain/', false, /\.(png|jpe?g|svg)$/));
const snow = importAll(require.context('../assets/Snow/', false, /\.(png|jpe?g|svg)$/));
const thunderstorm = importAll(require.context('../assets/Thunderstorm/', false, /\.(png|jpe?g|svg)$/));

function getCorrectWeatherImg(weather) {
  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  switch (weather) {
    case "Clear":
      return clear[getRndInteger(0, clear.length - 1)];
    case "Clouds":
      return clouds[getRndInteger(0, clouds.length - 1)];
    case "Rain":
      return rain[getRndInteger(0, rain.length - 1)];
    case "Drizzle":
      return rain[getRndInteger(0, rain.length - 1)];
    case "Snow":
      return snow[getRndInteger(0, snow.length - 1)];
    case "Thunderstorm":
      return thunderstorm[getRndInteger(0, thunderstorm.length - 1)];
    default:
      return atmosphere[getRndInteger(0, atmosphere.length - 1)];
  }
}

const TEMP_STARTRANGE = [-60, 60];
const HUMIDITY_STARTRANGE = [0, 100];
const WIND_STARTRANGE = [0, 100];
const WEATHER_STATES = [
  'Clear',
  'Clouds',
  'Rain',
  'Drizzle',
  'Snow',
  'Thunderstorm',
  'Atmosphere'
];

const lightTheme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: pink,
    type: 'light'
  },
  status: {
    danger: 'red',
  },
});
const darkTheme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: pink,
    type: 'dark'
  },
  status: {
    danger: 'red',
  },
});

class App extends Component {
  constructor() {
    super();
    this.state = {
      cities: [],
      orderBy: 'name',
      orderDir: 'asc',
      queryText: '',
      lastIndex: 0,
      drawerIsOpen: false,
      appTheme: 'light',
      weatherFilter: [],
      tempFilter: TEMP_STARTRANGE,
      humidityFilter: HUMIDITY_STARTRANGE,
      windFilter: WIND_STARTRANGE
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.searchCities = this.searchCities.bind(this);
    this.changeTheme = this.changeTheme.bind(this);
  }

  toggleDrawer() {
    this.setState({
      drawerIsOpen: !this.state.drawerIsOpen
    });
  }

  changeTheme() {
    this.setState({
      appTheme: this.state.appTheme === 'light' ? 'dark' : 'light'
    });
  }

  searchCities(query) {
    this.setState({ queryText: query });
  }

  changeWeatherFilter = (event) => {
    this.setState({
      weatherFilter: event.target.value
    });
  };

  changeTempFilter = (_event, newValue) => {
    this.setState({
      tempFilter: newValue
    });
  };

  changeHumidityFilter = (_event, newValue) => {
    this.setState({
      humidityFilter: newValue
    });
  };

  changeWindFilter = (_event, newValue) => {
    this.setState({
      windFilter: newValue
    });
  };

  componentDidMount() {
    const url = './test-cities.json';
    
    axios.get(url)
      .then((response) => {
        const listOfCities = response.data.map((item, index) => {
          item.image = getCorrectWeatherImg(item.main);
          this.setState({ lastIndex: index });
          return item;
        });
        this.setState({
          cities: listOfCities
        });
      })
      .catch((error => console.log(error)));
  }

  render() {
    let filteredCities = this.state.cities;

    // TODO: This is to be done in the backend, much faster
    filteredCities = filteredCities
      .sort((a, b) => {
        if (
          a[this.state.orderBy].toLowerCase() <
          b[this.state.orderBy].toLowerCase()
        ) {
          return this.state.orderDir === 'asc' ? -1 : 1;
        } else {
          return this.state.orderDir === 'asc' ? 1 : -1;
        }
      })
      .filter(eachItem => {
        return (
          eachItem['name']
            .toLowerCase()
            .startsWith(this.state.queryText.toLowerCase()) &&
          (this.state.weatherFilter.length === 0 || this.state.weatherFilter.includes(eachItem['main'])) &&
          eachItem['humidity'] >= this.state.humidityFilter[0] &&
          eachItem['humidity'] <= this.state.humidityFilter[1] &&
          eachItem['speed'] >= this.state.windFilter[0] &&
          eachItem['speed'] <= this.state.windFilter[1] &&
          eachItem['temp'] >= this.state.tempFilter[0] + 273.15 &&
          eachItem['temp'] <= this.state.tempFilter[1] + 273.15
        );
      });

    return (
      <ThemeProvider theme={this.state.appTheme === 'light' ? lightTheme : darkTheme}>
        <CssBaseline />
        <Bar
          toggleDrawer={this.toggleDrawer}
          drawerIsOpen={this.state.drawerIsOpen}
          searchCities={this.searchCities}
          changeTheme={this.changeTheme}
        />
        <LeftDrawer
          drawerIsOpen={this.state.drawerIsOpen}
          toggleDrawer={this.toggleDrawer}
          weatherFilter={this.state.weatherFilter}
          changeWeatherFilter={this.changeWeatherFilter}
          weatherStates={WEATHER_STATES}
          tempStartRange={TEMP_STARTRANGE}
          changeTempFilter={this.changeTempFilter}
          humidityStartRange={HUMIDITY_STARTRANGE}
          changeHumidityFilter={this.changeHumidityFilter}
          windStartRange={WIND_STARTRANGE}
          changeWindFilter={this.changeWindFilter}
        />
        <Content
          drawerIsOpen={this.state.drawerIsOpen}
          filteredCities={filteredCities}
        />
      </ThemeProvider>
    );
  }
}

export default App;
