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
        setGeolocationSnackbar(true);
    }

    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    // TODO: inverse geolocation to be done in backend
    const [showGeolocationSnackbar, setGeolocationSnackbar] = React.useState(false);
    return ( // <> is short for <React.Fragment>
        <>
            <StyledGeoButton
                className={"m-auto my-2"}
                startIcon={<RoomIcon />}
                variant="contained"
                color="primary"
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
