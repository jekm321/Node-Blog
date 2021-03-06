const express = require('express');

const userDb = require('../data/helpers/userDb');
const postRoutes = require('./postRoutes');

const router = express.Router();

router.get('/', (req, res, next) => {
    userDb
        .get()
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

router.get('/:id', (req, res, next) => {
    const { id } = req.params;

    userDb
        .get(id)
        .then(users => {
            res.json(users);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

router.post('/', (req, res, next) => {
    const userInfo = req.body;

    userDb
        .insert(userInfo)
        .then(response => {
            userDb
                .get()
                .then(users => {
                    res.json(users);
                })
                .catch(err => {
                    res.status(500).json({ error: err });
                });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
})

router.put('/:id', (req, res, next) => {
    const { id } = req.params;
    const update = req.body;

    userDb
        .update(id, update)
        .then(response => {
            userDb.get()
                .then(users => {
                    res.json(users);
                })
                .catch(err => {
                    res.status(500).json({ error: err });
                });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

router.delete('/:id', (req, res, next) => {
    const { id } = req.params;

    userDb
        .remove(id)
        .then(response => {
            userDb.get()
                .then(users => {
                    res.json(users);
                })
                .catch(err => {
                    res.status(500).json({ error: err });
                });
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

router.get('/:id/posts', (req, res, next) => {
    const { id } = req.params;

    userDb
        .getUserPosts(id)
        .then(posts => {
            res.json(posts);
        })
        .catch(err => {
            res.status(500).json({ error: err });
        });
});

router.use('/:id/posts', postRoutes);


module.exports = router;