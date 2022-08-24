import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  visible: boolean = false;
  terminos: boolean = false;
  politicas: boolean = false;

  constructor(
    private _auth: AuthService, 
    private _router: Router, 
    private alert: ToastrService,
  ) { }

  toggleVisibility() {
    this.visible = !this.visible;
  }

  toggleTerminos() {
    this.terminos = !this.terminos;
  }

  togglePoliticas() {
    this.politicas = !this.politicas;
  }

  registro(formulario: NgForm) {
    console.log(formulario.value);
    
    const {correo, password} = formulario.value;
    if (correo == '' || password == '') {
      this.alert.warning("Complete el formulario","", {
        positionClass: 'toast-top-right',
        progressBar: true
     });
     return;
    }
    
    if(!this.terminos || !this.politicas) {
      this.alert.info("Debes aceptar los Términos y condiciones y la Política de tratamiento de datos personales para poder continuar con el registro.","", {
        positionClass: 'toast-top-right',
        progressBar: true
     });
     return;
    }

    if (formulario.valid) {
      
      Swal.fire({
        title: 'Creando tu cuenta',
        text: 'Por favor espere',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      this._auth.registro(correo, password).subscribe(
        (response: any) => {
          Swal.close();
          Swal.fire({
            icon: 'success',
            title: 'Registro existoso',
            text: 'Te hemos enviado un correo con un link de verificación, revisa la bandeja de entrada o en spam.',
            confirmButtonColor: '#ff873c',
          });

          this._router.navigate(['/crear-empresa', response.data.id]);
        },
        (error: HttpErrorResponse) => {

          Swal.close();
          this.alert.error(error.error.error,"", {
            positionClass: 'toast-top-right',
            progressBar: true
         });
        }
      );
    }

  }

}
