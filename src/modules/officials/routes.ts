import express from "express";
import * as controllers from "./controllers";
import { createOfficialValidator } from "./validator";
import { authMiddleware } from "../user/middleware";

const router = express.Router();

// POST route
router.post(
    "/register",
    authMiddleware,
    createOfficialValidator,
    controllers.registerOfficial
);

// Fixed static routes first (most specific to less specific)
router.get(
    "/all",
    controllers.getAllOfficials
);

router.get(
    "/levels/:id",
    controllers.getOfficialByLevel
);

router.get(
    "/state/:state",
    controllers.getOfficialsByState
);

router.get(
    "/lga/:localGovernment",
    controllers.getOfficialsByLocalGovernment
);

router.get(
    "/title/:title",
    controllers.getOfficialsByTitlePaginated
);

// Parameterized routes last
router.get(
    "/:id",
    controllers.getOfficialById
);

router.put(
    "/:id",
    authMiddleware,
    createOfficialValidator,
    controllers.updateOfficial
);

router.delete(
    "/:id",
    authMiddleware,
    controllers.deleteOfficial
);

export default router;