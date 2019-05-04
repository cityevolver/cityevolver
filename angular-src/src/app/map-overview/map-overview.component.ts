import {Component, Input, OnInit} from '@angular/core';
import {DataApiService, IssueDetail, IssueType} from '../data-api.service';

@Component({
  selector: 'app-map-overview',
  templateUrl: './map-overview.component.html',
  styleUrls: ['./map-overview.component.scss']
})
export class MapOverviewComponent implements OnInit {
  title = 'City evolver APP!';

  @Input() issueTypes: Array<IssueType>;

  // all loaded data about issues
  allIssuesData: Array<IssueDetail>;
  // issue not found
  issuesLoadError: boolean;

  constructor(protected dataApi: DataApiService) { }

  ngOnInit() {
    this.getAllIssues();
  }


  // gets all issues
  private getAllIssues() {
    this.issuesLoadError = false;

    this.dataApi.getAllIssues().subscribe(response => {
      this.allIssuesData = response;
    }, error => {
      this.allIssuesData = null;
      this.issuesLoadError = true;
    });
  }
}
