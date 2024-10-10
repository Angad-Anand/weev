import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

import {CategorySelectionComponent} from './features/category-dashboard/category-selection/category-selection.component';

// import { DashboardComponent } from './features/category-dashboard/dashboard/dashboard.component';


const routes: Routes = [
  // {
  //   path:'Login', 
  //   component:LoginComponent
  // },

  {
    path: '',
    loadChildren: () => import('./features/vehicles-dashboard/vehicles-dashboard.module')
    .then(m => m.VehiclesDashboardModule)
  },
];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  bootstrap: [AppComponent],
  // imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }

//export const routing = RouterModule.forRoot(routes);
