import { Request, Response } from 'express';
import { AvisosModel } from '../models/avisos.model';
import { AvisoType, ResponseType } from '../uuid/types';

export const avisosController = {
    async createAviso(req: Request, res: Response) {
        try {
            const aviso: AvisoType = req.body;  
            if (!aviso) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Dados do aviso não fornecidos.",
                    data: null
                };
                return res.status(400).json(response);
            }
            const createdAviso = await AvisosModel.create(aviso);
            if (!createdAviso) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Erro ao criar aviso.",
                    data: null
                };
                return res.status(500).json(response);
            }
            const response: ResponseType<AvisoType> = {
                status: "success",
                message: "Aviso criado com sucesso!",
                data: createdAviso
            };
            return res.status(201).json(response);
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "Erro interno do servidor",
                data: null
            });
        }
    },
    async getAllAvisos(req: Request, res: Response) {
        try {
            const allAvisos = await AvisosModel.getAll();
            if (allAvisos) {
                const response: ResponseType<AvisoType[]> = {
                    status: "success",
                    message: "Avisos obtidos com sucesso!",
                    data: allAvisos
                };
                return res.status(200).json(response);
            }
            const response: ResponseType<null> = {
                status: "error",
                message: "Nenhum aviso encontrado.",
                data: null
            };
            return res.status(404).json(response);
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "Erro interno do servidor",
                data: null
            });
        }
    },
    async getAviso(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "ID do aviso não fornecido.",
                    data: null
                };
                return res.status(400).json(response);
            }
            const aviso = await AvisosModel.get(id as string );
            if (aviso) {
                const response: ResponseType<AvisoType> = {
                    status: "success",
                    message: "Aviso obtido com sucesso!",
                    data: aviso
                };
                return res.status(200).json(response);
            }
            const response: ResponseType<null> = {
                status: "error",
                message: "Aviso não encontrado.",
                data: null
            };
            return res.status(404).json(response);
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "Erro interno do servidor",
                data: null
            });
        }

    },
    async updateAviso(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "ID do aviso não fornecido.",
                    data: null
                };
                return res.status(400).json(response);
            }
            const updatedAvisoData: AvisoType = req.body;
            if (!updatedAvisoData) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Dados do aviso não fornecidos.",
                    data: null
                };
                return res.status(400).json(response);
            }
            const updatedAviso = await AvisosModel.update(id as string, updatedAvisoData);
            if (updatedAviso) {
                const response: ResponseType<AvisoType> = {
                    status: "success",
                    message: "Aviso atualizado com sucesso!",
                    data: updatedAviso  
                };
                return res.status(200).json(response);
            }
            const response: ResponseType<null> = {
                status: "error",
                message: "Aviso não encontrado.",
                data: null
            };
            return res.status(404).json(response);
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "Erro interno do servidor",
                data: null
            });
        }
    },
    async deleteAviso(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "ID do aviso não fornecido.",
                    data: null
                };
                return res.status(400).json(response);
            }
            const deletedAviso = await AvisosModel.delete(id as string);
            if (deletedAviso) {
                const response: ResponseType<AvisoType> = {
                    status: "success",
                    message: "Aviso excluído com sucesso!",
                    data: deletedAviso
                };
                return res.status(200).json(response);
            }
            const response: ResponseType<null> = {
                status: "error",
                message: "Aviso não encontrado.",
                data: null
            };
            return res.status(404).json(response);
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "Erro interno do servidor",
                data: null
            });
        }
    }
};
