const User = require('../models/Bars');

/**
 * GET /login
 * Login page.
 */
exports.getBars = (req, res) => {
  res.render('/', {
    title: 'Local Bars'
  });
};
