import { Router } from "express";

import { battle,ranking } from "../controllers/fightersControllers.js";
import validateSchema from "../middlewares/schemaValidator.js";
import userSchema from "../schemas/userSchema.js";

const fightersRouter = Router();

fightersRouter.post("/battle",validateSchema(userSchema), battle);
fightersRouter.get("/ranking", ranking);

export default fightersRouter;