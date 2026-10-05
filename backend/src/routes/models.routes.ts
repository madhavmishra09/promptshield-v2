import { Router } from "express";

import {
    modelsController
} from "../controllers/models.controller.js";

const router = Router();

router.get(
    "/",
    modelsController
);

export default router;