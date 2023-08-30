import React, { useState } from 'react';
import { Container, Card, CardContent, makeStyles, Grid } from '@material-ui/core';
import QrReader from 'react-qr-reader';
import Button from '@mui/material/Button';
import Beep from '../src/Assets/censor-beep-01.mp3'
import useSound from 'use-sound';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios';
import AccountCircle from '@mui/icons-material/AccountCircle';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl'
import FilledInput from '@mui/material/FilledInput';
import IconButton from '@mui/material/IconButton';


import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';

import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import QrCode2Icon from '@mui/icons-material/QrCode2';



function App() {
  const [scanResult, setScanResult] = useState('');
  const classes = useStyles();
  const [play] = useSound(Beep);

  const handleErrorWebCam = (error) => {
    console.log(error);
  }
  const handleScanWebCam = (result) => {
    if (result) {
      play()
      setScanResult(result);
      setOpen(false)
    }
  }

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [flash, setflash] = useState(false)

  const [scanvalue, setscanvalue] = useState("")

  // const barcodeScannerComponentHandleUpdate = (result) => {
  //   if (result) {
  //     play()
  //     setLog([...logs, result.text]);

  //     setOpen(false)
  //     setStopStream(true)
  //   }
  // };


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  return (
    <Container className={classes.conatiner}>
      <Card>
        <h2 className={classes.title}>Qr Scan test</h2>



        <CardContent align="center">
          <Box
            component="form"
            sx={{
              '& > :not(style)': { m: 3, width: '30ch' },
            }}
            noValidate
            autoComplete="off"
            align="center"
          >

            <Paper
              component="form"
              sx={{ p: '4px 8px', display: 'flex', alignItems: 'center', width: 1200 }}
            >

              <InputBase
                placeholder="ค้นหา"
                value={scanResult}
                onChange={(e) => setScanResult(e.target.value)}
                inputProps={{ 'aria-label': 'search google maps' }}
              />
              <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
              </IconButton>
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton color="primary" onClick={handleOpen} sx={{ p: '10px' }} aria-label="directions">
                <QrCode2Icon fontSize="large" />
              </IconButton>
            </Paper>

            {/* <TextField
              id="filled-adornment-password"
              value={scanResult}
              onChange={(e) => setScanResult(e.target.value)}
              endAdornment={

                <IconButton
                  aria-label="toggle password visibility"
                  onClick=""

                  edge="end"
                >

                </IconButton>

              }
            /> */}

          </Box>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Grid>

                {/* <BarcodeScannerComponent
                  delay={300}
                  style={{ width: '%', align: 'center' }}
                  onError={handleErrorWebCam}
                  onScan={handleScanWebCam}
                /> */}
                <div align="center">
                  <BarcodeScannerComponent
                    delay={700}
                    width={300}
                    height={300}

                    onUpdate={(err, result) => {
                      if (result) {
                        handleScanWebCam(result.text);
                        setscanvalue(result.text)
                      }
                    }}
                  />
                </div>


              </Grid>
            </Box>
          </Modal>
        </CardContent>
      </Card>

    </Container>
  );
}

const useStyles = makeStyles((theme) => ({
  conatiner: {
    marginTop: 10
  },
  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: '#E2E3FF',
    color: '#00000',
    padding: 20
  }

}));
export default App;
