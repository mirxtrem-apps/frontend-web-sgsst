import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ClasificacionesListComponent } from './clasificacion/clasificaciones-list/clasificaciones-list.component';
import { MiProgresoComponent } from './mi-progreso/mi-progreso.component';
import { MiEmpresaComponent } from './account/mi-empresa/mi-empresa.component';
import { EvaluacionesListComponent } from './evaluacion/evaluaciones-list/evaluaciones-list.component';
import { ResponsablesListComponent } from './responsable-sst/responsables-list/responsables-list.component';
import { PlanesMejoraListComponent } from './planes-mejora/planes-mejora-list/planes-mejora-list.component';
import { ClasificacionesCreateComponent } from './clasificacion/clasificaciones-create/clasificaciones-create.component';
import { ClasificacionesDetailsComponent } from './clasificacion/clasificaciones-details/clasificaciones-details.component';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { EstandaresMinimosComponent } from './admin/estandares-minimos/estandares-minimos.component';
import { SubEstandaresMinimosComponent } from './admin/sub-estandares-minimos/sub-estandares-minimos.component';
import { CiclosComponent } from './admin/ciclos/ciclos.component';
import { ItemsEstandarComponent } from './admin/items-estandar/items-estandar-list/items-estandar.component';
import { ItemsEstandarCreateComponent } from './admin/items-estandar/items-estandar-create/items-estandar-create.component';
import { ItemsEstandarDetailsComponent } from './admin/items-estandar/items-estandar-details/items-estandar-details.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'mi-empresa',
        component: MiEmpresaComponent,
      },
      {
        path: 'mi-progreso',
        component: MiProgresoComponent,
      },
      {
        path: 'responsables',
        component: ResponsablesListComponent,
      },
      {
        path: 'clasificaciones',
        component: ClasificacionesListComponent,
      },
      {
        path: 'clasificaciones/nuevo',
        component: ClasificacionesCreateComponent,
      },
      {
        path: 'clasificaciones/:id',
        component: ClasificacionesDetailsComponent,
      },
      {
        path: 'evaluaciones',
        component: EvaluacionesListComponent,
      },
      {
        path: 'planes-de-mejora',
        component: PlanesMejoraListComponent,
      },
      {
        path: 'admin',
        component: AdminComponent,
        children: [
          {
            path: 'items-estandar',
            component: ItemsEstandarComponent,
          },
          {
            path: 'items-estandar/nuevo',
            component: ItemsEstandarCreateComponent,
          },
          {
            path: 'items-estandar/:id',
            component: ItemsEstandarDetailsComponent,
          },
          // 
          {
            path: 'estandares-minimos',
            component: EstandaresMinimosComponent,
          },
          {
            path: 'sub-estandares-minimos',
            component: SubEstandaresMinimosComponent,
          },
          {
            path: 'ciclos',
            component: CiclosComponent,
          },
          { path: '', redirectTo: '/admin/items-estandar', pathMatch: 'full' },
        ],
      },
      { path: '', redirectTo: '/dashboard/clasificaciones', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class DashboardRoutingModule {}
