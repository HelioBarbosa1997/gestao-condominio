import { Request, Response } from "express";
import { CobrancasModel } from "../models/cobrancas.model";
import { CobrancasType, ResponseType } from "../uuid/types";

export const cobrancasController = {
    async createCobranca(req: Request, res: Response) {
        try {
            const cobranca: CobrancasType = req.body;
            const createdCobranca = await CobrancasModel.create(cobranca);
            if (createdCobranca) {
                const response: ResponseType<CobrancasType> = {
                    status: "success",
                    message: "Cobrança criada com sucesso!",
                    data: createdCobranca
                };
                return res.status(201).json(response);
            }
            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao criar cobrança.",
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
    async getAllCobrancas(req: Request, res: Response) {
        try {
            const getAllCobrancasResponse = await CobrancasModel.getAll();
            if (getAllCobrancasResponse) {
                const response: ResponseType<CobrancasType[]> = {
                    status: "success",
                    message: "Cobranças obtidas com sucesso!",
                    data: getAllCobrancasResponse,
                };
                return res.status(200).json(response);
            }
            const response: ResponseType<null> = {
                status: "error",
                message: "Nenhuma cobrança encontrada.",
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
    async getCobranca(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const getCobrancaResponse = await CobrancasModel.get(id as string);
            if (getCobrancaResponse) {
                const response: ResponseType<CobrancasType> = {
                    status: "success",
                    message: "Cobrança obtida com sucesso!",
                    data: getCobrancaResponse,
                };
                return res.status(200).json(response);
            }
            const response: ResponseType<null> = {
                status: "error",
                message: "Cobrança não encontrada.",
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
    async updateCobranca(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updatedCobranca: CobrancasType = req.body;
            const updatedCobrancaResponse = await CobrancasModel.update(id as string, updatedCobranca);
            if (updatedCobrancaResponse) {
                const response: ResponseType<CobrancasType> = {
                    status: "success",
                    message: "Cobrança atualizada com sucesso!",
                    data: updatedCobranca
                };
                return res.status(200).json(response);
            }
            const response: ResponseType<null> = {
                status: "error",
                message: "Cobrança não encontrada.",
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
    async deleteCobranca(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deleteCobrancaResponse = await CobrancasModel.delete(id as string);
            if (deleteCobrancaResponse) {
                const response: ResponseType<CobrancasType> = {
                    status: "success",
                    message: "Cobrança deletada com sucesso!",
                    data: deleteCobrancaResponse
                };
                return res.status(200).json(response);
            }
            const response: ResponseType<null> = {
                status: "error",
                message: "Cobrança não encontrada.",
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
