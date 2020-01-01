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
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles, useTheme } from '@material-ui/core/styles'

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
    const classes = useStyles(300);
    const theme = useTheme();

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 125,
            },
        },
    };
    const inputLabel = React.useRef(null);

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
            <FormControl variant="outlined" className={"m-auto my-2 " + classes.formControl}>
                <InputLabel ref={inputLabel}>
                    Weather
            </InputLabel>
                <Select
                    multiple
                    value={props.weatherFilter}
                    onChange={props.changeWeatherFilter}
                    input={<Input />}
                    renderValue={selected => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    {props.weatherStates.map(name => (
                        <MenuItem key={name} value={name}>
                            <Checkbox checked={props.weatherFilter.indexOf(name) > -1} />
                            <ListItemText primary={name} />
                        </MenuItem>
                    ))}
                </Select>
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
            <Geolocation />
        </Drawer>
    );
}