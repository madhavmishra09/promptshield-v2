import { Router } from "express";

import {
    logsController
} from "../controllers/logs.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.get(
    "/",
    authMiddleware,
    logsController
);

export default router;