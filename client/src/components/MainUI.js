import React from 'react';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CssBaseline from '@material-ui/core/CssBaseline';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import ListCities from './ListCities';
import RangeSlider from './RangeSlider';
import Bar from './Bar'
import Geolocation from './Geolocation'

import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import ListItemText from '@material-ui/core/ListItemText';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
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
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: 0,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: drawerWidth,
    }
}));

export default function SearchAppBar(props) {
    const classes = useStyles();
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
    const [personName, setPersonName] = React.useState([]);

    const handleChange = event => {
        setPersonName(event.target.value);
    };

    const weatherStates = [
        'Sunny',
        'Clouds',
        'Rainy'
    ];

    return (
        <div className={classes.root}>
            <CssBaseline />
            <Bar 
            toggleDrawer={props.toggleDrawer}
            drawerIsOpen={props.drawerIsOpen}
            searchCities={props.searchCities}
            />
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
                        value={personName}
                        onChange={handleChange}
                        input={<Input />}
                        renderValue={selected => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {weatherStates.map(name => (
                            <MenuItem key={name} value={name}>
                                <Checkbox checked={personName.indexOf(name) > -1} />
                                <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <Divider />
                <RangeSlider
                    title="Temperature range"
                    range={[-60, 60]}
                    unit="°C"
                />
                <Divider />
                <RangeSlider
                    title="Humidity"
                    range={[0, 100]}
                    unit="%"
                />
                <Divider />
                <RangeSlider
                    title="Wind speed"
                    range={[0, 100]}
                    unit="m/s"
                />
                <Divider />
                <Geolocation />
                {/* // TODO: inverse geolocation to be done in backend */}
            </Drawer>
            <main // clsx is a tiny (223B) utility for constructing className strings conditionally
                className={clsx(
                    classes.content,
                    {
                        [classes.contentShift]: props.drawerIsOpen,
                    })}
            >
                <div className={classes.drawerHeader} />
                <ListCities
                    cities={props.filteredCities}
                />
            </main>
        </div >
    );
}
