import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

// import {CategorySelectionComponent} from './features/category-dashboard/category-selection/category-selection.component';
// import { BlogPageComponent } from './features/vehicles-dashboard/blog-page/blog-page.component';
// import { BikesDetailsComponent } from './features/category-dashboard/bikes-details/bikes-details.component';
// import { VehicleAllSpecsComponent } from './features/category-dashboard/category-selection/VehicleAllSpecs/vehichleAllSpecs.component';
// import { VehicleColorPageComponent } from './features/category-dashboard/category-selection/VehicleColorPage/vehiclecolorpage.component';
// import { ElectricVehicleBlogComponent } from './features/electric-vehicle-blog/electric-vehicle-blog.component';
// import { ElectricVehicleBlogComponent2 } from './features/vehicles-dashboard/blogs/electric-vehicle-blog-2/electric-vehicle-blog-2.component';
// import { ElectricVehicleBlogComponent3 } from './features/vehicles-dashboard/blogs/electric-vehicle-blog-3/electric-vehicle-blog-3.component';
// import { PrivacyPolicyComponent } from './features/vehicles-dashboard/privacy-policy/privacy-policy.component';
// import { AboutComponent } from './features/vehicles-dashboard/about/about.component';


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
  // {
  //   path: 'Bikes',
  //   component: BikesDetailsComponent,
  // },
  // {
  //   path: 'Cars',
  //   component: BikesDetailsComponent,
  // },
  // {
  //   path: 'Selection/:twId',
  //   component: CategorySelectionComponent,
  // },
  // // {
  // //   path: 'Selection/:twId',
  // //   component: VehicleColorPageComponent
  // // },
  // {
  //   path: 'Selection/:twId/Colors',
  //   component: VehicleColorPageComponent,
  // },
  // {
  //   path: 'Selection/:twId/Specs',
  //   component: VehicleAllSpecsComponent,
  // },
  // {
  //   path: 'Blog',
  //   component: ElectricVehicleBlogComponent,
  // },
  // {
  //   path: 'Blog2',
  //   component: ElectricVehicleBlogComponent2,
  // },
  // {
  //   path: 'Blog3',
  //   component: ElectricVehicleBlogComponent3,
  // },
  // { 
  //   path: 'Bikes/Brand/:Brand', 
  //   component: BikesDetailsComponent 
  // },
  // {
  //   path: 'Bikes/Type/:type',
  //   component: BikesDetailsComponent,
  // },
  // {
  //   path: 'About',
  //   component: AboutComponent,
  // },
  // {
  //   path:'PrivacyPolicy',
  //   component:PrivacyPolicyComponent
  // },
  // {
  //   path:'BlogPageComponent',
  //   component:BlogPageComponent
  // },
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
