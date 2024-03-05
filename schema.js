const mongoose = require('mongoose')
const expenseTracker = new mongoose.Schema({
    amount:{
        type:Number
    },
    category:{
        type:String
    },
    date:{
        type:String
    }
})
const Expense = mongoose.model('expensedetails',expenseTracker)
module.exports = {Expense}