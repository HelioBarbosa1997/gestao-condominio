import { Request, Response } from "express";
import { UnidadeModel } from "../models/unidade.model";
import { ResponseType, UnidadeType } from "../uuid/types";

export const unidadeController = {
    async createUnidade(req: Request, res: Response) {
        try {
            const unidade: UnidadeType = req.body;

            if (!unidade) {
                const response = {
                    status: "error",
                    message: "Dados da unidade não fornecidos.",
                    data: null
                };
                return res.status(400).json(response);

            };
            const createUnidadeResponse = await UnidadeModel.create(unidade)

            if (!createUnidadeResponse) {
                const response:ResponseType<null> = {
                    status: "error",
                    message: "Erro ao criar unidade",
                    data: null
                };
                return res.status(500).json(response);
            }
            const response: ResponseType<UnidadeType> = {
                status: "success",
                message: "Unidade criada com sucesso!",
                data: createUnidadeResponse as any,
            };
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "Erro interno do servidor",
                data: null,
            });
        }
    },
    async getAllUnidades(req: Request, res: Response) {
        try {
            const getAllUnidadesResponse = await UnidadeModel.getAll();
            if (getAllUnidadesResponse) {
                const response: ResponseType<UnidadeType[]> = {
                    status: "success",
                    message: "Unidades obtidas com sucesso!",
                    data: getAllUnidadesResponse as any,
                };
                return res.status(200).json(response);
            };
            const response: ResponseType<null> = {
                status: "error",
                message: "Nenhuma unidade encontrada.",
                data: null,
            };
            return res.status(404).json(response);
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "Erro interno do servidor",
                data: null,
            });
        }
    },
    async getUnidade(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "ID da unidade não fornecido.",
                    data: null,
                };
                return res.status(400).json(response);
            }
            const getUnidadeResponse = await UnidadeModel.get(id as string);
            if (getUnidadeResponse) {
                const response: ResponseType<UnidadeType> = {
                    status: "success",
                    message: "Unidade obtida com sucesso!",
                    data: getUnidadeResponse as any,
                };
                return res.status(200).json(response);
            }
            const response: ResponseType<null> = {
                status: "error",
                message: "Unidade não encontrada.",
                data: null,
            };
            return res.status(404).json(response);
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "Erro interno do servidor",
                data: null,
            });
        }
    },
    async updateUnidade(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updatedUnidade: UnidadeType = req.body;
            if (!id) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "ID da unidade não fornecido.",
                    data: null,
                };
                return res.status(400).json(response);
            }
            const updateUnidadeResponse = await UnidadeModel.update(id as string, updatedUnidade);
            if (updateUnidadeResponse) {
                const response: ResponseType<UnidadeType> = {
                    status: "success",
                    message: "Unidade atualizada com sucesso!",
                    data: updateUnidadeResponse as any,
                };
                return res.status(200).json(response);
            }
            const response: ResponseType<null> = {
                status: "error",
                message: "Unidade não encontrada.",
                data: null,
            };
            return res.status(404).json(response);
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "Erro interno do servidor",
                data: null,
            });
        }
    },

    async deleteUnidade(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "ID da unidade não fornecido.",
                    data: null,
                };
                return res.status(400).json(response);
            }
            const deleteUnidadeResponse = await UnidadeModel.delete(id as string);
            if (deleteUnidadeResponse) {
                const response: ResponseType<UnidadeType> = {
                    status: "success",
                    message: "Unidade deletada com sucesso!",
                    data: deleteUnidadeResponse as any,
                };
                return res.status(200).json(response);
            }
            const response: ResponseType<null> = {
                status: "error",
                message: "Unidade não encontrada.",
                data: null,
            };
            return res.status(404).json(response);
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "Erro interno do servidor",
                data: null,
            });
        }
    },
}