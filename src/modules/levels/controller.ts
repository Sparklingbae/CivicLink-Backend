import { Request, Response } from "express";
import LevelModel from "./models";
import { NotFoundError, BadRequestError, ForbiddenError } from '../../utilities/errorClasses';
import { ILevelDocument,ILevelResponse,ILevelRequest } from "./interfaces";


export const createLevel = async (req: Request, res: Response): Promise<void> => {
    try {
        const levelData = req.body as ILevelRequest;

        //validate the user is admin
        if (!req.user || req.user.role !== "admin") {
            throw new ForbiddenError("You are not authorized to create a level");
        }

        // Check if level already exists
        const existing = await LevelModel.findOne({ level: levelData.level });
        if (existing) {
            throw new BadRequestError("Level already exists");
        }
        // Create new level
        const newLevel = await LevelModel.create({
            level: levelData.level,
        });
        res.status(201).json({
            message: "Level created successfully",
            level: newLevel,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating level",
            error: (error as Error).message,
        });
    }
}

export const getLevel = async (req: Request, res: Response): Promise<void> => { 
    try {
        const { id } = req.params;
        const level = await LevelModel.findById(id);
        if (!level) {
            throw new NotFoundError("Level not found");
        }
        res.status(200).json({
            message: "Level retrieved successfully",
            level: level,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving level",
            error: (error as Error).message,
        });
    }
}

export const getLevels = async (req: Request, res: Response): Promise<void> => {
    try {
        const levels = await LevelModel.find();
        res.status(200).json({
            message: "Levels retrieved successfully",
            levels: levels,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving levels",
            error: (error as Error).message,
        });
    }
}

export const updateLevel = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const levelData = req.body as ILevelRequest;

        //validate the user is admin
        if (!req.user || req.user.role !== "admin") {
            throw new ForbiddenError("You are not authorized to update a level");
        }

        // Check if level already exists
        const existing = await LevelModel.findOne({level: levelData.level });
        if (existing) {
            throw new BadRequestError("Level already exists");
        }

        const updatedLevel = await LevelModel.findByIdAndUpdate(id, { levelData}, { new: true });
        if (!updatedLevel) {
            throw new NotFoundError("Level not found");
        }
        res.status(200).json({
            message: "Level updated successfully",
            level: updatedLevel,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating level",
            error: (error as Error).message,
        });
    }
}
export const deleteLevel = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        //validate the user is admin
        if (!req.user || req.user.role !== "admin") {
            throw new ForbiddenError("You are not authorized to delete a level");
        }

        const level = await LevelModel.findByIdAndDelete(id);
        if (!level) {
            throw new NotFoundError("Level not found");
        }
        res.status(200).json({
            message: "Level deleted successfully",
            level: level,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error deleting level",
            error: (error as Error).message,
        });
    }
}