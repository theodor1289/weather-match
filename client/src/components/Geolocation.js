import React from 'react';
import Button from '@material-ui/core/Button';
import { styled, useTheme } from '@material-ui/core/styles';
import { debounce } from "throttle-debounce";
import CustomSnackbar from './CustomSnackbar';
import RoomIcon from '@material-ui/icons/Room';
import axios from 'axios';

const CancelToken = axios.CancelToken;
let cancelClosestCityCall;

export default function Geolocation(props) {
    const theme = useTheme();
    const debounceHandleClick = React.useCallback(debounce(650, handleClick), []);

    const StyledGeoButton = styled(Button)({
        background: `linear-gradient(45deg, ${theme.palette.primary.dark} 30%, ${theme.palette.primary.main} 90%)`,
    });

    const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };

    function success(pos) {
        cancelClosestCityCall && cancelClosestCityCall();

        const crd = pos.coords;

        axios.get('https://weather-match.herokuapp.com/api/v1/closestcity', {
            params: {
                latitude: crd.latitude,
                longitude: crd.longitude
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
                    setSnackbarType('error');
                    setSnackbarMessage('Closest city could not be found, database might be empty.');
                }
                else {
                    setSnackbarType('success');
                    setSnackbarMessage(`Successfully retrieved local weather conditions for ${response.data.name}, ${response.data.country}!`);
                    props.changeTemp(null, [response.data.temperature, response.data.temperature]);
                    props.changeHumidity(null, [response.data.humidity - 1, response.data.humidity + 1]);
                    props.changeWind(null, [response.data.windspeed - 1, response.data.windspeed + 1]);
                    if (['Clear', 'Clouds', 'Rain', 'Drizzle', 'Snow', 'Thunderstorm'].indexOf(response.data.main) > -1)
                        props.changeWeatherFilterToExclusively(response.data.main);
                    else
                        props.changeWeatherFilterToExclusively('Other');
                }
                setShowSnackbar(true);
            })
            .catch((thrown) => {
                if (!axios.isCancel(thrown)) {
                    // handle error
                    if(thrown.message !== "Network Error") {
                        console.error('Error when loading items: ' + thrown.message);
                    }
                    setSnackbarType('error');
                    setSnackbarMessage('A network connection to the weather database could not be established.');
                    setShowSnackbar(true);
                }
            })
            .finally(() => {
                cancelClosestCityCall = undefined;
            });
    }

    function error(err) {
        console.error(`ERROR(${err.code}): ${err.message}`);
        setSnackbarType('error');
        setSnackbarMessage('An error occured while retrieving GPS coordinates.');
        setShowSnackbar(true);
    }

    function handleClick() {
        navigator.geolocation.getCurrentPosition(success, error, options);
    }

    const [showSnackbar, setShowSnackbar] = React.useState(false);
    const [snackbarType, setSnackbarType] = React.useState('info');
    const [snackbarMessage, setSnackbarMessage] = React.useState('Currently this snackbar has not been configured.');
    return ( // <> is short for <React.Fragment>
        <>
            <StyledGeoButton
                className={"m-auto"}
                startIcon={<RoomIcon />}
                variant="contained"
                color="primary"
                onClick={debounceHandleClick}
            >
                Match my location
            </StyledGeoButton >
            <CustomSnackbar
                show={showSnackbar}
                setSnackbar={setShowSnackbar}
                type={snackbarType}
                msg={snackbarMessage}
            />
        </>
    );
}
