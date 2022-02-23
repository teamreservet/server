module.exports.authMiddleware = (req, res, next) => {
  if (req.headers['x-api-authentication'] === process.env.ADMIN_UID) {
    next();
  } else {
    res.status(501).send('Not authorised attempt');
  }
};
