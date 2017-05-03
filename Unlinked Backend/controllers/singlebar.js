/**
 * GET /
 * Home page.
 */
exports.singlebar = (req, res) => {
  res.render('singlebar', {
    title: 'Singlebar'
  });
};

exports.getCheckout = (req, res) => {
  res.render('checkout', {
    title: 'Checkout'
  });
};
