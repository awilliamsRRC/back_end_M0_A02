import express, { Router } from "express";
import * as branchController from "../controllers/branchController";

const routerBranch: Router = express.Router();

routerBranch.get("/branch", branchController.controllerGetAllBranches);
routerBranch.post("/branch", branchController.controllerCreateBranches);
routerBranch.put("/brnach/:id", branchController.controllerUpdateBranches);
routerBranch.delete("/branch/:id", branchController.controllerDeleteBranches);

export default routerBranch;
