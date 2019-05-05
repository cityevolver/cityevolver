import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {
  baseUrl = 'https://ec2-3-121-125-47.eu-central-1.compute.amazonaws.com:8080';

  constructor(protected http: HttpClient) { }

  public getIssue(id: string): Observable<IssueDetail> {
    const path = this.baseUrl + '/issue';

    let httpParams = new HttpParams();
    if (id !== undefined && id !== null) {
      httpParams = httpParams.set('id', id);
    }
    const requestOptions = {
      params: httpParams
    };

    return this.http.request<any>('GET', path, requestOptions);
  }

  public getIssueVotes(issueId: string): Observable<Array<IssueVote>> {
    const path = this.baseUrl + '/response';

    let httpParams = new HttpParams();
    if (issueId !== undefined && issueId !== null) {
      httpParams = httpParams.set('issue', issueId);
    }
    const requestOptions = {
      params: httpParams
    };

    return this.http.request<any>('GET', path, requestOptions);
  }

  public getAllIssues(): Observable<Array<IssueDetail>> {
    const path = this.baseUrl + '/issue';

    const httpParams = new HttpParams();
    const requestOptions = {
      params: httpParams
    };

    return this.http.request<any>('GET', path, requestOptions);
  }

  public getIssueTypes(): Observable<Array<IssueType>> {
    const path = this.baseUrl + '/issue_type';

    const httpParams = new HttpParams();
    const requestOptions = {
      params: httpParams
    };

    return this.http.request<any>('GET', path, requestOptions);
  }

  public setVote(issueId: string, voteId: number): Observable<any> {
    const path = this.baseUrl + '/vote';

    let httpParams = new HttpParams();
    if (issueId !== undefined && issueId !== null) {
      httpParams = httpParams.set('issue', issueId);
    }
    if (voteId !== undefined && voteId !== null) {
      httpParams = httpParams.set('response', voteId.toString());
    }
    const requestOptions = {
      params: httpParams
    };

    return this.http.request<any>('POST', path, requestOptions);
  }
}

export class IssueDetail {
  id: string;
  title: string;
  description: string;
  issue_type: IssueType;
  image_url: string;
  author: string;
  geo_x: number;
  geo_y: number;
}

export class IssueType {
  id: number;
  text: string;
}

export class IssueVote {
  id: number;
  text: string;
  vote_count: number;
  icon_code: string;
  can_have_message: boolean;
}
