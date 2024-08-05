import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import userRouter from './src/routes/user.routes.js'
import morgan from 'morgan'

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors())
app.use(morgan('dev'))

app.use('/', userRouter)

app.listen(PORT, () => {
    console.log(
        `Conectado a servidor en el puerto 🔥🔥 http://localhost:${PORT}`
    )
})
