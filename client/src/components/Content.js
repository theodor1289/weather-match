import React from 'react';
import clsx from 'clsx';
import CityCard from './CityCard';
import Card from './StatusCard';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

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
            return <Card retry={props.retry} status="no_network" />;

        return <Card retry={props.retry} status="no_results" />;
    };

    return (
        <main // clsx is a tiny (223B) utility for constructing className strings conditionally
            className={clsx(
                classes.content,
                {
                    [classes.contentShift]: props.drawerIsOpen,
                })}
        >
            <div className={classes.drawerHeader} />
            <Grid container justify="center" spacing={3}>
                {decideStatusCard(props.filteredCities, props.networkProblems, props.showLoader)}
                {props.filteredCities.map(cityIter => (
                    <Grid key={cityIter.id} item>
                        <CityCard
                            city={cityIter}
                        />
                    </Grid>
                ))}
            </Grid>
        </main>
    );
}