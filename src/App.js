import React from 'react';

import { Container } from '@mui/material';

import ProductList from './products/ProductList';


const App = () => {
  return (
    <Container sx={{ mt: 5 }}>
      <ProductList />
    </Container>
  )
}

export default App;
