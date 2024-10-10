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


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    OnlyNumberDirective,
    EmailValidatorDirective,
    CustomerEnquiriesComponent,
    SearchPipePipe,
    MobileHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    VehiclesDashboardModule,
    CategoryDashboardModule,
    FormsModule, ReactiveFormsModule,
    ModalModule
  ],
  // providers: [BsModalService, { provide: LocationStrategy, useClass: HashLocationStrategy }],
  providers: [BsModalService, { provide: LocationStrategy, useClass: PathLocationStrategy }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
