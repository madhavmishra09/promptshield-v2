import type { Request, Response, NextFunction } from "express";

export const validateSignup = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
    } = req.body;

    if (
        !firstName ||
        !lastName ||
        !email ||
        !password ||
        !confirmPassword
    ) {
        res.status(400).json({
            error: "All fields are required.",
        });
        return;
    }

    if (!email.includes("@")) {
        res.status(400).json({
            error: "Please provide a valid email address.",
        });
        return;
    }

    if (password.length < 8) {
        res.status(400).json({
            error: "Password must be at least 8 characters long.",
        });
        return;
    }

    if (!/\d/.test(password)) {
        res.status(400).json({
            error: "Password must contain at least one number.",
        });
        return;
    }

    if (!/[^A-Za-z0-9 ]/.test(password)) {
        res.status(400).json({
            error: "Password must contain at least one special character.",
        });
        return;
    }

    if (password !== confirmPassword) {
        res.status(400).json({
            error: "Passwords do not match.",
        });
        return;
    }

    next();
};


export const validateLogin = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({
            error: "Email and password are required.",
        });
        return;
    }

    if (!email.includes("@")) {
        res.status(400).json({
            error: "Please provide a valid email address.",
        });
        return;
    }

    next();
};