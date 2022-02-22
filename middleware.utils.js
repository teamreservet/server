module.exports.authMiddleware = (req, res, next) => {
  console.log(req.headers['x-api-authentication']);
  if (req.headers['x-api-authentication'] === process.env.ADMIN_UID) {
    next();
  }
  res.status(501).send('Not authorised attempt');
};
