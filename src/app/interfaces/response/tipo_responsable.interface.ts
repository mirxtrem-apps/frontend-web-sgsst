export interface TipoResponsable {
    id: number;
    tipo: string;
}

export interface TipoResponsableResponse {
    ok: boolean;
    data: TipoResponsable[];
    error: string;
}