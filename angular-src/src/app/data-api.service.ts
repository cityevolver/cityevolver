import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {
  constructor(protected http: HttpClient) { }

  public getIssue(): Observable<any> {
    const path = 'https://ec2-3-121-125-47.eu-central-1.compute.amazonaws.com:8080/issue';

    let httpParams = new HttpParams();
    // if (requestId !== undefined && requestId !== null) {
    //   httpParams = httpParams.set('requestId', requestId);
    // }
    const requestOptions = {
      params: httpParams
    };

    console.log('Getting issue from', path);
    console.log('with params', requestOptions);

    return this.http.request<any>('GET', path, requestOptions);
  }
}
