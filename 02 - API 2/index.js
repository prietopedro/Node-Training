const app = require('./api');

const port = 4000;
app.listen(port, () => console.log(`*** SERVER LISTENING ON PORT ${port}`));
