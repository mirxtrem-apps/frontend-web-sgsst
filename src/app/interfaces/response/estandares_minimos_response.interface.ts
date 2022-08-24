export interface EstandarMinimo {
    id: number;
    tipo_ciclo_id: number;
    nombre: string;
}

export interface ListEstandaresMinimosResponse {
    ok: boolean;
    data: EstandarMinimo[];
    error: string;
}

export interface EstandaresMinimosResponse {
    ok: boolean;
    data: EstandarMinimo;
    error: string;
}