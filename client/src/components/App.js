import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Bar from './Bar';
import LeftDrawer from './LeftDrawer';
import Content from './Content';
import getCorrectWeatherImage from '../utils/AssetImporter';
import axios from 'axios';
// import networkDelay from '../utils/Simulations';
import { debounce, throttle } from "throttle-debounce";
import { ThemeProvider } from '@material-ui/core/styles';
import { lightTheme, darkTheme } from '../utils/VisualConfiguration';

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
var cancelLoadItemsCall;

class App extends Component {
  constructor() {
    super();
    this.state = {
      cities: [],
      queryText: '',
      showLoader: false,
      drawerIsOpen: false,
      appTheme: 'light',
      weatherFilter: [],
      tempFilter: TEMP_STARTRANGE,
      humidityFilter: HUMIDITY_STARTRANGE,
      windFilter: WIND_STARTRANGE,
      networkProblems: true,
      totalCities: 0,
      currentPage: 0,
      totalPages: 0,
      pageSize: 14,
      sortCategory: "name",
      selectedSortCategoryIndex: 0,
      sortType: "asc",
      selectedSortTypeIndex: 0
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.searchCities = this.searchCities.bind(this);
    this.changeTheme = this.changeTheme.bind(this);
    this.changeWeatherFilter = this.changeWeatherFilter.bind(this);
    this.changeTempFilter = this.changeTempFilter.bind(this);
    this.changeHumidityFilter = this.changeHumidityFilter.bind(this);
    this.changeWindFilter = this.changeWindFilter.bind(this);
    this.loadItems = this.loadItems.bind(this);
    this.navigateBefore = this.navigateBefore.bind(this);
    this.navigateNext = this.navigateNext.bind(this);

    const throttle_time = 500;
    this.navigateBefore = throttle(throttle_time, this.navigateBefore);
    this.navigateNext = throttle(throttle_time, this.navigateNext);
    this.changeWeatherFilter = throttle(300, this.changeWeatherFilter);

    // App "waits" for 550 ms between calls of the below functions. This provides smoothness.
    const debounce_time = 550;
    this.handleSortTypeClick = debounce(debounce_time, this.handleSortTypeClick);
    this.handleSortCategoryClick = debounce(debounce_time, this.handleSortCategoryClick);
    this.searchCities = debounce(debounce_time, this.searchCities);
    this.changeTempFilter = debounce(debounce_time, this.changeTempFilter);
    this.changeHumidityFilter = debounce(debounce_time, this.changeHumidityFilter);
    this.changeWindFilter = debounce(debounce_time, this.changeWindFilter);
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

  navigateBefore() {
    if (this.state.currentPage > 0)
      this.loadItems(this.state.currentPage - 1);
  }

  navigateNext() {
    if (this.state.currentPage < this.state.totalPages - 1)
      this.loadItems(this.state.currentPage + 1);
  }

  searchCities(query) {
    this.setState({
      queryText: query
    }, function () {
      this.loadItems();
    });
  }

  handleSortCategoryClick = (_event, index) => {
    switch (index) {
      case 0:
        this.setState({
          sortCategory: "name",
          selectedSortCategoryIndex: 0
        }, function () {
          this.loadItems();
        });
        break;
      case 1:
        this.setState({
          sortCategory: "temperature",
          selectedSortCategoryIndex: 1
        }, function () {
          this.loadItems();
        });
        break;
      case 2:
        this.setState({
          sortCategory: "humidity",
          selectedSortCategoryIndex: 2
        }, function () {
          this.loadItems();
        });
        break;
      case 3:
        this.setState({
          sortCategory: "windspeed",
          selectedSortCategoryIndex: 3
        }, function () {
          this.loadItems();
        });
        break;
      default:
        console.log(`Unkown sort category index ${index}`);
    }
  };

  handleSortTypeClick = (_event, index) => {
    this.setState({
      sortType: this.state.sortType === "desc" ? "asc" : "desc",
      selectedSortTypeIndex: index
    }, function () {
      this.loadItems();
    });
  };

  changeWeatherFilter = (newValue) => {
    const toggleOn = this.state.weatherFilter.indexOf(newValue) === -1;
    this.setState({
      weatherFilter: toggleOn ?
        this.state.weatherFilter.concat(newValue) :
        this.state.weatherFilter.filter(weatherState => weatherState !== newValue),
    }, function () {
      this.loadItems();
    });
  };

  changeWeatherFilterToExclusively = (newValue) => {
    this.setState({
      weatherFilter: [newValue]
    }, function () {
      this.loadItems();
    });
  };

  changeTempFilter = (newValue) => {
    this.setState({
      tempFilter: newValue
    }, function () {
      this.loadItems();
    });
  };

  changeHumidityFilter = (newValue) => {
    this.setState({
      humidityFilter: newValue
    }, function () {
      this.loadItems();
    });
  };

  changeWindFilter = (newValue) => {
    this.setState({
      windFilter: newValue
    }, function () {
      this.loadItems();
    });
  };

  componentDidMount() {
    this.loadItems();
  }

  loadItems(pageQuery) {
    cancelLoadItemsCall && cancelLoadItemsCall();

    const url = api.baseUrl + '/api/v1/cities';

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
        page: pageQuery === undefined ? 0 : pageQuery,
        size: this.state.pageSize,
        sort: this.state.sortCategory + ',' + this.state.sortType
      },
      cancelToken: new CancelToken(function executor(c) {
        // An executor function receives a cancel function as a parameter
        cancelLoadItemsCall = c;
      })
    })
      // .then(response => {throw new Error(response)}) // Uncomment to test network error
      // .then(networkDelay(5000)) // Uncomment to simulate network delay
      .then((response) => {
        if (response.status === 204) {
          this.setState({
            cities: [],
            networkProblems: false
          });
          console.log("Made API call, no results found in the database.");
          return;
        }

        const listOfCities = response.data.content.map((item) => {
          item.image = getCorrectWeatherImage(item.main, item.daytime);
          return item;
        });

        this.setState({
          cities: listOfCities,
          networkProblems: false,
          totalCities: response.data.totalElements,
          currentPage: response.data.pageable.pageNumber,
          totalPages: response.data.totalPages
        });
      })
      .catch((thrown) => {
        if (axios.isCancel(thrown)) {
          console.log('Request canceled.');
        } else {
          // handle error
          console.log('Error when loading items: ' + thrown.message);

          if (thrown.message === 'Network Error') {
            this.setState({
              networkProblems: true
            });
          }
        }
      })
      .finally(() => {
        cancelLoadItemsCall = undefined;
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
          theme={this.state.appTheme}
          selectedSortCategoryIndex={this.state.selectedSortCategoryIndex}
          selectedSortTypeIndex={this.state.selectedSortTypeIndex}
          handleSortTypeClick={this.handleSortTypeClick}
          handleSortCategoryClick={this.handleSortCategoryClick}
        />
        <LeftDrawer
          drawerIsOpen={this.state.drawerIsOpen}
          toggleDrawer={this.toggleDrawer}
          weatherFilter={this.state.weatherFilter}
          changeWeatherFilter={this.changeWeatherFilter}
          changeWeatherFilterToExclusively={this.changeWeatherFilterToExclusively}
          weatherStates={WEATHER_STATES}
          tempStartRange={TEMP_STARTRANGE}
          changeTempFilter={this.changeTempFilter}
          humidityStartRange={HUMIDITY_STARTRANGE}
          changeHumidityFilter={this.changeHumidityFilter}
          windStartRange={WIND_STARTRANGE}
          changeWindFilter={this.changeWindFilter}
          networkProblems={this.state.networkProblems}
        />
        <Content
          drawerIsOpen={this.state.drawerIsOpen}
          filteredCities={this.state.cities}
          retry={() => this.loadItems()}
          showLoader={this.state.showLoader}
          totalCities={this.state.totalCities}
          currentPage={this.state.currentPage}
          pageSize={this.state.pageSize}
          networkProblems={this.state.networkProblems}
          navigateBefore={this.navigateBefore}
          navigateNext={this.navigateNext}
        />
      </ThemeProvider>
    );
  }
}

export default App;
