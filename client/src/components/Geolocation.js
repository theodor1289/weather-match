import React from 'react';
import Button from '@material-ui/core/Button';
import { styled, useTheme } from '@material-ui/core/styles';
import CustomSnackbar from './CustomSnackbar';
import RoomIcon from '@material-ui/icons/Room';
import axios from 'axios';

const CancelToken = axios.CancelToken;
var cancelClosestCityCall;

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

    function getClosestCity(latitude, longitude) {
        cancelClosestCityCall && cancelClosestCityCall();

        var url = 'http://localhost:8080/api/v1/closestcity';

        axios.get(url, {
            params: {
                latitude: latitude,
                longitude: longitude
            },
            cancelToken: new CancelToken(function executor(c) {
                // An executor function receives a cancel function as a parameter
                cancelClosestCityCall = c;
            })
        })
            // .then(response => {throw new Error(response)}) // Uncomment to test network error
            // .then(networkDelay(5000)) // Uncomment to simulate network delay
            .then((response) => {
                if (response.status === 204) {
                    console.log("Made API call, closest city could not be found in the database.");
                    return;
                }

                console.log("Made API call, found the following closest city: " + response.data[0].name);
            })
            .catch((thrown) => {
                if (axios.isCancel(thrown)) {
                    console.log('Request canceled');
                } else {
                    // handle error
                    console.log('Error when loading items: ' + thrown.message);
                }
            })
            .finally(() => {
                cancelClosestCityCall = undefined;
            });
    }

    function success(pos) {
        var crd = pos.coords;
        getClosestCity(crd.latitude, crd.longitude);
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
                msg={`Successfully retrieved local weather conditions!`}
            />
        </>
    );
}
