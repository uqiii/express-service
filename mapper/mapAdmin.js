const mapAdmin = (admin) => ({
  id: admin._id,
  name: admin.name,
  email: admin.email
});

module.exports = mapAdmin;
