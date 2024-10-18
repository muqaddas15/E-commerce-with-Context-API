const express = require('express');
const path = require('path');
const basicAuth = require('basic-auth');

const app = express();

// Basic Authentication Middleware
const auth = (req, res, next) => {
  const user = basicAuth(req);
  if (user && user.name === 'admin' && user.pass === 'password123') {
    return next();
  } else {
    res.set('WWW-Authenticate', 'Basic realm="Restricted Area"');
    return res.status(401).send('Authentication required.');
  }
};

// Use auth middleware for all routes
app.use(auth);

// Serve static files from the React app build
app.use(express.static(path.join(__dirname, 'build')));

// Handle any other routes by serving the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
