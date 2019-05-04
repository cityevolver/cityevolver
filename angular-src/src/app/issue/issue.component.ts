import {Component, Input, OnInit} from '@angular/core';
import {DataApiService} from "../data-api.service";

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit {

  @Input() id: string;

  constructor(protected dataApi: DataApiService) {
  }

  ngOnInit() {
    this.getIssue();
  }

  // gets current issue
  private getIssue() {
    console.log('Loading an issue with code: ', this.id);

    this.dataApi.getIssue().subscribe(response => {
      console.log('Output: ', response);
    });

    // const issueHashCode = location.hash.substr(1);
    // if (issueHashCode) {
    //   this.id = issueHashCode;
    // } else {
    //   console.log('...navigating to root');
    //
    //   this.router.navigateByUrl('/dashboard');
    // }
  }
}
