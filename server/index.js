const express = require("express");
const app = express();
const routes = require("./routes")

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("HomePage")
})

app.use("/api",routes)


const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log("Server Running")
})