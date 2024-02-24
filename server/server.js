
//this is how to send a post with curl to the server
//curl -X POST http://localhost:3000/update-strategy -H "Content-Type: application/json" -d "{\"strategyId\": \"0\"}"
const express = require('express');
const bodyParser = require('body-parser');
const WebSocket = require('ws');
const http = require('http');

const app = express();
app.use(bodyParser.json());

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

app.post('/update-strategy', (req, res) => {
  const { strategyId } = req.body;
  broadcast({ type: 'strategyUpdate', strategyId }); // Broadcast the new strategy ID
  res.json({ message: 'Strategy update broadcasted' });
});

server.listen(3000, () => console.log('Server started on port 3000'));
