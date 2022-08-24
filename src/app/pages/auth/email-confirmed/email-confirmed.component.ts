import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-email-confirmed',
  templateUrl: './email-confirmed.component.html',
  styleUrls: ['./email-confirmed.component.scss'],
})
export class EmailConfirmedComponent implements OnInit {
  isVerificado: boolean = false;
  auth: string = '';

  constructor(
    private params: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private alert: ToastrService
  ) {}

  ngOnInit(): void {
    this.params.queryParams.subscribe(({auth}) => {
      this.auth = auth;
      console.log(auth);
      
      this.authService.validateEmail(this.auth).subscribe(
        (resp) => {
          console.log(resp);
          this.isVerificado = true;
          Swal.fire({
            icon: 'success',
            title: 'Correo verificado',
            text: 'Tu cuenta ahora esta activa, por favor completa el proceso de registro con los datos de tu empresa.',
            confirmButtonColor: '#ff873c',
            confirmButtonText: 'Entendido',
          });
        },
        (error: HttpErrorResponse) => {
          Swal.close();
          console.log(error);
          this.alert.error(`${error.error.error}`, '', {
            positionClass: 'toast-top-right',
            progressBar: true,
          });
        }
      );
    });
  }

  visible: boolean = false;

  toggleVisibility() {
    this.visible = !this.visible;
  }

  reSendEmailVerification(formulario: NgForm) {
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
        title: 'Enviando correo...',
        text: 'Por favor espere',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
    }

    this.authService.reSendEmail(correo).subscribe(
      (response: any) => {
        console.log(response);
        Swal.close();
        this.router.navigate(['./home'])
      }
    );
  }
}
