import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import RangeSlider from './RangeSlider';
import Geolocation from './Geolocation';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 240,
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    }
}));

export default function LeftDrawer(props) {
    const classes = useStyles();
    const theme = useTheme();

    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="left"
            open={props.drawerIsOpen}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
                <Typography className={classes.title} variant="h6" noWrap align="center">
                    Match Options
                </Typography>
                <IconButton onClick={props.toggleDrawer}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </div>
            <Divider />
            <FormControl
                className={"m-auto " + classes.formControl}
            >
                <FormGroup>
                    {props.weatherStates.map(name => (
                        <FormControlLabel
                            key={name}
                            className="m-0"
                            control={
                                <Checkbox
                                    checked={props.weatherFilter.indexOf(name) > -1}
                                    onChange={props.changeWeatherFilter}
                                    value={name}
                                    color="primary"
                                />
                            }
                            label={name}
                        />
                    ))}
                </FormGroup>
            </FormControl>
            <RangeSlider
                title="Temperature range"
                range={props.tempStartRange}
                change={props.changeTempFilter}
                unit="°C"
            />
            <RangeSlider
                title="Humidity"
                range={props.humidityStartRange}
                change={props.changeHumidityFilter}
                unit="%"
            />
            <RangeSlider
                title="Wind speed"
                range={props.windStartRange}
                change={props.changeWindFilter}
                unit="m/s"
            />
            <Geolocation/>
        </Drawer>
    );
}