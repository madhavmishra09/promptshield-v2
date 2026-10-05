import express from "express";
import env from "./config/env.js";

import authRoutes from "./routes/auth.routes.js";
import chatRoutes from "./routes/chat.routes.js";
import logsRoutes from "./routes/logs.routes.js";
import policiesRoutes from "./routes/policies.routes.js";
import modelsRoutes from "./routes/models.routes.js";


import errorMiddleware from "./middleware/error.middleware.js";

const app = express();


// ================================
// Global Middleware
// ================================

app.use(express.json());




// ================================
// Health Check
// ================================

app.get(
    "/",
    (req, res) => {

        res.status(200).json({
            message: "PromptShield v2 backend is running."
        });

    }
);


// ================================
// Routes
// ================================

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/chat",
    chatRoutes
);

app.use(
    "/api/logs",
    logsRoutes
);

app.use(
    "/api/policies",
    policiesRoutes
);

app.use(
    "/api/models",
    modelsRoutes
);


// ================================
// Error Handler
// ================================

app.use(errorMiddleware);


// ================================
// Server
// ================================

app.listen(
    env.port,
    () => {

        console.log(
            `PromptShield backend running on port ${env.port}`
        );

    }
);