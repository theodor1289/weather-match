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

    const [tempValue, setTempValue] = React.useState([props.tempStartRange[0], props.tempStartRange[1]]);
    const [humidityValue, setHumidityValue] = React.useState([props.humidityStartRange[0], props.humidityStartRange[1]]);
    const [windspeedValue, setWindspeedValue] = React.useState([props.windStartRange[0], props.windStartRange[1]]);

    const handleTempChange = (_event, newValue) => {
        setTempValue(newValue);
        props.changeTempFilter(newValue)
    };

    const handleHumidityChange = (_event, newValue) => {
        setHumidityValue(newValue);
        props.changeHumidityFilter(newValue)
    };

    const handleWindspeedChange = (_event, newValue) => {
        setWindspeedValue(newValue);
        props.changeWindFilter(newValue)
    };

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
                <IconButton 
                onClick={props.toggleDrawer}
                aria-label="close drawer">
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
                                    onChange={(event) => props.changeWeatherFilter(event.target.value)}
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
                handleChange={handleTempChange}
                value={tempValue}
                unit="°C"
            />
            <RangeSlider
                title="Humidity range"
                range={props.humidityStartRange}
                handleChange={handleHumidityChange}
                value={humidityValue}
                unit="%"
            />
            <RangeSlider
                title="Wind speed range"
                range={props.windStartRange}
                handleChange={handleWindspeedChange}
                value={windspeedValue}
                unit="m/s"
            />
            <Geolocation
                networkProblems={props.networkProblems}
                changeTemp={handleTempChange}
                changeHumidity={handleHumidityChange}
                changeWind={handleWindspeedChange}
                changeWeatherFilterToExclusively={props.changeWeatherFilterToExclusively}
            />
        </Drawer>
    );
}