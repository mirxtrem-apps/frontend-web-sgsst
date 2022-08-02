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


@NgModule({
  declarations: [
    DashboardComponent,
    ClasificacionesListComponent,
    ClasificacionesCreateComponent,
    EvaluacionesListComponent,
    SidebarComponent,
    MiProgresoComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    DashboardRoutingModule,
  ]
})
export class DashboardModule { }
