"use strict";

// require the express module
const express = require("express");

// require the router object (and all the defined routes)
// to be used in this file
const routes = require("./routes")

// require the cors module
const cors = require("cors");

// creates an instance of an express server
const app = express();

// enable Cross Origin Resource Sharing
// so this API can be used from web-apps on other domains
app.use(cors());

// allow Post and Put requests to use JSON bodies
app.use(express.json());

// use the router object (and all the defined routes)
app.use("/", routes)

// define a port
const port = 3000

// run the server
app.listen(port, ()=>{
    console.log(`Listening on port: ${port}`)
});