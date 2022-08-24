import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClasificacionRequest } from 'src/app/interfaces/request/clasificacion_request';
import { InsertItems, ItemEvaluacionObject } from 'src/app/interfaces/request/item_evaluacion_request';
import {
  ItemEstandar,
  ItemEstandarData,
} from 'src/app/interfaces/response/items_estantdar_response.interface';
import { ClasificacionService } from 'src/app/services/sgsst/clasificacion/clasificacion.service';
import { EvaluacionService } from 'src/app/services/sgsst/evaluacion/evaluacion.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-evaluacion-items',
  templateUrl: './evaluacion-items.component.html',
  styleUrls: ['./evaluacion-items.component.scss'],
})
export class EvaluacionItemsComponent implements OnInit {
  listItems: ItemEvaluacionObject[] = [];

  clasificacion?: ClasificacionRequest;
  evaluacionId: number = 0;
  numEstandares: number = 0;

  itemsDone: ItemEvaluacionObject[] = [];

  currentIndex: number = 0;
  currentItem: ItemEvaluacionObject | undefined;
  currentPercent: string = '0';
  finish: boolean = false;

  lastInsertedRow?: number;

  constructor(
    private evaluacionService: EvaluacionService,
    private clasificacionService: ClasificacionService,
    private request: ActivatedRoute,
    private router: Router,
    private alert: ToastrService
  ) {}

  ngOnInit(): void {
    this.request.params.subscribe(({ id }) => {
      this.evaluacionId = id;
      this.evaluacionService.getEvaluacionPorId(id).subscribe((resp) => {
        const clasificacionId = resp.data.clasificacion_id;

        console.log('Clasificacion ID: ', clasificacionId);

        this.clasificacionService
          .getClasificacionPorId(clasificacionId)
          .subscribe((resp) => {
            this.clasificacion = resp.data;
            this.numEstandares = this.clasificacion.num_estandares;
            this.getItemsEstandar(this.numEstandares);
          });
      });
    });
  }

  getItemsEstandar(num_estandares: number) {
    this.evaluacionService
      .getItemsEvaluacion(num_estandares)
      .subscribe((resp) => {
        let items = resp.data;
        let newList = items.map((item) => {
          let itemObj: ItemEvaluacionObject = {
            data: item,
            item: {
              evaluacion_id: this.evaluacionId,
              item_id: item.id!,
              cumple: 0,
              justifica: 0,
              no_aplica: 0,
              observacion: '',
              valor: item.valor,
            },
          };
          return itemObj;
        });
        this.listItems = newList;
        this.setCurrentItem(this.currentIndex);
        this.addItemToDone(this.currentItem!);
        this.setPercent();
        console.log(this.itemsDone);
      });
  }

  next() {
    if (
      this.currentIndex >= 0 &&
      this.currentIndex < this.listItems.length - 1
    ) {
      this.currentIndex++;
      this.setCurrentItem(this.currentIndex);
      this.addItemToDone(this.currentItem!);
      this.setPercent();
      console.log(this.itemsDone);
    }
  }

  previous() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.setCurrentItem(this.currentIndex);
      this.removeItemToDone(this.currentItem!);
      this.setPercent();
    }
    console.log(this.itemsDone);
  }

  setCurrentItem(index: number) {
    this.currentItem = this.listItems[index];
  }

  addItemToDone(item: ItemEvaluacionObject) {
    this.itemsDone.push(item);
  }

  removeItemToDone(item: ItemEvaluacionObject) {
    this.itemsDone.pop();
  }

  setPercent() {
    this.currentPercent = (
      (this.itemsDone.length / this.listItems.length) *
      100
    ).toFixed(1);
  }

  onCumpleChanged(comp: any, item: ItemEvaluacionObject) {
    console.log(comp.value);

    if (item.item.no_aplica) {
      item.item.no_aplica = 0;
      item.item.justifica = 0;
    }
  }

  onAplicaChanged(comp: any, item: ItemEvaluacionObject) {
    if (item.item.cumple) {
      item.item.cumple = 0;
    }
  }

  async insertItem(item: ItemEvaluacionObject) {
  }
  
  guardar() {
    const items: InsertItems = {
      items: this.itemsDone,
    } 
    this.evaluacionService.createItemEvaluacion(items)
    .subscribe((resp) => {
      this.router.navigate(['./dashboard/evaluaciones']);
    });
  }
}
