import React, { Component } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Bar from './Bar';
import LeftDrawer from './LeftDrawer';
import Content from './Content';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';

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
      appTheme: 'light'
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

  lightTheme = createMuiTheme({
    palette: {
      primary: indigo,
      secondary: pink,
      type: 'light'
    },
    status: {
      danger: 'red',
    },
  });

  darkTheme = createMuiTheme({
    palette: {
      primary: indigo,
      secondary: pink,
      type: 'dark'
    },
    status: {
      danger: 'red',
    },
  });

  changeTheme() {
    this.setState({
      appTheme: this.state.appTheme === 'light'? 'dark' : 'light'
    });
  }

  searchCities(query) {
    this.setState({ queryText: query });
  }

  componentDidMount() {
    fetch('./test-cities.json')
      .then(response => response.json())
      .then(result => {
        const listOfCities = result.map((item, index) => {
          item.cityId = index;
          this.setState({ lastIndex: index });
          return item;
        });
        this.setState({
          cities: listOfCities
        });
      });
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
            .startsWith(this.state.queryText.toLowerCase())
        );
      });

    return (
      <ThemeProvider theme={this.state.appTheme === 'light' ? this.lightTheme : this.darkTheme}>
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
        />
        <Content
          drawerIsOpen={this.state.drawerIsOpen}
          filteredCities={filteredCities}
        />
      </ThemeProvider>
      //  <AddAppointments
      //         formDisplay={this.state.formDisplay}
      //         toggleForm={this.toggleForm}
      //         addAppointment={this.addAppointment}
      //       />
      //       <SearchAppointments
      //         orderBy={this.state.orderBy}
      //         orderDir={this.state.orderDir}
      //         changeOrder={this.changeOrder}
      //         searchApts={this.searchApts}
      //       /> 
    );
  }
}

export default App;
