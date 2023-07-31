require('dotenv').config()

const express = require('express')
const PORT = process.env.PORT || 3000
const cookie_parser = require('cookie-parser')
const app = express()

app.use(express.json())
app.use(cookie_parser())

app.use('/', require('./routes/index_route'))
app.use('/', require('./routes/user_route'))

const start = () => {
  try {
    require('./config/connect')(process.env.MONGO_URI_COMPASS)
    app.listen(PORT, () => console.log('Server Running!'))
  } catch (error) {
    res.status(500).json({
      message: error.message,
    })
  }
}
start()
