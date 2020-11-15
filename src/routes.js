const express = require('express');
const router = express.Router();

const userControll = require('./controllers/userControll');
const episodeControll = require('./controllers/episodeControll');
const seasonControll = require('./controllers/seasonControll');

const sessionControll = require('./controllers/sessionControll');

router.post('/auth', sessionControll.create);

router.get('/users', userControll.index);
router.get('/user/:username', userControll.show);
router.post('/sing-up', userControll.create);

router.post('/episode/create', episodeControll.create);
router.get('/episodes', episodeControll.index);

router.post('/season/create', seasonControll.create);
router.get('/seasons', seasonControll.index);
router.get('/season/:season', seasonControll.show);
router.get('/search/:season', seasonControll.proc);

module.exports = router;