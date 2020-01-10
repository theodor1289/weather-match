import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Bar from './Bar';
import LeftDrawer from './LeftDrawer';
import Content from './Content';
import getCorrectWeatherImage from '../utils/AssetImporter';
import axios from 'axios';
import LinearProgress from '@material-ui/core/LinearProgress';
// import NavigateBefore from '@material-ui/icons/NavigateBefore';
// import NavigateNext from '@material-ui/icons/NavigateNext';

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
const CancelToken = axios.CancelToken;
var cancel;

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
      networkProblems: true
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
    this.setState({
      queryText: query
    }, function () {
      this.loadItems();
    });
  }

  changeWeatherFilter = (event) => {
    const toggleOn = this.state.weatherFilter.indexOf(event.target.value) === -1;
    this.setState({
      weatherFilter: toggleOn ?
        this.state.weatherFilter.concat(event.target.value) :
        this.state.weatherFilter.filter(weatherState => weatherState !== event.target.value),
    }, function () {
      this.loadItems();
    });
  };

  changeTempFilter = (_event, newValue) => {
    this.setState({
      tempFilter: newValue
    }, function () {
      this.loadItems();
    });
  };

  changeHumidityFilter = (_event, newValue) => {
    this.setState({
      humidityFilter: newValue
    }, function () {
      this.loadItems();
    });
  };

  changeWindFilter = (_event, newValue) => {
    this.setState({
      windFilter: newValue
    }, function () {
      this.loadItems();
    });
  };

  componentDidMount() {
    this.loadItems();
  }

  loadItems() {
    cancel && cancel();

    var url = api.baseUrl + '/api/v1/cities';

    this.setState({
      showLoader: true
    });
    
    axios.get(url, {
      params: {
        prefix: this.state.queryText,
        humidity: this.state.humidityFilter[0],
        humidity2: this.state.humidityFilter[1],
        windspeed: this.state.windFilter[0],
        windspeed2: this.state.windFilter[1],
        temperature: this.state.tempFilter[0],
        temperature2: this.state.tempFilter[1],
        main: this.state.weatherFilter + '',
      },
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        cancel = c;
      })
    })
      .then((response) => {
        if (response.status === 204) {
          this.setState({
            cities: [],
            networkProblems : false
          });
          console.log("Made API call, no results found in the database.");
          return;
        }

        const listOfCities = response.data.map((item) => {
          item.image = getCorrectWeatherImage(item.main);
          return item;
        });

        this.setState({
          cities: listOfCities,
          networkProblems : false
        });

        cancel = undefined;
        console.log("Made API call, loaded the following cities:");
        console.log(this.state.cities);
      })
      .catch((thrown) => {
        if (axios.isCancel(thrown)) {
          console.log('Request canceled');
        } else {
          // handle error
          console.log('Error when loading items: ' + thrown.message);

          if(thrown.message==='Network Error') {
            this.setState({
              networkProblems : true
            });
          }
        }
      })
      .finally(() => {
        this.setState({
          showLoader: false
        });
      });
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
          retry={this.loadItems}
          networkProblems={this.state.networkProblems}
          showLoader={this.state.showLoader}
        />
        {this.state.showLoader ? <LinearProgress style={{ position: "absolute", left: 0, right: 0, bottom: 0 }} variant="query" /> : null}
      </ThemeProvider>
    );
  }
}

export default App;
