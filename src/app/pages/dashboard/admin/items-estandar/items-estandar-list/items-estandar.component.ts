import { Component, OnInit } from '@angular/core';
import { ItemEstandarData } from 'src/app/interfaces/response/items_estantdar_response.interface';
import { SgsstCoreService } from 'src/app/services/sgsst/sgsst-core/sgsst-core.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-items-estandar',
  templateUrl: './items-estandar.component.html',
  styleUrls: ['./items-estandar.component.scss']
})
export class ItemsEstandarComponent implements OnInit {

  constructor(private sgsstService: SgsstCoreService) { }

  ngOnInit(): void {
    this.obtenerItems();
  }

  items: ItemEstandarData[] = [];

  obtenerItems() {
    this.sgsstService.getItemsDelEstandar().subscribe(
      (resp) => this.items = resp.data
    );
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
