const http = require('http')
const fs = require('fs')
const express = require('express')
const { v4: uuidv4 } = require('uuid')

const app = express()
app.use(express.json())


const server = http.createServer(app)

function getData() {
    try {
        const data = fs.readFileSync('data.json', 'utf8')
        return JSON.parse(data)
    } catch (error) {
        return [];        
    }   
}

function saveData(data) {
    fs.writeFileSync('data.json', JSON.stringify(data))
}

app.get('/items', (req, res) => {
    const items = getData()
    res.status(200).json(items)
})

app.post('/items', (req, res) => {
    const items = getData()
    const newItem = req.body
    
    if (!newItem.name || !newItem.price) {
        return res.status(400).json({ message: 'Name and price are required' })
    }

    if (items.find(item => item.name === newItem.name)) {
        return res.status(400).json({ message: 'Item already exists' })
    }

    newItem.id = uuidv4()
    items.push(newItem)
    saveData(items)
    res.status(201).json(newItem)
  
})


app.put ('/items/:id', (req, res) => {
    const items = getData()
    const id = req.params.id
    const itemIndex = items.findIndex(item => item.id === id)

    if (itemIndex === -1) {
        return res.status(404).json({ message: 'Item not found' })
    }

    if (!req.body.name || !req.body.price) {
        return res.status(400).json({ message: 'Name and price are required' })
    }

    if (items.find(item => item.name === req.body.name && item.id !== id)) {
        return res.status(400).json({ message: 'Item already exists' })
    }

    const updatedItem = req.body
    updatedItem.id = id
    items[itemIndex] = updatedItem
    saveData(items)
    res.status(200).json(updatedItem)
})

app.delete('/items/:id', (req, res) => {
    const items = getData()
    const id = req.params.id
    const itemIndex = items.findIndex(item => item.id === id)

    if (itemIndex === -1) {
        return res.status(404).json({ message: 'Item not found' })
    }

    items.splice(itemIndex, 1)
    saveData(items)
    res.status(204).json({ message: 'Item deleted' } )
})


app.get('/items/:id', (req, res) => {
    const items = getData()
    const id = req.params.id
    const item = items.find(item => item.id === id)

    if (!item) {
        return res.status(404).json({ message: 'Item not found' })
    }

    res.status(200).json(item)
})

server.listen(3000, () => {
  console.log('Server is running on port 3000')
})