const userDb = require('./data/helpers/userDb');
const postDb = require('./data/helpers/postDb');
const tagDb = require('./data/helpers/tagDb');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');
const tagRoutes = require('./routes/tagRoutes');

const express = require('express');
const server = express();

errorHandler = (err, req, res, next) => {
    if (err) {
        if (err.errno === 19) {
            res.status(400).json({ msg: 'Please provide all required fields' });
        } else {
            res.status(500).json({ error: 'something bad happened' });
        }
    }
}

server.use(cors());
server.use(express.json());

server.get('/', (req, res) => {
    res.json({ api: 'running' });
})

server.use('/api/users', userRoutes);
server.use('/api/posts', postRoutes);
server.use('/api/tags', tagRoutes);

server.use(errorHandler);

const port = 5000;
server.listen(port, () => console.log(`\n==API Running on port ${port} ==\n`));