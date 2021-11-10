import React from 'react';
import ProductsList from '../Products/ProductList'
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
const Content = () => {
  return (
    <section className="product__block">
      <Container>
        <Typography variant="h2" gutterBottom component="div">
          Товары
        </Typography>
        <ProductsList />
      </Container>
    </section>
  );
};

export default Content;