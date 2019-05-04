import {Component, Input, OnInit} from '@angular/core';
import {DataApiService, IssueDetail, IssueType} from '../data-api.service';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit {
  private idPrivate: string;
  @Input() set id(value: string) {
    if (this.idPrivate !== value) {
      this.idPrivate = value;
      this.getIssue();
    }
  }
  get id(): string {
    return this.idPrivate;
  }

  @Input() issueTypes: Array<IssueType>;

  // all loaded data about the issue
  issueData: IssueDetail;

  // issue not found
  issueLoadError: boolean;
  cancelReload: boolean;

  constructor(protected dataApi: DataApiService) { }

  ngOnInit() {
    this.getIssue();
  }

  // gets current issue
  private getIssue() {
    this.issueLoadError = false;
    this.cancelReload = true;

    this.dataApi.getIssue(this.id).subscribe(response => {
      this.issueData = response;
    }, error => {
      this.issueData = null;
      this.issueLoadError = true;
      this.cancelReload = false;

      setTimeout(() => {
        if (!this.cancelReload) {
          location.hash = '';
        }
      }, 2000);
    });
  }
}


