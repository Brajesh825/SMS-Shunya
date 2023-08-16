import express from "express";

import { FeeStructureController } from "../controllers/feeStructureController.js";

const feeStructureController = new FeeStructureController();

const feeStructureRoutes = express.Router();


feeStructureRoutes.post(
  "/feeStructure",
  feeStructureController.addFeeStructure
);


feeStructureRoutes.get(
  "/feeStructure",
  feeStructureController.getAllFeeStructures
);

export { feeStructureRoutes };
