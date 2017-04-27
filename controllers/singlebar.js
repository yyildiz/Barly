/**
 * GET /
 * Singlebar page.
 */
exports.getBar = (req, res) => {
  res.render('singlebar', {
    title: 'Bar'
  });
};
