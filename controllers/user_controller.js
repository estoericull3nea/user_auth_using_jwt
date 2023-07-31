const UserModel = require('../models/user')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const { create_token } = require('../config/jwt')
const postRegister = async (req, res) => {
  const { email, password } = req.body

  const user_exist = await UserModel.findOne({ email })

  if (!email || !password) {
    res.status(400).json({ error: `Please Input email and password!` })
  } else if (password.length < 8) {
    res.status(400).json({ error: `Password must be atleast 8 characters!` })
  } else if (user_exist) {
    res
      .status(409)
      .json({ error: `${email} already registered, please login in!` })
  } else {
    const hashedPass = await bcrypt.hash(password, 12)
    const user = new UserModel({
      email,
      password: hashedPass,
    })
    await user.save()
    res.status(202).json({ message: `Registered!` })
  }
}

const postLogin = async (req, res) => {
  res.clearCookie('access_token')

  const { email, password } = req.body
  const user_exist = await UserModel.findOne({ email })

  if (!email || !password) {
    res.status(400).json({ error: `Please Input email and password!` })
  } else if (password <= 7) {
    res.status(400).json({ error: `Password must be atleast 8 characters!` })
  } else if (!user_exist) {
    res
      .status(409)
      .json({ error: `${email} not registered, please register first` })
  } else {
    const if_match = await bcrypt.compare(password, user_exist.password)
    if (!if_match) res.json({ error: `Email or password is incorrect!` })

    const access_token = create_token(user_exist)
    res.cookie('access_token', access_token, {
      maxAge: 120000, // 2mins
      httpOnly: true,
      secure: true,
    })
    res.status(200).json({ message: `Logged In!` })
  }
}

const postLogout = (req, res) => {
  res.clearCookie('access_token')
  res.status(200).json({ message: `Logged Out!` })
}

module.exports = {
  postRegister,
  postLogin,
  postLogout,
}
