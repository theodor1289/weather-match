import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Bar from './Bar';
import LeftDrawer from './LeftDrawer';
import Content from './Content';
import getCorrectWeatherImage from '../utils/AssetImporter';
import axios from 'axios';
import LinearProgress from '@material-ui/core/LinearProgress';

import { ThemeProvider } from '@material-ui/core/styles';
import { lightTheme, darkTheme } from '../utils/Themes';

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
  'Other'
];
const api = {
  baseUrl: 'http://localhost:8080'
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      cities: [],
      orderBy: 'name',
      orderDir: 'asc',
      queryText: '',
      showLoader: false,
      drawerIsOpen: false,
      appTheme: 'light',
      weatherFilter: [],
      tempFilter: TEMP_STARTRANGE,
      humidityFilter: HUMIDITY_STARTRANGE,
      windFilter: WIND_STARTRANGE,
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.searchCities = this.searchCities.bind(this);
    this.changeTheme = this.changeTheme.bind(this);
    this.changeWeatherFilter = this.changeWeatherFilter.bind(this);
    this.changeTempFilter = this.changeTempFilter.bind(this);
    this.changeHumidityFilter = this.changeHumidityFilter.bind(this);
    this.changeWindFilter = this.changeWindFilter.bind(this);
    this.loadItems = this.loadItems.bind(this);
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
    const toggleOn = this.state.weatherFilter.indexOf(event.target.value) === -1;
    this.setState({
      weatherFilter: toggleOn ?
        this.state.weatherFilter.concat(event.target.value) :
        this.state.weatherFilter.filter(weatherState => weatherState !== event.target.value),
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
    this.loadItems();
  }

  loadItems() {
    var url = api.baseUrl + '/api/v1/cities';

    this.setState({
      showLoader: true
    });

    console.log(this.state.cities);
    axios.get(url)
      .then((response) => {
        const listOfCities = response.data.map((item) => {
          item.image = getCorrectWeatherImage(item.weather.main);
          return item;
        });
        console.log(listOfCities);
        this.setState({
          cities: listOfCities,
          showLoader: false
        });
      })
      .catch((error => console.log(error)));
  }

  render() {
    return (
      <ThemeProvider
        theme={this.state.appTheme === 'light' ? lightTheme : darkTheme}
      >
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
          filteredCities={this.state.cities}
        />
        { this.state.showLoader ? <LinearProgress style={{flex: 1}} variant="query" /> : null }
      </ThemeProvider>
    );
  }
}

export default App;
