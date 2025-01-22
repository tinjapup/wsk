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
  res.status(201);
  console.log(req.url);
  console.log('mooooi');
});

app.get('/api/moro', (req, res) => {
  console.log(req.body);
  res.status(201);
  res.json({reply: 'moro!' + req.body.sender});
});

// reading from route params
app.get('/api/sum/:num1/:num2', (req, res) => {
  console.log(req.params);

  const num1 = parseInt(req.params.num1);
  const num2 = parseInt(req.params.num2);

  // testing that both parameters are numbers
  if(isNaN(num1) || isNaN(num2)) {
    res.status(400);
    res.json({
      error: 'Both parameters must be numbers!'
    });
    return;
  }

  res.json({
    num1,
    num2,
    result: num1 + num2,
  });

});

// square of a number, test
app.get('/api/square/:num', (req, res) => {
  console.log(req.params);

  const num = parseInt(req.params.num);

  if (isNaN(num)) {
    res.status(400);
    res.json({
      error: "Parameter must be a number!"
    });
    return;
  }
  res.json({
    num,
    squareOfNumber: num * num,
  });
});

// moro
app.post('/api/moro', (req, res) => {
  res.status(200)
  console.log(req.body);
  res.json({reply: 'no Moro ' + req.body.sender});
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
