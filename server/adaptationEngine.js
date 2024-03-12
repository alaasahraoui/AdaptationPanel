//---------------------------------------------------------------------------------------------------------------
// example of a post request to send a strategy to the client
//curl -X POST http://localhost:3000/forwardStrategy -H "Content-Type: application/json" -d "{\"strategy_id\":0, \"unique_id\":0, \"user\":\"admin\""}"
//---------------------------------------------------------------------------------------------------------------
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

//for env variables read-load
const dotenv = require('dotenv');
dotenv.config();

app.use(bodyParser.json());
app.use(cors());

const port = process.env.PORT;

const server = http.createServer(app);
server.listen(port, () => console.log(`Adapt Engine server running on port ${port}`));

const io = socketIo(server);


app.get("/", (req, res) => {
  res.json("Hello World @ Adaptation Engine");
});
  

app.post('/forwardStrategy', (req, res) => {
  const data = req.body;
  io.emit('strategy', {strategyID: data.strategy_id, unique_id: data.unique_id, user: data.user});
  res.send({ status: 'Strategy sent to the Panel!' });

});

io.on('connection', (socket) => {
  console.log('New client connected to Adapt Engine');
  socket.on('disconnect', () => {
    console.log('Client disconnected from Adapt Engine');
  });
});


