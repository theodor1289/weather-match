import React from 'react';
import clsx from 'clsx';
import CityCard from './CityCard';
import Card from './StatusCard';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import NavigateNext from '@material-ui/icons/NavigateNext';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
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

export default function Content(props) {
    const classes = useStyles();

    function decideStatusCard(cityList, networkProblems, showLoader) {
        if (cityList.length > 0 || showLoader)
            return null;

        if (networkProblems)
            return <Grid item>
                <Card retry={props.retry} status="no_network" />
            </Grid>;

        return <Grid item>
            <Card retry={props.retry} status="no_results" />
               </Grid>;
    }

    return (
        <main // clsx is a tiny (223B) utility for constructing className strings conditionally
            className={clsx(
                classes.content,
                {
                    [classes.contentShift]: props.drawerIsOpen,
                })}
        >
            <div className={classes.drawerHeader} />
            <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
                spacing={3}
            >
                <Grid container item justify="center" spacing={3}>
                    {decideStatusCard(props.filteredCities, props.networkProblems, props.showLoader)}
                    {props.filteredCities.map(cityIter => (
                        <Grid key={cityIter.id} item>
                            <CityCard
                                city={cityIter}
                            />
                        </Grid>
                    ))}
                </Grid>
                {props.filteredCities.length > 0?
                    <Grid item>
                    <IconButton color="primary" onClick={props.navigateBefore}>
                        <NavigateBefore />
                    </IconButton>
                    <Button
                        variant="text"
                        color="primary"
                    >
                        {(props.currentPage*props.pageSize)+1}-{Math.min(props.totalCities, (props.currentPage+1)*props.pageSize)} of {props.totalCities}
                    </Button>
                    <IconButton color="primary" onClick={props.navigateNext}>
                        <NavigateNext />
                    </IconButton>
                </Grid> : null
            }
            {props.showLoader ?
              <LinearProgress style={{ position: "fixed", left: 0, right: 0, bottom: 0 }} variant="query" />
              :
              null}
            </Grid>
        </main>
    );
}