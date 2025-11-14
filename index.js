import express from 'express'
import {PrismaClient} from './generated/prisma/index.js'

const app = express()
const prisma = new PrismaClient()
const port = process.env.PORT || 4000;

// Middleware to parse JSON
app.use(express.json())


// GET all products
app.get('/products', async (req, res) => {
    try {
        const products = await prisma.product.findMany()
        return res.json(products)
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching products' })
    }
})

// GET a single product by ID
app.get('/products/:id', async (req, res) => {
    try {
        const { id } = req.params
        const product = await prisma.product.findUnique({
            where: { id }
        })

        if (!product) {
            return res.status(404).json({ error: 'Product not found' })
        }

        return res.json(product)
    } catch (error) {
        return res.status(500).json({ error: 'Error fetching product' })
    }
})

// POST create a new product
app.post('/products', async (req, res) => {
    try {
        const { name, price, description, imageURL } = req.body

        if (!name || !price) {
            return res.status(400).json({ error: 'Name and price are required' })
        }

        const product = await prisma.product.create({
            data: {
                name,
                price,
                description,
                imageURL
            }
        })

        return res.status(201).json(product)
    } catch (error) {
        return res.status(500).json({ error: 'Error creating product' })
    }
})

// PUT update a product
app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { name, price, description, imageURL } = req.body

        const product = await prisma.product.update({
            where: { id },
            data: {
                name,
                price,
                description,
                imageURL
            }
        })

        return res.json(product)
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Product not found' })
        }
        return res.status(500).json({ error: 'Error updating product' })
    }
})

// DELETE a product
app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params

        await prisma.product.delete({
            where: { id }
        })

        return res.status(204).send()
    } catch (error) {
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Product not found' })
        }
        return res.status(500).json({ error: 'Error deleting product' })
    }
})

app.listen(port, () => {
    console.log('server on port ', port)
})