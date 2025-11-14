import express from 'express'

const app = express()

const port = process.env.PORT || 3000;

app.get('/products', (req, res) => {
    res.json([
        {
            id: '1',
            name: "laptop gaming",
            price: 1000,
            description: "laptop gaming lenovo",
            imageURL: "https://svf.pe/wp-content/uploads/2025/01/image-2.png"
        }
    ])
})

app.listen(port, () => {
    console.log('server on port ', port)
})