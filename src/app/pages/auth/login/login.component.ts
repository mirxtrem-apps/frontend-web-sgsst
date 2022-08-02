import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

import Swal from 'sweetalert2';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AccountService } from 'src/app/services/account/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  visible: boolean = false;

  constructor(
    private _auth: AuthService,
    private _account: AccountService,
    private _router: Router,
    private alert: ToastrService
  ) {}

  toggleVisibility() {
    this.visible = !this.visible;
  }

  login(formulario: NgForm) {
    const { correo, password } = formulario.value;

    if (correo == '' || password == '') {
      this.alert.warning('Complete el formulario', '', {
        positionClass: 'toast-top-right',
        progressBar: true,
      });
      return;
    }

    if (formulario.valid) {
      Swal.fire({
        title: 'Iniciando sesión...',
        text: 'Por favor espere',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      this._auth.login(correo, password).subscribe(
        (response: any) => {
          console.log(response);

          Swal.close();

          this._router.navigate(['../dashboard']);
        },
        (httpError: HttpErrorResponse) => {
          Swal.close();
          if (httpError.status === 0 || httpError.status === 500) {
            this.alert.error(
              'Temporalmente fuera de servicio, intente mas tarde',
              '',
              {
                positionClass: 'toast-top-right',
                progressBar: true,
              }
            );
            return;
          }
          if (httpError.status === 403) {
            this.alert.info(
              'Revisa el correo de verificación',
              'Esta cuenta no esta activa',
              {
                positionClass: 'toast-top-right',
                progressBar: true,
              }
            );
            return;
          }
          if (httpError.status === 401) {
            console.log(httpError.error.data);

            this.alert.info(
              'Continúa el proceso de registro.',
              'Completa el formulario',
              {
                positionClass: 'toast-top-right',
                progressBar: true,
              }
            );
            this._router.navigate(['../crear-empresa', httpError.error.data.id]);
            return;
          }

          this.alert.error(httpError.error.message, '', {
            positionClass: 'toast-top-right',
            progressBar: true,
          });
        }
      );
    }
  }
}
