import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  card: {
    maxWidth: 245,
  },
  media: {
    height: 100,
  },
});

function importAll(image) {
  return image.keys().map(image);
}

const sunny = importAll(require.context('../assets/sunny/', false, /\.(png|jpe?g|svg)$/));
const clouds = importAll(require.context('../assets/clouds/', false, /\.(png|jpe?g|svg)$/));
const rainy = importAll(require.context('../assets/rainy/', false, /\.(png|jpe?g|svg)$/));

function getCorrectWeatherImg(weather) {
  switch(weather) {
    case "Sunny":
      return sunny[getRndInteger(0,sunny.length-1)];
    case "Clouds":
      return clouds[getRndInteger(0,clouds.length-1)];
    case "Rainy":
      return rainy[getRndInteger(0,rainy.length-1)];
    default:
      // code block
  }
}

function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) ) + min;
}

// This is a Stateless Functional Component, which is simpler than a class.
// It only can render props and it should only do that.
export default function CityCard({city}) { 
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={getCorrectWeatherImg(city.main)}
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
