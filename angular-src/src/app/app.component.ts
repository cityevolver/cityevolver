import {AfterViewChecked, Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked {

 issueId: string;

  ngOnInit() {
    this.getIssue();
  }

  ngAfterViewChecked(): void {
    setTimeout(() =>
      this.getIssue(), 0);
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
