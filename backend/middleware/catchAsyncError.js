module.exports = (theFunc) => (req, res, next) => {
    Promise.resolve(theFunc(req, res, next))
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        const statusCode = error.statusCode || 500;
        const message = error.message || 'Internal Server Error';
        res.status(statusCode).json({ message });
      });
  };
  