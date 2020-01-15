import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 220,
  },
});

export default function RangeSlider(props) {
  const classes = useStyles();

  const marks = [
    {
      value: props.range[0],
      label: props.range[0] + ' ' + props.unit,
    },
    {
      value: props.range[1],
      label: props.range[1] + ' ' + props.unit,
    },
  ];

  return (
    <div className={"m-auto " + classes.root}>
      <Typography id="range-slider" gutterBottom>
        {props.title}
      </Typography>
      <Slider
        value={props.value}
        onChange={props.handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        min={props.range[0]}
        max={props.range[1]}
        marks={marks}
      />
    </div>
  );
}
