import "reflect-metadata"
import {createConnection} from "typeorm"
import {Request, Response} from "express"
import {AppRoutes} from "./App"
import express = require("express")


const port = process.env.PORT || 3000

createConnection().then(async connection => {

  const app = express();
  app.set('views', __dirname + '/views')
  app.set('view engine', 'ejs') 

  app.use(require('body-parser')())

  AppRoutes.forEach(route => {
      app[route.method](route.path, (request: Request, response: Response, next: Function) => {
          route.action(request, response)
              .then(() => next)
              .catch(err => next(err));
      });
  });

  app.listen(3000);
  console.log("Express application is up and running on port 3000");

}).catch(error => console.log("TypeORM connection error: ", error));

