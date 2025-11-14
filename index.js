import express from 'express'
import {PrismaClient} from './generated/prisma/index.js'

const app = express()
const prisma = new PrismaClient()

const port = process.env.PORT || 3000;

app.get('/products', async (req, res) => {

    const products = await prisma.product.findMany()
    return res.json(products)
})

app.listen(port, () => {
    console.log('server on port ', port)
})