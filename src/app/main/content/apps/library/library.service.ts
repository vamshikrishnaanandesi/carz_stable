import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers, HttpModule, RequestOptions, URLSearchParams, ResponseContentType } from '@angular/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FranchiseesService } from '../franchisees/franchisees.service';
import { AppService} from '../../../../app.service';

// Observable class extensions
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class LibraryService {

  headers: Headers;
  options: RequestOptions;
  constructor(private http: Http, private appService: AppService) {

    this.headers = new Headers({ 'Content-Type' : 'application/json', 'Accept' : 'q=0.8;application/json;q=0.9' });
    this.options = new RequestOptions({ headers : this.headers });
  }
  // // remove 
  // getAllCommonFiles(status){
  //   return this.http.get(this.appService.baseUrl() + '/library/get_common_files/' + status.upload_status)
  //   .map((res: Response) => res.json())
  //   .catch(error => Observable.throw('Error in service'));
  // }
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
//   // remove
//   createFolder(data ): Observable<any> {
//     return this.http.post(this.appService.baseUrl() + '/library/create_Folder', data  )
//     .map((res: Response) => res.json())
//     .catch(error => Observable.throw('Error in service'));
// }
  // // remove
  // getFolder(franchisee_id): Observable<any> {
  //   return this.http.get(this.appService.baseUrl() + '/library/get_folder_by_franchisee_id/' + franchisee_id  )
  //   .map((res: Response) => res.json())
  //   .catch(error => Observable.throw('Error in service'));
  // }
//   // remove
//   deleteFolder(data): Observable<any> {
//       return this.http.put(this.appService.baseUrl() + '/library/delete_folder_by_Id', data  )
//     .map((res: Response) => res.json())
//     .catch(error => Observable.throw('Error in service'));
// }
  // remove
  upload_file(data: FormData): Observable<any> {
    return this.http.post(this.appService.baseUrl() + '/library/upload_file', data)
    .map((res: Response) => res.json())
    .catch(error => Observable.throw('Error in service'));
}
  // // remove
  // getFranchiseeFiles(status): Observable<any> {
  //   return this.http.get(this.appService.baseUrl() + '/library/get_franchisee_files/' + status.uploaded_status + '/' + status.franchisee_Id)
  //   .map((res: Response) => res.json())
  //   .catch(error => Observable.throw('Error in service'));
  // }
  getFolderFiles(id): Observable<any> {
    return this.http.get(this.appService.baseUrl() + '/library/get_franchisee_files_by_folder_Id/' + id.folder_Id + '/' + id.franchisee_Id)
    .map((res: Response) => res.json())
    .catch(error => Observable.throw('Error in service'));
}
  // remove
  deleteFiles(data): Observable<any> {
    return this.http.put(this.appService.baseUrl() + '/library/delete_file_by_Id', data)
    .map((res: Response) => res.json())
    .catch(error => Observable.throw('Error in service'));
}
  createCommonFolder(data): Observable<any> {
  return this.http.post(this.appService.baseUrl() + '/library/create_common_folder', data  )
  .map((res: Response) => res.json())
  .catch(error => Observable.throw('Error in service'));
}
// remove
  getCommonFolder(): Observable<any>{
  return this.http.get(this.appService.baseUrl() + '/library/get_common_folder' )
  .map((res: Response) => res.json())
  .catch(error => Observable.throw('Error in service'));
}
// remove
  getCommonFolderFiles(folder): Observable<any> {
  return this.http.get(this.appService.baseUrl() + '/library/get_folder_files_by_folder_Id/' + folder.folder_Id)
  .map((res: Response) => res.json())
  .catch(error => Observable.throw('Error in service'));
}
upload_folder_file(data: FormData): Observable<any> {
  return this.http.post(this.appService.baseUrl() + '/library/upload_folder_file', data)
  .map((res: Response) => res.json())
  .catch(error => Observable.throw('Error in service'));
}
// // remove
// editFolder(data): Observable<any> {
//   return this.http.put(this.appService.baseUrl() + '/library/edit_folder', data)
//   .map((res: Response) => res.json())
//   .catch(error => Observable.throw('Error in x service'));
// }
}
