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
                    selected={props.selectedSortCategoryIndex === 0}
                    onClick={event => props.handleSortCategoryClick(event, 0)}
                    aria-label="alphabetical sort"
                >
                    <ListItemIcon>
                        <SortByAlpha />
                    </ListItemIcon>
                    <ListItemText primary="Alphabetical" />
                </ListItem>
                <ListItem
                    button
                    selected={props.selectedSortCategoryIndex === 1}
                    onClick={event => props.handleSortCategoryClick(event, 1)}
                    aria-label="temperature sort"
                >
                    <ListItemIcon>
                        <BeachAccess />
                    </ListItemIcon>
                    <ListItemText primary="Temperature" />
                </ListItem>
                <ListItem
                    button
                    selected={props.selectedSortCategoryIndex === 2}
                    onClick={event => props.handleSortCategoryClick(event, 2)}
                    aria-label="humidity sort"
                >
                    <ListItemIcon>
                        <Grain />
                    </ListItemIcon>
                    <ListItemText primary="Humidity" />
                </ListItem>
                <ListItem
                    button
                    selected={props.selectedSortCategoryIndex === 3}
                    onClick={event => props.handleSortCategoryClick(event, 3)}
                    aria-label="wind sort"
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
                    selected={props.selectedSortTypeIndex === 0}
                    onClick={event => props.handleSortTypeClick(event, 0)}
                    aria-label="ascending sort"
                >
                    <ListItemText primary="Ascending" />
                </ListItem>
                <ListItem
                    button
                    selected={props.selectedSortTypeIndex === 1}
                    onClick={event => props.handleSortTypeClick(event, 1)}
                    aria-label="descending sort"
                >
                    <ListItemText primary="Descending" />
                </ListItem>
            </List>
        </Popover>
    );
}