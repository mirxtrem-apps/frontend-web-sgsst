import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemEstandarRequest } from 'src/app/interfaces/request/item_estandar_request';
import { CicloResponse, ListCiclosResponse } from 'src/app/interfaces/response/ciclos_response.interface';
import { EstandaresMinimosResponse, ListEstandaresMinimosResponse } from 'src/app/interfaces/response/estandares_minimos_response.interface';
import { ItemEstandarResponse, ListItemEstandarResponse } from 'src/app/interfaces/response/items_estantdar_response.interface';
import { ListSubEstandaresMinimosResponse, SubEstandaresMinimosResponse } from 'src/app/interfaces/response/subestandares_response.interface';
import { TipoEvaluacionResponse } from 'src/app/interfaces/response/tipo_evaluacion.interface';
import { TipoResponsableResponse } from 'src/app/interfaces/response/tipo_responsable.interface';
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

  // ==== ITEMS DEL ESTANDAR  ====
  getItemsDelEstandar(): Observable<ListItemEstandarResponse> {
    return this.http.get<ListItemEstandarResponse>(
      `${this.baseUrl}/admin/sgsst/items`
    );
  }

  getItemDelEstandarById(id: string) : Observable<ItemEstandarResponse> {
    return this.http.get<ItemEstandarResponse>(
      `${this.baseUrl}/admin/sgsst/items/${id}`
    );
  }

  createItemDelEstandar(item: ItemEstandarRequest) {
    return this.http.post(
      `${this.baseUrl}/admin/sgsst/items`, 
      item,
    );
  }

  updateItemDelEstandarById(item: ItemEstandarRequest){
    return this.http.put(
      `${this.baseUrl}/admin/sgsst/items`,
      item,
    );
  }
  
  deleteItemDelEstandarById(id: number){
    return this.http.get(
      `${this.baseUrl}/admin/sgsst/items`
    );
  }

  // ==== SUBESTANDARES ====

  getSubEstandares(): Observable<ListSubEstandaresMinimosResponse> {
    return this.http.get<ListSubEstandaresMinimosResponse>(
      `${this.baseUrl}/admin/sgsst/subestandares`
    );
  }

  getSubEstandarPorId(id: number) : Observable<SubEstandaresMinimosResponse> {
    return this.http.get<SubEstandaresMinimosResponse>(
      `${this.baseUrl}/admin/sgsst/subestandares/${id}`
    );
  }

  getSubEstandaresPorEstandar(
    estandarId: number
  ): Observable<ListSubEstandaresMinimosResponse> {
    return this.http.get<ListSubEstandaresMinimosResponse>(
      `${this.baseUrl}/admin/sgsst/subestandares?estandarId=${estandarId}`
    );
  }

  // ==== ESTANDARES MINIMOS ====

  getEstandaresMinimos(): Observable<ListEstandaresMinimosResponse> {
    return this.http.get<ListEstandaresMinimosResponse>(
      `${this.baseUrl}/admin/sgsst/estandares-minimos`
    );
  }
  
  getEstandarMinimoPorId(id: number): Observable<EstandaresMinimosResponse> {
    return this.http.get<EstandaresMinimosResponse>(
      `${this.baseUrl}/admin/sgsst/estandares-minimos/${id}`
    );
  }
  
  getEstandaresMinimosPorCiclo(
    cicloId: number
  ): Observable<ListEstandaresMinimosResponse> {
    return this.http.get<ListEstandaresMinimosResponse>(
      `${this.baseUrl}/admin/sgsst/estandares-minimos?cicloId=${cicloId}`
    );
  }

  // ==== CICLOS =====

  getCiclos(): Observable<ListCiclosResponse> {
    return this.http.get<ListCiclosResponse>(
      `${this.baseUrl}/admin/sgsst/ciclos`
    );
  }

  getCicloPorId(id: number): Observable<CicloResponse> {
    return this.http.get<CicloResponse>(
      `${this.baseUrl}/admin/sgsst/ciclos/${id}`
    );
  }
}
