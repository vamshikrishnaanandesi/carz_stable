import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
// import { Observable } from 'rxjs/Observable';
// tslint:disable-next-line:import-blacklist
import {Observable} from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers, HttpModule, RequestOptions, URLSearchParams, ResponseContentType } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AppService} from '../../../../app.service';

// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FranchiseesService{
  headers: Headers;
  options: RequestOptions;
  constructor(private http: Http, private appService: AppService) {
    this.headers = new Headers({ 'Content-Type' : 'application/json', 'Accept' : 'q=0.8;application/json;q=0.9' });
    this.options = new RequestOptions({ headers : this.headers });
}
  getAllFranchisees(): Observable<any> {


    return this.http.get(this.appService.baseUrl() + '/franchisee/get_franchisees')


    .map((res: Response) => res.json())
    .catch(error => Observable.throw('Error in x service'));
}
  viewFranchiseeById(id): Observable<any> {



  return this.http.get(this.appService.baseUrl() + '/franchisee/get_franchisee/' + id)


  .map((res: Response) => res.json())
  .catch(error => Observable.throw('Error in x service'));
}

updateFranchiseeData(data): Observable<any> {

    return this.http.put(this.appService.baseUrl() + '/franchisee/edit_franchisee/', data)

  .map((res: Response) => res.json())
  .catch(error => Observable.throw('Error in x service'));
}

createFranchisee(data): Observable<any> {

  return this.http.post(this.appService.baseUrl() + '/franchisee/create_franchisee/', data)

  .map((res: Response) => res.json())
  .catch(error => Observable.throw('Error in x service'));
}
get_business_type(): Observable<any> {
  return this.http.get( this.appService.baseUrl()  + '/document/get_business_type')
  .map((res: Response) => res.json())
  .catch(error => Observable.throw('Error in x service'));
} 

}
