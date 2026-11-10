import { Router } from 'express';
import { despesasController } from '../controller/despesas.controller';


const despesasRoutes = {
    create: '/despesas',
    getAll: '/despesas',
    get: '/despesas/:id',
    update: '/despesas/:id',
    delete: '/despesas/:id',
};
const router = Router();
router.post(despesasRoutes.create, despesasController.createDespesa);
router.get(despesasRoutes.getAll, despesasController.getAllDespesas);
router.get(despesasRoutes.get, despesasController.getDespesa);
router.put(despesasRoutes.update, despesasController.updateDespesa);
router.delete(despesasRoutes.delete, despesasController.deleteDespesa);

export { router };
