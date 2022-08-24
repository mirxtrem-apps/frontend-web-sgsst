export interface ItemEstandarData {
    id?: number,
    numeral: string,
    marco_legal:string,
    criterio_aceptacion:string,
    modo_verificacion: string,
    valor:number,
    item_descripcion:string,
    estandar_minimo_descripcion: string,
    peso_porcentual: number,
    estandar_minimo_nombre: string,
    ciclo: string,
}

export interface ItemEstandar {
    id?: number;
    subestandar_id: number;
    numeral: string;
    marco_legal: string;
    criterio_aceptacion: string;
    modo_verificacion: string;
    valor: number;
    descripcion: string;
    tipo_1: number;
    tipo_2: number;
    tipo_3: number;
}

export interface ListItemEstandarResponse {
    ok: boolean;
    data: ItemEstandarData[];
    error: string;
}

export interface ItemEstandarResponse {
    ok: boolean;
    data: ItemEstandar;
    error: string;
}