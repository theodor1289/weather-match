import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { cardStyle } from '../utils/VisualConfiguration';

// This is a Stateless Functional Component, which is simpler than a class.
// It only can render props and it should only do that.
export default function CityCard({ city }) {
  const classes = cardStyle();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={city.image}
          title={city.main}
        />
        <CardContent>
          <Typography noWrap gutterBottom variant={"h6"} component="h2">
              {city.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Country: {city.country}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Weather: {city.main}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Temperature: {city.temperature} °C
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Humidity: {city.humidity} %
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Wind speed: {city.windspeed} m/s
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Date: {city.timestamp.substring(0, 10)}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Time: {city.timestamp.substring(11, 16)} UTC
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
