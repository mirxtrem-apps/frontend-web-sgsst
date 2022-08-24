import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';

import { CiclosComponent } from './ciclos/ciclos.component';
import { EstandaresMinimosComponent } from './estandares-minimos/estandares-minimos.component';
import { SubEstandaresMinimosComponent } from './sub-estandares-minimos/sub-estandares-minimos.component';
import { AdminComponent } from './admin.component';
import { ItemsEstandarCreateComponent } from './items-estandar/items-estandar-create/items-estandar-create.component';
import { ItemsEstandarDetailsComponent } from './items-estandar/items-estandar-details/items-estandar-details.component';
import { ItemsEstandarComponent } from './items-estandar/items-estandar-list/items-estandar.component';

@NgModule({
  declarations: [
    ItemsEstandarComponent,
    CiclosComponent,
    EstandaresMinimosComponent,
    SubEstandaresMinimosComponent,
    AdminComponent,
    ItemsEstandarCreateComponent,
    ItemsEstandarDetailsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
  ],
  exports: [
    AdminRoutingModule,
  ]
})
export class AdminModule { }
