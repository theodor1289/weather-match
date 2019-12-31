import React from 'react';
import Button from '@material-ui/core/Button';
import { styled } from '@material-ui/core/styles';
import CustomSnackbar from './CustomSnackbar'

export default function Geolocation() {
    const StyledGeoButton = styled(Button)({
        background: 'linear-gradient(45deg, #3F51B5 30%, #5c6dc6 90%)',
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        height: 48,
        color: 'white',
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
        setGeolocationSnackbar(true);
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    const [showGeolocationSnackbar, setGeolocationSnackbar] = React.useState(false);
    return ( // <> is short for <React.Fragment>
        <>
            <StyledGeoButton
                className={"m-auto my-2"}
                // onClick={navigator.geolocation.getCurrentPosition(success, error, options)}
            >
                Match my location
            </StyledGeoButton >
            <CustomSnackbar
            show={showGeolocationSnackbar}
            setSnackbar={setGeolocationSnackbar}
            />
        </>
    );
}
