const nodemon = require('nodemon')
nodemon({ script: 'server.js' })
  .on('start', console.clear)
  .on('restart', console.clear)
  .on('quit', () => {
    console.log('Quit!')
    process.exit()
  })
