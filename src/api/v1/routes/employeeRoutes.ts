import express, { Router } from "express";
import * as employeesController from "../controllers/employeesController";

const routerEmployee: Router = express.Router();

routerEmployee.get("/employees", employeesController.controllerGetAllEmployees);
routerEmployee.post("/employees", employeesController.controllerCreateEmployees);
routerEmployee.put("/employees/:id", employeesController.controllerUpdateEmployees);
routerEmployee.delete("/emplpoyees/:id", employeesController.controllerDeleteEmployees);

export default routerEmployee;
