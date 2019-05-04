import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit {

  @Input() id: string;

  constructor(private route: ActivatedRoute, private router: Router, private location: Location) {

  }

  ngOnInit() {
    this.getIssue();
  }

  // gets current issue
  private getIssue() {
    const issueHashCode = location.hash.substr(1);
    if (issueHashCode) {
      this.id = issueHashCode;
    } else {
      console.log('...navigating to root');

      this.router.navigateByUrl('/dashboard');
    }
  }
}
