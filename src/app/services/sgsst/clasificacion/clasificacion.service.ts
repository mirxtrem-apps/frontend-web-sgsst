import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClasificacionRequest } from 'src/app/interfaces/request/clasificacion_request';
import { ClasificacionResponse, ListClasificacionesResponse } from 'src/app/interfaces/response/clasificacion_response.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClasificacionService {
  private baseUrl: string = environment.baseUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: localStorage.getItem('token') ?? '',
    }),
  };

  constructor(private http: HttpClient) {}

  getClasificaciones() : Observable<ListClasificacionesResponse> {
    return this.http.get<ListClasificacionesResponse>(
      `${this.baseUrl}/sgsst/clasificaciones`,
      this.httpOptions
    );
  }

  getClasificacionPorId(id: number): Observable<ClasificacionResponse> {
    return this.http.get<ClasificacionResponse>(
      `${this.baseUrl}/sgsst/clasificaciones/${id}`,
      this.httpOptions
    );
  }

  createClasificacion(clasificacion: ClasificacionRequest) {
    return this.http.post(
      `${this.baseUrl}/sgsst/clasificaciones`,
      clasificacion,
      this.httpOptions,
    );
  }

  updateClasificacion(id: number, clasificacion: ClasificacionRequest) {
    return this.http.put(
      `${this.baseUrl}/sgsst/clasificaciones/${id}`,
      clasificacion,
      this.httpOptions
    );
  }

  deleteClasificacion(id: number) {
    return this.http.delete(
      `${this.baseUrl}/sgsst/clasificaciones/${id}`,
      this.httpOptions
    );
  }
}
