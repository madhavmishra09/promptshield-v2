import { Router } from "express";

import {
    loginController,
    signUpController,
    forgotPasswordController,
    meController
} from "../controllers/auth.controller.js";

import {
    validateLogin,
    validateSignup
} from "../middleware/validation.middleware.js";

const router = Router();

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
    meController
);

export default router;