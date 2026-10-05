import { Router } from "express";

import { chatController } from "../controllers/chat.controller.js";
import { validateChat } from "../middleware/validation.middleware.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

router.post(
    "/",
    authMiddleware,
    validateChat,
    chatController
);

export default router;