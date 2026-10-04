import { Routes } from '@angular/router';
import { AdminTabsPage } from './tabs/admin-tabs.page';

export const ADMIN_ROUTES: Routes = [
  {
    path: '',
    component: AdminTabsPage,
    children: [
      { path: 'dashboard', loadComponent: () => import('./dashboard/dashboard.page').then(m => m.DashboardPage) },
      { path: 'companies', loadComponent: () => import('./companies/admin-companies.page').then(m => m.AdminCompaniesPage) },
      { path: 'students', loadComponent: () => import('./students/admin-students.page').then(m => m.AdminStudentsPage) },
      { path: 'notifications', loadComponent: () => import('./notifications/admin-notifications.page').then(m => m.AdminNotificationsPage) },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];
