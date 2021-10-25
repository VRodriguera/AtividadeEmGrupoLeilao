import React, { useEffect, useState } from 'react';

import { CardGroup } from 'react-bootstrap';
import ProductCard from '../components/card';

function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [products, setProducts] = useState([])

  useEffect(() => {
    setIsLoading(true);
    fetch('http://localhost:3001/products')
      .then(response => response.json())
      .then(data => {
        setProducts(data);
        setIsLoading(false);
      });

  }, []);

  return (

    <div>
      <h1>Escolha sua linguagem favorita:</h1>

{isLoading ? <p>Carregando...</p>
  : ( 
    <CardGroup>
      {products.map(product => (
        <ProductCard
          key={product._id}
          id={product._id}
          name={product.name}
          image={product.image}
          bid={product.bid}
          />
      ))}
    </CardGroup>
)}
    </div>
  );
}

export default Home;
