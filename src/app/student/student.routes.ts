import { Routes } from '@angular/router';
import { StudentTabsPage } from './tabs/student-tabs.page';

export const STUDENT_ROUTES: Routes = [
  {
    path: '',
    component: StudentTabsPage,
    children: [
      { path: 'home', loadComponent: () => import('./home/home.page').then(m => m.HomePage) },
      { path: 'companies', loadComponent: () => import('./companies/companies.page').then(m => m.CompaniesPage) },
      { path: 'courses', loadComponent: () => import('./courses/courses.page').then(m => m.CoursesPage) },
      { path: 'chat', loadComponent: () => import('./chat/chat.page').then(m => m.ChatPage) },
      { path: 'prediction', loadComponent: () => import('./prediction/prediction.page').then(m => m.PredictionPage) },
      { path: 'notifications', loadComponent: () => import('./notifications/notifications.page').then(m => m.NotificationsPage) },
      { path: 'profile', loadComponent: () => import('./profile/profile.page').then(m => m.ProfilePage) },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];
