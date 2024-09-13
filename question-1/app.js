const http = require('http');
const fs = require('fs');
const express = require('express');

const app = express();
app.use(express.json());



app.get('/input', (req, res) => {
    fs.readFile('./input.txt', {encoding:'utf8'}, (err, data) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.send({
                status: 200,
                data: data
            });
        }
    });
})

// app.post('/output', (req, res) => {
//     fs.writeFile('./output.txt', JSON.stringify(req.body), (err) => {
//         if (err) res.status(500).send(err.message)
//         res.status(201).send('Updated successfully!👍')
//     })
// })

app.post('/output', (req, res) => {
    fs.appendFile('./output.txt', JSON.stringify(req.body) + '\n', (err) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(201).send('Updated successfully!👍');
        }
    });
});

app.put('/output', (req, res) => {
    fs.writeFile('./output.txt', JSON.stringify(req.body), (err) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(201).send('Updated successfully!👍');
        }
    });
});







const server = http.createServer(app);
server.listen(3000, () => {
    console.log('Server is running on port 3000');
});