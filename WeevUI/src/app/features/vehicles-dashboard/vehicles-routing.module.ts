import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BikesDetailsComponent } from '../category-dashboard/bikes-details/bikes-details.component';
import { CategorySelectionComponent } from '../category-dashboard/category-selection/category-selection.component';
import { VehicleColorPageComponent } from '../category-dashboard/category-selection/VehicleColorPage/vehiclecolorpage.component';
import { VehicleAllSpecsComponent } from '../category-dashboard/category-selection/VehicleAllSpecs/vehichleAllSpecs.component';
import { ElectricVehicleBlogComponent } from './blogs/electric-vehicle-blog/electric-vehicle-blog.component';
import { ElectricVehicleBlogComponent2 } from './blogs/electric-vehicle-blog-2/electric-vehicle-blog-2.component';
import { ElectricVehicleBlogComponent3 } from './blogs/electric-vehicle-blog-3/electric-vehicle-blog-3.component';
import { AboutComponent } from './about/about.component';
// import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'Bikes',
    component: BikesDetailsComponent,
  },
  {
    path: 'Cars',
    component: BikesDetailsComponent,
  },
  {
    path: 'Selection/:twId',
    component: CategorySelectionComponent,
  },
  // {
  //   path: 'Selection/:twId',
  //   component: VehicleColorPageComponent
  // },
  {
    path: 'Selection/:twId/Colors',
    component: VehicleColorPageComponent,
  },
  {
    path: 'Selection/:twId/Specs',
    component: VehicleAllSpecsComponent,
  },
  {
    path: 'Blog',
    component: ElectricVehicleBlogComponent,
  },
  {
    path: 'Blog2',
    component: ElectricVehicleBlogComponent2,
  },
  {
    path: 'Blog3',
    component: ElectricVehicleBlogComponent3,
  },
  { 
    path: 'Bikes/:Brand', 
    component: BikesDetailsComponent 
  },
  {
    path: 'Bikes/:type',
    component: BikesDetailsComponent,
  },
  {
    path: 'About',
    component: AboutComponent,
  },
  //     {
  //   path:'Login',
  //   component:LoginComponent
  // },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehiclesRoutingModule {}
