const express = require('express')
const cors = require('cors');
const app = express()
const port = 3001
const server = require('http').createServer(app);

const Auction = require('./models/Auction');

const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET','POST']
  }
});

const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));

app.get('/products', async (_req, res) => {
  const products = await Auction.getAll();

  if(!products) return res.status(500).json({ message: "deu ruim!"});
  return res.status(200).json(products);
});

app.get('/', (req, res) => res.send('Hello World!'))
server.listen(port, () => console.log(`Example app listening on port ${port}!`))