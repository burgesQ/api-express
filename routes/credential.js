function getCredential(req, res, next) {
  // gen cred
  // save them in redis
  res.json({
    credential: 'smth',
    user: 'turlu',
  });
}

module.exports = { getCredential };
