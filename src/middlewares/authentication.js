import jwt from 'jsonwebtoken';
import 'dotenv/config';

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader;

  console.log('authHeader:', authHeader);
  console.log('token:', token);

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.user_id; // Attach user ID to request object
    console.log('decoded:', decoded);
    console.log('req.userId:', req.userId);
    //console.log('req', req);
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    res.status(403).json({ message: 'Invalid token' });
  }
};

export { authenticateToken };
