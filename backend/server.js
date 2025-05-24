import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; 
import problemRoutes from './routes/problemRoutes.js';
import emailRoutes from './routes/emailRoutes.js'
import cors from 'cors';
// import './controllers/emailController.js'

dotenv.config();
const app = express();
const port = process.env.PORT || 8080

connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/v1/problem', problemRoutes);
app.use('/api/v1/email',emailRoutes);

//rest api
app.get('/',(req,res)=>{
    res.send({
        message:'Welcome to LeetRepeat'
    })
});


app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
});

