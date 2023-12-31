const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.static('public'))

app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/public/about.html')
})

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})
