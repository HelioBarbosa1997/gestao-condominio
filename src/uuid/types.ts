export type TipoUsuario = 'admin' | 'sindico' | 'morador' | 'porteiro' | 'financeiro';
export type StatusCobranca = 'pendente' | 'pago' | 'atrasado' | 'cancelado';
export type StatusOcorrencia = 'aberto' | 'em_andamento' | 'resolvido' | 'fechado';


export interface UsuarioType {
    id: string;
    nome: string;
    email: string;
    password: string;
    telefone?: string;
    tipo: TipoUsuario;
    created_at: Date;
    updated_at: Date;
}

export interface CreateUsuario {
    nome: string;
    email: string;
    password: string;
    telefone?: string;
    tipo?: TipoUsuario;
}
export interface CreateUnidade {
    id: string;
    condominio_id: string;
    numero: number;
    bloco: string;
    fracao: string;
    propretario_id: string;
}
export interface CreateOcorrencias {
    id: string;
    condominio_id: string;
    unidade_id: string;
    usuario_id: string;
    titulo: string;
    descricao: string;
    status: string;
    created_at: Date;
}
export interface CreateDespesas {
    id: string;
    condominio_id: string;
    categoria: string;
    valor: number;
    data_vencimento: Date;
    data_pagamento: Date;
    status: string;
}
export interface CreateCondominio {
    id: string;
    nome: string;
    endereco: string;
    cidade: string;
}
export interface CreateCobranca {
    id: string;
    unidade_id: string;
    valor: number;
    data_vencimento: Date;
    data_pagamento: Date;
    status: string;
    descricao: string;
}

export interface UnidadeType {
    id: string;
    condominio_id: string;
    numero: number;
    bloco: string;
    fracao: string;
    propretario_id: string;
    created_at: Date;
    updated_at: Date;
}
export interface OcorrenciasType {
    id: string;
    condominio_id: string;
    unidade_id: string;
    usuario_id: string;
    titulo: string;
    descricao: string;
    status: string;
    created_at: Date;
    updated_at: Date;
}
export interface DespesasType {
    id: string;
    condominio_id: string;
    categoria: string;
    valor: number;
    data_vencimento: Date;
    data_pagamento: Date;
    status: string;
    created_at: Date;
    updated_at: Date;
}
export interface CondominioType {
    id: string;
    nome: string;
    endereco: string;
    cidade: string;
    created_at: Date;
    updated_at: Date;
}
export interface CobrancasType {
    id: string;
    unidade_id: string;
    valor: number;
    data_vencimento: Date;
    data_pagamento: Date;
    status: string;
    descricao: string;
    created_at: Date;
    updated_at: Date;
}
export interface AvisoType {
    id: number;
    condominio_id: number;
    titulo: string;
    mensagem: string;
    data_publicacao: Date;
}
export interface ResponseType<T> {
    status: "success" | "error";
    message: string;
    data: T | null;
}
export interface GetAllUsuariosResponse {
    status: string;
    message: string;
    data: UsuarioType[];
}