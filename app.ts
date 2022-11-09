export  {};
const express = require('express')
const http = require('http')
const ENV = require('./config')
const logger = require('morgan')
const cors = require('cors')
const app = express()


// TYPE IMPORTS
const  { Request, Response, NextFunction} = require('express')

const port  = ENV.PORT




// DISABLE   
app.disable('x-powered-by')



// CORS CHECKING
const allowedOrigins: any = ["localhost:3000"];
app.use(
  cors({
    origin(origin: any, callback: any) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);






// MIDDLEWARES
app.use(logger('dev'))
app.use(express.json())
app.use(function (req: typeof Request, res: typeof Response, next: typeof NextFunction) {
    res.header("Access-Control-Allow-Credentials", true);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
  });




const server = http.createServer(app)
server.listen(port, (err: any) => {
    if(err){
        console.log(`Error occured in bootstrapping app.ts : ${err}`)
        process.exit(0)
    }else {
        console.log(`Project running on port ${port}...`)
    }
})