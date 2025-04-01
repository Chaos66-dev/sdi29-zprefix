const server = require('./src/server.js')

const PORT = 4000

server.listen(4000, () => console.log(`Sever is listening on port: ${PORT}`))