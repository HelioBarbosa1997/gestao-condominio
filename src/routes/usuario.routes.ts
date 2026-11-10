import { Router } from "express";
import { usuarioController } from "../controller/usuario.controller";

const usuarioRouter = {
    create: "/usuario",
    getAll: "/usuario", 
    get: "/usuario/:id",
    update: "/usuario/:id", 
    delete: "/usuario/:id", 
};
const router = Router();

router.post(usuarioRouter.create, usuarioController.createUsuario);
router.get(usuarioRouter.getAll, usuarioController.getAllUsuarios);
router.get(usuarioRouter.get, usuarioController.getUsuarioById);
router.put(usuarioRouter.update, usuarioController.updatedUsuario);
router.delete(usuarioRouter.delete, usuarioController.deleteUsuario);

export { router };
