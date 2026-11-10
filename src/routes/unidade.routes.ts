import { Router } from "express";
import { unidadeController } from "../controller/unidade.controller";

const unidadeRouter = {
    create: "/unidade",
    getAll: "/unidade",
    get: "/unidade/:id",
    update: "/unidade/:id",
    delete: "/unidade/:id",
};

const router = Router();

router.post(unidadeRouter.create, unidadeController.createUnidade);
router.get(unidadeRouter.getAll, unidadeController.getAllUnidades);
router.get(unidadeRouter.get, unidadeController.getUnidade);
router.put(unidadeRouter.update, unidadeController.updateUnidade);
router.delete(unidadeRouter.delete, unidadeController.deleteUnidade);

export { router };