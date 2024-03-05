/**
 * Expense tracker
 */
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
app.use(bodyParser.json())
const mongoose = require('mongoose') 
const {Expense} = require('./schema.js')
const port = 8000
async function connectToDb(){
   try{
    await mongoose.connect('mongodb+srv://keerthickragulr2022cse:ragul418026@ragul.y3vchqn.mongodb.net/ExpenseTracker?retryWrites=true&w=majority')
    console.log('DB connection established...')
    app.listen(port,function(){
        console.log(`Listening on port ${port}`)
    })
   }
   catch(err){
    console.log(err)
    console.log('Couldnot Connect to DB')
   }

}

connectToDb()
app.post('/add-expense',async (request,response)=>{
    console.log(request.body)
  try{ 
await Expense.create({
    "amount":request.body.amount,
    "category":request.body.category,
    "date":request.body.date
})

   response.status(200).json({
      "status":"success",
      "message":"new entry created"
   })
}
catch(err){
    response.status(500).json({
        "status":"failed",
        "message":"entry not created",
        "error":err
    })
}
})

app.get('/get-expenses',async function(request,response){
    try{
        const expenseData=await Expense.find()
        express.response.status.apply(200).json(expenseData)
    }catch(error){
        response.status(500).json({
            "status":"failure",
            "message":"could not fetch entries",
            "error":error
        })
    }
})