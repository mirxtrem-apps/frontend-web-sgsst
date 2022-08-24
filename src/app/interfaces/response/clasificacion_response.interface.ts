export interface Clasificacion {
  id: number;
  fecha: Date;
  empresa_id: number;
  num_empleados: number;
  nivel_riesgo: number;
  tipo_evaluacion_id: number;
  tipo_responsable_id: number;
  num_estandares: number;
}

export interface ListClasificacionesResponse {
  ok: boolean;
  data: Clasificacion[];
  error: string;
}

export interface ClasificacionResponse {
  ok: boolean;
  data: Clasificacion;
  error: string;
}
