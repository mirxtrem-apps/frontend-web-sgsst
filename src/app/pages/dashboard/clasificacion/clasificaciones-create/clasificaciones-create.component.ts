import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NivelRiesgo } from 'src/app/interfaces/nivel_riesgo.interface';
import { ClasificacionRequest } from 'src/app/interfaces/request/clasificacion_request';
import { TipoEvaluacion } from 'src/app/interfaces/response/tipo_evaluacion.interface';
import { TipoResponsable } from 'src/app/interfaces/response/tipo_responsable.interface';
import { ClasificacionService } from 'src/app/services/sgsst/clasificacion/clasificacion.service';
import { SgsstCoreService } from 'src/app/services/sgsst/sgsst-core/sgsst-core.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-clasificaciones-create',
  templateUrl: './clasificaciones-create.component.html',
  styleUrls: ['./clasificaciones-create.component.scss'],
})
export class ClasificacionesCreateComponent implements OnInit {
  
  tiposResponsable: TipoResponsable[] = [];
  tiposEvaluacion: TipoEvaluacion[] = [];

  tipoResponsableID: number = 0;
  tipoEvaluacionID: number = 0;
  tipoEvaluacion?: TipoEvaluacion;
  tipoResponsable: string = 'Sin definir';

  numItemsEvaluar: number = 0;

  nivelRiesgo: number = 1;
  numEmpleados: number = 1;

  public nivelesRiesgo: NivelRiesgo[] = [
    { id: 1, tipo: 'Nivel I' },
    { id: 2, tipo: 'Nivel II' },
    { id: 3, tipo: 'Nivel III' },
    { id: 4, tipo: 'Nivel IV' },
    { id: 5, tipo: 'Nivel V' },
  ];

  clasificacion?: ClasificacionRequest;

  constructor(
    private sgsst: SgsstCoreService,
    private clasificacionService: ClasificacionService,
    private alert: ToastrService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.sgsst.getTiposResponsable().subscribe((resp) => {
      this.tiposResponsable = resp.data;
    });

    this.sgsst.getTiposEvaluacion().subscribe((resp) => {
      this.tiposEvaluacion = resp.data;
    });
  }

  onNumEmpleadosChanged(empl: any) {
    this.numEmpleados = parseInt(empl.value);
    console.log('Cambio el numero de empleados');
    this.calcularEstandaresMinimos();
  }

  onNivelRiesgoChanged(riesgo: any) {
    this.nivelRiesgo = parseInt(riesgo.value);
    console.log('Cambio el nivel de riesgo');
    this.calcularEstandaresMinimos();
  }

  calcularEstandaresMinimos() {
    if (
      this.nivelRiesgo == 4 ||
      this.nivelRiesgo == 5 ||
      this.numEmpleados > 50
    ) {
      this.numItemsEvaluar = 60;
      this.tipoResponsable = this.tiposResponsable[3].tipo;
      this.tipoResponsableID = this.tiposResponsable[3].id;
      this.tipoEvaluacion = this.tiposEvaluacion[2];
      this.tipoEvaluacionID = this.tiposEvaluacion[2].id;
    } else if (this.numEmpleados <= 50 && this.numEmpleados > 10) {
      this.numItemsEvaluar = 21;
      this.tipoResponsable = this.tiposResponsable[2].tipo;
      this.tipoResponsableID = this.tiposResponsable[2].id;
      this.tipoEvaluacion = this.tiposEvaluacion[1];
      this.tipoEvaluacionID = this.tiposEvaluacion[1].id;
    } else if (this.numEmpleados <= 10) {
      this.numItemsEvaluar = 7;
      this.tipoResponsable = this.tiposResponsable[1].tipo;
      this.tipoResponsableID = this.tiposResponsable[1].id;
      this.tipoEvaluacion = this.tiposEvaluacion[0];
      this.tipoEvaluacionID = this.tiposEvaluacion[0].id;
    }
  }

  guardar(formulario: NgForm) {
    const { numEmpleados } = formulario.value;
    console.log(formulario.value);

    if (numEmpleados == '0') {
      this.alert.error('No puede tener 0 empleados', '', {
        positionClass: 'toast-top-right',
        progressBar: true,
      });
      return;
    }
    if (numEmpleados == '') {
      this.alert.warning('Complete el formulario', '', {
        positionClass: 'toast-top-right',
        progressBar: true,
      });
      return;
    }

    if (formulario.valid) {
      this.clasificacion = {
        num_empleados: numEmpleados,
        nivel_riesgo: this.nivelRiesgo,
        tipo_evaluacion_id: this.tipoEvaluacionID,
        tipo_responsable_id: this.tipoResponsableID,
        num_estandares: this.numItemsEvaluar,
      };
      Swal.fire({
        title: 'Guardando...',
        text: 'Por favor espere',
        allowOutsideClick: false,
        showConfirmButton: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      this.clasificacionService
        .createClasificacion(this.clasificacion)
        .subscribe(
          (resp) => {
            Swal.close();
            Swal.fire({
              icon: 'success',
              title: 'Ítem creado éxitosamente',
              confirmButtonColor: '#ff873c',
              confirmButtonText: 'Entendido'
            });
            this.router.navigate(['./dashboard/clasificaciones']);
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
