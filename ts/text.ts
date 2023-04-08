import axios from "axios";
import express from 'express';

const app = express()

const router = express.Router()

app.use('/api',router)

router.get('/list',(req,res)=>{
    res.json({
        code:200
    })
})

app.listen(9001,()=>{
    console.log(9001)
})