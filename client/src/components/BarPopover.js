import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import SortByAlpha from '@material-ui/icons/SortByAlpha';
import BeachAccess from '@material-ui/icons/BeachAccess';
import Grain from '@material-ui/icons/Grain';
import Waves from '@material-ui/icons/Waves';
import Popover from '@material-ui/core/Popover';

export default function BarPopover(props) {
    const [selectedSortCategoryIndex, setSelectedSortCategoryIndex] = React.useState(0);
    const handleSortCategoryClick = (_event, index) => {
        setSelectedSortCategoryIndex(index);
    };
    const [selectedSortTypeIndex, setSelectedSortTypeIndex] = React.useState(0);
    const handleSortTypeClick = (_event, index) => {
        setSelectedSortTypeIndex(index);
    };

    const handleClose = () => {
        props.setAnchorEl(null);
    };

    return (
        <Popover
            id={props.id}
            open={props.open}
            anchorEl={props.anchorEl}
            onClose={handleClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
        >
            <List component="nav" aria-label="category sort area">
                <ListItem
                    button
                    selected={selectedSortCategoryIndex === 0}
                    onClick={event => handleSortCategoryClick(event, 0)}
                >
                    <ListItemIcon>
                        <SortByAlpha />
                    </ListItemIcon>
                    <ListItemText primary="Alphabetical" />
                </ListItem>
                <ListItem
                    button
                    selected={selectedSortCategoryIndex === 1}
                    onClick={event => handleSortCategoryClick(event, 1)}
                >
                    <ListItemIcon>
                        <BeachAccess />
                    </ListItemIcon>
                    <ListItemText primary="Temperature" />
                </ListItem>
                <ListItem
                    button
                    selected={selectedSortCategoryIndex === 2}
                    onClick={event => handleSortCategoryClick(event, 2)}
                >
                    <ListItemIcon>
                        <Grain />
                    </ListItemIcon>
                    <ListItemText primary="Humidity" />
                </ListItem>
                <ListItem
                    button
                    selected={selectedSortCategoryIndex === 3}
                    onClick={event => handleSortCategoryClick(event, 3)}
                >
                    <ListItemIcon>
                        <Waves />
                    </ListItemIcon>
                    <ListItemText primary="Wind speed" />
                </ListItem>
            </List>
            <Divider />
            <List component="nav" aria-label="type sort area">
                <ListItem
                    button
                    selected={selectedSortTypeIndex === 0}
                    onClick={event => handleSortTypeClick(event, 0)}
                >
                    <ListItemText primary="Ascending" />
                </ListItem>
                <ListItem
                    button
                    selected={selectedSortTypeIndex === 1}
                    onClick={event => handleSortTypeClick(event, 1)}
                >
                    <ListItemText primary="Descending" />
                </ListItem>
            </List>
        </Popover>
    );
}