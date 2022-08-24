import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChangePasswordComponent } from './pages/auth/change-password/change-password.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { ResetPasswordComponent } from './pages/auth/reset-password/reset-password.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MiEmpresaComponent } from './pages/dashboard/account/mi-empresa/mi-empresa.component';
import { MiProgresoComponent } from './pages/dashboard/mi-progreso/mi-progreso.component';
import { ResponsablesListComponent } from './pages/dashboard/responsable-sst/responsables-list/responsables-list.component';
import { ClasificacionesListComponent } from './pages/dashboard/clasificacion/clasificaciones-list/clasificaciones-list.component';
import { ClasificacionesCreateComponent } from './pages/dashboard/clasificacion/clasificaciones-create/clasificaciones-create.component';
import { ClasificacionesDetailsComponent } from './pages/dashboard/clasificacion/clasificaciones-details/clasificaciones-details.component';
import { EvaluacionesListComponent } from './pages/dashboard/evaluacion/evaluaciones-list/evaluaciones-list.component';
import { PlanesMejoraListComponent } from './pages/dashboard/planes-mejora/planes-mejora-list/planes-mejora-list.component';
import { EmailConfirmedComponent } from './pages/auth/email-confirmed/email-confirmed.component';
import { CrearEmpresaComponent } from './pages/auth/crear-empresa/crear-empresa.component';
import { DashboardRoutingModule } from './pages/dashboard/dashboard-routing.module';
import { AdminComponent } from './pages/dashboard/admin/admin.component';
import { EstandaresMinimosComponent } from './pages/dashboard/admin/estandares-minimos/estandares-minimos.component';
import { SubEstandaresMinimosComponent } from './pages/dashboard/admin/sub-estandares-minimos/sub-estandares-minimos.component';
import { CiclosComponent } from './pages/dashboard/admin/ciclos/ciclos.component';
import { ItemsEstandarComponent } from './pages/dashboard/admin/items-estandar/items-estandar-list/items-estandar.component';
import { ItemsEstandarCreateComponent } from './pages/dashboard/admin/items-estandar/items-estandar-create/items-estandar-create.component';
import { ItemsEstandarDetailsComponent } from './pages/dashboard/admin/items-estandar/items-estandar-details/items-estandar-details.component';
import { AdminGuard } from './middlewares/admin.guard';
import { AuthGuard } from './middlewares/auth.guard';
import { EvaluacionesCreateComponent } from './pages/dashboard/evaluacion/evaluaciones-create/evaluaciones-create.component';
import { EvaluacionesDetailsComponent } from './pages/dashboard/evaluacion/evaluaciones-details/evaluaciones-details.component';
import { EvaluacionItemsComponent } from './pages/dashboard/evaluacion/evaluacion-items/evaluacion-items.component';


const routes: Routes = [
  { path: 'home', component: LandingComponent },
  { path: '404', component: NotFoundComponent },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'confirm-email',
    component: EmailConfirmedComponent,
  },
  {
    path: 'crear-empresa/:id',
    component: CrearEmpresaComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent,
  },
  {
    path: 'change-password',
    component: ChangePasswordComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [
      AuthGuard,
    ],
    children: [
      {
        path: 'mi-empresa',
        component: MiEmpresaComponent,
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [ AdminGuard ],
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
            component: CiclosComponent,
          },
          { path: '', redirectTo: '/dashboard/admin/items-estandar', pathMatch: 'full' },
        ],
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
        path: 'evaluaciones/nuevo',
        component: EvaluacionesCreateComponent,
      },
      {
        path: 'evaluaciones/:id',
        component: EvaluacionesDetailsComponent,
      },
      {
        path: 'evaluaciones/items/:id',
        component: EvaluacionItemsComponent,
      },
      {
        path: 'planes-de-mejora',
        component: PlanesMejoraListComponent,
      },
      { path: '', redirectTo: '/dashboard/clasificaciones', pathMatch: 'full' },
    ]
  },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {}
