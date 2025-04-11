import express from "express";
import * as controllers from "./controllers";
import { createOfficialValidator } from "./validator";
import { authMiddleware } from "../auth/middleware";

const router = express.Router();

router.post(
    "/officials/register",
    authMiddleware,
    createOfficialValidator,
    controllers.registerOfficial
);

router.get(
    "/officials/:id",
    controllers.getOfficialById
);

router.put(
    "/officials/:id",
    authMiddleware,
    createOfficialValidator,
    controllers.updateOfficial
);

router.delete(
    "/officials/:id",
    authMiddleware,
    controllers.deleteOfficial
);

router.get(
    "/officials/all",
    controllers.getAllOfficials
);

router.get(
    "/officials/levels/:id",
    controllers.getOfficialByLevel
);

router.get(
    "/officials/state/:state",
    controllers.getOfficialsByState
);

router.get(
    "/officials/lga/:localGovernment",
    controllers.getOfficialsByLocalGovernment
);

router.get(
    "/officials/title/:title",
    controllers.getOfficialsByTitlePaginated
);

export default router;
