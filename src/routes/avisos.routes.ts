import { Router } from "express";
import { avisosController } from "../controller/avisos.controller";

const avisosRouter = {
    create: "/avisos",
    getAll: "/avisos",
    get: "/avisos/:id",
    update: "/avisos/:id",
    delete: "/avisos/:id",
}

const router = Router();

router.post(avisosRouter.create, avisosController.createAviso);
router.get(avisosRouter.getAll, avisosController.getAllAvisos);
router.get(avisosRouter.get, avisosController.getAviso);
router.put(avisosRouter.update, avisosController.updateAviso);
router.delete(avisosRouter.delete, avisosController.deleteAviso);