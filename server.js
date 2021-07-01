const express=require('express')
const path=require('path')
const app=express();

app.set('port',process.env.PORT||3000)

app.use(express.static(__dirname))

app.get('/*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,"index.html"))

})

app.listen(app.get('port'), () =>{
console.log(`ready port ${app.get('port')}`)
});