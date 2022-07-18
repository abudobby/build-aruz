import express from "express";
import morgan from 'morgan'


const server = express();
server.use(express.json()); 
server.use(express.urlencoded()); //Parse URL-encoded bodies
server.use(morgan('combined'))


import setRoutes from "../src/routes/routes.js";
setRoutes(server);
export default server;