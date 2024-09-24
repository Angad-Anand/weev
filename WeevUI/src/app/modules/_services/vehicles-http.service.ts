import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
const LAPI_URL = `${environment.localApiUrl}/Vehicles`;

@Injectable({
  providedIn: 'root'
})
export class VehiclesHttpService {

    
  constructor(private http: HttpClient) { }
  

  getTwoWheelerData(token: string): Observable<any> {
    let headers = new HttpHeaders();    
    headers.append('Authorization', `Bearer ${token}`);       
     return this.http.get<any>(`${LAPI_URL}/TwoWheelerData`, {
       headers: headers,
     });
  }
  
  getProductDataWithID(token: string,twId:any): Observable<any> {
    
    let headers = new HttpHeaders();   
    headers.append('Authorization', `Bearer ${token}`);       
     return this.http.get<any>(`${LAPI_URL}/TwoWheeler/${twId}`, {
       headers: headers,
     });
  }
  //color name
  getTabNameWithID(token: string,twId:any): Observable<any> {
    
    let headers = new HttpHeaders();   
    headers.append('Authorization', `Bearer ${token}`);       
     return this.http.get<any>(`${LAPI_URL}/TwoImageTabName/${twId}`, {
       headers: headers,
     });
  }
  //image name
  getAllTabNameWithID(token: string,twId:any): Observable<any> {
    
    let headers = new HttpHeaders();   
    headers.append('Authorization', `Bearer ${token}`);       
     return this.http.get<any>(`${LAPI_URL}/TwoMainimagedataAll/${twId}`, {
       headers: headers,
     });
  }
  //image path
  getAllImageNameWithID(token: string,twId:any): Observable<any> {
    
    let headers = new HttpHeaders();   
    headers.append('Authorization', `Bearer ${token}`);       
     return this.http.get<any>(`${LAPI_URL}/TwoMainimagedata/${twId}`, {
       headers: headers,
     });
  }
  //color path
  getImgNameWithID(token: string,twId:any): Observable<any> {
    
    let headers = new HttpHeaders();   
    headers.append('Authorization', `Bearer ${token}`);       
     return this.http.get<any>(`${LAPI_URL}/TwoImagedata/${twId}`, {
       headers: headers,
     });
  }

  Customerenquiries(UserRegister:any): Observable<any> {    
          
     return this.http.post<any>(`${LAPI_URL}/Customerenquiries`,UserRegister);
  }
 

  }