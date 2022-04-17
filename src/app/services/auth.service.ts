import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl: string = "https://segsas.com/sgsst/api/v1/auth";

  constructor(private _http: HttpClient) { 
    console.log('auth service inicializado');
  }
  
  login(email: string, password: string): Observable<Object> {
    console.log(email, password);
    
    return this._http.post(`${this.baseUrl}/login`, {
      "correo": email,
      "password": password,
    });
  }
  
  registro(email: string, password: string): Observable<Object> {
    return this._http.post(`${this.baseUrl}/registro`, {
      "correo": email,
      "password": password,
    });
  }
  
  resetPassword(email: string): Observable<Object> {
    return this._http.post(`${this.baseUrl}/reset-password`, {
      "correo": email,
    });
  }
  
  cambiarPassword(oldPassword: string, newPassword: string, userId: number): Observable<Object> {
    return this._http.post(`${this.baseUrl}/${userId}/change-password`, {
      "password": oldPassword,
      "new_password": newPassword,
    });
  }
}
