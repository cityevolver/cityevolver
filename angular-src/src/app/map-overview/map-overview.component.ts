import {Component, Input, OnInit} from '@angular/core';
import {DataApiService, IssueDetail, IssueType} from '../data-api.service';

// declare variable for maps (leaflet)
declare let L;

@Component({
  selector: 'app-map-overview',
  templateUrl: './map-overview.component.html',
  styleUrls: ['./map-overview.component.scss']
})
export class MapOverviewComponent implements OnInit {
  title = 'CITIQR!';

  @Input() issueTypes: Array<IssueType>;

  // all loaded data about issues
  allIssuesData: Array<IssueDetail>;
  // issue not found
  issuesLoadError: boolean;

  listOfIssuesVisible: boolean;

  constructor(protected dataApi: DataApiService) { }

  ngOnInit() {
    this.getAllIssues();




    // var mymap = L.map('mapid').setView([51.505, -0.09], 13);
  }


  // gets all issues
  private getAllIssues() {
    this.issuesLoadError = false;

    this.dataApi.getAllIssues().subscribe(response => {
      this.allIssuesData = response;
      setTimeout(() =>
        this.loadMap(), 0);
    }, error => {
      this.allIssuesData = null;
      this.issuesLoadError = true;
    });
  }

  private loadMap() {
    // const map = L.map('mapid').setView([51.505, -0.09], 13);
    const map = L.map('mapid').setView([50.092, 14.414], 12);

    const pin1 = L.icon({
      iconUrl: 'img/pin1.png',
      shadowUrl: 'marker-shadow.png',

      iconSize:     [30, 55], // size of the icon
      shadowSize:   [50, 64], // size of the shadow
      iconAnchor:   [15, 54], // point of the icon which will correspond to marker's location
      shadowAnchor: [15, 62],  // the same for the shadow
      popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    const pin2 = L.icon({
      iconUrl: 'img/pin2.png',
      shadowUrl: 'marker-shadow.png',

      iconSize:     [30, 55], // size of the icon
      shadowSize:   [50, 64], // size of the shadow
      iconAnchor:   [15, 54], // point of the icon which will correspond to marker's location
      shadowAnchor: [15, 62],  // the same for the shadow
      popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    const pin3 = L.icon({
      iconUrl: 'img/pin3.png',
      shadowUrl: 'marker-shadow.png',

      iconSize:     [30, 55], // size of the icon
      shadowSize:   [50, 64], // size of the shadow
      iconAnchor:   [15, 54], // point of the icon which will correspond to marker's location
      shadowAnchor: [15, 62],  // the same for the shadow
      popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    const pin4 = L.icon({
      iconUrl: 'img/pin4.png',
      shadowUrl: 'marker-shadow.png',

      iconSize:     [30, 55], // size of the icon
      shadowSize:   [50, 64], // size of the shadow
      iconAnchor:   [15, 54], // point of the icon which will correspond to marker's location
      shadowAnchor: [15, 62],  // the same for the shadow
      popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });


    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    for (const issue of this.allIssuesData) {
      L.marker([issue.geo_y, issue.geo_x], {icon: issue.issue_type.id === 1 ? pin1 :
                                                  issue.issue_type.id === 2 ? pin2 :
                                                  issue.issue_type.id === 3 ? pin3 :  pin4}).addTo(map)
        .bindPopup('<a href="#' + issue.id + '">' + issue.title + '</a>');
    }
  }
}
