import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers, HttpModule, RequestOptions, URLSearchParams, ResponseContentType } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FranchiseesService } from '../franchisees/franchisees.service';
import { AppService } from '../../../../app.service';

// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { isThursday } from 'date-fns';

@Injectable()
export class TicketingSystemService {

  headers: Headers;
  options: RequestOptions;
  constructor(private http: Http, private appService: AppService) {

    this.headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'q=0.8;application/json;q=0.9' });
    this.headers.append('Authorization','Basic ' + btoa('B8LKY57XDfxUsTz29JU0'));
    this.options = new RequestOptions({ headers: this.headers });
  }
  create_ticket(data): Observable<any> {
    return this.http.post(this.appService.freshDeskUrl() + '/api/v2/tickets', data, this.options)
    .map((res: Response) => res.json())
    .catch(error => Observable.throw('Error in x service'));
}
update_ticket(id): Observable<any> {
    return this.http.put(this.appService.freshDeskUrl() + '/api/v2/tickets/', id, this.options)
    .map((res: Response) => res.json())
    .catch(error => Observable.throw('Error in x service'));
}
get_all_ticket(): Observable<any> {
    return this.http.get(this.appService.freshDeskUrl() + '/api/v2/tickets', this.options)
    .map((res: Response) => res.json())
    .catch(error => Observable.throw('Error in x service'));
}
get_ticket_by_id(id): Observable<any> {
    return this.http.get(this.appService.freshDeskUrl() + '/api/v2/tickets/' + id, this.options)
    .map((res: Response) => res.json())
    .catch(error => Observable.throw('Error in x service'));
}
}
