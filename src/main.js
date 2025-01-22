import express from 'express';
const hostname = '127.0.0.1';
const app = express();
const port = 3000;



// staattinen html-sivusto tarjoillaan palvelimen juuressa
app.use('/', express.static('public'));

// middleware, joka lukee json-datan POST pyyntöjen rungosta
app.use(express.json());

// rest-apin resurssit tarjoillaan /api/-polun alla
app.get('/api/', (req, res) => {
  res.send('Welcome to my GET API!');
  console.log(req.url);
  console.log('mooooi');
});

app.get('/api/moro', (req, res) => {
  console.log(req.body);
  res.json({reply: 'moroiii!'} + req.body.sender);
});

app.get('/api/sum/:num1/:num2', (req, res) => {
  console.log(req.params);
  const num1 = parseInt(req.params.num1);
  const num2 = parseInt(req.params.num2);
  console.log(num1, num2);

  res.json({
    num1,
    num2,
    result: num1 + num2,
  });
});


app.get('/api/sum/:num1/:num2', (req, res) => {
  console.log(req.params);
  const num1 = parseInt(req.params.num1);
  const num2 = parseInt(req.params.num2);
  console.log(num1, num2);

  res.json({
    num1,
    num2,
    result: num1 + num2,
  });
});


app.post('/api/moro', (req, res) => {
  res.send('Welcome to my POST API!');
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
