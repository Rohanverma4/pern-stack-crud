const express = require('express');
const cors = require('cors');
const user = require('./controllers/user_routes')
const app = express();

// middlewares
app.use(express.json());
app.use(cors());

// Routes..
app.use('/user',user);

// connections..
app.listen(3000, () => {
    console.log('server is running on port 3000');
})