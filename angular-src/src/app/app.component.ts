import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {DataApiService, IssueType} from './data-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked {

  issueId: string;

  issueTypes: Array<IssueType>;

  issueTypesLoadError: boolean;

  constructor(protected dataApi: DataApiService) {}

  ngOnInit() {
    this.getIssueTypes();
    this.getIssue();
  }

  // refresh check
  ngAfterViewChecked(): void {
    setTimeout(() =>
      this.getIssue(), 0);
  }

  // gets all issue types
  private getIssueTypes() {
    this.issueTypesLoadError = false;
    this.dataApi.getIssueTypes().subscribe(response => {
      // tslint:disable-next-line:no-console
      console.info('IssueTypes loaded: ', response);
      this.issueTypes = response;
    }, error => {
      this.issueTypes = null;
      this.issueTypesLoadError = true;
    });
  }

  // gets current issue
  private getIssue() {
    const issueHashCode = location.hash.substr(1);
    if (issueHashCode) {
      this.issueId = issueHashCode;
    } else {
      this.issueId = null;
    }
  }



}
