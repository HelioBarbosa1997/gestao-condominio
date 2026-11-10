import { Router } from 'express';
import { ocorrenciasController } from '../controller/ocorrencias.controller';


const ocorrenciaRoutes = {
    create: '/ocorrencias',
    getAll: '/ocorrencias',
    get: '/ocorrencias/:id',
    update: '/ocorrencias/:id',
    delete: '/ocorrencias/:id',
};

const router = Router();
router.post(ocorrenciaRoutes.create, ocorrenciasController.createOcorrencia);
router.get(ocorrenciaRoutes.getAll, ocorrenciasController.getAllOcorrencias);
router.get(ocorrenciaRoutes.get, ocorrenciasController.getOcorrencia);
router.put(ocorrenciaRoutes.update, ocorrenciasController.updateOcorrencia);
router.delete(ocorrenciaRoutes.delete, ocorrenciasController.deleteOcorrencia);

export { router };