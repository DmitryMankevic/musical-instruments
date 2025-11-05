const formatResponse = require('../utils/formatResponse');

function isValidateId(req, res, next) {
  const { id } = req.params;
  if (Number.isNaN(+id))
    return res.status(400).json(formatResponse(400, 'Put number id'));
  return next();
}

module.exports = isValidateId;
