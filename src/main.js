import express from 'express';
import cors from 'cors';
import entryRouter from './routes/entry-router.js';
import authRouter from './routes/auth-router.js';
import userRouter from './routes/user-router.js';

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

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/entries', entryRouter);

// app.listen
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
