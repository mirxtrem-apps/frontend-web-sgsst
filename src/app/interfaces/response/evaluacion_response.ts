export interface Evaluacion {
    id: number,
    clasificacion_id: number,
    puntaje: number,
    descripcion: string,
    tipo_valoracion_id: number,
    fecha: Date,
    cant_estandares_cumplidos: number,
    cant_estandares_nc: number,
    cant_estandares_na: number,
    cant_estandares_justificados: number,
    empresa_id: number,
    finalizada: number,
  }
  
  export interface ListEvaluacionesResponse {
    ok: boolean;
    data: Evaluacion[];
    error: string;
  }
  
  export interface EvaluacionResponse {
    ok: boolean;
    data: Evaluacion;
    error: string;
  }