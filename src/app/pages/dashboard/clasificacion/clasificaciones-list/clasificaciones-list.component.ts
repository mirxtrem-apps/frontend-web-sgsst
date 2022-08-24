import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Clasificacion } from 'src/app/interfaces/response/clasificacion_response.interface';
import { ClasificacionService } from 'src/app/services/sgsst/clasificacion/clasificacion.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-clasificaciones-list',
  templateUrl: './clasificaciones-list.component.html',
  styleUrls: ['./clasificaciones-list.component.scss'],
})
export class ClasificacionesListComponent implements OnInit {
  listaClasificaciones: Clasificacion[] = [];

  constructor(
    private clasificacionService: ClasificacionService, 
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getClasificaciones();
  }
  
  getClasificaciones() {
    this.clasificacionService.getClasificaciones().subscribe((resp) => {
      this.listaClasificaciones = resp.data;
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
        this.clasificacionService.deleteClasificacion(id).subscribe((resp) => {
          Swal.fire('Eliminado!', 'La clasificación fue eliminada.', 'success');
          this.getClasificaciones();
        });
      }
    });
  }
}
