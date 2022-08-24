import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClasificacionRequest } from 'src/app/interfaces/request/clasificacion_request';
import { Evaluacion, EvaluacionResponse } from 'src/app/interfaces/response/evaluacion_response';
import { ClasificacionService } from 'src/app/services/sgsst/clasificacion/clasificacion.service';
import { EvaluacionService } from 'src/app/services/sgsst/evaluacion/evaluacion.service';

@Component({
  selector: 'app-evaluaciones-details',
  templateUrl: './evaluaciones-details.component.html',
  styleUrls: ['./evaluaciones-details.component.scss']
})
export class EvaluacionesDetailsComponent implements OnInit {

  clasificacion?: ClasificacionRequest;
  evaluacion?: Evaluacion;
  evaluacionId: number = 0;

  constructor(
    private clasificacionService: ClasificacionService,
    private evaluacionService: EvaluacionService,
    private request: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.request.params.subscribe(({ id }) => {
      this.evaluacionId = id;
      this.evaluacionService.getEvaluacionPorId(id)
      .subscribe((resp) => {

        this.evaluacion = resp.data;
        const clasificacionId = resp.data.clasificacion_id;
        
        console.log('Clasificacion ID: ', clasificacionId);
        
        this.clasificacionService.getClasificacionPorId(clasificacionId).subscribe((resp) => {
          this.clasificacion = resp.data;
        });
      });

    });
  }

}
