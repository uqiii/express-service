const mapAdmin = (presence) => ({
  id: presence._id,
  userId: presence.userId,
  checkIn: presence.checkIn,
  checkOut: presence.checkOut
});

module.exports = mapAdmin;
