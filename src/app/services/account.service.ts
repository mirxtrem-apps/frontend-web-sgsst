import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl: string = "https://segsas.com/sgsst/api/v1/account";

  constructor(private _http: HttpClient) { 
    console.log('account service inicializado');
  }

  obtenerEmpresa(userId: number): Observable<Object> {
    return this._http.get(`${this.baseUrl}/${userId}`);
  }
}
