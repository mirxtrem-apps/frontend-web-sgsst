import { Component, OnInit } from '@angular/core';
import { Clasificacion } from 'src/app/interfaces/response/clasificacion_response.interface';
import { Evaluacion } from 'src/app/interfaces/response/evaluacion_response';
import { EvaluacionService } from 'src/app/services/sgsst/evaluacion/evaluacion.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-evaluaciones-list',
  templateUrl: './evaluaciones-list.component.html',
  styleUrls: ['./evaluaciones-list.component.scss'],
})
export class EvaluacionesListComponent implements OnInit {
  listaEvaluaciones: Evaluacion[] = [];
  evaluacion: Evaluacion | undefined;

  constructor(private evaluacionService: EvaluacionService) {}

  ngOnInit(): void {
    this.getEvaluaciones();
  }

  getEvaluaciones() {
    this.evaluacionService.getEvaluaciones().subscribe((resp) => {
      this.listaEvaluaciones = resp.data;
    });
  }

  eliminarItem(id: number) {
    Swal.fire({
      title: 'Eliminar',
      text: '¿Estas seguro de querer eliminar este ítem? Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.evaluacionService.deleteEvaluacion(id).subscribe((resp) => {
          Swal.fire('Eliminado!', 'La clasificación fue eliminada.', 'success');
          this.getEvaluaciones();
        });
      }
    });
  }
}
