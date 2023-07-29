const getProfile = (req, res) => {
  res.status(200).json({ message: `Profile area!` })
}

const getHomepage = (req, res) => {
  res.status(200).json({ message: `Homepage area!` })
}

module.exports = {
  getProfile,
  getHomepage,
}
