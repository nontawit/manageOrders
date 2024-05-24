import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Button, Typography, Dialog, DialogTitle, DialogContent, DialogActions, Paper, TextField
} from '@mui/material';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import "../App.css";

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
  minHeight: '100vh',
  backgroundColor: theme.palette.background.default,
}));

const FormContainer = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: theme.spacing(4),
  boxShadow: theme.shadows[5],
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  width: '100%',
  maxWidth: '400px',
}));

const PinInputsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  marginBottom: theme.spacing(2),
}));

const PinInput = styled(TextField)(({ theme }) => ({
  width: '40px',
  margin: theme.spacing(1),
  '& input': {
    textAlign: 'center',
    padding: theme.spacing(1),
  },
}));

const PinLogin = () => {
  const [pin, setPin] = useState(['', '', '', '', '', '']);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const correctPin = '210190';
  const inputRefs = useRef([]);

  useEffect(() => {
    inputRefs.current[0].focus();
  }, []);

  const handlePinChange = (e, index) => {
    const { value } = e.target;
    if (/^\d*$/.test(value) && value.length <= 1) {
      const newPin = [...pin];
      newPin[index] = value;
      setPin(newPin);

      if (value !== '' && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && pin[index] === '' && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const pinString = pin.join('');
    if (pinString === correctPin) {
      navigate('/main-order');
    } else {
      setOpen(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setPin(['', '', '', '', '', '']);
    inputRefs.current[0].focus();
  };

  return (
    <ThemeProvider theme={theme}>
      <PinContainer>
        <FormContainer>
          <Typography variant="h4" gutterBottom>Enter PIN</Typography>
          <Typography variant="subtitle1" gutterBottom>Enter your 6-digit PIN to continue</Typography>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <PinInputsContainer>
              {pin.map((digit, index) => (
                <PinInput
                  key={index}
                  value={digit}
                  onChange={(e) => handlePinChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  inputProps={{
                    maxLength: 1,
                    inputMode: 'numeric',
                  }}
                  inputRef={(ref) => inputRefs.current[index] = ref}
                />
              ))}
            </PinInputsContainer>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={pin.includes('')}
            >
              Submit
            </Button>
          </form>
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
