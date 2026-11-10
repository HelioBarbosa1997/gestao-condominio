import { Router } from 'express';
import { condominioController } from '../controller/condominio.controller';

const condominioRoutes = {
    create: '/condominios',
    getAll: '/condominios',
    get: '/condominios/:id',
    update: '/condominios/:id',
    delete: '/condominios/:id',
}
const router = Router();
router.post(condominioRoutes.create, condominioController.createCondominio);
router.get(condominioRoutes.getAll, condominioController.getAllCondominios);
router.get(condominioRoutes.get, condominioController.getCondominio);
router.put(condominioRoutes.update, condominioController.updateCondominio);
router.delete(condominioRoutes.delete, condominioController.deleteCondominio);

export { router };