import React from 'react';
import Button from '@material-ui/core/Button';
import { styled, useTheme } from '@material-ui/core/styles';
import CustomSnackbar from './CustomSnackbar';
import RoomIcon from '@material-ui/icons/Room';

export default function Geolocation() {
    const theme = useTheme();

    const StyledGeoButton = styled(Button)({
        background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
    });

    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function success(pos) {
        var crd = pos.coords;

        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
        setGeolocationSnackbarSuccess(true);
    }

    function error(err) {
        console.log(`ERROR(${err.code}): ${err.message}`)
        setGeolocationSnackbarError(true);
    }

    function handleClick() {
        navigator.geolocation.getCurrentPosition(success, error, options);
    }

    // TODO: inverse geolocation to be done in backend
    const [showGeolocationSnackbarSuccess, setGeolocationSnackbarSuccess] = React.useState(false);
    const [showGeolocationSnackbarError, setGeolocationSnackbarError] = React.useState(false);
    return ( // <> is short for <React.Fragment>
        <>
            <StyledGeoButton
                className={"m-auto"}
                startIcon={<RoomIcon />}
                variant="contained"
                color="primary"
                onClick={handleClick}
            >
                Match my location
            </StyledGeoButton >
            <CustomSnackbar
            show={showGeolocationSnackbarError}
            setSnackbar={setGeolocationSnackbarError}
            type='error'
            msg={'An error occured while retrieving local weather conditions!'}
            />
            <CustomSnackbar
            show={showGeolocationSnackbarSuccess}
            setSnackbar={setGeolocationSnackbarSuccess}
            type='success'
            msg={'Successfully retrieved local weather conditions!'}
            />
        </>
    );
}
