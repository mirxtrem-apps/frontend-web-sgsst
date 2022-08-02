import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Empresa } from 'src/app/interfaces/empresa.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  baseUrl: string = environment.baseUrl;

  private _empresa : Empresa | undefined;


  constructor(private _http: HttpClient) {
    console.log('auth service inicializado');
  }

  crearEmpresa(credencial_id: number, empresa: Empresa): Observable<Object> {
    return this._http.post(`${this.baseUrl}/account/empresas/`, {
      "credencial_id": credencial_id,
      "nit": empresa.nit,
      "razon_social": empresa.razon_social,
      "direccion": empresa.direccion,
      "telefono": empresa.telefono,
      "cod_ciiu": empresa.cod_ciiu,
      "mineria": empresa.mineria,
    });
  }

  obtenerEmpresa(nit: number): Observable<Object> {
    console.log(nit);
    return this._http.get(`${this.baseUrl}/empresas/${nit}`).pipe(
      tap(resp => console.log('Account service', resp)
      )
    );
  }
}
