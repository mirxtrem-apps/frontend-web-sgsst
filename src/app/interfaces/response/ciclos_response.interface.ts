export interface Ciclo {
    id: number;
    tipo: string;
}

export interface ListCiclosResponse {
    ok: boolean;
    data: Ciclo[];
    error: string;
}

export interface CicloResponse {
    ok: boolean;
    data: Ciclo;
    error: string;
}