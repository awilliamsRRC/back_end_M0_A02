// import the express application and type definition
import express, { Express } from "express";
import morgan from "morgan";

// Initialize the express application
const app: Express = express();

// Define a route
app.get("/",(req,res) => {
    res.send("Hello,World")


});

export default app;



