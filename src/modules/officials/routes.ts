import express from "express";
import {
    registerOfficial,
    getOfficialById,
    getAllOfficials,
    getOfficialsByState,
    getOfficialsByLocalGovernment,
    getOfficialByLevel,
    getOfficialsByTitlePaginated,
    updateOfficial,
    deleteOfficial,

} from "./controllers"
import { createOfficialValidator, updateOfficialValidator } from "./validator";
import { authMiddleware } from "../user/middleware";

const router = express.Router();

// POST route
router.post(
    "/register",
    authMiddleware,
    createOfficialValidator,
    registerOfficial
);

// Fixed static routes first (most specific to less specific)
router.get(
    "/all",
    getAllOfficials
);

router.get(
    "/levels/:id",
    getOfficialByLevel
);

router.get(
    "/state/:state",
    getOfficialsByState
);

router.get(
    "/lga/:localGovernment",
    getOfficialsByLocalGovernment
);

router.get(
    "/title/:title",
    getOfficialsByTitlePaginated
);

// Parameterized routes last
router.get(
    "/:id",
    getOfficialById
);

router.put(
    "/:id",
    authMiddleware,
    updateOfficialValidator,
    updateOfficial
);

router.delete(
    "/:id",
    authMiddleware,
    deleteOfficial
);

export default router;