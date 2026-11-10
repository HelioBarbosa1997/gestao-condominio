import { Router } from "express";
import { cobrancasController } from "../controller/cobrancas.controller";

const cobrancasRoutes = {
    create: '/cobrancas',
    getAll: '/cobrancas',
    get: '/cobrancas/:id',
    update: '/cobrancas/:id',
    delete: '/cobrancas/:id',
}
const router = Router();
router.post(cobrancasRoutes.create, cobrancasController.createCobranca);
router.get(cobrancasRoutes.getAll, cobrancasController.getAllCobrancas);
router.get(cobrancasRoutes.get, cobrancasController.getCobranca);
router.put(cobrancasRoutes.update, cobrancasController.updateCobranca);
router.delete(cobrancasRoutes.delete, cobrancasController.deleteCobranca);

export { router };