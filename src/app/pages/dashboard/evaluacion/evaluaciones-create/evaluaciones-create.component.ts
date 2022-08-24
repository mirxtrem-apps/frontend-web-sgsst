import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EvaluacionRequest } from 'src/app/interfaces/request/evaluacion_request';
import { Clasificacion } from 'src/app/interfaces/response/clasificacion_response.interface';
import { Evaluacion } from 'src/app/interfaces/response/evaluacion_response';
import { ClasificacionService } from 'src/app/services/sgsst/clasificacion/clasificacion.service';
import { EvaluacionService } from 'src/app/services/sgsst/evaluacion/evaluacion.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-evaluaciones-create',
  templateUrl: './evaluaciones-create.component.html',
  styleUrls: ['./evaluaciones-create.component.scss'],
})
export class EvaluacionesCreateComponent implements OnInit {
  listaClasificaciones: Clasificacion[] = [];

  evaluacion: Evaluacion | undefined;
  evaluacionRequest: EvaluacionRequest | undefined;

  constructor(
    private clasificacionService: ClasificacionService,
    private evaluacionService: EvaluacionService,
    private router: Router,
    private alert: ToastrService
  ) {}

  ngOnInit(): void {
    this.getClasificaciones();
  }

  getClasificaciones() {
    this.clasificacionService.getClasificaciones().subscribe((resp) => {
      this.listaClasificaciones = resp.data;
    });
  }

  empezarEvaluacion(id: number) {
    this.evaluacionRequest = {
      cant_estandares_cumplidos: 0,
      cant_estandares_justificados: 0,
      cant_estandares_na: 0,
      cant_estandares_nc: 0,
      clasificacion_id: id,
      finalizada: 0,
      puntaje: 0.0,
      tipo_valoracion_id: 1,
      descripcion: 'SIN EMPEZAR',
    };

    Swal.fire({
      title: 'Creando evaluación',
      text: 'Por favor espere',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    this.evaluacionService.createEvaluacion(this.evaluacionRequest).subscribe(
      (resp) => {
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'Evaluación',
          text: 'Completa la evaluación',
          confirmButtonColor: '#ff873c',
        });
        this.router.navigate(['./dashboard/evaluaciones/items', resp.data.id]);
      },
      (error: HttpErrorResponse) => {
        Swal.close();
        this.alert.error(error.error.error, '', {
          positionClass: 'toast-top-right',
          progressBar: true,
        });
      }
    );
  }
}
