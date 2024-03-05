/**
 * Expense tracker
 */
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(bodyParser.json())
app.use(cors())
const mongoose = require('mongoose') 
const {Expense} = require('./schema.js')
const port = process.env.PORT || 8000
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
//display
app.get('/getexpenses',async function(request,response){
    try{
        console.log("check1")
        const expenseData = await Expense.find()
        console.log("check2")
        response.status(200).json(expenseData)
    }catch(error){
        response.status(500).json({
            "status":"failure",
            "message":"could not fetch entries",
            "error":error
        })
    }
})

app.delete('/delete-expense/:id',async (request,response)=>{
    try{
        const expenseid = await Expense.findById(request.params.id)
        console.log(expenseid)
        if(expenseid){
            
            await Expense.findByIdAndDelete(expenseid)
            response.status(200).json({
                "status":"success",
                "message":"deleted an entry"
            })
        }
        else{
            response.status(404).json({
                "status":"failed",
                "message":"file not found"
            })
        }
    }
    catch(error){
        response.status(500).json({
            "status":"failed",
            "message":"internal error"
        })
    }})

    app.patch('/edit-expense/:id',async function(request,response){
        try{
            const edit=await Expense.findById(request.params.id)
            if(edit){
                await Expense.updateOne({
                    "amount":request.body.amount,
                    "category":request.body.category,
                    "date":request.body.date
                })
                console.log("Edited")
                response.status(200).json({
                    "status":"success"
                })
            }


            else{
                response.status(404).json({
                    "status":"failed"
                })
            }
        }
        catch(error){
            console.log("error")
        }
    })