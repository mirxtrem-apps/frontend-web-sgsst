import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiEmpresaComponent } from './mi-empresa/mi-empresa.component';
import { MisEmpleadosComponent } from './mis-empleados/mis-empleados.component';
import { MisCentrosDeTrabajoComponent } from './mis-centros-de-trabajo/mis-centros-de-trabajo.component';



@NgModule({
  declarations: [
    MiEmpresaComponent,
    MisEmpleadosComponent,
    MisCentrosDeTrabajoComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AccountModule { }
