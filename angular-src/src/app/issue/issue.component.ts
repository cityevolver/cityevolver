import {Component, Input, OnInit} from '@angular/core';
import {DataApiService, IssueDetail, IssueType, IssueVote} from '../data-api.service';

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
  // all possible votes for the issue
  issueVotes: Array<IssueVote>;

  // issue not found
  issueLoadError: boolean;
  // issue votes not found
  issueVotesLoadError: boolean;
  cancelReload: boolean;

  //TODO from cookie
  userAlreadyVoted: boolean;

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
      this.getVotesOnIssue();
    }, error => {
      this.issueData = null;
      this.issueVotes = null;
      this.issueLoadError = true;
      this.cancelReload = false;

      setTimeout(() => {
        if (!this.cancelReload) {
          location.hash = '';
        }
      }, 2000);
    });
  }

  // gets all possible votes on an issue
  private getVotesOnIssue() {
    this.issueVotesLoadError = false;

    this.dataApi.getIssueVotes(this.id).subscribe(response => {
      this.issueVotes = response;
    }, error => {
      this.issueVotes = null;
      this.issueVotesLoadError = true;
    });
  }

  // user has voted
  userVoted(responseId: number) {
    this.dataApi.setVote(this.id, responseId).subscribe(response => {
      this.userAlreadyVoted = true;
      this.getIssue();
    }, error => {
      console.error(error);
      this.issueVotes = null;
      this.issueVotesLoadError = true;
    });
  }

  //go back
  buttonBackClicked() {
    location.hash = '';
  }
}


