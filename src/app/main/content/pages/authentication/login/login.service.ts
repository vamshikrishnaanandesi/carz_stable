import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers, HttpModule, RequestOptions, URLSearchParams, ResponseContentType } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AppService} from '../../../../../app.service';
// import { AppService} from

// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()

export class LoginService {
  headers: Headers;
  options: RequestOptions;
  constructor(private http: Http, private appService: AppService) {

    this.headers = new Headers({ 'Content-Type' : 'application/json', 'Accept' : 'q=0.8;application/json;q=0.9' });
    this.options = new RequestOptions({ headers : this.headers, withCredentials: true });
  }
  franchisorLogin(user): Promise<any>{
    return this.http.post(this.appService.baseUrl() + '/authenticate/franchisor-login', user, this.options)
    .map((res: Response) => res.json())
     .toPromise()
     .catch(this.handlePromiseError);

   // return this.http.post('https://carz-api.herokuapp.com/authenticate/franchisor-login', user)
    // .map((res: Response) => res.json())
    // .catch(error => Observable.throw('Error in service'));
    // event.preventDefault();
    // const body = JSON.stringify(user);

    // Swamy 02
  //   login(username: string, password: string) {
  //     return this.http.post<any>('/api/authenticate', { username: username, password: password })
  //         .map(user => {

  //             if (user && user.token) {

  //                 localStorage.setItem('currentUser', JSON.stringify(user));
  //             }

  //             return user;
  //         });
  // }


    // Swamy 02 end
    // console.log(user);
    //  return this.http.post('https://carz-api.herokuapp.com/authenticate/franchisor-login', user)
    //  // tslint:disable-next-line:no-shadowed-variable
    //  .map(user => {

    //  // if (user && user.token) {

    //       localStorage.setItem('currentUser', JSON.stringify(user));
    //  // }

    //   return user;

  // });

    // .catch(error => Observable.throw('Error in service'));
  }
  handlePromiseError(error: Response){
    console.error(error);
    throw(error);
  }


}
// franchisorLogin(user): Observable<any>{
    // return this.http.post(this.appService.baseUrl()+'/authenticate/franchisor-login', user, this.options)
    // .map((res: Response) =>

       // res.json());
