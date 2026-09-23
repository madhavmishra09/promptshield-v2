import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import prisma from "../db/prisma.js";
import env from "../config/env.js";

const Login = async (
    email: string,
    password: string
) => {
    if (!email || !password) {
        throw new Error("Email and password are required.");
    }

    const user = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        throw new Error("Invalid email or password.");
    }

    const passwordMatch = await bcrypt.compare(
        password,
        user.passwordHash
    );

    if (!passwordMatch) {
        throw new Error("Invalid email or password.");
    }

    const token = jwt.sign(
        {
            userId: user.id,
            email: user.email,
        },
        env.jwtSecret,
        {
            expiresIn: "1h",
        }
    );

    return {
        message: "Login successful!",
        token,
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        },
    };
};


const SignUp = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
) => {
    if (
        !firstName ||
        !lastName ||
        !email ||
        !password ||
        !confirmPassword
    ) {
        throw new Error("All fields are required.");
    }

    if (password !== confirmPassword) {
        throw new Error("Passwords do not match.");
    }

    if (password.length < 8) {
        throw new Error("Password must be at least 8 characters long.");
    }

    const hasNumber = /\d/.test(password);
    const hasSpecialCharacter = /[^A-Za-z0-9 ]/.test(password);

    if (!hasNumber || !hasSpecialCharacter) {
        throw new Error(
            "Password must contain at least one number and one special character."
        );
    }

    const existingUser = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (existingUser) {
        throw new Error("User already exists.");
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
        data: {
            firstName,
            lastName,
            email,
            passwordHash,
        },
    });

    return {
        message: "New user created successfully!",
        user: {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        },
    };
};


const forgotPassword = async (
    email: string,
    otp: string,
    password: string,
    confirmPassword: string
) => {
    throw new Error(
        "Forgot password functionality is not implemented yet."
    );
};


const authService = {
    Login,
    SignUp,
    forgotPassword,
};

export default authService;