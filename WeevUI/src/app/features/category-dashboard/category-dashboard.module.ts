import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BikesDetailsComponent } from './bikes-details/bikes-details.component';
import { CategoryRoutingModule } from './category-routing.module';
import { CategorySelectionComponent } from './category-selection/category-selection.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { VehicleColorPageComponent } from '../category-dashboard/category-selection/VehicleColorPage/VehicleColorPage.component'; // Add this line

@NgModule({
  declarations: [
    DashboardComponent,
    BikesDetailsComponent,
    CategorySelectionComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CategoryRoutingModule,
  ],
})
export class CategoryDashboardModule {}
