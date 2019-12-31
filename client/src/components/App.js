import React, { Component } from 'react';
import SearchAppBar from './MainUI';

class App extends Component {
  constructor() {
    super();
    this.state = {
      cities: [],
      orderBy: 'name',
      orderDir: 'asc',
      queryText: '',
      lastIndex: 0,
      drawerIsOpen: false
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.searchCities = this.searchCities.bind(this);
  }

  toggleDrawer() {
    this.setState({
      drawerIsOpen: !this.state.drawerIsOpen
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
    let filtCities = this.state.cities;

    // TODO: This is to be done in the backend, much faster
    filtCities = filtCities
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
      <>
      <SearchAppBar
        queryText={this.state.queryText}
        drawerIsOpen={this.state.drawerIsOpen}
        toggleDrawer={this.toggleDrawer}
        filteredCities={filtCities}
        searchCities={this.searchCities}
      />
      </>
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
