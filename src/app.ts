// import the express application and type definition
import express, { Express } from "express";
import morgan from "morgan";

import employeeRoutes from "./api/v1/routes/employeeRoutes";

// Initialize the express application
const app: Express = express();

app.use(morgan("combined"));
app.use(express.json());

app.get("/",(req,res) => {
    res.send("Hello,World")


});

app.get("/tasks", (req,res) => {
    res.send("Retrieve tsaks");
});

app.get("/api/v1/health", (req, res) => {
	res.json({
		status: "OK",
		uptime: process.uptime(),
		timestamp: new Date().toISOString(),
		version: "1.0.0",
	});
});

// For any request that starts with /api/v1/employees, route it to the employeeRoutes module.
app.use("/api/v1/items", employeeRoutes);
export default app;



