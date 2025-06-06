// const express = require('express')
// const dotenv = require('dotenv')
// const router = require('./app/routes/route')
// const { PrismaClient } = require('@prisma/client')

// dotenv.config()

// const app = express()
// const port = process.env.PORT || 8081;

// // Middleware
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))

// // Routes
// app.use('/api/v1', router)

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Server is listening on port ${port}`)
// })

import express from 'express';
import carRoutes from './app/routes/car.routes.js';

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// API Routes
app.use('/api/v1/car', carRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});