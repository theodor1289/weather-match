import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    maxWidth: 500,
  },
  media: {
    height: 100,
  },
});

// This is a Stateless Functional Component, which is simpler than a class.
// It only can render props and it should only do that.
export default function CityCard({ city }) {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={city.image}
          title={city.main}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {city.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Country: {city.country}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Weather: {city.main}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Temperature: {city.temp} K
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Humidity: {city.humidity} %
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Wind speed: {city.speed} m/s
          </Typography>
        </CardContent>
      </CardActionArea>
      {/* <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions> */}
    </Card>
  );
}
