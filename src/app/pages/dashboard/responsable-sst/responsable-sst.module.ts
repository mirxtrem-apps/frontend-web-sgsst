import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponsablesListComponent } from './responsables-list/responsables-list.component';
import { ResponsableCreateComponent } from './responsable-create/responsable-create.component';
import { ResponsableDetailsComponent } from './responsable-details/responsable-details.component';



@NgModule({
  declarations: [
    ResponsablesListComponent,
    ResponsableCreateComponent,
    ResponsableDetailsComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ResponsableSstModule { }
