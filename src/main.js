import express from 'express';
import {addNewItem, deleteItem, getItems, getItemsId, updateItem} from './items.js';
import { addNewUser, login } from './users.js';
import cors from 'cors';
import entryRouter from './routes/entry-router.js';

const hostname = '127.0.0.1';
const app = express();
const port = 3000;

// cors

app.use(cors());

app.use('/', express.static('public'));
app.use(express.json());
app.get('/api/', (req, res) => {
  res.send('Welcome to my GET API!');
  res.status(201);
  console.log(req.url);
  console.log('mooooi');
});
app.use('/api/entries', entryRouter);
app.use('/api/entries/:id', entryRouter);
app.use('/api/users', entryRouter);
app.use('/api/users/:id', entryRouter);


// END POINTS FOR ITEMS RESOURCES

// retrieves items
app.get('/api/entries', entryRouter);
app.get('/api/entries/:id', entryRouter);
app.get('/api/users', entryRouter);
app.get('/api/users/:id', entryRouter);

// retrieves all items
app.get('/api/items', getItems);

// retrieves one item
app.get('/api/items/:id', getItemsId);

// adds item to items
app.post('/api/items', addNewItem);

// adds item to items
app.put('/api/items/:id', updateItem);

// deletes item from items
app.delete('/api/items/:id', deleteItem);


// END POINTS FOR USERS RESOURCES


// gets all users
//app.get('/api/users', getUsers);

// gets all users
//app.get('/api/users/:id', getUserById);

// adds new user
app.post('/api/users', addNewUser);

// login
app.get('/api/users/login', login);





// RANDOM PRACTICE
// get-pyyntö

app.get('/api/moro', (req, res) => {
  console.log(req.body);
  res.status(201);
  res.json({reply: 'moro!' + req.body.sender});
});

// post-pyyntö
app.post('/api/moro', (req, res) => {
  res.status(200)
  console.log(req.body);
  res.json({reply: 'no Moro ' + req.body.sender});
});


// testi, parametrit reitistä
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

// OMA TESTI, laskee numerosta sen neliön
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

// app.listen

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
