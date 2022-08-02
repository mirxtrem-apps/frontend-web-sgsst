import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import {
  LoginData,
  LoginResponse,
} from 'src/app/interfaces/login_response.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl: string = environment.baseUrl;
  private _auth: LoginData | undefined;

  get auth() {
    return { ...this._auth };
  }

  constructor(private _http: HttpClient) {
    console.log('auth service inicializado');
  }

  checkSession(): boolean {
    // TODO: cambiar por el token
    if (localStorage.getItem('nit')) {
      return true;
    }
    return false;
  }

  login(email: string, password: string): Observable<Object> {
    console.log(email, password);

    return this._http
      .post<LoginResponse>(`${this.baseUrl}/auth/login`, {
        correo: email,
        password: password,
      })
      .pipe(
        tap((resp) => (this._auth = resp.data)),
        tap((resp) => localStorage.setItem('token', resp.data.token.toString()))
      );
  }

  registro(email: string, password: string): Observable<Object> {
    return this._http.post(`${this.baseUrl}/auth/registro`, {
      correo: email,
      password: password,
    });
  }

  resetPassword(email: string): Observable<Object> {
    return this._http.post(`${this.baseUrl}/auth/reset-password`, {
      correo: email,
    });
  }

  cambiarPassword(
    oldPassword: string,
    newPassword: string,
    userId: number
  ): Observable<Object> {
    return this._http.post(`${this.baseUrl}/${userId}/auth/change-password`, {
      password: oldPassword,
      new_password: newPassword,
    });
  }

  validateEmail(token: string) {
    return this._http.get(`${this.baseUrl}/auth/confirm-email`, {
      headers: {
        token: token,
      },
    });
  }

  reSendEmail(correo: string) {
    return this._http.post(`${this.baseUrl}/auth/resend-email`, {
      correo: correo,
    });
  }

  logout() {
    this._auth = undefined;
  }
}
