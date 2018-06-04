import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers, HttpModule, RequestOptions, URLSearchParams, ResponseContentType } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AppService } from '../../../../app.service';

// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { id } from '@swimlane/ngx-datatable/release/utils';
@Injectable()
export class CalendarService implements Resolve<any>
{
  events: any;
  onEventsUpdated = new Subject<any>();
  headers: Headers;
  options: RequestOptions;
  constructor(private httpClient: HttpClient, private http: Http, private appService: AppService) {
    this.headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'q=0.8;application/json;q=0.9' });
    this.options = new RequestOptions({ headers: this.headers });
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    // return new Promise((resolve, reject) => {
    //     Promise.all([
    //         this.getEvents()
    //     ]).then(
    //         ([events]: [any]) => {
    //             resolve();
    //         },
    //         reject
    //     );
    // });
  }
  getAllCampaigns(): Observable<any> {
    return this.http.get(this.appService.baseUrl() + '/marketing/get_all_campaigns')
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in x service'));
  }
  createCampaign(data): Observable<any> {
    return this.http.post(this.appService.baseUrl() + '/marketing/create_campaign', data)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in x service'));
  }
  updateCampaign(data): Observable<any> {
    return this.http.put(this.appService.baseUrl() + '/marketing/update_campaign', data)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in x service'));
  }
  // tslint:disable-next-line:no-shadowed-variable
  deleteCampaignById(id): Observable<any> {
    return this.http.delete(this.appService.baseUrl() + '/marketing/delete_campaign/' + id)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in x service'));
  }
  // tslint:disable-next-line:no-shadowed-variable
  getCampaignById(id): Observable<any> {
    return this.http.get(this.appService.baseUrl() + '/marketing/get_campaign/' + id)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in x service'));
  }
  upload_campaign_file(data: FormData): Observable<any> {
    return this.http.post(this.appService.baseUrl() + '/marketing/upload_campaign_file', data)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in service'));
  }

  getCampaignFiles(campaign_id): Observable<any> {
    return this.http.get(this.appService.baseUrl() + '/marketing/get_campaign_files/' + campaign_id)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in service'));
  }
  // getEvents()
  // {
  //     return new Promise((resolve, reject) => {

  //         this.http.get('api/calendar/events')
  //             .subscribe((response: any) => {
  //                 this.events = response.data;
  //                 this.onEventsUpdated.next(this.events);
  //                 resolve(this.events);
  //             }, reject);
  //     });
  // }

  // updateEvents(events)
  // {
  //     return new Promise((resolve, reject) => {
  //         this.http.post('api/calendar/events', {
  //             id  : 'events',
  //             data: [...events]
  //         })
  //             .subscribe((response: any) => {
  //                 this.getEvents();
  //             }, reject);
  //     });
  // }

}
