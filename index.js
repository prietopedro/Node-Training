const  server = require('./api/server')

const port = 4000 || process.env.PORT
server.listen(port,()=>console.log(`Server Listening On Port ${port}`))