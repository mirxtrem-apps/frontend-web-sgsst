import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/account/account.service';
import { NgForm } from '@angular/forms';
import { Empresa } from 'src/app/interfaces/empresa.interface';

@Component({
  selector: 'app-crear-empresa',
  templateUrl: './crear-empresa.component.html',
  styleUrls: ['./crear-empresa.component.scss']
})
export class CrearEmpresaComponent implements OnInit {

  visible: boolean = false;
  credential_id: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
    private alert: ToastrService,
    private _router: Router,
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.credential_id = parseInt(params['id']);
    });
  }

  ngOnInit(): void {}

  crearEmpresa(formulario: NgForm) {
    console.log(this.credential_id);
    console.log(formulario.value);
    const { nit, direccion, razonSocial, telefono } = formulario.value;
    if (nit == '' || direccion == '' || razonSocial == '' || telefono == '') {
      this.alert.warning('Complete el formulario', '', {
        positionClass: 'toast-top-right',
        progressBar: true,
      });
      return;
    }

    if(formulario.valid) {
      Swal.fire({
        title: 'Terminando el registro...',
        text: 'Por favor espere',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      
      let empresa: Empresa = {
        nit: nit,
        razon_social: razonSocial,
        direccion: direccion,
        telefono: telefono,
        cod_ciiu: 0,
        mineria: false,
      };

      this.accountService.crearEmpresa(
        this.credential_id,
        empresa,
      ).subscribe(
        (response: any) => {
          console.log(response);

          const { message } = response.data;
          Swal.close();
          Swal.fire({
            icon: 'success',
            title: message,
            text: 'Bienvenido!, gracias por usar nuestro software de SG-SST',
            confirmButtonColor: '#ff873c',
            confirmButtonText: 'Entendido'
          });

          this._router.navigate(['/login']);

        },
        (error: HttpErrorResponse) => {
          console.log(error);
          
          if (error.status === 0 || error.status === 500) {
            Swal.close();
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

          Swal.close();
          this.alert.error(error.error.message, '', {
            positionClass: 'toast-top-right',
            progressBar: true,
          });
        }
      )
    }

  }

}
