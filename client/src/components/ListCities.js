import React from 'react';
import CityCard from './Card';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  card: {
    height: 140,
    width: 100,
  }
}));

export default function ListCities(props) {
  const classes = useStyles();

  return (
    <Grid container className={classes.root} justify="center" spacing={3}>
      {props.cities.map(cityIter => (
        <Grid key={cityIter.cityId} item>
          <CityCard
            className={classes.paper}
            city={cityIter}
          />
        </Grid>
      ))}
    </Grid>
  );
}