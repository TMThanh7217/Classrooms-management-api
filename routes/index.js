const express = require('express');
const router = express.Router();
const models = require('../models');
require('dotenv').config()

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Classroom-management-api' });
});

router.get('/sync', (req, res) => {
  models.sequelize.sync()
  .then(() => {
    res.send('Database sync successfully')
  });
});

module.exports = router;
