import React, { useState } from 'react';
import PropTypes from 'prop-types';

import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';

import Popover from '@mui/material/Popover';

import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';

const appInfo = {
  header: 'This app will:',
  items: [
    'Ask for a zip code',
    'Fetch location data',
    'Fetch weather data',
    'Show the data on the map'
  ]
};

const sanitizeErrorMessage = (msg) => {
  if (!msg) return '';

  const san = msg.replace('DEBUG', '').replace('...', '').trim();

  return san.charAt(0).toUpperCase() + san.slice(1);
};

export default function Input({
  error,
  setAPIError,

  onSubmit,

  defaultLabel,
  setLabel,

  label,

  isFetching
}) {
  const [inputText, setInputText] = useState('');

  const [anchorError, setAnchorError] = React.useState(null);
  const handleErrorClose = () => {
    setAnchorError(null);
    setAPIError(null);
  };
  const openError = Boolean(error);
  const idError = openError ? 'map-input-error-popover' : undefined;

  const [anchorInfoButton, setAnchorInfoButton] = React.useState(null);
  const handleInfoButtonClick = (event) => {
    setAnchorInfoButton(event.currentTarget);
  };
  const handleInfoButtonClose = () => {
    setAnchorInfoButton(null);
  };
  const openInfoButton = Boolean(anchorInfoButton);
  const idInfoButton = openInfoButton ? 'map-input-app-info-popover' : undefined;

  return (
    <Stack direction="row" spacing={2}>
      <TextField
        id="filled-basic"
        label={label}
        variant="filled"
        value={inputText}
        onChange={(event) => {
          setInputText(event.target.value || '');
          setLabel(defaultLabel);
        }}
      />

      <LoadingButton
        loading={isFetching}
        variant="contained"
        onClick={(event) => {
          setAnchorError(event.currentTarget);
          onSubmit(inputText);
          setInputText('');
        }}
      >
        Submit
      </LoadingButton>
      <Popover
        id={idError}
        open={openError}
        anchorEl={anchorError}
        onClose={handleErrorClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Alert severity="error" onClose={handleErrorClose}>
          <AlertTitle>Error</AlertTitle>
          {sanitizeErrorMessage(error)}
        </Alert>
      </Popover>

      <Button variant="outlined" onClick={handleInfoButtonClick}>?</Button>
      <Popover
        id={idInfoButton}
        open={openInfoButton}
        anchorEl={anchorInfoButton}
        onClose={handleInfoButtonClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <List>
          <ListSubheader component="div">
            {appInfo.header}
          </ListSubheader>

          {appInfo.items.map((text, ix) => (
            <ListItem
              key={text}
            >
              <ListItemText primary={[ix + 1, '.', ' ', text].join('')} />
            </ListItem>
          ))}
        </List>
      </Popover>
    </Stack>
  );
}

Input.propTypes = {
  error: PropTypes.string,
  setAPIError: PropTypes.func.isRequired,

  onSubmit: PropTypes.func.isRequired,

  defaultLabel: PropTypes.string.isRequired,
  setLabel: PropTypes.func.isRequired,

  label: PropTypes.string.isRequired,

  isFetching: PropTypes.bool
};

Input.defaultProps = {
  error: null,
  isFetching: false
};
