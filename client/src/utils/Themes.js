import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';

const lightTheme = createMuiTheme({
    palette: {
        primary: indigo,
        secondary: pink,
        type: 'light'
    },
    status: {
        danger: 'red',
    },
});

const darkTheme = createMuiTheme({
    palette: {
        primary: indigo,
        secondary: pink,
        type: 'dark'
    },
    status: {
        danger: 'red',
    },
});

export {
    lightTheme,
    darkTheme
}