import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { EstandaresMinimosComponent } from './estandares-minimos/estandares-minimos.component';
import { ItemsEstandarCreateComponent } from './items-estandar/items-estandar-create/items-estandar-create.component';
import { ItemsEstandarDetailsComponent } from './items-estandar/items-estandar-details/items-estandar-details.component';
import { ItemsEstandarComponent } from './items-estandar/items-estandar-list/items-estandar.component';
import { SubEstandaresMinimosComponent } from './sub-estandares-minimos/sub-estandares-minimos.component';

const routes: Routes = [
  {
    path: '',
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
        component: SubEstandaresMinimosComponent,
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
export class AdminRoutingModule { }
