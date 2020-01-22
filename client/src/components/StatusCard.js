import React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import NoNetwork from '../assets/no_network.webp';
import NoResults from '../assets/no_results.webp';
import { cardStyle } from '../utils/VisualConfiguration';

export default function StatusCard({ status, retry }) {
  const classes = cardStyle();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={status==="no_results"? NoResults : NoNetwork}
          title={status}
        />
        <CardContent>
          <Typography noWrap gutterBottom variant={"h6"} component="h2">
            {status==="no_results"? "No results..." : "No connection..."}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {status==="no_results"? 
            "We could not find any results." : 
            "A network connection to the weather database could not be established."}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {status==="no_results"? 
            "Please consider different match options." : 
            "Please try again later."}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions style={{justifyContent: 'center'}}>
        <Button 
        size="large" 
        color="primary" 
        onClick={retry}
        aria-label="retry connection">
          Retry
        </Button>
      </CardActions>
    </Card>
  );
}
