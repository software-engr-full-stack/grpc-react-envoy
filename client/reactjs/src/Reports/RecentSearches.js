import React from 'react';
import PropTypes from 'prop-types';

import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

export default function RecentSearches({
  onClickEntry,
  onClearSearches,
  dataList
}) {
  return (
    <List>
      <ListSubheader component="div" color="primary">
        My recent searches
        <Tooltip title="Clear searches">
          <IconButton aria-label="clear-searches" onClick={onClearSearches}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </ListSubheader>

      {dataList.map((data) => {
        const text = data.location.zipCode + (data.location.default ? ' (default)' : '');
        return (
          <ListItem
            button
            key={data.location.zipCode}
            selected={data.isCurrentZipCode}
            onClick={() => { onClickEntry(data); }}
          >
            <ListItemText primary={text} />
          </ListItem>
        );
      })}
    </List>
  );
}

RecentSearches.propTypes = {
  onClickEntry: PropTypes.func.isRequired,
  onClearSearches: PropTypes.func.isRequired,
  dataList: PropTypes.arrayOf(PropTypes.shape()).isRequired
};
