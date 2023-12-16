const mapUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  phone: user.phone,
  position: user.position,
  avatar: user.avatar
});

module.exports = mapUser;
