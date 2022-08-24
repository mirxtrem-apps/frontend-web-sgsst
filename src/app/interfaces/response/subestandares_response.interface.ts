export interface SubEstandar {
    id: number;
    estandar_minimo_id: number;
    descripcion: string;
    peso_porcentual: number;
}

export interface ListSubEstandaresMinimosResponse {
    ok: boolean;
    data: SubEstandar[];
    error: string;
}

export interface SubEstandaresMinimosResponse {
    ok: boolean;
    data: SubEstandar;
    error: string;
}