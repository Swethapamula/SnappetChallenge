import { Injectable } from '@angular/core';
import {HttpClient, HttpEventType, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError, last, map, tap} from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class ProgressreportService {

  _baseUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // getreport( )
  // {
  //    console.log("in service");
  //    return  this.http.get<any>("http://localhost:3000/exercise-reports");
  // }

  getFormFieldsData()
  {
   return  this.http.get<any>(`${this._baseUrl}/filter`)
    .pipe( map(this.mapResponse),
      last(),
      catchError(async (error) => console.log(error))
    );
  }

  getClassReport(data:any)
  {
     const httpheader = new HttpHeaders({ 'Content-Type': 'application/json'});
     let options = {
      headers: httpheader
         };        
    
    return this.http.post<any>(`${this._baseUrl}/reports`,data,options).pipe(
      map(this.mapResponse),
      last(),
      catchError(async (error) => console.log(error))
    );
  }
  getSelectedUser(event:any)
  {
    return this.http.get<any>(`${this._baseUrl}/progress?student_id=${event}`) .pipe( map(this.mapResponse),
    last(),
    catchError(async (error) => console.log(error))
  );
  }

  getClassReportBySelection(filter:any)
  {
    
    return this.http.post(`${this._baseUrl}/reports`, filter).pipe(
      map(this.mapResponse),
      last(),
      catchError(async (error) => console.log(error))
    );
  }

   mapResponse(event:any): any {
    return event.data;
  } 
 }
  

  