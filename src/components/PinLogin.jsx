import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Paper
} from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    }
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 300,
    },
  },
});

const PinContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(2),
}));

const FormContainer = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
  boxShadow: theme.shadows[5],
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  minWidth: '300px',
}));

const PinCirclesContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
}));

const PinCircle = styled(Box)(({ theme, filled }) => ({
  width: '16px',
  height: '16px',
  margin: theme.spacing(0.5),
  borderRadius: '50%',
  backgroundColor: filled ? theme.palette.primary.main : theme.palette.grey[400],
}));

const PinLogin = () => {
  const [pin, setPin] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const correctPin = '210190';
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handlePinChange = (e) => {
    const { value } = e.target;
    if (/^\d*$/.test(value) && value.length <= 6) { // Check if input is a number and not more than 6 digits
      setPin(value);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && pin.length === 6) {
      handleSubmit(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pin === correctPin) {
      navigate('/main-order');
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setPin('');
  };

  return (
    <ThemeProvider theme={theme}>
      <PinContainer>
        <FormContainer>
          <Typography variant="h4" gutterBottom>Enter PIN</Typography>
          <Typography variant="subtitle1" gutterBottom>Enter your 6-digit PIN to continue</Typography>
          <PinCirclesContainer>
            {[...Array(6)].map((_, index) => (
              <PinCircle key={index} filled={index < pin.length} />
            ))}
          </PinCirclesContainer>
          <input
            ref={inputRef}
            type="tel"
            value={pin}
            onChange={handlePinChange}
            onKeyPress={handleKeyPress}
            style={{ position: 'absolute', opacity: 0 }}
            maxLength={6}
            autoFocus
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            disabled={pin.length < 6}
          >
            Submit
          </Button>
        </FormContainer>
      </PinContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Typography>Incorrect PIN. Please try again.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

export default PinLogin;
