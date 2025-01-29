const users = [
  {
    id: 1,
    username: 'johndoe',
    password: 'password1',
    email: 'johndoe@example.com',
  },
  {
    id: 2,
    username: 'janedoe',
    password: 'password2',
    email: 'janedoe@example.com',
  },
  {
    id: 3,
    username: 'bobsmith',
    password: 'password3',
    email: 'bobsmith@example.com',
  },
];

// Get all the users

const getUsers = (req, res) => {
  if (users.length > 0) {
    console.log(users);
    res.json(users);
  } else {
    return res.status(404).json({message: 'Users not found'});
  }
};

// Get user by ID

const getUserById = (req, res) => {
  const user = users.find((user) => user.id == req.params.id);

  if (user) {
    res.json(user);
  } else {
    return res.status(404).json({message: "User not found"});
  }
}

// Add new user

const addNewUser = (req, res) => {
  console.log('addUsers request body', req.body);

  // Introduce 3 new variables for req.body properties
  const {username, password, email} = req.body;

  if (username && password && email && users.length > 0) {

    // Find the latest id
    const latestId = users[users.length - 1].id;

    // Create new user property
    const newUser = {
      id: latestId + 1,
      username: username,
      password: password,
      email: email,
    };

    users.push(newUser);
    return res.status(201).json({message: 'User added.'});
  } else {
    res.status(400);
    return res.json({message: 'Request should have username, password and property property'});
  }
};


// User login
const login = (req, res) => {
  const {username, password} = req.body;
  if (!username) {
    return res.status(401).message({message: 'Bad username'});
  }
  const user = users.find((user) => user.username === username);
  if (user && user.password === password) {
    res.json({message: 'login ok', user})
  } else {
    res.status(401).json({message: "Bad username or password"})
  }
}

export {getUsers, getUserById, addNewUser, login};
