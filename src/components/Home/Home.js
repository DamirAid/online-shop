import { Grid } from '@mui/material';
import React from 'react';
import Content from './Content';
import './Home.css'
import Sidebar from './Sidebar';

const Home = () => {
  return (
    <Grid container spacing={3}>
      <Sidebar />
      <Content />
    </Grid>
  );
};

export default Home;