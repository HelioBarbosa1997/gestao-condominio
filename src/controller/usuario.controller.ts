import { Request, Response } from "express";
import { UsuariosModel } from "../models/usuario.model";

import { ResponseType, UsuarioType} from "../uuid/types";
import jwt from "jsonwebtoken";

export const usuarioController = {
    async createUsuario(req: Request, res: Response) {
        try {
            const usuario: UsuarioType = req.body;

            if (!usuario) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Dados do usuário não fornecidos.",
                    data: null
                };
                return res.status(400).json(response);
            };

            const createUserResponse = await UsuariosModel.create(usuario)

            if (!createUserResponse) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "Erro ao criar utilizador",
                    data: null,
                };
                return res.status(500).json(response);
            }

            const response: ResponseType<UsuarioType> = {
                status: "success",
                message: "Utilizador criado com sucesso!",
                data: createUserResponse as any,
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

    async getAllUsuarios(req: Request, res: Response) {
        try {
            const getAllUsuarioresponse = await UsuariosModel.getAll();

            if (getAllUsuarioresponse) {

                const response: ResponseType<UsuarioType[]> = {
                    status: "success",
                    message: "Utilizadores obtidos com sucesso!",
                    data: getAllUsuarioresponse as any,
                };
                return res.status(200).json(response);
            };

            const response: ResponseType<null> = {
                status: "error",
                message: "Erro ao obter utilizadores",
                data: null,
            };
            return res.status(500).json(response);

        } catch (error) {
            return res.status(500).json({
                status: "error",
                message: "Erro interno do servidor",
                data: null,
            });
        }
    },
    async getUsuarioById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            if (!id) {
                const response: ResponseType<null> = {
                    status: "error",
                    message: "ID do usuário não fornecido.",
                    data: null
                };
                return res.status(400).json(response);
            }
            const getUserByIdResponse = await UsuariosModel.get(id as string);
            if (getUserByIdResponse) {
                const response: ResponseType<UsuarioType> = {
                    status: "success",
                    message: "Utilizador obtido com sucesso!",
                    data: getUserByIdResponse as any,
                };
                return res.status(200).json(response);
            }

            const response: ResponseType<null> = {
                status: "error",
                message: "Utilizador não encontrado",
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

    
async loginUsuario(req: Request, res: Response) {
    try {
        // 1. Receber os dados
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                status: "error",
                message: "Email ou senha não fornecidos.",
                data: null
            });
        }

        // 2. Verificar as credenciais
        const usuario = await UsuariosModel.login(email, password);

        if (!usuario) {
            return res.status(401).json({
                status: "error",
                message: "Email ou senha inválidos.",
                data: null
            });
        }

        // 3. Verificar a chave secreta
        const secret = process.env.JWT_SECRET;

        if (!secret) {
            throw new Error("JWT_SECRET não configurada.");
        }

        // 4. Criar o conteúdo do token
        const payload = {
            id: String(usuario.id),
            email: usuario.email,
            role: usuario.tipo
        };

        // 5. Gerar o JWT
        const token = jwt.sign(
            payload,
            secret,
            { expiresIn: "7d" }
        );

        // 6. Devolver o resultado
        return res.status(200).json({
            status: "success",
            message: "Login realizado com sucesso!",
            data: {
                token,
                user: payload
            }
        });

    } catch (error) {
        console.error("Erro no login:", error);

        return res.status(500).json({
            status: "error",
            message: "Erro interno do servidor.",
            data: null
        });
    }
},


    async updatedUsuario(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const updatedUser: UsuarioType = req.body;

            const updatedUsuarioResponse = await UsuariosModel.update(id as string  , updatedUser);
            if (updatedUsuarioResponse) {
                const response: ResponseType<UsuarioType> = {
                    status: "success",
                    message: "Utilizador atualizado com sucesso!",
                    data: updatedUsuarioResponse as any,
                };
                return res.status(200).json(response);
            }

            const response: ResponseType<null> = {
                status: "error",
                message: "Utilizador não encontrado",
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
    async deleteUsuario(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deletedUsuarioResponse = await UsuariosModel.delete(id as string);
            if (deletedUsuarioResponse) {
                const response: ResponseType<null> = {
                    status: "success",
                    message: "Utilizador excluído com sucesso!",
                    data: null,
                };
                return res.status(200).json(response);
            }

            const response: ResponseType<null> = {
                status: "error",
                message: "Utilizador não encontrado",
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
    }
}
