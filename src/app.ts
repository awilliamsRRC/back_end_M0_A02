// import the express application and type definition
import express, { Express,Request,Response } from "express";
import morgan from "morgan";
import employeeRoutes from "./api/v1/routes/employeeRoutes";
import branchRoutes from "./api/v1/routes/branchRoutes";
import setupSwagger from "../config/swagger";


//import employeeRoutes from "./api/v1/routes/employeeRoutes";

// Initialize the express application
const app: Express = express();
setupSwagger(app);

app.use(morgan("combined"));
app.use(express.json());

app.get("/",(req:Request,res:Response) => {
    res.send("Hello, World!");

});



app.get("/api/v1/health", (req:Request,res:Response) => {
    res.json({
        status: "OK",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        version: "1.0.0",
    
    });
});

// For any request that starts with /api/v1/employees, route it to the employeeRoutes module.
app.use("/api/v1/employees", employeeRoutes);
app.use("/api/v1/branch", branchRoutes);
export default app;



