import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/services/account.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
})
export class PrincipalComponent implements OnInit {
  userId?: number;

  empresa = {
    nit: 0,
    razon_social: '',
    direccion: '',
    telefono: '',
  };

  constructor(
    private _accountService: AccountService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.userId = parseInt(params['id']);
    });
  }

  ngOnInit(): void {
    this.obtenerDatosEmpresa();
  }

  obtenerDatosEmpresa() {
    if (this.userId) {
      this._accountService
        .obtenerEmpresa(this.userId!)
        .subscribe((response: any) => {
          if (response['ok']) {
            const { nit, razon_social, direccion, telefono } = response['data'];

            this.empresa.nit = nit;
            this.empresa.razon_social = razon_social;
            this.empresa.direccion = direccion;
            this.empresa.telefono = telefono;
          } else {
            alert(response['error']);
          }
        });
    }
  }
}
