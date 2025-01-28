import express, { Router } from "express";
import {
    getAllEmployees,
    createEmployees,
    updateEmployees,
    deleteEmployees,
}
from "../controllers/employeesController";
const routerEmployee: Router = express.Router();

routerEmployee.get("/employees",getAllEmployees);
routerEmployee.post("/employees",createEmployees);
routerEmployee.put("/employees/:id",updateEmployees);
routerEmployee.delete("/emplpoyees/:id",deleteEmployees)

export default routerEmployee;
