import{
    OfficialDocument,
    OfficialResponse,
    OfficialRequest,
    OfficialUpdateRequest,
}from "./interfaces"
import { NotFoundError, BadRequestError, ForbiddenError } from '../../utilities/errorClasses';
import OfficialModel from "./models";
import LevelModel from "../levels/models";
import { Types } from "mongoose";
import UserModel from "../user/model";





export async function createOfficial(
    officialData: OfficialRequest,
    userId: Types.ObjectId
): Promise<OfficialResponse> {

    // Validate user is admin
    const user = await UserModel.findById(userId);
    if (!user || user.role !== "admin") {
        throw new ForbiddenError("User is not authorized to create officials");
    }

    // Validate level ID
    const level = await LevelModel.findById(officialData.level);
    if (!level) {
        throw new NotFoundError("Level not found");
    }
    // Check if official already exists
    const existingOfficial = await OfficialModel.findOne({
        name: officialData.name,
        title: officialData.title,
        level: officialData.level,
    });
    if (existingOfficial) {
        throw new BadRequestError("Official with this name and title already exists");
    }

    try {
        const official = await OfficialModel.create({
            ...officialData,
            createdBy: userId,
        });
        return official.toObject() as OfficialResponse;
    } catch (error) {
        throw new Error(`Error creating official: ${error}`);
    }
}


export async function getOfficialById(
    officialId: string,
    userId: Types.ObjectId
): Promise<OfficialDocument | null> {
    const official = await OfficialModel.findById(officialId).populate("level").populate("createdBy").exec();
    if (!official) {
        throw new NotFoundError("Official not found");
    }
    return official;
}

export async function getAllOfficialsPaginated(
    page: number = 1,
    limit: number = 10
): Promise<{ data: OfficialDocument[]; total: number; page: number; pages: number }> {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
        OfficialModel.find()
            .populate("level")
            .populate("createdBy")
            .skip(skip)
            .limit(limit)
            .exec(),
        OfficialModel.countDocuments()
    ]);

    const pages = Math.ceil(total / limit);
    return { data, total, page, pages };
}


export async function updateOfficial(
    officialId: string,
    updateData: OfficialUpdateRequest,
    userId: Types.ObjectId
): Promise<OfficialDocument | null> {

    // Validate user is admin
    const user = await UserModel.findById(userId);
    if (!user || user.role !== "admin") {
        throw new ForbiddenError("User is not authorized to create officials");
    }

    // Validate level ID if provided
    if (updateData.level) {
        const level = await LevelModel.findById(updateData.level);
        if (!level) {
            throw new NotFoundError("Level not found");
        }
    }

    const official = await OfficialModel.findByIdAndUpdate(officialId, updateData, {
        new: true,
    }).populate("level").populate("createdBy").exec();

    if (!official) {
        throw new NotFoundError("Official not found");
    }
    return official;
}

export async function deleteOfficial(officialId: string, userId:Types.ObjectId): Promise<boolean> {

    // Validate user is admin
    const user = await UserModel.findById(userId);
    if (!user || user.role !== "admin") {
        throw new ForbiddenError("User is not authorized to create officials");
    }
    
    const result = await OfficialModel.findByIdAndDelete(officialId);
    if (!result) {
        throw new NotFoundError("Official not found");
    }
    return true;
}

export async function getOfficialsByLevelPaginated(
    levelId: string,
    page: number = 1,
    limit: number = 10
): Promise<{ data: OfficialDocument[]; total: number; page: number; pages: number }> {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
        OfficialModel.find({ level: levelId })
            .populate("level")
            .populate("createdBy")
            .skip(skip)
            .limit(limit),
        OfficialModel.countDocuments({ level: levelId })
    ]);

    return {
        data,
        total,
        page,
        pages: Math.ceil(total / limit),
    };
}

export async function getOfficialsByStatePaginated(
    state: string,
    page: number = 1,
    limit: number = 10
): Promise<{ data: OfficialDocument[]; total: number; page: number; pages: number }> {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
        OfficialModel.find({ "location.state": state })
            .populate("level")
            .populate("createdBy")
            .skip(skip)
            .limit(limit),
        OfficialModel.countDocuments({ "location.state": state })
    ]);

    return {
        data,
        total,
        page,
        pages: Math.ceil(total / limit),
    };
}

export async function getOfficialsByLocalGovernmentPaginated(
    localGovernment: string,
    page: number = 1,
    limit: number = 10
): Promise<{ data: OfficialDocument[]; total: number; page: number; pages: number }> {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
        OfficialModel.find({ "location.localGovernment": localGovernment })
            .populate("level")
            .populate("createdBy")
            .skip(skip)
            .limit(limit),
        OfficialModel.countDocuments({ "location.localGovernment": localGovernment })
    ]);

    return {
        data,
        total,
        page,
        pages: Math.ceil(total / limit),
    };
}

export async function getOfficialsByTitlePaginated(
    title: string,
    page: number = 1,
    limit: number = 10
): Promise<{ data: OfficialDocument[]; total: number; page: number; pages: number }> {
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
        OfficialModel.find({ title })
            .populate("level")
            .populate("createdBy")
            .skip(skip)
            .limit(limit),
        OfficialModel.countDocuments({ title })
    ]);

    return {
        data,
        total,
        page,
        pages: Math.ceil(total / limit),
    };
}
