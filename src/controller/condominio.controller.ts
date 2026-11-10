import { Request, Response } from "express";
import { CondominiosModel } from "../models/condominios.model";
import { CondominioType, CreateCondominio, ResponseType } from "../uuid/types";

export const condominioController = {
    async createCondominio(req: Request, res: Response) {
        try {
            const condominio: CondominioType = req.body;
            if (!condominio) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Dados do condomínio não fornecidos.",
                    data: null
                };
                return res.status(400).json(response);
            }
            const createCondominioResponse = await CondominiosModel.create(condominio);
            if (!createCondominioResponse) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Erro ao criar condomínio.",
                    data: null
                };
                return res.status(500).json(response);
            }
            const response: ResponseType<CondominioType> = {
                status: "success",
                message: "Condomínio criado com sucesso!",
                data: createCondominioResponse
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
    async getAllCondominios(req: Request, res: Response) {
        try {
            const getAllCondominiosResponse = await CondominiosModel.getAll();
            if (getAllCondominiosResponse) {
                const response: ResponseType<CondominioType[]> = {
                    status: "success",
                    message: "Condomínios obtidos com sucesso!",
                    data: getAllCondominiosResponse
                };
                return res.status(200).json(response);
            }
            const response: ResponseType<null> = {
                status: "error",
                message: "Nenhum condomínio encontrado.",
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
    async getCondominio(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "ID do condomínio não fornecido.",
                    data: null
                };
                return res.status(400).json(response);
            }
            const getCondominioResponse = await CondominiosModel.get(id as string);
            if (getCondominioResponse) {
                const response: ResponseType<CondominioType> = {
                    status: "success",
                    message: "Condomínio obtido com sucesso!",
                    data: getCondominioResponse
                };
                return res.status(200).json(response);
            }
            const response: ResponseType<null> = {
                status: "error",
                message: "Condomínio não encontrado.",
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
    async updateCondominio(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updatedCondominio: CreateCondominio = req.body;
            const updateCondominioResponse = await CondominiosModel.update(id as string, updatedCondominio);
            if (updateCondominioResponse) {
                const response: ResponseType<CondominioType> = {
                    status: "success",
                    message: "Condomínio atualizado com sucesso!",
                    data: updateCondominioResponse
                };
                return res.status(200).json(response);
            }
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao atualizar condomínio.",
                data: null
            };
            return res.status(500).json(response);
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "Erro interno do servidor",
                data: null
            });
        }
    },
    async deleteCondominio(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deleteCondominioResponse = await CondominiosModel.delete(id as string);
            if (deleteCondominioResponse) {
                const response: ResponseType<CondominioType> = {
                    status: "success",
                    message: "Condomínio deletado com sucesso!",
                    data: deleteCondominioResponse
                };
                return res.status(200).json(response);
            }
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao deletar condomínio.",
                data: null
            };
            return res.status(500).json(response);
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "Erro interno do servidor",
                data: null
            });
        }
    }
};


