import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  visible: boolean = false;

  constructor(private _auth: AuthService, private _router: Router, private alert: ToastrService) {}

  toggleVisibility() {
    this.visible = !this.visible;
  }

  login(formulario: NgForm) {
    const { correo, password } = formulario.value;
    if (correo == '' || password == '') {
      this.alert.warning("Complete el formulario","", {
        positionClass: 'toast-top-right',
        progressBar: true
     });
      return;
    }

    if (formulario.valid) {
      this._auth.login(correo, password).subscribe(
        (response: any) => {
          const { id } = response['data'];
          this._router.navigate(['/principal', id]);
        },
        (error) => {
          this.alert.error(error.error.error,"", {
            positionClass: 'toast-top-right',
            progressBar: true
         });
        }
      );
    }
  }
}
