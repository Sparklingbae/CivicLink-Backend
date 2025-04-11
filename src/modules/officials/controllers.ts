import { Request, Response } from "express"
import * as services from "./services";
import mongoose from "mongoose";



export const registerOfficial = async (req: Request, res: Response): Promise<void> => {
    try {
        const officialData = req.body;
        if (!req.user || !req.user._id) {
            res.status(400).json({ message: "User information is missing in the request" });
            return;
        }
        const userId = new mongoose.Types.ObjectId(req.user._id);
        const official = await services.createOfficial(officialData, userId);
        res.status(201).json({
            message: "Official created successfully",
            official,
        });
    } catch (error) {
        res.status(400).json({
            message: "Error creating official",
            error: (error as Error).message,
        });
    }
}

export const getOfficialById = async (req: Request, res: Response): Promise<void> => {
    try {
        const officialId = req.params.id;

        const official = await services.getOfficialById(officialId);
        res.status(200).json({
            message: "Official retrieved successfully",
            official,
        });
    } catch (error) {
        res.status(400).json({
            message: "Error retrieving official",
            error: (error as Error).message,
        });
    }
}

export const getAllOfficials = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const result = await services.getAllOfficialsPaginated(page, limit);

        res.status(200).json({
            message: "Officials retrieved successfully",
            metadata: {
                total: result.total,
                page: result.page,
                pages: result.pages,
                limit,
            },
            officials: result.data,
        });
    } catch (error) {
        res.status(400).json({
            message: "Error retrieving officials",
            error: (error as Error).message,
        });
    }
}

export const updateOfficial = async (req: Request, res: Response): Promise<void> => {
    try {
        const officialId = req.params.id;
        const officialData = req.body;
        if (!req.user || !req.user._id) {
            res.status(400).json({ message: "User information is missing in the request" });
            return;
        }
        const userId = new mongoose.Types.ObjectId(req.user._id);
        const updatedOfficial = await services.updateOfficial(officialId, officialData, userId);
        res.status(200).json({
            message: "Official updated successfully",
            official: updatedOfficial,
        });
    } catch (error) {
        res.status(400).json({
            message: "Error updating official",
            error: (error as Error).message,
        });
    }
}

export const deleteOfficial = async (req: Request, res: Response): Promise<void> => {
    try {
        const officialId = req.params.id;
        if (!req.user || !req.user._id) {
            res.status(400).json({ message: "User information is missing in the request" });
            return;
        }
        const userId = new mongoose.Types.ObjectId(req.user._id);
        await services.deleteOfficial(officialId, userId);
        res.status(200).json({
            message: "Official deleted successfully",
        });
    } catch (error) {
        res.status(400).json({
            message: "Error deleting official",
            error: (error as Error).message,
        });
    }
}
export const getOfficialByLevel = async (req: Request, res: Response): Promise<void> => {
    try {
        const levelId = req.params.id;
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const result = await services.getOfficialsByLevelPaginated(levelId, page, limit);

        res.status(200).json({
            message: "Officials by level retrieved successfully",
            metadata: {
                total: result.total,
                page: result.page,
                pages: result.pages,
                limit,
            },
            officials: result.data,
        });
    } catch (error) {
        res.status(400).json({
            message: "Error retrieving officials by level",
            error: (error as Error).message,
        });
    }
};

export const getOfficialsByState = async (req: Request, res: Response): Promise<void> => {
    try {
        const state = req.params.state;
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const result = await services.getOfficialsByStatePaginated(state, page, limit);

        res.status(200).json({
            message: "Officials by state retrieved successfully",
            metadata: {
                total: result.total,
                page: result.page,
                pages: result.pages,
                limit,
            },
            officials: result.data,
        });
    } catch (error) {
        res.status(400).json({
            message: "Error retrieving officials by state",
            error: (error as Error).message,
        });
    }
};
export const getOfficialsByLocalGovernment = async (req: Request, res: Response): Promise<void> => {
    try {
        const localGovernment = req.params.localGovernment;
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const result = await services.getOfficialsByLocalGovernmentPaginated(localGovernment, page, limit);

        res.status(200).json({
            message: "Officials by local government retrieved successfully",
            metadata: {
                total: result.total,
                page: result.page,
                pages: result.pages,
                limit,
            },
            officials: result.data,
        });
    } catch (error) {
        res.status(400).json({
            message: "Error retrieving officials by local government",
            error: (error as Error).message,
        });
    }
};

export const getOfficialsByTitlePaginated = async (req: Request, res: Response): Promise<void> => {
    try {
        const title = req.params.title;
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const result = await services.getOfficialsByTitlePaginated(title, page, limit);

        res.status(200).json({
            message: "Officials by title retrieved successfully",
            metadata: {
                total: result.total,
                page: result.page,
                pages: result.pages,
                limit,
            },
            officials: result.data,
        });
    } catch (error) {
        res.status(400).json({
            message: "Error retrieving officials by title",
            error: (error as Error).message,
        });
    }
}