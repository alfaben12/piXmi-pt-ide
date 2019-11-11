const express = require('express');

const forum = express()

forum.get('/healthz', (req, res, next) => {
    res.send({ name: 'forum', status: 'healthy' });
    next();
})

forum.get('/d/:id', (req, res, next) => {
    res.send({ discussion: req.params.id });
    next();
});

forum.listen(1337, () => console.log(`Example app listening on port 1337!`))


const members = express()

members.get('/', (req, res, next) => {
    res.send({ members: [ { name: 'gary', avatar: 'snail' }] });
    next();
})

members.listen(1338, () => console.log(`Example app listening on port 1338!`))

const test = express()

test.get('/a', (req, res, next) => {
    res.send({ name: 'what', status: 'yesss' });
    next();
})

test.get('/ba/:id', (req, res, next) => {
    res.send({ tested: req.params.id });
    next();
});
test.listen(1339, () => console.log(`Example app listening on port 1339!`))
