export interface TipoEvaluacion {
    id: number;
    tipo: string;
    responsable: string;
    descripcion: string;
    cita: string;
}

export interface TipoEvaluacionResponse {
    ok: boolean;
    data: TipoEvaluacion[];
    error: string;
}