import React from 'react';
import ProductsList from '../Products/ProductList'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Grid, Paper } from '@mui/material';
import PaginationList from './PaginationList'
const Content = () => {
  return (
    <Grid item md={9}>
      <Paper>
        <section className="product__block">
          <Container>
            <Typography variant="h2" gutterBottom component="div">
              Товары
            </Typography>
            <ProductsList />
						<PaginationList/>
          </Container>
        </section>
      </Paper>
    </Grid>
  );
};

export default Content;