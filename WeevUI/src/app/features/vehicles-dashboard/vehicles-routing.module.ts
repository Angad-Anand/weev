import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BikesDetailsComponent } from '../category-dashboard/bikes-details/bikes-details.component';
import { CategorySelectionComponent } from '../category-dashboard/category-selection/category-selection.component';
import { VehicleColorPageComponent } from '../category-dashboard/category-selection/VehicleColorPage/vehiclecolorpage.component';
// import { LoginComponent } from './login/login.component';



const routes: Routes = [
    {
      path: '',
      component: DashboardComponent,
      redirectTo: '', pathMatch: 'full' },     
      {
        path: 'Bikes',
        component: BikesDetailsComponent
      },{
        path: 'Cars',
        component: BikesDetailsComponent
      },
      // {
      //   path: 'Selection/:twId',
      //   component: CategorySelectionComponent
      // },  
      {
        path: 'Selection/:twId',
        component: VehicleColorPageComponent
      },  
      {
        path: 'Selection/:twId/Colors',
        component: VehicleColorPageComponent
      }, 
  //     {
  //   path:'Login', 
  //   component:LoginComponent
  // },
{ path: '**', redirectTo: '' }

  ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class VehiclesRoutingModule { }

  