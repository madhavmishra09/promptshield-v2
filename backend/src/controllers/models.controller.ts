import type {
    Request,
    Response
} from "express";

export const modelsController = (
    req: Request,
    res: Response
): void => {

    res.status(200).json({
        message: "Model service is configured.",
        status: "placeholder",
        model: {
            name: "TF-IDF + Logistic Regression",
            provider: "Python ML Service",
            status: "not_loaded"
        }
    });
};