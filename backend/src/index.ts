import express, { json } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import user_router from './routes/userRoutes'
import tour_router from './routes/tourRoutes'


dotenv.config()
const port = process.env.PORT ||4300
const app = express()
app.use(json())
app.use(cors())


app.use('/user',user_router)
app.use('/tour',tour_router)


app.listen(port,()=>{
    console.log(`Tour management running on port ${port}`);
    
});