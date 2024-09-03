import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable,  Subscription, of } from 'rxjs';
import {  finalize, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { VehiclesHttpService } from './vehicles-http.service';
import { AuthModel } from '../auth/_models/auth.model';
import { ICustomerenquiries } from 'src/app/_models/IUserRegistration.models';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService { 

  // public fields
  
  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;
  
constructor(
  private vehiclesHttpService: VehiclesHttpService) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);    
    this.isLoading$ = this.isLoadingSubject.asObservable();
   }

   getTwoWheelerData(): Observable<any> {
    const auth = this.getAuthFromLocalStorage();
    if (!auth ) {
      return of(undefined);
    }
    this.isLoadingSubject.next(true);
    return this.vehiclesHttpService.getTwoWheelerData(auth)
    .pipe(
      map((TwoWheeler: any) => {
        
        return TwoWheeler;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  getProductDataWithID(twId:any): Observable<any> {
    const auth = this.getAuthFromLocalStorage();
    if (!auth ) {
      return of(undefined);
    }
    this.isLoadingSubject.next(true);
    return this.vehiclesHttpService.getProductDataWithID(auth,twId)
    .pipe(
      map((TwoWheeler: any) => {
        
        return TwoWheeler;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  getOtherModelswithID(twId:any): Observable<any> {
    const auth = this.getAuthFromLocalStorage();
    if (!auth ) {
      return of(undefined);
    }
    this.isLoadingSubject.next(true);
    return this.vehiclesHttpService.getProductDataWithID(auth,twId)
    .pipe(
      map((TwoWheeler: any) => {
        
        return TwoWheeler;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }
  
  getTabNameWithID(twId:any): Observable<any> {
    const auth = this.getAuthFromLocalStorage();
    if (!auth ) {
      return of(undefined);
    }
    this.isLoadingSubject.next(true);
    return this.vehiclesHttpService.getTabNameWithID(auth,twId)
    .pipe(
      map((TwoWheeler: any) => {
        
        return TwoWheeler;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }
  getImgNameWithID(twId:any): Observable<any> {
    const auth = this.getAuthFromLocalStorage();
    if (!auth ) {
      return of(undefined);
    }
    this.isLoadingSubject.next(true);
    return this.vehiclesHttpService.getImgNameWithID(auth,twId)
    .pipe(
      map((TwoWheeler: any) => {
        
        return TwoWheeler;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }
  private getAuthFromLocalStorage(): string {
    try {      
      const authData = JSON.parse(
        localStorage.getItem('token')|| '{}'        
      );
      return authData;
    } catch (error) {
      console.error(error);
      return undefined!;
    }
  } 

  Customerenquiries(userRegistrationForm:ICustomerenquiries): Observable<any> {
    
    this.isLoadingSubject.next(true);
    return this.vehiclesHttpService.Customerenquiries(userRegistrationForm)
    .pipe(
      map((Customerenquiries: any) => {
        
        return Customerenquiries;
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

}