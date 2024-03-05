/**
 * Express framework is used to create a server which consist of minimum lines of code when compared to nodejs
 * Express is an Framework of the Nodejs
 *  
 */

const http = require('http')

console.log('Hai!')
http.createServer(function(request,response){
    response.writeHead(200,{'Content-Type' : 'text/html'})
    //response.writeHead(200,{'Content-Type' : 'text/plain'})
    response.write('Hello')
    response.end()
}).listen(5000)