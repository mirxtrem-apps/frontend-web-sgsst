import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ItemEstandarRequest } from 'src/app/interfaces/request/item_estandar_request';
import { Ciclo } from 'src/app/interfaces/response/ciclos_response.interface';
import { EstandarMinimo } from 'src/app/interfaces/response/estandares_minimos_response.interface';
import { SubEstandar } from 'src/app/interfaces/response/subestandares_response.interface';
import { SgsstCoreService } from 'src/app/services/sgsst/sgsst-core/sgsst-core.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-items-estandar-create',
  templateUrl: './items-estandar-create.component.html',
  styleUrls: ['./items-estandar-create.component.scss'],
})
export class ItemsEstandarCreateComponent implements OnInit {
  constructor(
    private sstService: SgsstCoreService,
    private alert: ToastrService,
    private router: Router,
  ) {}

  ciclos: Ciclo[] = [];
  estandares: EstandarMinimo[] = [];
  subestandares: SubEstandar[] = [];

  cicloId: number = 0;
  estandarId: number = 0;
  subestandarId: number = 0;

  aplicaCap1 = 1;
  aplicaCap2 = 1;
  aplicaCap3 = 1;

  item?: ItemEstandarRequest;

  ngOnInit(): void {
    this.sstService.getCiclos().subscribe((resp) => (this.ciclos = resp.data));
  }

  onCicloChanged(item: any) {
    this.cicloId = parseInt(item.value);
    if (this.cicloId !== 0) {
      this.sstService
        .getEstandaresMinimosPorCiclo(this.cicloId)
        .subscribe((resp) => (this.estandares = resp.data));
    } else {
      this.estandarId = 0;
      this.subestandarId = 0;
    }
  }

  onEstandarMinimoChanged(item: any) {
    this.estandarId = parseInt(item.value);
    if (this.estandarId !== 0) {
      this.sstService
        .getSubEstandaresPorEstandar(this.estandarId)
        .subscribe((resp) => (this.subestandares = resp.data));
    } else {
      this.subestandarId = 0;
    }
  }

  onSubestandarChanged(item: any) {
    this.subestandarId = parseInt(item.value);
  }

  onCap1Changed(item: any) {
    this.aplicaCap1 = parseInt(item.value);
  }

  onCap2Changed(item: any) {
    this.aplicaCap2 = parseInt(item.value);
  }

  onCap3Changed(item: any) {
    this.aplicaCap3 = parseInt(item.value);
  }

  guardar(formulario: NgForm) {
    const { numeral, desc, valor, marcoLegal, criterio, modoVerificacion } =
      formulario.value;

    if (this.cicloId === 0) {
      this.alert.warning('Seleccione un ciclo', '', {
        positionClass: 'toast-top-right',
        progressBar: true,
      });
      return;
    }

    if (this.estandarId === 0) {
      this.alert.warning('Seleccione un estándar minimo', '', {
        positionClass: 'toast-top-right',
        progressBar: true,
      });
      return;
    }

    if (this.subestandarId === 0) {
      this.alert.warning('Seleccione una fase del estándar', '', {
        positionClass: 'toast-top-right',
        progressBar: true,
      });
      return;
    }

    if (formulario.valid) {
      this.item = {
        subestandar_id: this.subestandarId,
        numeral: numeral,
        marco_legal: marcoLegal,
        criterio_aceptacion: criterio,
        modo_verificacion: modoVerificacion,
        valor: valor,
        descripcion: desc,
        tipo_1: this.aplicaCap1,
        tipo_2: this.aplicaCap2,
        tipo_3: this.aplicaCap3,
      };

      Swal.fire({
        title: 'Creando el ítem...',
        text: 'Por favor espere',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      this.sstService.createItemDelEstandar(this.item).subscribe(
        (resp) => {
          Swal.close();
          Swal.fire({
            icon: 'success',
            title: 'Ítem creado éxitosamente',
            confirmButtonColor: '#ff873c',
            confirmButtonText: 'Entendido'
          });
          this.router.navigate(['./dashboard/admin/items-estandar']);
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
        );
      }
  }
}
