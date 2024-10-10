import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BikesDetailsComponent } from './bikes-details/bikes-details.component';
import { CategoryRoutingModule } from './category-routing.module';
import { CategorySelectionComponent } from './category-selection/category-selection.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { VehicleColorPageComponent } from './category-selection/VehicleColorPage/vehiclecolorpage.component';
import { VehicleAllSpecsComponent } from './category-selection/VehicleAllSpecs/vehichleAllSpecs.component';
import { CategorynavbarComponent } from './category-selection/categorynavbar/categorynavbar.component';


@NgModule({
  declarations: [
    DashboardComponent,
    BikesDetailsComponent,
    CategorySelectionComponent,
    VehicleColorPageComponent,
    VehicleAllSpecsComponent,
    CategorynavbarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CategoryRoutingModule,
    FormsModule
  ],
})
export class CategoryDashboardModule {}
