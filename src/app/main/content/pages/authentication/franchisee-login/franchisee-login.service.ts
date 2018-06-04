import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers, HttpModule, RequestOptions, URLSearchParams, ResponseContentType } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AppService} from '../../../../../app.service';

// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
@Injectable()
export class FranchiseeLoginService {
  headers: Headers;
  options: RequestOptions;
  constructor(private http: Http,  private appService: AppService) {

    this.headers = new Headers({ 'Content-Type' : 'application/json', 'Accept' : 'q=0.8;application/json;q=0.9' });
    this.options = new RequestOptions({ headers : this.headers, withCredentials: true });
  }
  franchiseeloginreset(user): Observable<any>{
    return this.http.post(this.appService.baseUrl()+'/authenticate/reset_password', user, this.options)
    .map((res: Response) => res.json());
  //  .catch(error => Observable.throw('Error in service'));
  }
  franchiseelogin(user): Observable<any>{
    return this.http.post(this.appService.baseUrl()+'/authenticate/franchisee-login', user, this.options)
    .map((res: Response) => res.json());
  //  .catch(error => Observable.throw('Error in service'));
  }
viewFranchiseeById(id): Observable<any> {
  return this.http.get(this.appService.baseUrl() + '/franchisee/get_franchisee/' + id)
  .map((res: Response) => res.json())
  .catch(error => Observable.throw('Error in x service'));
}
}
