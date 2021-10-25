import React, { useEffect, useState } from 'react';

import { Card, Button } from 'react-bootstrap';

const { io } = require("socket.io-client");
const socket = io('http://localhost:3001');


function ProductCard({ id, name, image, bids}) {
  const [currentBids, setCurrentBids] = useState(bids);
  const [disable, setDisable] = useState(false)

  useEffect(() => {
    socket.on('refreshCurrentBids', (data) => {
      if (id === data._id) setCurrentBids(data.bids);
    })
    if (bids === 100) setDisable(true)
  }, [id, name, bids]);


  const handleClick = (e) => {
    socket.emit('increaseBids', { id });
      setCurrentBids(bids + 5);
  }

  return (
    <Card>
      <Card.Img variant="top" src={image} />
      <Card.Body>
        <Card.Title><span>{name}</span></Card.Title>
        <Card.Text>
        Bids: <span>{`R$${currentBids}`}</span>  
        </Card.Text>
        <Button
        onClick={handleClick}
        disabled={ disable }
        >{disable ? "Produto arrematado" : "Dar um lance"}</Button>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
