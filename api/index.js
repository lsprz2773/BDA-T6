const app = require('express')();
const PORT = 8080;

app.listen(PORT, ()=> console.log(`api listening on: http://localhost:${PORT}`))