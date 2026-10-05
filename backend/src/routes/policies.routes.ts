import { Router } from "express";

import {
    policyController
} from "../controllers/policies.controller.js";

const router = Router();

router.post(
    "/evaluate",
    policyController
);

export default router;