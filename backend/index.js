import express from 'express'
import cors from 'cors'
import customerRoutes from './routes/customerRoutes.js'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

app.use(cors())
app.use(express.json())

app.use('/api/customers', customerRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
