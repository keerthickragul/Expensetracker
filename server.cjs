/**
 * get() -> only sending request
 * post() -> sending both request and data
 * request body
 * queries
 * params
 * 
 */
/**
 * status code
 * 200 - ok
 * 201 - created
 * 401 - unauthorized
 * 404 - page not found
 * 500 - Internal server error
 */
const express = require('express')
const bodyParse = require('body-parser')
const app = express()
app.use(bodyParse.json())
// Handling the home page url -> localhost:8000
app.get('/',function(request,response){
    //response.send('(:Welcome to Express :)')
    const data = {
        "content" : "About homepage",
        "text":"This is HomePage"
    }
    response.json(data)
})


app.get('/java',function(request,response){
    //response.send('Java')
    response.json({
        "content" : "About java",
        "text":"This is Java Programming"
    })
})
app.get('/python',function(request,response){
    // response.send('Python')
    response.json({
        "content" : "About Python",
        "text":"This is Python Programming"
    })
})
app.get('/C',function(request,response){
    // response.send('C')
    response.json({
        "content" : "About C",
        "text":"This is C Programming"
    })
})
const name = "ragul"
const passwords = "418026"
app.post('/login',function(request,response){
    if(request.body.username ===name && request.body.password === passwords){
        response.json({
            "status":"success"
            
        })
        console.log("Logined Successful...")
    }
    else{
        response.json({
            "status":"Failed"
        })
        console.log("Login Failed")
    }
})

app.post('/user',function(request,response){
    response.json({
        "status":"User Created..."
    })
})
// const port = 8000
// app.listen(port,function(){
//     console.log(`Listening to the Port ${port}...`)
// })
app.listen(8000)