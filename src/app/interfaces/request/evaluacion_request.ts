export interface EvaluacionRequest {
    clasificacion_id: number;
    puntaje: number;
    descripcion: string;
    tipo_valoracion_id: number;
    cant_estandares_cumplidos: number;
    cant_estandares_nc: number;
    cant_estandares_na: number;
    cant_estandares_justificados: number;
    finalizada: number;
  }