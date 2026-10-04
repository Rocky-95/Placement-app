import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard, loginRedirectGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [loginRedirectGuard],
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'student',
    canActivate: [authGuard('student')],
    loadChildren: () => import('./student/student.routes').then(m => m.STUDENT_ROUTES),
  },
  {
    path: 'admin',
    canActivate: [authGuard('admin')],
    loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES),
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
