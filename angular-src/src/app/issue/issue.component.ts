import {Component, Input, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit {

  @Input() id: string;

  constructor(private route: ActivatedRoute, private location: Location) {

  }

  ngOnInit() {
    this.getIssue();
  }

  // gets current issue
  private getIssue() {
    this.id = this.route.snapshot.paramMap.get('id');
  }
}
