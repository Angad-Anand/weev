import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { VehiclesDashboardModule } from './features/vehicles-dashboard/vehicles-dashboard.module';
import { CategoryDashboardModule } from './features/category-dashboard/category-dashboard.module';
import { HttpClientModule } from '@angular/common/http';
import { OnlyNumberDirective } from './utils/only-number.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailValidatorDirective } from './utils/email-validator.directive';
import { CustomerEnquiriesComponent } from './component/customer-enquiries/customer-enquiries.component';
import { BsModalService, ModalModule } from 'ngx-bootstrap/modal';
import { SearchPipePipe } from './search-pipe.pipe';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { MobileHeaderComponent } from './component/mobile-header/mobileHeader.component';
import { BlogsComponent } from './features/vehicles-dashboard/blogs/blogs.component';
import { ElectricVehicleBlogComponent } from './features/electric-vehicle-blog/electric-vehicle-blog.component';
import { ElectricVehicleBlogComponent2 } from './features/vehicles-dashboard/blogs/electric-vehicle-blog-2/electric-vehicle-blog-2.component';
import { ElectricVehicleBlogComponent3 } from './features/vehicles-dashboard/blogs/electric-vehicle-blog-3/electric-vehicle-blog-3.component';
import { PrivacyPolicyComponent } from './features/vehicles-dashboard/privacy-policy/privacy-policy.component';
import { BlogPageComponent } from './features/vehicles-dashboard/blog-page/blog-page.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    OnlyNumberDirective,
    EmailValidatorDirective,
    CustomerEnquiriesComponent,
    SearchPipePipe,
    MobileHeaderComponent,
    ElectricVehicleBlogComponent,
    ElectricVehicleBlogComponent2,
    ElectricVehicleBlogComponent3,
    BlogPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    VehiclesDashboardModule,
    CategoryDashboardModule,
    FormsModule, ReactiveFormsModule,
    ModalModule,
    ReactiveFormsModule,
  ],
  // providers: [BsModalService, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  providers: [BsModalService, { provide: LocationStrategy, useClass: PathLocationStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
