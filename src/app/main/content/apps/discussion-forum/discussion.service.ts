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
export class DiscussionService {

  headers: Headers;
  options: RequestOptions;
  constructor(private http: Http, private appService: AppService) {

    this.headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'q=0.8;application/json;q=0.9' });
    this.options = new RequestOptions({ headers: this.headers });
  }

create_discussion_question(data): Observable<any> {
    return this.http.post(this.appService.baseUrl() + '/discussion/create_discussion_question', data)
    .map((res: Response) => res.json())
    .catch(error => Observable.throw('Error in x service'));
}
get_discussion_questions_list(): Observable<any> {
    return this.http.get(this.appService.baseUrl() + '/discussion/get_all_discussion_questions')
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in x service'));
  }
get_discussion_question_id(question_id): Observable<any> {
    return this.http.get(this.appService.baseUrl() + '/discussion/get_discussion_question/' + question_id)
    .map((res: Response) => res.json())
    .catch(error => Observable.throw('Error in x service'))
}
update_discussion_question(data): Observable<any> {
    return this.http.put(this.appService.baseUrl() + '/discussion/update_discussion_questions', data)
    .map((res: Response) => res.json())
    .catch(error => Observable.throw('Error in x service'))
}
delete_discussion_question(question_id): Observable<any> {
    return this.http.delete(this.appService.baseUrl() + '/discussion/delete_discussion_question/' + question_id)
    .map((res: Response) => res.json())
    .catch(error => Observable.throw('Error in x service'))
}
add_comments(data): Observable<any> {
    return this.http.post(this.appService.baseUrl() + '/discussion/discussion_question/addcomments', data)
    .map((res: Response) => res.json())
    .catch(error => Observable.throw('Error in x service'))
}
question_status(data): Observable<any> {
    return this.http.put(this.appService.baseUrl() + '/discussion/change_question_status', data)
    .map((res: Response) => res.json())
    .catch(error => Observable.throw('Error in x service'))
}
getAllFranchisees(): Observable<any> {
    return this.http.get(this.appService.baseUrl() + '/franchisee/get_franchisees')
    .map((res: Response) => res.json())
    .catch(error => Observable.throw('Error in x service'));
  }
  get_comments_by_id(question_id): Observable<any> {
    return this.http.get(this.appService.baseUrl() + '/discussion/getComments/' + question_id)
    .map((res: Response) => res.json())
    .catch(error => Observable.throw('Error in x service'))
}
question_vote_count(data): Observable<any> {
    return this.http.put(this.appService.baseUrl() + '/discussion//question/vote', data)
    .map((res: Response) => res.json())
    .catch(error => Observable.throw('Error in x service'))
}
}
