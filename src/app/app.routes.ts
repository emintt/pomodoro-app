import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: async () => {
      const module = await import('./home/home.component');
      return module.HomeComponent;
    }
  },
  {
    path: 'reports',
    pathMatch: 'full',
    loadComponent: async () => {
      const module = await import('./reports/reports.component');
      return module.ReportsComponent;
    }
  }
];
