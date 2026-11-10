import { Request, Response } from "express";
import { DespesasType, ResponseType } from "../uuid/types";
import { DespesasModel } from "../models/despesas.model";


export const despesasController = {
    async createDespesa(req: Request, res: Response) {
        try {
            const despesa: DespesasType = req.body;
            if (!despesa) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Dados da despesa não fornecidos.",
                    data: null
                };
                return res.status(400).json(response);
            }
            const createDespesaResponse = await DespesasModel.create(despesa);
            if (createDespesaResponse) {
                const response: ResponseType<DespesasType> = {
                    status: "success",
                    message: "Despesa criada com sucesso!",
                    data: createDespesaResponse
                };
                return res.status(201).json(response);
            }
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "Erro interno do servidor",
                data: null
            });
        }
    },
    async getAllDespesas(req: Request, res: Response) {
        try {
            const getAllDespesasResponse = await DespesasModel.getAll();
            if (getAllDespesasResponse) {
                const response: ResponseType<DespesasType[]> = {
                    status: "success",
                    message: "Despesas obtidas com sucesso!",
                    data: getAllDespesasResponse
                };
                return res.status(200).json(response);
            };
            const response: ResponseType<null> = {
                status: "error",
                message: "Nenhuma despesa encontrada.",
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
    async getDespesa(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "ID da despesa não fornecido.",
                    data: null
                };
                return res.status(400).json(response);
            }
            const getDespesaResponse = await DespesasModel.get(id as string);
            if (getDespesaResponse) {
                const response: ResponseType<DespesasType> = {
                    status: "success",
                    message: "Despesa obtida com sucesso!",
                    data: getDespesaResponse
                };
                return res.status(200).json(response);
            }
            const response: ResponseType<null> = {
                status: "error",
                message: "Despesa não encontrada.",
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
    async updateDespesa(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "ID da despesa não fornecido.",
                    data: null
                };
                return res.status(400).json(response);
            }
            const updatedDespesa: DespesasType = req.body;
            const updateDespesaResponse = await DespesasModel.update(id as string, updatedDespesa);
            if (updateDespesaResponse) {
                const response: ResponseType<DespesasType> = {
                    status: "success",
                    message: "Despesa atualizada com sucesso!",
                    data: updateDespesaResponse
                };
                return res.status(200).json(response);
            }
            const response: ResponseType<null> = {
                status: "error",
                message: "Despesa não encontrada.",
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
    async deleteDespesa(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "ID da despesa não fornecido.",
                    data: null
                };
                return res.status(400).json(response);
            }
            const deleteDespesaResponse = await DespesasModel.delete(id as string);
            if (deleteDespesaResponse) {
                const response: ResponseType<DespesasType> = {
                    status: "success",
                    message: "Despesa deletada com sucesso!",
                    data: deleteDespesaResponse,
                };
                return res.status(200).json(response);
            }
            const response: ResponseType<null> = {
                status: "error",
                message: "Despesa não encontrada.",
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
}