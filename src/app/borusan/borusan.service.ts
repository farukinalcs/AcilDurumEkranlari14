import { HttpClient,HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Move } from './_models/move';

const API = `${environment.apiGM}`;
const API2 = `${environment.apiGC}`;

@Injectable({
  providedIn: 'root'
})

export class BorusanService {
  
  // locationService:string="0"

  duzenlemeTarih:string;
  constructor(private http:HttpClient) { }

  getData() : Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json', 
      'Access-Control-Allow-Origin': '10.28.64.4:1323',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });

    let data = {
        "userName": "Meyer",
        "password": "c2xxd2VvZjQ1NjgzMTIyNTc5MTIzcw",
        "status":"0",
        "LokasyonStatus":"1"
    }

    let options = {headers : headers}
    
  return this.http.post(API,data,options);
  //  return this.http.post(API,{'headers':headers,"body":body})
  }

  getTerminal(): Observable<any>{
    let headers = new HttpHeaders({
      'Content-Type': 'application/json', 
      'Access-Control-Allow-Origin': '10.28.64.4:1323',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });

    let data = {
        "userName": "Meyer",
        "password": "c2xxd2VvZjQ1NjgzMTIyNTc5MTIzcw",
        "status":0
    }

    let options = {headers : headers}
    
  return this.http.post(API2,data,options);
  }


}
