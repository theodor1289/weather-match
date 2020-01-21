import { createMuiTheme, makeStyles } from '@material-ui/core/styles';
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

const cardStyle = makeStyles({
  card: {
    width: 200,
    height: 320,
  },
  media: {
    height: 115,
  },
});

export {
    lightTheme,
    darkTheme,
    cardStyle
}