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

@Injectable()
export class SettingService {

  headers: Headers;
  options: RequestOptions;
  constructor(private http: Http, private appService: AppService) {

    this.headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'q=0.8;application/json;q=0.9' });
    this.options = new RequestOptions({ headers: this.headers });
  }

  post_question(data): Observable<any> {
    return this.http.post(this.appService.baseUrl() + '/application/application_form', data)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in service'));
  }

  get_questions(): Observable<any> {
    return this.http.get(this.appService.baseUrl() + '/application/getAll')
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in service'));
  }

  update_question(data): Observable<any> {
    return this.http.put(this.appService.baseUrl() + '/application/edit_question', data)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in service'));
  }

  delete_ques(ques_id): Observable<any> {
    return this.http.delete(this.appService.baseUrl() + '/application/delete/question/' + ques_id)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in service'));
  }
  get_department_list(data): Observable<any> {
    console.log(data);
    return this.http.get(this.appService.baseUrl() + '/setup/get_setup_departments/' + data)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in x service'));
  }
  create_new_setup_checklist(data): Observable<any> {
    return this.http.post(this.appService.baseUrl() + '/setup/create_setup_checklist', data)
    .map((res: Response) => res.json())
    .catch(error => Observable.throw('Error in x service'));
  }
  get_setup_checklist_list(department_id): Observable<any> {
    return this.http.get(this.appService.baseUrl() + '/setup/get_setup_checklists/' + department_id)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in x service'));
  }
  create_setup_checklist_task(data): Observable<any>{
    return this.http.post(this.appService.baseUrl() + '/setup/create_setup_checklist_task' , data)
    .map((res: Response) => res.json())
    .catch(error => Observable.throw('Error in x service'));
  }
  get_setup_checklists_task(checklist_id): Observable<any>{
    return this.http.get(this.appService.baseUrl() + '/setup/get_setup_checklists_tasks/' + checklist_id )
    .map((res: Response) => res.json())
    .catch(error => Observable.throw('Error in x service'));
  }
  delete_setup_checklist(checklist_id): Observable<any>{
    return this.http.delete(this.appService.baseUrl() + '/setup/delete_setup_checklist/' + checklist_id)
    .map((res: Response) => res.json())
    .catch(error => Observable.throw('Error in x service'));
  }
  delete_checklist_task(task_id): Observable<any>{
    return this.http.delete(this.appService.baseUrl() + '/setup/delete_checklist_task/' + task_id)
    .map((res: Response) => res.json())
    .catch(error => Observable.throw('Error in x service'));
  }
  edit_setup_checklist(data): Observable<any>{
    return this.http.put(this.appService.baseUrl() + '/setup/edit_setup_checklist', data)
    .map((res: Response) => res.json())
    .catch(error => Observable.throw('Error in x service'));
  }
  edit_setup_checklist_task(data): Observable<any>{
    return this.http.put(this.appService.baseUrl() + '/setup/edit_setup_checklists_tasks', data)
    .map((res: Response) => res.json())
    .catch(error => Observable.throw('Error in x service'));
  }
  upload_setup_checklist_task_files(data: FormData): Observable<any> {
    return this.http.post(this.appService.baseUrl() + '/setup/upload_setup_checklist_task_file', data)
    .map((res: Response)=> res.json())
    .catch(error => Observable.throw('Error in x service'));
  }
  get_Setup_Checklist_task_files(task_id): Observable<any> {
    return this.http.get(this.appService.baseUrl() + '/setup/get_setup_checklist_task_file' + task_id)
    .map((res: Response) => res.json())
    .catch((error: any) => Observable.throw('Error in x service'));
  }
}
