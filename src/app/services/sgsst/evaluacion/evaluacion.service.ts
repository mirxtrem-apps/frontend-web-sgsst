import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClasificacionRequest } from 'src/app/interfaces/request/clasificacion_request';
import { EvaluacionRequest } from 'src/app/interfaces/request/evaluacion_request';
import { InsertItems, ItemEvaluacionObject } from 'src/app/interfaces/request/item_evaluacion_request';
import { ClasificacionResponse, ListClasificacionesResponse } from 'src/app/interfaces/response/clasificacion_response.interface';
import { EvaluacionResponse, ListEvaluacionesResponse } from 'src/app/interfaces/response/evaluacion_response';
import { InsertResponse } from 'src/app/interfaces/response/insert_response.interface';
import { ListItemEstandarResponse } from 'src/app/interfaces/response/items_estantdar_response.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EvaluacionService {

  private baseUrl: string = environment.baseUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token') ?? '',
    }),
  };

  constructor(private http: HttpClient) {
  }

  getClasificaciones() : Observable<ListClasificacionesResponse> {
    return this.http.get<ListClasificacionesResponse>(
      `${this.baseUrl}/sgsst/clasificaciones`,
      this.httpOptions
    );
  }

  getEvaluaciones() : Observable<ListEvaluacionesResponse> {
    return this.http.get<ListEvaluacionesResponse>(
      `${this.baseUrl}/sgsst/evaluaciones`,
      this.httpOptions
    );
  }  
  
  getEvaluacionPorId(id: number): Observable<EvaluacionResponse> {
    return this.http.get<EvaluacionResponse>(
      `${this.baseUrl}/sgsst/evaluaciones/${id}`,
      this.httpOptions
    );
  }

  createEvaluacion(evaluacion: EvaluacionRequest): Observable<InsertResponse> {
    return this.http.post<InsertResponse>(
      `${this.baseUrl}/sgsst/evaluaciones`,
      evaluacion,
      this.httpOptions,
    );
  }
  
  deleteEvaluacion(id: number) {
    return this.http.delete(
      `${this.baseUrl}/sgsst/evaluaciones/${id}`,
      this.httpOptions
    );
  }

  // Items de la evaluación
  getItemsEvaluacion(numEstandares: number): Observable<ListItemEstandarResponse> {
    return this.http.get<ListItemEstandarResponse>(
      `${this.baseUrl}/sgsst/items-evaluacion?num_estandares=${numEstandares}`,
      this.httpOptions
    );
  }

  createItemEvaluacion(items: InsertItems) {
    return this.http.post(
      `${this.baseUrl}/sgsst/items-evaluacion`,
      items,
      this.httpOptions
    );
  }

  deleteItemEvaluacion(id: number) {
    return this.http.delete(
      `${this.baseUrl}/sgsst/items-evaluacion/${id}`,
      this.httpOptions
    );
  }

}
