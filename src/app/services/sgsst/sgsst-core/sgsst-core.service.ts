import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoEvaluacionResponse } from 'src/app/interfaces/tipo_evaluacion.interface';
import { TipoResponsableResponse } from 'src/app/interfaces/tipo_responsable.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SgsstCoreService {
  private baseUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {
    console.log('Servicio core inicializado');
  }

  getTiposResponsable(): Observable<TipoResponsableResponse> {
    return this.http.get<TipoResponsableResponse>(
      `${this.baseUrl}/admin/sgsst/tipos-responsable`
    );
  }

  getTiposEvaluacion(): Observable<TipoEvaluacionResponse> {
    return this.http.get<TipoEvaluacionResponse>(
      `${this.baseUrl}/admin/sgsst/tipos-evaluacion`
    );
  }
}
