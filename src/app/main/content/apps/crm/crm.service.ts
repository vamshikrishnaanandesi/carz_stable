import { Injectable } from '@angular/core';
import { FranchiseesService } from '../franchisees/franchisees.service';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
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
export class CrmService {

  headers: Headers;
  options: RequestOptions;
  constructor(private http: Http, private httpClient: HttpClient, private appService: AppService) {


    this.headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'q=0.8;application/json;q=0.9' });
    this.options = new RequestOptions({ headers: this.headers, responseType: ResponseContentType.Blob  });
  }
  getAllFranchisees(): Observable<any> {
    return this.http.get(this.appService.baseUrl() + '/franchisee/get_franchisees')
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in x service'));
  }
  getAllFranchiseePartners(): Observable<any> {
    return this.http.get(this.appService.baseUrl() + '/partner/get_partner_franchisee')
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in x service'));
  }
  // tslint:disable-next-line:no-shadowed-variable
  getFranchiseePartners(id): Observable<any> {
    return this.http.get(this.appService.baseUrl() + '/partner/get_franchisee_partners/' + id)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in x service'));
  }
  // tslint:disable-next-line:no-shadowed-variable
  viewFranchiseeById(id): Observable<any> {
    return this.http.get(this.appService.baseUrl() + '/franchisee/get_franchisee/' + id)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in x service'));
  }
  createFranchisee(data): Observable<any> {
    return this.http.post(this.appService.baseUrl() + '/franchisee/create_franchisee/', data)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in x service'));
  }
  updateFranchiseeData(data): Observable<any> {
    return this.http.put(this.appService.baseUrl() + '/franchisee/edit_franchisee/', data)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in x service'));
  }
  validateFranchisee(data): Observable<any> {
    return this.http.post(this.appService.baseUrl() + '/franchisee/validate_franchisee', data)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in x service'));
  }
  createMultipleFranchisees(data): Observable<any> {
    return this.http.post(this.appService.baseUrl() + '/franchisee/create_multiple_franchisee', data)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in x service'));
  }
  createPartnerFranchisee(data): Observable<any> {
    return this.http.post(this.appService.baseUrl() + '/partner/create_partner_franchisee', data)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in x service'));
  }
  updatePartnerFranchisee(data): Observable<any> {
    return this.http.put(this.appService.baseUrl() + '/partner/edit_partner_franchisee', data)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in x service'));
  }
  upload_payment_receipt(data: FormData): Observable<any> {
    const req = new HttpRequest('PUT', this.appService.baseUrl() + '/franchisee/edit_stage', data, {
                 reportProgress: true
           });
    return this.httpClient.request(req)
      .map(event => {return event})
      .catch(error => Observable.throw('Error in service'));
  }
  getStages(): Observable<any> {
    return this.http.get(this.appService.baseUrl() + '/franchisee/get_stage_by_id')
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in x service'));
  }
  createMeeting(data): Observable<any> {
    return this.http.post(this.appService.baseUrl() + '/meeting/create_meeting', data)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in x service'));
  }
  editMeeting(data): Observable<any> {
    return this.http.put(this.appService.baseUrl() + '/meeting/edit_meeting', data)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in x service'));
  }
  getMeetingById(obj): Observable<any> {
    return this.http.get(this.appService.baseUrl() + '/meeting/get_meeting/' + obj.franchisee_id + '/' + obj.stage_id)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in x service'));
  }
  // tslint:disable-next-line:no-shadowed-variable
  getStage_by_franchiseeId(id): Observable<any> {
    return this.http.get(this.appService.baseUrl() + '/franchisee/get_stages/' + id)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in x service'));
  }
  validateFranchiseePincode(data): Observable<any> {
    return this.http.post(this.appService.baseUrl() + '/franchisee/validate_franchisee_pincode', data)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in x service'));
  }
  get_business_type(franchiseeId): Observable<any> {
    return this.http.get(this.appService.baseUrl() + '/franchisee/get_kyc_docs/' + franchiseeId)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in x service'));
  }
  get_business_types_list(): Observable<any> {
    return this.http.get(this.appService.baseUrl() + '/document/get_business_type')
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in x service'));
  }
  // tslint:disable-next-line:no-shadowed-variable
  deletePartner(id): Observable<any> {
    return this.http.put(this.appService.baseUrl() + '/partner/delete_partner_franchisee/', + id)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in service'));
  }
  upload_doc(data: FormData): Observable<any> {
    const req = new HttpRequest('PUT', this.appService.baseUrl() + '/document/upload_doc', data, {
                 reportProgress: true
           });
    return this.httpClient.request(req)
      .map(event => {return event}, (res: Response) => res.json())
      .catch(error => Observable.throw('Error in service'));
  }
  delete_uploaded_doc(data): Observable<any> {
    return this.http.put(this.appService.baseUrl() + '/document/delete_doc', data)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in service'));
  }
  reject_doc(data): Observable<any> {
    return this.http.put(this.appService.baseUrl() + '/document/reject_doc', data)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in service'));
  }
  approve_doc(data): Observable<any> {
    return this.http.put(this.appService.baseUrl() + '/document/approve_doc', data)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in service'));
  }
  delete_Selected_partner(partnerId): Observable<any> {
    return this.http.delete(this.appService.baseUrl() + '/partner/delete_partner_franchisee/' + partnerId)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in service'));
  }
  make_default_profile(data): Observable<any> {
    return this.http.put(this.appService.baseUrl() + '/partner/make_default_profile', data)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in service'));
  }
  getMasterFranchisee(): Observable<any> {
    return this.http.get(this.appService.baseUrl() + '/franchisee/master_franchisee_list')
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in service'));
  }
  getKycByPartners(obj): Observable<any> {
    return this.http.get(this.appService.baseUrl() + '/franchisee/get_kyc_docs_by_partner/' + obj.franchisee_id + '/' + obj.partner_id)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in service'));
  }
  // tslint:disable-next-line:no-shadowed-variable
  getMasterFranchiseeById(id): Observable<any> {
    return this.http.get(this.appService.baseUrl() + '/franchisee/master_franchisee/franchisee_list/' + id)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in x service'));
  }
  question_types(): Observable<any> {

    return this.http.get(this.appService.baseUrl() + '/assessment/question_types')
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in x service'));
  }
  question_list(): Observable<any> {
    // this.appService.baseUrl()
    return this.http.get(this.appService.baseUrl() + '/assessment/get_question_list/')
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in x service'));
  }
  answer(data): Observable<any> {
    return this.http.put(this.appService.baseUrl() + '/assessment/answer', data)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in x service'));
  }
  createFolder(data): Observable<any> {
    return this.http.post(this.appService.baseUrl() + '/library/create_Folder', data)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in service'));
  }

  get_crm_folders(franchisee_id): Observable<any> {
    return this.http.get(this.appService.baseUrl() + '/library/get_crm_folders/' + franchisee_id)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in service'));
  }
  get_reports(franchisee_id, partner_id): Observable<any> {
    return this.http.get(this.appService.baseUrl() + '/assessment/get_report/' + franchisee_id + '/' + partner_id)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in service'));
  }
  // tslint:disable-next-line:no-shadowed-variable
  getMeetingByFranchisee(franchisee_id): Observable<any> {
    return this.http.get(this.appService.baseUrl() + '/meeting/get_meeting_franchisee/' + franchisee_id)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in x service'));
  }

  getFolderFiles(folder_Id): Observable<any> {
    return this.http.get(this.appService.baseUrl() + '/library/get_folder_files_by_folder_Id/' + folder_Id)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in service'));
  }

  get_file_by_folder(folder): Observable<any> {
    return this.http.get(this.appService.baseUrl() + '/library/get_franchisee_files_by_folder_Id/' + folder.folder_Id + '/' + folder.franchisee_Id)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in service'));
  }

  update_stage(data): Observable<any> {
    return this.http.put(this.appService.baseUrl() + '/franchisee/update_stage', data)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in x service'));
  }

  get_questions(): Observable<any> {
    return this.http.get(this.appService.baseUrl() + '/application/getAll')
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in service'));
  }
  submit_application(data: FormData): Observable<any> {
    return this.http.put(this.appService.baseUrl() + '/application/submit_application', data)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in service'));
  }
  get_ques_by_franchisee_id(data): Observable<any> {
    return this.http.get(this.appService.baseUrl() + '/application/get_questions_list/' + data)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in service'));
  }
  validateMobileNumber(data): Observable<any> {
    return this.http.post(this.appService.baseUrl() + '/partner/validate_mobile_number', data)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in x service'));
  }
  lead_type(data): Observable<any> {
    return this.http.put(this.appService.baseUrl() + '/franchisee/lead_type', data)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in service'));
  }
  validatePartnerEmail(data): Observable<any> {
    return this.http.post(this.appService.baseUrl() + '/partner/validate_partner_email', data)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in x service'));
  }
  delete_meeting(meeting_id) {
    return this.http.delete(this.appService.baseUrl() + '/meeting/delete_meeting/' + meeting_id)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in x service'));
  }
  edit_meeting(data) {
    return this.http.put(this.appService.baseUrl() + '/meeting/edit_meeting', data)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in x service'));
  }
  backgroundVerification(data: FormData): Observable<any> {
    return this.http.post(this.appService.baseUrl() + '/application/background_verification', data)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in service'));
  }
  editBgFile(data): Observable<any> {
    return this.http.put(this.appService.baseUrl() + '/application/edit_bg_file_name', data)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in x service'));
  }
  upload_file(data: FormData): Observable<any> {
    return this.http.post(this.appService.baseUrl() + '/application/background_verification', data)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in service'));
  }

  getthirdpartyfile(franchisee_id): Observable<any> {
    return this.http.get(this.appService.baseUrl() + '/application/get_third_party_files/' + franchisee_id)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in service'));
  }
  deleteFiles(data): Observable<any> {
    return this.http.put(this.appService.baseUrl() + '/library/delete_file_by_Id', data)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in service'));
  }

  editDiscussionFile(data): Observable<any> {
    return this.http.put(this.appService.baseUrl() + '/application/edit_discussion_payment_file_name', data)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in x service'));
  }
  editAgreementFile(data): Observable<any> {
    return this.http.put(this.appService.baseUrl() + '/application/edit_agreement_payment_file_name', data)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in x service'));
  }
  editNdaFile(data): Observable<any> {
    return this.http.put(this.appService.baseUrl() + '/application/edit_nda_file_name', data)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in x service'));
  }
  editAgreementFinalFile(data): Observable<any> {
    return this.http.put(this.appService.baseUrl() + '/application/edit_final_agreement_file_name', data)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in x service'));
  }
  delete_dicussion_payment_file(franchisee_id): Observable<any> {
    return this.http.delete(this.appService.baseUrl() + '/application/delete_discussion_payment_file/' + franchisee_id)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in x service'));
  }
  delete_nda_file(franchisee_id): Observable<any> {
    return this.http.delete(this.appService.baseUrl() + '/application/delete_discussion_nda_file/' + franchisee_id)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in x service'));
  }
  delete_agreement_payment(franchisee_id): Observable<any> {
    return this.http.delete(this.appService.baseUrl() + '/application/delete_agreement_payment/' + franchisee_id)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in x serice'));
  }
  delete_final_payment(franchisee_id): Observable<any> {
    return this.http.delete(this.appService.baseUrl() + '/application/delete_final_agreement/' + franchisee_id)
      .map((res: Response) => res.json())
      .catch(error => Observable.throw('Error in x service'));
  }
  delete_kyc_bg_files(file_id): Observable<any> {
    return this.http.delete(this.appService.baseUrl() + '/application/delete_kyc_bg_files/' + file_id)
    .map((res: Response) => res.json())
    .catch(error => Observable.throw('Error in x service'));
  }
  get_department_list(franchisor_id): Observable<any> {
    return this.http.get(this.appService.baseUrl() + '/setup/get_setup_departments/' + franchisor_id)
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
    return this.http.post(this.appService.baseUrl() + '/setup/create_setup_checklist_task/' , data)
    .map((res: Response) => res.json())
    .catch(error => Observable.throw('Error in x service'));
  }
  get_setup_checklists_task(checklist_id): Observable<any>{
    return this.http.get(this.appService.baseUrl() + '/setup/get_setup_checklists_tasks/' + checklist_id )
    .map((res: Response) => res.json())
    .catch(error => Observable.throw('Error in x service'));
  }
  download_pdf(data): Observable<any> {
    return this.http.get(this.appService.baseUrl() + '/application/get_questions_list/' + data, { headers: this.headers, responseType: ResponseContentType.Blob})
    .map((res: Response) => res.blob())
    .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
  }
//   download_pdf(data): any {
//     // const url = '/application/get_questions_list/' + data;
//     const headers = new Headers();
//     headers.append('Authorization', 'JWT ' + localStorage.getItem('id_token'));
//     return this.http.get(this.appService.baseUrl() + '/application/get_questions_list/' + data, {  headers: headers, responseType: ResponseContentType.Blob }).map(
//         (blob) => {
//             return new Blob([blob.blob()], { type: 'application/pdf' });
//         });
// }

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
complete_task(data): Observable<any> {
  return this.http.post(this.appService.baseUrl() + '/setup/complete_task_checklist', data)
  .map((res: Response) => res.json())
  .catch((error:any) => Observable.throw('Error in service'));
}
get_setup_checklists_completed_tasks(checklist_id, franchisee_id): Observable<any> {
  return this.http.get(this.appService.baseUrl() + '/setup/get_completed_tasks/' + checklist_id + '/' + franchisee_id)
  .map((res: Response) => res.json())
  .catch((error: any) => Observable.throw('Error in x service'));
}
get_task_checklist_length(department_id, franchisee_id): Observable<any> {
  return this.http.get(this.appService.baseUrl() + '/setup/get_user_updated_checklist_list/' + department_id + '/' + franchisee_id)
  .map((res:Response) => res.json())
  .catch((error: any) => Observable.throw('Error in x service'));
}
getAllMeetings(): Observable<any> {
  return this.http.get(this.appService.baseUrl() + '/meeting/get_all_meetings')
    .map((res: Response) => res.json())
    .catch(error => Observable.throw('Error in x service'));
}
archieve_franchisee(data): Observable<any> {
  return this.http.put(this.appService.baseUrl() + '/franchisee/archieve_franchisee', data)
  .map((res: Response) => res.json())
  .catch(error => Observable.throw('Error in x service'))
}
}
