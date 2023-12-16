const mapUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  position: user.position,
  avatar: user.avatar
});

module.exports = mapUser;
