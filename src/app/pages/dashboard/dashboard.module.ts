import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { ClasificacionesListComponent } from './clasificacion/clasificaciones-list/clasificaciones-list.component';
import { EvaluacionesListComponent } from './evaluacion/evaluaciones-list/evaluaciones-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { ClasificacionesCreateComponent } from './clasificacion/clasificaciones-create/clasificaciones-create.component';
import { MiProgresoComponent } from './mi-progreso/mi-progreso.component';
import { AdminModule } from './admin/admin.module';
import { ClasificacionesDetailsComponent } from './clasificacion/clasificaciones-details/clasificaciones-details.component';
import { MiEmpresaComponent } from './account/mi-empresa/mi-empresa.component';
import { EvaluacionesCreateComponent } from './evaluacion/evaluaciones-create/evaluaciones-create.component';
import { EvaluacionItemsComponent } from './evaluacion/evaluacion-items/evaluacion-items.component';
import { EvaluacionesDetailsComponent } from './evaluacion/evaluaciones-details/evaluaciones-details.component';


@NgModule({
  declarations: [
    DashboardComponent,
    ClasificacionesListComponent,
    ClasificacionesCreateComponent,
    ClasificacionesDetailsComponent,
    MiEmpresaComponent,
    EvaluacionesListComponent,
    EvaluacionesCreateComponent,
    EvaluacionItemsComponent,
    EvaluacionesDetailsComponent,
    SidebarComponent,
    MiProgresoComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AdminModule,
    DashboardRoutingModule,
  ],
  exports: [
    AdminModule,
    DashboardRoutingModule,
  ]
})
export class DashboardModule { }
