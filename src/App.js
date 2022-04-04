import React, { useState, useRef, useEffect } from "react";
import Map from './Map';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { CssBaseline, Grid, Paper, styled, Box } from '@material-ui/core';
import { nanoid } from "nanoid";
import { v4 as uuidv4 } from 'uuid';
import useGeolocation from 'react-hook-geolocation';



import List from './components/List/List';
import Webcam from "./components/Camera/Webcam";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function App(props) {
  const [issues, setIssues] = useState(props.issues); //issue state
  const [showAddIssues, setShowAddIssue] = useState(false); //reveal add issue form
  //const [filter, setFilter] = useState('All'); 

  return (
    <>

      <CssBaseline />
      <Header />

      <Box sx={{ flexGrow: 1 }}>

      <Grid container spacing={1} columns={1}>

        <Grid item xs={12}>
          <Item>      <Map /></Item>
        </Grid>

        <Grid item xs={12}>
        <Item><List /></Item>
        </Grid>
        
      </Grid>
    </Box>

<Footer />

    </>
  );

  
}

export default App;
