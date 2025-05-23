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
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { BlogPageComponent } from './blog-page/blog-page.component';
import {VehicleComparisonComponent} from 'src/app/features/vehicle-comparison/vehiclecomparison.component';
import {CompareMainComponent} from 'src/app/features/vehicle-comparison/CompareMainPage/CompareMainPage.component';


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
    path: 'Bikes/Brand/:Brand', 
    component: BikesDetailsComponent 
  },
  {
    path: 'Bikes/Type/:type',
    component: BikesDetailsComponent,
  },
  {
    path: 'About',
    component: AboutComponent,
  },
  {
    path:'PrivacyPolicy',
    component:PrivacyPolicyComponent
  },
  {
    path:'BlogPageComponent',
    component:BlogPageComponent
  },
  {
    path:'Compare',
    component:VehicleComparisonComponent
  },
  {
    path: 'Compare/:twId1/:twId2/:twId3/:twId4',
    component: CompareMainComponent
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

