import React, { useEffect, useContext } from 'react';


import { productsContext } from '../../contexts/ProductContext';
import Grid from '@mui/material/Grid';
import ProductCard from './ProductCard';


const ProductsList = () => {

  const { getProducts, products } = useContext(productsContext)

  useEffect(() => {
    getProducts()
  }, [])


  return (
    <Grid container spacing={2}>
      {products.map(item => (
        <ProductCard key={item.id} item={item} />
      ))}
    </Grid>
  );
};

export default ProductsList;