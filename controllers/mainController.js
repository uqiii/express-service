const getHandler = (_, res) => res.status(200).json('Hello');

module.exports = { getHandler };
