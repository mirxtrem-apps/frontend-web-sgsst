import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-clasificaciones-list',
  templateUrl: './clasificaciones-list.component.html',
  styleUrls: ['./clasificaciones-list.component.scss']
})
export class ClasificacionesListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  eliminarItem() {

    Swal.fire({
      title: 'Eliminar',
      text: "¿Estas seguro de querer eliminar este ítem? Esta acción no se puede deshacer.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Eliminado!',
          'La clasificación fue eliminada.',
          'success'
        )
      }
    })
  }

}
