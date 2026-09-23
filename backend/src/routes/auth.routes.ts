import express from "express";
import type { Router } from "express";

import {
    loginController,
    signUpController,
    forgotPasswordController,
    meController,
} from "../controllers/auth.controller.js";

import authMiddleware from "../middleware/auth.middleware.js";

import {
    validateSignup,
    validateLogin,
} from "../middleware/validation.middleware.js";

const router: Router = express.Router();

router.post(
    "/login",
    validateLogin,
    loginController
);

router.post(
    "/signup",
    validateSignup,
    signUpController
);

router.post(
    "/forgot-password",
    forgotPasswordController
);

router.get(
    "/me",
    authMiddleware,
    meController
);

export default router;  