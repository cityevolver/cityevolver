(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _data_api_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./data-api.service */ "./src/app/data-api.service.ts");




var routes = [];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]],
            providers: [_data_api_service__WEBPACK_IMPORTED_MODULE_3__["DataApiService"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<app-issue *ngIf=\"!!issueId && issueTypes\"\r\n           [id]=\"issueId\"></app-issue>\r\n<app-map-overview *ngIf=\"!issueId && issueTypes\"></app-map-overview>\r\n<section *ngIf=\"issueTypesLoadError\">\r\n  <h3>Fatal error :-(</h3>\r\n</section>\r\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _data_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./data-api.service */ "./src/app/data-api.service.ts");



var AppComponent = /** @class */ (function () {
    function AppComponent(dataApi) {
        this.dataApi = dataApi;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.getIssueTypes();
        this.getIssue();
    };
    // refresh check
    AppComponent.prototype.ngAfterViewChecked = function () {
        var _this = this;
        setTimeout(function () {
            return _this.getIssue();
        }, 0);
    };
    // gets all issue types
    AppComponent.prototype.getIssueTypes = function () {
        var _this = this;
        this.issueTypesLoadError = false;
        this.dataApi.getIssueTypes().subscribe(function (response) {
            // tslint:disable-next-line:no-console
            console.info('IssueTypes loaded: ', response);
            _this.issueTypes = response;
        }, function (error) {
            _this.issueTypes = null;
            _this.issueTypesLoadError = true;
        });
    };
    // gets current issue
    AppComponent.prototype.getIssue = function () {
        var issueHashCode = location.hash.substr(1);
        if (issueHashCode) {
            this.issueId = issueHashCode;
        }
        else {
            this.issueId = null;
        }
    };
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_data_api_service__WEBPACK_IMPORTED_MODULE_2__["DataApiService"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _map_overview_map_overview_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./map-overview/map-overview.component */ "./src/app/map-overview/map-overview.component.ts");
/* harmony import */ var _issue_issue_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./issue/issue.component */ "./src/app/issue/issue.component.ts");
/* harmony import */ var _create_issue_create_issue_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./create-issue/create-issue.component */ "./src/app/create-issue/create-issue.component.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");









var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                _map_overview_map_overview_component__WEBPACK_IMPORTED_MODULE_5__["MapOverviewComponent"],
                _issue_issue_component__WEBPACK_IMPORTED_MODULE_6__["IssueComponent"],
                _create_issue_create_issue_component__WEBPACK_IMPORTED_MODULE_7__["CreateIssueComponent"]
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClientModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/create-issue/create-issue.component.html":
/*!**********************************************************!*\
  !*** ./src/app/create-issue/create-issue.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  create-issue works!\n</p>\n"

/***/ }),

/***/ "./src/app/create-issue/create-issue.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/create-issue/create-issue.component.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL2NyZWF0ZS1pc3N1ZS9jcmVhdGUtaXNzdWUuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/create-issue/create-issue.component.ts":
/*!********************************************************!*\
  !*** ./src/app/create-issue/create-issue.component.ts ***!
  \********************************************************/
/*! exports provided: CreateIssueComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CreateIssueComponent", function() { return CreateIssueComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var CreateIssueComponent = /** @class */ (function () {
    function CreateIssueComponent() {
    }
    CreateIssueComponent.prototype.ngOnInit = function () {
    };
    CreateIssueComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-create-issue',
            template: __webpack_require__(/*! ./create-issue.component.html */ "./src/app/create-issue/create-issue.component.html"),
            styles: [__webpack_require__(/*! ./create-issue.component.scss */ "./src/app/create-issue/create-issue.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], CreateIssueComponent);
    return CreateIssueComponent;
}());



/***/ }),

/***/ "./src/app/data-api.service.ts":
/*!*************************************!*\
  !*** ./src/app/data-api.service.ts ***!
  \*************************************/
/*! exports provided: DataApiService, IssueDetail, IssueType */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DataApiService", function() { return DataApiService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IssueDetail", function() { return IssueDetail; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IssueType", function() { return IssueType; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");



var DataApiService = /** @class */ (function () {
    function DataApiService(http) {
        this.http = http;
    }
    DataApiService.prototype.getIssue = function (id) {
        var path = 'https://ec2-3-121-125-47.eu-central-1.compute.amazonaws.com:8080/issue';
        var httpParams = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpParams"]();
        if (id !== undefined && id !== null) {
            httpParams = httpParams.set('id', id);
        }
        var requestOptions = {
            params: httpParams
        };
        return this.http.request('GET', path, requestOptions);
    };
    DataApiService.prototype.getAllIssues = function () {
        var path = 'https://ec2-3-121-125-47.eu-central-1.compute.amazonaws.com:8080/issue';
        var httpParams = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpParams"]();
        var requestOptions = {
            params: httpParams
        };
        return this.http.request('GET', path, requestOptions);
    };
    DataApiService.prototype.getIssueTypes = function () {
        var path = 'https://ec2-3-121-125-47.eu-central-1.compute.amazonaws.com:8080/issue_type';
        var httpParams = new _angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpParams"]();
        var requestOptions = {
            params: httpParams
        };
        return this.http.request('GET', path, requestOptions);
    };
    DataApiService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
    ], DataApiService);
    return DataApiService;
}());

var IssueDetail = /** @class */ (function () {
    function IssueDetail() {
    }
    return IssueDetail;
}());

var IssueType = /** @class */ (function () {
    function IssueType() {
    }
    return IssueType;
}());



/***/ }),

/***/ "./src/app/issue/issue.component.html":
/*!********************************************!*\
  !*** ./src/app/issue/issue.component.html ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container *ngIf=\"issueData\">\n  <section class=\"container\">\n    <h1>{{issueData.title}}</h1>\n    <p>{{issueData.description}}</p>\n  </section>\n</ng-container>\n<section *ngIf=\"issueLoadError\">\n  <h3>Not found :-(</h3>\n</section>\n"

/***/ }),

/***/ "./src/app/issue/issue.component.scss":
/*!********************************************!*\
  !*** ./src/app/issue/issue.component.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "section.container {\n  max-width: 1000px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvaXNzdWUvRDpcXERldmVsb3BtZW50XFxjaXR5ZXZvbHZlclxcYW5ndWxhci1zcmMvc3JjXFxhcHBcXGlzc3VlXFxpc3N1ZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGlCQUFpQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvaXNzdWUvaXNzdWUuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJzZWN0aW9uLmNvbnRhaW5lciB7XHJcbiAgbWF4LXdpZHRoOiAxMDAwcHg7XHJcbn1cclxuIl19 */"

/***/ }),

/***/ "./src/app/issue/issue.component.ts":
/*!******************************************!*\
  !*** ./src/app/issue/issue.component.ts ***!
  \******************************************/
/*! exports provided: IssueComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IssueComponent", function() { return IssueComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _data_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../data-api.service */ "./src/app/data-api.service.ts");



var IssueComponent = /** @class */ (function () {
    function IssueComponent(dataApi) {
        this.dataApi = dataApi;
    }
    Object.defineProperty(IssueComponent.prototype, "id", {
        get: function () {
            return this.idPrivate;
        },
        set: function (value) {
            if (this.idPrivate !== value) {
                this.idPrivate = value;
                this.getIssue();
            }
        },
        enumerable: true,
        configurable: true
    });
    IssueComponent.prototype.ngOnInit = function () {
        this.getIssue();
    };
    // gets current issue
    IssueComponent.prototype.getIssue = function () {
        var _this = this;
        this.issueLoadError = false;
        this.cancelReload = true;
        this.dataApi.getIssue(this.id).subscribe(function (response) {
            _this.issueData = response;
        }, function (error) {
            _this.issueData = null;
            _this.issueLoadError = true;
            _this.cancelReload = false;
            setTimeout(function () {
                if (!_this.cancelReload) {
                    location.hash = '';
                }
            }, 2000);
        });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [String])
    ], IssueComponent.prototype, "id", null);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
    ], IssueComponent.prototype, "issueTypes", void 0);
    IssueComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-issue',
            template: __webpack_require__(/*! ./issue.component.html */ "./src/app/issue/issue.component.html"),
            styles: [__webpack_require__(/*! ./issue.component.scss */ "./src/app/issue/issue.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_data_api_service__WEBPACK_IMPORTED_MODULE_2__["DataApiService"]])
    ], IssueComponent);
    return IssueComponent;
}());



/***/ }),

/***/ "./src/app/map-overview/map-overview.component.html":
/*!**********************************************************!*\
  !*** ./src/app/map-overview/map-overview.component.html ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<ng-container *ngIf=\"allIssuesData\">\n  <section class=\"container\">\n    <h1>\n      Welcome to {{ title }}!\n    </h1>\n    <h2>Here is the map of issues you can help to solve by your vote! </h2>\n\n    <p *ngFor=\"let issue of allIssuesData\">\n      <a [href]=\"'#' + issue.id\">{{issue.title}}</a>\n    </p>\n  </section>\n</ng-container>\n<section *ngIf=\"issuesLoadError\">\n  <h3>Failed loading all issues :-(</h3>\n</section>\n"

/***/ }),

/***/ "./src/app/map-overview/map-overview.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/map-overview/map-overview.component.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "section.container {\n  max-width: 1000px; }\n\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAvbWFwLW92ZXJ2aWV3L0Q6XFxEZXZlbG9wbWVudFxcY2l0eWV2b2x2ZXJcXGFuZ3VsYXItc3JjL3NyY1xcYXBwXFxtYXAtb3ZlcnZpZXdcXG1hcC1vdmVydmlldy5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGlCQUFpQixFQUFBIiwiZmlsZSI6InNyYy9hcHAvbWFwLW92ZXJ2aWV3L21hcC1vdmVydmlldy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbInNlY3Rpb24uY29udGFpbmVyIHtcclxuICBtYXgtd2lkdGg6IDEwMDBweDtcclxufVxyXG4iXX0= */"

/***/ }),

/***/ "./src/app/map-overview/map-overview.component.ts":
/*!********************************************************!*\
  !*** ./src/app/map-overview/map-overview.component.ts ***!
  \********************************************************/
/*! exports provided: MapOverviewComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MapOverviewComponent", function() { return MapOverviewComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _data_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../data-api.service */ "./src/app/data-api.service.ts");



var MapOverviewComponent = /** @class */ (function () {
    function MapOverviewComponent(dataApi) {
        this.dataApi = dataApi;
        this.title = 'City evolver APP!';
    }
    MapOverviewComponent.prototype.ngOnInit = function () {
        this.getAllIssues();
    };
    // gets all issues
    MapOverviewComponent.prototype.getAllIssues = function () {
        var _this = this;
        this.issuesLoadError = false;
        this.dataApi.getAllIssues().subscribe(function (response) {
            _this.allIssuesData = response;
        }, function (error) {
            _this.allIssuesData = null;
            _this.issuesLoadError = true;
        });
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Array)
    ], MapOverviewComponent.prototype, "issueTypes", void 0);
    MapOverviewComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-map-overview',
            template: __webpack_require__(/*! ./map-overview.component.html */ "./src/app/map-overview/map-overview.component.html"),
            styles: [__webpack_require__(/*! ./map-overview.component.scss */ "./src/app/map-overview/map-overview.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_data_api_service__WEBPACK_IMPORTED_MODULE_2__["DataApiService"]])
    ], MapOverviewComponent);
    return MapOverviewComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Development\cityevolver\angular-src\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map