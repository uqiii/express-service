const mapAdmin = (presence) => ({
  userId: presence.userId,
  checkIn: presence.checkIn,
  checkOut: presence.checkOut
});

module.exports = mapAdmin;
