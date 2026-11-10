import { Request, Response } from "express";
import { OcorrenciaModel } from "../models/ocorrencias.model";
import { OcorrenciasType, ResponseType } from "../uuid/types";

export const ocorrenciasController = {
    async createOcorrencia(req: Request, res: Response) {
        try {
            const ocorrencia: OcorrenciasType = req.body;
            if (!ocorrencia) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Dados da ocorrência não fornecidos.",
                    data: null
                };
                return res.status(400).json(response);
            }
            const createOcorrenciaResponse = await OcorrenciaModel.create(ocorrencia);
            if (!createOcorrenciaResponse) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Erro ao criar ocorrência",
                    data: null
                };
                return res.status(500).json(response);
            }
            const response: ResponseType<OcorrenciasType> = {
                status: "success",
                message: "Ocorrência criada com sucesso!",
                data: createOcorrenciaResponse
            };
            return res.status(200).json(response);
        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "Erro interno do servidor",
                data: null
            });
        }
    },
    async getAllOcorrencias(req: Request, res: Response) {
        try {
            const getAllOcorrenciasResponse = await OcorrenciaModel.getAll();
            if (getAllOcorrenciasResponse) {
                const response: ResponseType<OcorrenciasType[]> = {
                    status: "success",
                    message: "Ocorrências obtidas com sucesso!",
                    data: getAllOcorrenciasResponse
                };
                return res.status(200).json(response);
            };
            const response: ResponseType<null> = {
                status: "error",
                message: "Nenhuma ocorrência encontrada.",
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
    async getOcorrencia(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "ID da ocorrência não fornecido.",
                    data: null
                };
                return res.status(400).json(response);
            }
            const getOcorrenciaResponse = await OcorrenciaModel.get(id as string);
            if (getOcorrenciaResponse) {
                const response: ResponseType<OcorrenciasType> = {
                    status: "success",
                    message: "Ocorrência obtida com sucesso!",
                    data: getOcorrenciaResponse
                };
                return res.status(200).json(response);
            }
            const response: ResponseType<null> = {
                status: "error",
                message: "Ocorrência não encontrada.",
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
    async updateOcorrencia(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "ID da ocorrência não fornecido.",
                    data: null
                };
                return res.status(400).json(response);
            }
            const updatedOcorrencia: OcorrenciasType = req.body;
            if (!updatedOcorrencia) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Dados da ocorrência não fornecidos.",
                    data: null
                };
                return res.status(400).json(response);
            }
            const updateOcorrenciaResponse = await OcorrenciaModel.updated(id as string, updatedOcorrencia);
            if (updateOcorrenciaResponse) {
                const response: ResponseType<OcorrenciasType> = {
                    status: "success",
                    message: "Ocorrência atualizada com sucesso!",
                    data: updateOcorrenciaResponse
                };
                return res.status(200).json(response);
            }
            const response: ResponseType<null> = {
                status: "error",
                message: "Ocorrência não encontrada.",
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
    async deleteOcorrencia(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "ID da ocorrência não fornecido.",
                    data: null
                };
                return res.status(400).json(response);
            }
            const deleteOcorrenciaResponse = await OcorrenciaModel.delete(id as string);
            if (deleteOcorrenciaResponse) {
                const response: ResponseType<OcorrenciasType> = {
                    status: "success",
                    message: "Ocorrência deletada com sucesso!",
                    data: deleteOcorrenciaResponse
                };
                return res.status(200).json(response);
            }
            const response: ResponseType<null> = {
                status: "error",
                message: "Ocorrência não encontrada.",
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
