import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiclesDashboardComponent } from './vehicles-dashboard/vehicles-dashboard.component';
import { VehiclesRoutingModule } from './vehicles-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VehiclesCategoryComponent } from './vehicles-category/vehicles-category.component';
import { RecentVehiclesComponent } from './recent-vehicles/recent-vehicles.component';
import { SerachMeComponent } from './serach-me/serach-me.component';
import { BlogsComponent } from './blogs/blogs.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from 'src/app/modules/auth/_services/auth-interceptor';
import { AuthService } from 'src/app/modules/auth/_services/auth.service';
import { AuthGuardService } from 'src/app/modules/auth/_services/auth-guard.service';
// import { VehicleColorPageComponent } from '../category-dashboard/category-selection/VehicleColorPage/VehicleColorPage.component'; // Add this line





@NgModule({
  declarations: [
    VehiclesDashboardComponent,
    DashboardComponent,
    VehiclesCategoryComponent,
    RecentVehiclesComponent,
    SerachMeComponent,
    BlogsComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,FormsModule, ReactiveFormsModule,
    VehiclesRoutingModule
  ],
  providers: [ 
    AuthService, AuthGuardService,  
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class VehiclesDashboardModule { }
