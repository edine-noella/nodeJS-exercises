const http = require('http');
const fs = require('fs');
const express = require('express');

const app = express();

//middle ware that logs the time a request that start with api is made
const timeLoggerMiddleware = (req, res, next) => {
    const time = new Date();
    console.log(`Time the request is made: ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`);

    next();
}

app.use("/api", timeLoggerMiddleware);
app.use(express.json()); 

app.get('/api/names', (req, res) => {
    fs.readFile('./names.txt', {encoding:'utf8'}, (err, data) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.send({
                status: 200,
                data: data
            });
        }
    });
} );


app.get('/names', (req, res) => {
    fs.readFile('./names.txt', {encoding:'utf8'}, (err, data) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.send({
                status: 200,
                data: data
            });
        }
    });
} );

const server = http.createServer(app);
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});