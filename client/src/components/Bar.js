import React from 'react';
import clsx from 'clsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import { fade, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import Sort from '@material-ui/icons/Sort';
import BarPopover from './BarPopover';

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
    menuButtonLeft: {
        marginRight: theme.spacing(2),
    },
    menuButtonRight: {
        marginLeft: theme.spacing(2),
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(7),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 7),
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
    hide: {
        display: 'none',
    }
}));

export default function Bar(props) {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return (
        <AppBar
            position="fixed" // "fixed" => the app bar is always in view regardless of scroll
            className={clsx(classes.appBar, {
                [classes.appBarShift]: props.drawerIsOpen,
            })}
        >
            <Toolbar>
                <IconButton
                    className={clsx(classes.menuButtonLeft, props.drawerIsOpen && classes.hide)}
                    onClick={props.toggleDrawer}
                    color="inherit"
                    aria-label="open drawer"
                >
                    <MenuIcon />
                </IconButton>
                <Typography className={classes.title} variant="h6" noWrap align="left">
                    Weather Match
                </Typography>
                <div className={classes.search}>
                    <div className={classes.searchIcon}>
                        <SearchIcon />
                    </div>
                    <InputBase
                        placeholder="Search…"
                        classes={{
                            root: classes.inputRoot,
                            input: classes.inputInput,
                        }}
                        inputProps={{ 'aria-label': 'search' }}
                        onChange={e => props.searchCities(e.target.value)}
                    />
                </div>
                <IconButton
                    className={clsx(classes.menuButtonRight)}
                    onClick={props.changeTheme}
                    color="inherit"
                >
                    {props.theme === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
                </IconButton>
                <IconButton
                    className={clsx(classes.menuButtonRight)}
                    onClick={handleClick}
                    color="inherit"
                    aria-describedby={id}
                >
                    <Sort />
                </IconButton>
                <BarPopover
                    setAnchorEl={setAnchorEl}
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    selectedSortCategoryIndex={props.selectedSortCategoryIndex}
                    selectedSortTypeIndex={props.selectedSortTypeIndex}
                    handleSortTypeClick={props.handleSortTypeClick}
                    handleSortCategoryClick={props.handleSortCategoryClick}
                />
            </Toolbar>
        </AppBar>
    )
}