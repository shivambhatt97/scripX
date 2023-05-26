const express = require('express');
const router = express.Router();
const api = require('../controllers/api');

console.log('router loaded ');
router.get('/', api.home);
router.get('/movies', api.movies);


module.exports = router;