const express = require('express');

const server = express();

const PORT = process.env.PORT || 5000;

server.listen(PORT, function() {
    console.log(`server listen on ${PORT}`);
});