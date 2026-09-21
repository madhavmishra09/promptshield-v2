import type { Request, Response } from "express";

import authService from "../services/auth.service.js";

export const loginController = async (
    req: Request,
    res: Response
): Promise<void> => {
    const { email, password } = req.body;

    const result = await authService.Login(
        email,
        password
    );

    res.status(200).json(result);
};

export const signUpController = async (
    req: Request,
    res: Response
): Promise<void> => {
    const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
    } = req.body;

    const result = await authService.SignUp(
        firstName,
        lastName,
        email,
        password,
        confirmPassword
    );

    res.status(201).json(result);
};

export const forgotPasswordController = async (
    req: Request,
    res: Response
): Promise<void> => {
    const {
        email,
        otp,
        password,
        confirmPassword,
    } = req.body;

    const result = await authService.forgotPassword(
        email,
        otp,
        password,
        confirmPassword
    );

    res.status(200).json(result);
};

export const meController = (
    req: Request,
    res: Response
): void => {
    res.status(200).json({
        message: "Authentication successful.",
        user: req.user,
    });
};