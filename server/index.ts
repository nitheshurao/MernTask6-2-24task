import express, { Request } from 'express';
import multer from 'multer';
import { ParseLogs } from './parseLogs';
import mongoose from "mongoose";
import winston from 'winston';
import expressWinston from 'express-winston'
import postRoutes from './router/post.js';
import { Wisdom } from 'aws-sdk';
import logger1 from './loger';
import { v4 as uuidv4 } from 'uuid';

const userId = uuidv4()

const app = express();
import cors from 'cors';
const port = 5000;


app.use(express.urlencoded({ limit: '30mb', extended: true }))
app.use(express.json());
app.use(cors()); 
app.use(expressWinston.logger(logger1))
// app.use(expressWinston.logger({
//   level: 'info',
//   format:winston.format.combine( winston.format.json(), winston.format.prettyPrint()),
//   // transports: [
//   //   new winston.transports.File({
//   //     filename: 'combined.log',
//   //   }),
//   //   new winston.transports.File({
//   //     // id:  addRequestId(),
//   //     filename: 'app-error.log',
//   //     level: 'error',
//   //     format: winston.format.combine( winston.format.timestamp(), winston.format.json()),
//   //   }),
//   //   new winston.transports.File({
//   //     filename: 'app-info.log',
//   //     level: 'info',
//   //     format: winston.format.combine( winston.format.timestamp(), winston.format.json()),
//   //   }),
    
//   // ],
//   transports: [new winston.transports.Console()],
  
// }))
const storage = multer.memoryStorage();
app.use('/', postRoutes);

app.get("/", (req: any, res: any) => {
  res.send("Express + TypeScript Server");
});

const CONNECTION_URL = 'mongodb://127.0.0.1:27017/'
mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(port, () =>{ console.log(`Server Running on Port: http://localhost:${port}`)
logger1.info(
{ 'details':'Server is successfully '
}
)
}))
  .catch((error:any) => logger1.error(`${error} did not connect`));