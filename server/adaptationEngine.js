//---------------------------------------------------------------------------------------------------------------
// example of a post request to send a strategy to the client
//curl -X POST http://localhost:3000/send-strategy -H "Content-Type: application/json" -d "{\"strategyID\":0}"
//---------------------------------------------------------------------------------------------------------------
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:5173' }));

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["POST"]
    }
  });

app.post('/send-strategy', (req, res) => {
  console.log('Strategy sent to the client!');
  const data = req.body;
  io.sockets.emit('strategy', data.strategyID);
  res.send({ status: 'Strategy sent to the client!' });

});

io.on('connection', (socket) => {
  console.log('New client connected');
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const port = 3000;
server.listen(port, () => console.log(`Server running on port ${port}`));
