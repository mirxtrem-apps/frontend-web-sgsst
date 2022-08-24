import { ItemEstandarData } from "../response/items_estantdar_response.interface";

export interface ItemEvaluacion {
    id?: number;
    evaluacion_id: number;
    item_id: number;
    cumple: number | boolean;
    no_aplica: number | boolean;
    justifica: number | boolean;
    observacion: string;
    valor: number;
}

export interface ItemEvaluacionObject {
    data: ItemEstandarData,
    item: ItemEvaluacion,
}

export interface InsertItems {
    items: ItemEvaluacionObject[]
}