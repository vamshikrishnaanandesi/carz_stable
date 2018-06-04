import { Component, OnInit, AfterViewInit, ViewChild, Input, Inject, ElementRef, OnDestroy, HostListener } from '@angular/core';
import { MatStepper, MatTabGroup } from '@angular/material';
// import { LibraryService } from '../../library/library.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReuploadRequestComponent } from './reupload-request/reupload-request.component';
import { KnowledgeTransferComponent } from './knowledge-transfer/knowledge-transfer.component';
import { KnowledgeTransfer2Component } from './knowledge-transfer2/knowledge-transfer2.component';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { ApproveFileComponent } from './approve-file/approve-file.component';
import { StagecompletepopComponent } from './stagecompletepop/stagecompletepop.component';


import { CrmService } from '../crm.service';
import * as _ from 'lodash';
import { ViewFileComponent } from './view-file/view-file.component';
import { ViewfilesetupstageComponent } from './viewfilesetupstage/viewfilesetupstage.component';
import { id } from '@swimlane/ngx-datatable/release/utils';
import { MatTabChangeEvent } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatRadioChange } from '@angular/material';
import { resetFakeAsyncZone } from '@angular/core/testing';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ChartsModule, Color } from 'ng2-charts';
import { ToasterModule, ToasterService, ToasterConfig, BodyOutputType, Toast } from 'angular5-toaster';
import Swal from 'sweetalert2';
import { FileSaver, saveAs } from 'file-saver/FileSaver';
declare var swal: any;
// import 'jspdf-autotable';
// declare var jsPdf: any;
import {ChatService} from '../../chat/chat.service';
import { AppService } from '../../../../../app.service';
import { take } from 'rxjs/operators';
import * as jsPDF from 'jspdf';
@Component({
  selector: 'fuse-app-franchisee-setup',
  templateUrl: './franchisee-setup.component.html',
  styleUrls: ['./franchisee-setup.component.scss']
})
export class FranchiseeSetupComponent implements OnInit, OnDestroy {

  url: any;
  checklist_id: any;
  department_id: any;
  setup_checklist_id: any;
  checklist_length = [];
  selected_row: any;
  departmentTabIndex: any;
  meeting_Fields: '';
  meeting_location: '';
  meeting_remarks: '';
  meeting_time: '';
  meeting_title: '';
  meeting_date: '';
  meetingForm: any;
  meeting_id: any;
  meeting_edit_mode = false;
  edit_stage_file_name: any = 50000;
  fina_agreement_edit_mode = false;
  agreement_final_payment = false;
  payment_file_name_edit_mode = false;
  nda_file_edit_name_mode = false;
  bg_file_name_mode = false;
  titleboxchecklist = false;
  public delete_files: any = [];

  public file_item_type: any;
  file: any;
  files: any;
  stored_file: string;
  private _total = 0;
  progress_percentage = 0;
  to_mails_list_string: string;
  stage_id: any;
  file_Id: any;
  files_list: any;
  franchisee_id: any;
  pratner_id: any;
  question_list = [];
  completed_tasks_list = [];
  isLinear = false;
  bg_verification_files = [];
  all_checklist_tasks_list = [];
  applicaion_files = [];
  payment_file_name: any;
  selectedListitem: any;
  page_loaded = false;
  public currentStep = 1;
  progress = 20;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  show_progress_bar = 500;
  fifthFormGroup: FormGroup;
  breadcrums_folder_title: any;
  public fileToUpload: File = null;
  public partner_id = '';
  public franchisee_Id;
  public file_name = '';
  public body = '';
  public subject = '';
  public files_array = [];
  public answers = [];
  public crm_folders = [];
  public thirdparty_file = [];
  public id = '';
  public file_link = '';
  public kyc_file_link = '';
  public kyc_file_name = '';
  public nda_file = '';
  public nda_file_name = '';
  public crm_folder_vars = {};
  public fileNameInsetup: any;
  save_route: string;
  public userData: any;
  public nda_status = false;
  public kycupload_status = false;
  public array = [];
  public status: any;
  public assessment_types_name = [];
  public assessment_types_list = [];
  public bgverification_file_link = [];
  public datasource = [];
  public tabIndex = 0;
  public business_type = [];
  public pageSize = 3;
  public length = 0;
  public business_Id = '';
  agreement_file_name: any;
  public obj: any;
  public franchiseeData = [];
  public folder_id: any;
  public discussion_meeting = {};
  public varibale_val = false;
  public stepsFiles = false;
  public stepsDocumentsFlag = true;
  public answer_response = [];
  public folder_name: any;
  public p: any = 1;
  public circle = 0;
  public progressbar = 0;
  public selected_file_row: any;
  public collection: any[] = this.assessment_types_list;
  private toasterService: ToasterService;
  public toppingList = [
    { 'id': 0, 'name': 'Ikshit', 'image': '../../../../../../assets/images/carz/icons/assaigned/ikshit.png' },
    { 'id': 1, 'name': 'Hareesh', 'image': '../../../../../../assets/images/carz/icons/assaigned/hareesh.png' },
    { 'id': 2, 'name': 'Vishnu', 'image': '../../../../../../assets/images/carz/icons/assaigned/kishore.png' },
    { 'id': 3, 'name': 'Swamy', 'image': '../../../../../../assets/images/carz/icons/assaigned/swamy.png' },
    { 'id': 4, 'name': 'Jagan', 'image': '../../../../../../assets/images/carz/icons/assaigned/jagan.png' }
  ];
  meeting_array: any = [];
  meeting_data: any = {};


  kyc: any = {};
  showPlaceDetails: any;
  kyc_file_upload = '';
  public kyc_background = '';
  final_agreement_file_name: any;
  public final_payment = '';
  public agrement_file_link = '';
  public agrement_file_name = '';
  public question_type_heading = [];
  public pageIndex = 0;
  public partners_list = [];
  public agrement_status = false;
  public setup = false;
  public assessement_status = false;
  public setup_status = false;
  public final_paymnet_link = '';
  public graph_val = {};
  meetings = [];
  public userSettings2: any = {
    'geoTypes': ['geocode', 'postal_code'],
    showRecentSearch: false,
    geoCountryRestriction: ['in'],
  };
  public horizantal_stats = [];
  public stage_valid = false;
  public services = [
    {
      'id': 'Travel',
      'service_type': 'Travel',
      'flag': false
    },
    {
      'id': 'Stay',
      'service_type': 'Stay',
      'flag': false
    }
  ];
  setup_department_list = [];
  setup_checklist_list = [];
  checklist_tasks_list = [];
  checklist_opened = false;
  checklist_data: any;
  public config1: ToasterConfig = new ToasterConfig({
    limit: 7,
    tapToDismiss: false,
    showCloseButton: true,
    mouseoverTimerStop: true
  });
  spinnerConfig: object = {
    bdColor: '#333',
    size: 'medium',
    color: '#fff',
    type: 'ball-clip-rotate'
  };
  public enable_progress_bar = false;
  public progress_bar_file = 500;
  time_picker = [
    {
      id: 0,
      time: '12:00 AM'
    },
    {
      id: 1,
      time: '12:30 AM'
    },
    {
      id: 2,
      time: '01:00 AM'
    },
    {
      id: 3,
      time: '01:30 AM'
    },
    {
      id: 4,
      time: '02:00 AM'
    },
    {
      id: 5,
      time: '02:30 AM'
    },
    {
      id: 6,
      time: '03:00 AM'
    },
    {
      id: 7,
      time: '03:30 AM'
    },
    {
      id: 8,
      time: '04:00 AM'
    },
    {
      id: 9,
      time: '04:30 AM'
    },
    {
      id: 10,
      time: '05:00 AM'
    },
    {
      id: 11,
      time: '05:30 AM'
    },
    {
      id: 12,
      time: '06:00 AM'
    },
    {
      id: 13,
      time: '06:30 AM'
    },
    {
      id: 14,
      time: '07:00 AM'
    },
    {
      id: 15,
      time: '07:30 AM'
    },
    {
      id: 16,
      time: '08:00 AM'
    },
    {

      id: 17,
      time: '08:30 AM'
    },
    {
      id: 18,
      time: '09:00 AM'
    },
    {
      id: 19,
      time: '09:30 AM'
    },
    {
      id: 20,
      time: '10:00 AM'
    },
    {
      id: 21,
      time: '10:30 AM'
    },
    {
      id: 22,
      time: '11:00 AM'
    },
    {
      id: 23,
      time: '11:30 AM'
    },
    {
      id: 24,
      time: '12:00 PM'
    },
    {
      id: 25,
      time: '12:30 PM'
    },
    {
      id: 26,
      time: '01:00 PM'
    },
    {
      id: 27,
      time: '01:30 PM'
    },
    {
      id: 28,
      time: '02:00 PM'
    },
    {
      id: 29,
      time: '02:30 PM'
    },
    {
      id: 30,
      time: '03:00 PM'
    },
    {
      id: 31,
      time: '03:30 PM'
    },
    {
      id: 32,
      time: '04:00 PM'
    },
    {
      id: 33,
      time: '04:30 PM'
    },
    {
      id: 34,
      time: '05:00 PM'
    },
    {
      id: 35,
      time: '05:30 PM'
    },
    {
      id: 36,
      time: '06:00 PM'
    },
    {
      id: 37,
      time: '06:30 PM'
    },
    {
      id: 38,
      time: '07:00 PM'
    },
    {
      id: 39,
      time: '07:30 PM'
    },
    {
      id: 40,
      time: '08:00 PM'
    },
    {
      id: 41,
      time: '08:30 PM'
    },
    {
      id: 42,
      time: '09:00 PM'
    },
    {
      id: 43,
      time: '09:30 PM'
    },
    {
      id: 44,
      time: '10:00 PM'
    },
    {
      id: 45,
      time: '10:30 PM'
    },
    {
      id: 46,
      time: '11:00 PM'
    },
    {
      id: 47,
      time: '11:30 PM'
    },


  ];
  edit_application_form = false;
  form_submitted = false;
  application_response = false;
  FileSaver: any;
  saveAs: any;
  colorsUndefined: Array<Color>;
  colorsEmpty: Array<Color> = [];
  colorsOverride: Array<Color> = [{}];
  colorsEmptyObject: Array<Color> = [{}];

  colorsUndefined1: Array<Color>;
  colorsEmpty1: Array<Color> = [];
  colorsOverride1: Array<Color> = [{}];
  colorsEmptyObject1: Array<Color> = [{}];
  user_data: any;
  meeting(arg0: any): any {
    throw new Error('Method not implemented.');
  }
  constructor(private spinner: NgxSpinnerService, toasterService: ToasterService, private _formBuilder: FormBuilder, public dialog: MatDialog, public httpService: CrmService,

    private router: Router, private route: ActivatedRoute, private appService: AppService, private chatService: ChatService) {
    this.toasterService = toasterService;
    this.get_franchisee_data(this.route.snapshot.params['franchisee_Id']);
    this.get_business_type(this.route.snapshot.params['franchisee_Id']);
    this.userData = JSON.parse(localStorage.getItem('user_data'));
    this.get_crm_folders(this.route.snapshot.params['franchisee_Id']);
    this.getFranchiseeMeeting(this.route.snapshot.params['franchisee_Id']);
    this.getthirdpartyfile(this.route.snapshot.params['franchisee_Id']);
    // this.set_meeting_to_zero();
    if (this.userData.user_role === 'franchisee') {
      this.viewFranchisee(this.route.snapshot.params['franchisee_Id']);
    }
  }


  @ViewChild('stepper') stepper: MatStepper;
  @ViewChild('chatInput') chatInput: ElementRef;

  public messages = [];
  public connection;
  public message;



  ngOnInit() {
    this.user_data = this.appService.getLocal();
    // this.get_files_by_folder();
    // this.getAllMeetings();
    this.connection = this.chatService.getMessages().subscribe(message => {
      this.messages.push(message);
    })
    this.getthirdpartyfile(this.route.snapshot.params['franchisee_Id']);
    this.franchiseeData = JSON.parse(localStorage.getItem('state'));
    this.franchisee_Id = this.route.snapshot.params['franchisee_Id'];
    this.getFranchiseeMeeting(this.route.snapshot.params['franchisee_Id']);
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
    this.thirdFormGroup = this._formBuilder.group({
      thirdCtrl: ['', Validators.required]
    });
    this.fourthFormGroup = this._formBuilder.group({
      fourthCtrl: ['', Validators.required]
    });
    this.fifthFormGroup = this._formBuilder.group({
      fifthCtrl: ['', Validators.required]
    });

    setTimeout(function () {
      this.datasets = [
        {
          data: this.data,
          backgroundColor: [
            '#3370e7'
          ],
        }];
    }, 100);
    this.get_department_list('5a96815c66bace001435ec12');
    this.get_setup_checklist_task('checklist_id');
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

  sendMessage(meeting_data) {
    console.log(meeting_data);
    this.chatService.sendMessage(meeting_data);
    this.message = '';
  }

  //@HostListener('click')
  // public autofocusInput() {
  //   this.chatInput.nativeElement.focus();
  // }

  set_meeting_to_zero() {
    this.meeting_data = {
      franchisor_id: this.userData._id,
      franchisee_id: this.route.snapshot.params['franchisee_Id'],
      stage_id: '',
      meeting_assigned_people: []
    };
  }
  viewFranchisee(id) {
    this.httpService.viewFranchiseeById(id).subscribe(response => {
      console.log('response', response);
      if (response.state === 'success') {
        this.franchiseeData = response.franchisees_data;
        console.log('response', this.franchiseeData);
      }
      if (response.state === 'failure') {
        // this.franchisees = [];
      }
    },
      err => {
        const message = 'Error to load franchisees.';
      });
  }
  // tslint:disable-next-line:no-shadowed-variable
  get_franchisee_data(id) {
    this.spinner.show();
    this.httpService.getStage_by_franchiseeId(id).subscribe(response => {
      if (response.state === 'success') {

        console.log(response);
  //      setTimeout(() => {

          this.spinner.hide(); // To hide the spinner

        const res = response.stages_list[0];
        if (response.stages_list[0]) {

          if (res.stage_discussion) {
            this.file_name = res.stage_discussion.payment_file_name;
            this.payment_file_name = res.stage_discussion.payment_file_name;
            this.file_link = res.stage_discussion.payment_file;
          }
          if (res.stage_discussion) {
            this.nda_file_name = res.stage_discussion.nda_file_name;
            this.nda_file = res.stage_discussion.nda_file;
            this.nda_status = res.stage_discussion.status;
            console.log(this.nda_status);
            this.getPartnersFranchisee(this.route.snapshot.params['franchisee_Id']);
            if (this.nda_status) {
              this.tabIndex = 1;


            }
            else {

              if(this.user_data.show_kt_popup_first_time == true){
                if(this.user_data.user_role === "franchisee"){

                    this.knowledgeTransfer();
                }
              }

            }
          }
          if (res.stage_kycupload) {
            this.kycupload_status = res.stage_kycupload.status;
            this.kyc_file_name = res.stage_kycupload.bgverification_file_name;
            this.kyc_file_link = res.stage_kycupload.bgverification_file_link;
            if (this.kycupload_status) {
              this.tabIndex = 2;
            }
          }
          if (res.stage_assessment) {
            this.assessement_status = res.stage_assessment.status;
            if (this.kycupload_status) {
              this.tabIndex = 3;
            }
          }


          if (res.stage_setup) {
            this.setup_status = res.stage_setup.status;
            //for setup url autoload

          }
          if(res.stage_agreenent.status == true){
          this.tabIndex = 4;
          }

          // tabIndex
          if (res.stage_agreenent) {
            this.final_payment = res.stage_agreenent.agreement_file_name;
            this.agreement_file_name = res.stage_agreenent.agreement_file_name;
            this.final_paymnet_link = res.stage_agreenent.agreement_file;
            this.agrement_file_link = res.stage_agreenent.final_agreement_file;
            this.agrement_file_name = res.stage_agreenent.final_agreement_file_name;
            this.agrement_status = res.stage_agreenent.status;
            this.final_agreement_file_name = res.stage_agreenent.final_agreement_file_name;
          }



          this.id = res._id;
          this.setIndex(this.tabIndex);
          // this.getMeetings('Discussion');

        }
        else {
          if(this.user_data.show_kt_popup_first_time == true){
            if(this.user_data.user_role === "franchisee"){

                this.knowledgeTransfer();
            }
          }
        }
        this.page_loaded = true;
      }
      if (response.state === 'failure') {
        this.spinner.hide();
      }
    },
      err => {
        this.spinner.hide();
        const message = 'Error to load franchisees.';
      });

  }

  get_Id(folder_Name) {
    for (let i = 0; i < this.crm_folders.length; i++) {
      if (folder_Name === this.crm_folders[i].folder_name) {
        this.folder_id = this.crm_folders[i]._id;
      }
    }
  }

  handleFileInput(files: FileList, val, folder_type, i) {
    if (folder_type) {
      this.get_Id(folder_type);
    }
    this.upload_file_to_Serve(files.item(0), val, i);

  }

  assessment_questions(qid) {
    this.assessment_types_list = [];
    this.httpService.question_list().subscribe(response => {
      if (response.state === 'success') {
        this.assessment_types_list = response.data;
        this.answers = this.assessment_types_list;
        this.datasource = _.filter(this.assessment_types_list, function (o) {
          return o.question_type === qid;
        });
        this.pageIndex = 1;
        this.pageSize = 3;
        this.length = response.data.length;
      }
      if (response.state === 'failure') {

      }
    });
  }

  filter_ques(qid) {
    this.p = 1;
    this.datasource = _.filter(this.assessment_types_list, function (o) {
      return o.question_type === qid;
    });
  }

  onLinkClick(event: MatTabChangeEvent) {
    this.filter_ques(event.tab.textLabel);
  }

  assessment_types() {
    this.httpService.question_types().subscribe(response => {
      if (response.state === 'success') {
        this.assessment_types_name = response.data;
        this.assessment_questions(this.assessment_types_name[0].question_type_name);
      }
      if (response.state === 'failure') {

      }
    });
  }

  get_assessment_types(partner_id) {
    if (partner_id !== this.pratner_id) {
      this.pratner_id = partner_id;
      this.answers = [];
      this.assessment_types();
    }
  }

  // To upload files
  upload_file_to_Serve(files, stage_name, i) {
    this.progress_bar_file = i;
    this.enable_progress_bar = true;
    this.progress_percentage = this.progress_percentage + 10;
    const obj = {
      'franchisee_id': this.route.snapshot.params['franchisee_Id'],
      'sub_stage': stage_name,
      'subject': this.subject,
      'body': this.body,
      'to': this.to_mails_list_string,
      'folder_Id': this.folder_id,
      'fileStatus': 1
    };

    const fd = new FormData();
    fd.append('file', files);
    fd.append('franchisee_id', JSON.stringify(obj));

    this.httpService.upload_payment_receipt(fd).subscribe(response => {
      this.progress_bar_file = 500;
      this.enable_progress_bar = true;
      console.log(response);

        switch (response.type) {
                  case HttpEventType.UploadProgress:
                        this.progress_percentage = Math.round(response.loaded * 100 / response.total);
                        break;
                  case HttpEventType.Response:
                      console.log(response);

                      this.spinner.show();
                      if (stage_name === 'application_form') {
                        this.createFolder(this.route.snapshot.params['franchisee_Id'], 'KYC Upload');

                        const toast: Toast = {
                          type: 'success',
                          title: 'Success',
                          timeout: 2000,
                          body: '<h5>File uploaded</h5>',
                          bodyOutputType: BodyOutputType.TrustedHtml
                        };
                        this.toasterService.pop(toast);
                      }
                      else {
                        this.get_franchisee_data(this.route.snapshot.params['franchisee_Id']);
                        this.subject = '',
                          this.body = '';
                        this.to_mails_list_string = '';
                      }
                      this.enable_progress_bar = false;
            }
            console.log(this.progress_percentage);
      if (response.state === 'success') {

      }
    },
      err => {
        const message = 'Error to load franchisees.';
      });
  }

  changeFlag() {
    this.varibale_val = true;
  }
  // NDA upload documents  hareesh
  stepsDocuments(folder) {
    this.files_array = [];
    this.stepsFiles = true;
    this.stepsDocumentsFlag = false;
    this.breadcrums_folder_title = folder.folder_name;
    const folder_obj = {
      'folder_Id': folder._id,
      'franchisee_Id': this.route.snapshot.params['franchisee_Id']
    };
    this.httpService.get_file_by_folder(folder_obj).subscribe(response => {
      if (response.state === 'success') {
        this.page_loaded = true;
        this.files_array = response.file;

      }
      if (response.state === 'failure') {
        this.files_array = [];
      }

    });
  }
  stepsFilesFlag() {
    this.stepsDocumentsFlag = true;
    this.stepsFiles = false;
  }
  reuploadRequest(doc_name, kyc_id, i) {
    const file = {
      'franchisee_Id': this.route.snapshot.params['franchisee_Id'],
      'partner_Id': this.pratner_id,
      'doc_name': doc_name,
      'kyc_id': kyc_id
    };
    const dialogRef = this.dialog.open(ReuploadRequestComponent, {
      height: '465px',
      width: '440px',
      data: { file: file }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.business_type[i] = result.data.docs_types[i];
      //  this.get_business_type(this.franchisee_Id);
    });
  }
  approve_file(doc_name, kyc_id, i) {
    const file = {
      'franchisee_Id': this.route.snapshot.params['franchisee_Id'],
      'partner_Id': this.pratner_id,
      'doc_name': doc_name,
      'kyc_id': kyc_id
    };
    const dialogRef = this.dialog.open(ApproveFileComponent, {
      height: '190px',
      width: '370px',
      data: { file: file }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      // this.get_business_type(this.franchisee_Id);
      this.business_type[i] = result.data.docs_types[i];
    });
  }

  delete_meeting(meeting_Id, i) {
    // this.spinner.show();
    this.httpService.delete_meeting(meeting_Id).subscribe(response => {
      if (response.state === 'success') {

        const toast: Toast = {
          type: 'success',
          title: 'Success',
          timeout: 2000,
          body: '<h5>Meeting deleted</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);

        this.getAllMeetings();
        this.getFranchiseeMeeting(this.route.snapshot.params['franchisee_Id']);
        const index = this.array.indexOf(meeting_Id);
        this.meeting_array.splice(index, 1);
        // this.spinner.hide();
      }
      if (response.state === 'failure') {
        const toast: Toast = {
          type: 'error',
          title: 'Error',
          timeout: 2000,
          body: '<h5>Failed to delete</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
        // this.spinner.hide();
      }
    },
      err => {
        // this.spinner.hide();
        const message = 'Error to load franchisee.';
      });
  }

  edit_selected(meetings) {

    this.meeting_data = meetings;
    this.meeting_edit_mode = true;

  }






  update_meeting(meeting_data, meetingForm) {
    // const obj = {
    //   'meeting_id': this.meeting_id
    // };
    // meeting_data.meeting_id = this.route.snapshot.params['meeting_id'];
   if (meetingForm.valid === true){
    this.spinner.show();
    this.httpService.editMeeting(meeting_data).subscribe(response => {
      if (response.state === 'success') {
        const toast: Toast = {
          type: 'success',
          title: 'Success',
          timeout: 2000,
          body: '<h5>Meeting edited</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        meetingForm.resetForm();
        this.toasterService.pop(toast);
        this.meeting_data = {};
        this.meeting_edit_mode = false;


         this.getFranchiseeMeeting(this.route.snapshot.params['franchisee_Id']);
         
        this.spinner.hide();
      }
      if (response.state === 'failure') {
        const toast: Toast = {
          type: 'error',
          title: 'Error',
          timeout: 2000,
          body: '<h5>Failed to edit</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
        this.spinner.hide();
      }

    },
      err => {
        this.spinner.hide();
        const message = 'Error to load franchisee.';
      });
    }

  }


  getFranchiseeMeeting(franchisee_id) {
    this.httpService.getMeetingByFranchisee(franchisee_id).subscribe(response => {
      if (response.state === 'success') {
        this.meeting_array = response.data;
        this.sort_array();
      }
      if (response.state === 'failure') {
      }
    },
      err => {
        const message = 'Error to load franchisee.';
      });
  }

  // To create meeting
  create_meeting(meetingForm) {
    // this.meeting_data.stage_id = stage_type;
    this.meeting_data.franchisee_id = this.route.snapshot.params['franchisee_Id'];
    // this.meeting_data.array = this.array;
    if (meetingForm.valid === true) {
      this.spinner.show();
      this.httpService.createMeeting(this.meeting_data).subscribe(response => {
        if (response.state === 'success') {
          this.meeting_data = {};
          this.set_meeting_to_zero();
          this.get_franchisee_data(this.route.snapshot.params['franchisee_Id']);
          this.getFranchiseeMeeting(this.route.snapshot.params['franchisee_Id']);
          const toast: Toast = {
            type: 'success',
            title: 'Meeting Created',
            timeout: 2000,
            body: '<h5>Successfully Created</h5>',
            bodyOutputType: BodyOutputType.TrustedHtml
          };
          this.toasterService.pop(toast);
          // meetingForm.resetForm();
          this.spinner.hide();
        }
        if (response.state === 'failure') {
          const toast: Toast = {
            type: 'error',
            title: 'Failed',
            timeout: 2000,
            body: '<h5>Falied to create meeting</h5>',
            bodyOutputType: BodyOutputType.TrustedHtml
          };
          this.toasterService.pop(toast);
          this.spinner.hide();
        }
      },
        err => {
          const message = 'Error to create meeting.';
          this.spinner.hide();
        });
    }
  }

  getAllMeetings(){
    this.httpService.getAllMeetings().subscribe(response => {
      if (response.state === 'success'){
        this.meeting_array = response.meeting;
      }
      if (response.state === 'failure'){

      }
    }),
    err => {
      const message = 'Error to load Meetings'
    }
  }


  autoCompleteCallback(selectedData) {
    this.meeting_data.meeting_location = selectedData.data.address_components[0].long_name;
  }

  assign_people(auditor) {
    const index = this.array.indexOf(auditor);
    if (this.array.indexOf(auditor) === -1) {
      this.array.push(auditor);

    }
    if (index !== -1) {
      this.array.splice(index, 1);
    }
    this.meeting_data.meeting_assigned_people = this.array;
    this.kyc.meeting_assigned_people = this.array;
  }
  // To open dialog popup
  openDialog(file) {
    this.dialog.open(ViewFileComponent, {
      height: 'auto',
      width: 'auto',
      panelClass: 'fileView',
      data: { file: file }
    });
  }

  openStageFiles(file_link, i) {
    if (this.edit_stage_file_name !== i) {
      if (file_link) {
        let file_type = '';
        if (file_link.split('.').pop() === 'png' || file_link.split('.').pop() === 'jpg' || file_link.split('.').pop() === 'jpeg' || file_link.split('.').pop() === 'gif') {
          file_type = 'image';
        }
        const obj = {
          'path': file_link,
          'image_type': file_type || 'pdf'
        };
        this.dialog.open(ViewFileComponent, {
          height: 'auto',
          width: 'auto',
          panelClass: 'fileView',
          data: { file: obj }
        });
      }
    }
  }

  get_business_type(franchisee_Id) {
    this.httpService.get_business_type(franchisee_Id).subscribe(response => {
      if (response.state === 'success') {
        this.business_Id = response.data[0]._id;
        this.pratner_id = response.data[0].partner_id;
        this.business_type = response.data[0].docs_types;
        for (let i = 0; i < this.business_type.length; i++) {
          this.business_type[i].progress_percentage = 0;
          // tslint:disable-next-line:no-shadowed-variable
          for (let i = 0; i < this.business_type.length; i++) {
            this.business_type[i].progress_percentage = 0;
          }
        }
        console.log('this.business_type', this.business_type);
      }
    });
  }

  get_crm_folders(franchisee_Id) {
    this.httpService.get_crm_folders(franchisee_Id).subscribe(response => {
      if (response.state === 'success') {
        this.crm_folders = response.data;
      }
      if (response.state === 'failure') {
        this.crm_folders = [];
      }
    });
  }

  // To get business type by partner id
  get_business_type_by_partner(partner_id) {
    this.pratner_id = partner_id;
    const obj = {
      'franchisee_id': this.route.snapshot.params['franchisee_Id'],
      'partner_id': partner_id
    };
    this.httpService.getKycByPartners(obj).subscribe(response => {
      if (response.state === 'success') {
        this.business_Id = response.data._id;
        this.business_type = response.data.docs_types;
        console.log('this.business_type', this.business_type);
        for (let i = 0; i < this.business_type.length; i++) {
          this.business_type[i].progress_percentage = 0;
        }
      }
      if (response.state === 'failure') {
        this.business_type = [];
      }
    });
  }

  // To get Partners franchisee data
  // tslint:disable-next-line:no-shadowed-variable
  getPartnersFranchisee(franchise_id) {
    this.httpService.getFranchiseePartners(franchise_id).subscribe(response => {
      if (response.state === 'success') {
        const to_mails_list_array = [];
        this.partners_list = [];
        this.partners_list = response.data;
        this.pratner_id = this.partners_list[0]._id;
        // if(this.userData.user_role == 'franchisee'){
        this.get_reports(this.pratner_id);
        // }
        for (let i = 0; i < response.data.length; i++) {
          to_mails_list_array.push(response.data[i].partner_email);
        }
        this.to_mails_list_string = to_mails_list_array.join(', ');
      }
      if (response.state === 'failure') {
      }
    },
      err => {
        const message = 'Error to load franchisee.';
      });
  }

  // create folder for kyc
  // to create folder while creating Franchisee
  createFolder(franchisee_Id, folder_name) {
    if (!this.folder_name) {
      this.folder_name = folder_name;
    }
    if (this.folder_name) {
      this.obj = {
        'folder_name': folder_name,
        'franchisee_Id': franchisee_Id,
        'crm_folder': true,
        'parent_folder_id': '',

      };
      this.httpService.createFolder(this.obj).subscribe(response => {
        if (response.state === 'success') {
          this.get_franchisee_data(this.route.snapshot.params['franchisee_Id']);
          const toast: Toast = {
            type: 'success',
            title: 'Success',
            timeout: 2000,
            body: '<h5>Successfully Created</h5>',
            bodyOutputType: BodyOutputType.TrustedHtml
          };
          this.toasterService.pop(toast);
          this.get_crm_folders(this.route.snapshot.params['franchisee_Id']);
          this.get_franchisee_data(this.route.snapshot.params['franchisee_Id']);
        }
        if (response.state === 'failure') {
          this.get_franchisee_data(this.route.snapshot.params['franchisee_Id']);
          const toast: Toast = {
            type: 'error',
            title: 'Success',
            timeout: 2000,
            body: '<h5>Successfully Created</h5>',
            bodyOutputType: BodyOutputType.TrustedHtml
          };
          this.toasterService.pop(toast);
        }
      },
        err => {
          const message = 'Error to create folder.';
        });
    }
    else {

    }
  }

  // To upload kyc business type files
  upload_kyc_file(files: FileList, file, stage_name, i, folder_type) {
    this.show_progress_bar = i;
    this.business_type[i].progress_percentage = 0;
    this.get_Id(folder_type);
    // files.item(0)
    const obj = {
      doc_name: file.doc_name,
      franchisee_id: this.franchisee_Id,
      stage_name: stage_name,
      partner_id: this.pratner_id,
      folder_Id: this.folder_id
    };

    const fd = new FormData();
    fd.append('doc_file', files.item(0));
    fd.append('document', JSON.stringify(obj));

    this.httpService.upload_doc(fd).subscribe(response => {
      this.enable_progress_bar = true;
      console.log(response);

      switch (response.type) {
                case HttpEventType.UploadProgress:
                      this.business_type[i].progress_percentage = Math.round(100 * response.loaded / response.total);
                      break;
                case HttpEventType.Response:
                  console.log(HttpEventType.Response);
                  this.spinner.show();
                      if (response.body.state === 'success') {
                      console.log(this.business_type[i]);

                      this.business_type[i] = response.body.data.docs_types[i];
                      // this.get_business_type(this.franchisee_Id);
                      this.show_progress_bar = 500;
                      const toast: Toast = {
                        type: 'success',
                        title: 'Success',
                        timeout: 2000,
                        body: '<h5>File uploaded</h5>',
                        bodyOutputType: BodyOutputType.TrustedHtml
                      };
                      this.toasterService.pop(toast);
                      this.spinner.hide();

                    }
                    if (response.body.state === 'failure') {
                      // this.get_business_type(this.franchisee_Id);

                      const toast: Toast = {
                        type: 'error',
                        title: 'Error',
                        timeout: 2000,
                        body: '<h5>Failed to upload</h5>',
                        bodyOutputType: BodyOutputType.TrustedHtml
                      };
                      this.toasterService.pop(toast);
                      this.spinner.hide(); // To hide the spinner
                    }
                  }
    },
      err => {
        const message = 'Error to load franchisees.';
      });
  }

  // To delete kyc business type files
  remove_file(doc_name, kyc_id, i) {
    const file_obj = {
      'kyc_id': kyc_id,
      'doc_name': doc_name
    };
    this.spinner.show(); // To show the spinner
    this.httpService.delete_uploaded_doc(file_obj).subscribe(response => {

      if (response.state === 'success') {


        // this.get_business_type(this.franchisee_Id);
        this.business_type[i] = response.data.docs_types[0];
        const toast: Toast = {
          type: 'success',
          title: 'Success',
          timeout: 2000,
          body: '<h5>Deleted Successfully</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
        this.spinner.hide();
      }
      if (response.state === 'failure') {

        const toast: Toast = {
          type: 'error',
          title: 'Error',
          timeout: 2000,
          body: '<h5>Failed to delete</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
        this.spinner.hide(); // To hide the spinner
        // this.get_business_type(this.franchisee_Id);


      }
    },
      err => {
        const message = 'Error to load franchisees.';
      });
  }

  loadIdValueInForm(selected_option, type_name, question, j) {
    for (let i = 0; this.datasource.length; i++) {
      if (this.datasource[i].question_EN === question.question_EN) {
        this.datasource[i].selected_option = selected_option;
        const search = this.datasource[i].question_EN;
        const results = _.findIndex(this.answers, function (chr) {
          return chr.question_EN === search;
        });
        if (results !== -1) {
          this.answers[results] = this.datasource[i];
        }
        if (results === -1) {
          this.answers.push(this.datasource[i]);
        }
        return this.answers;
      }
    }
  }

  // To submit test
  post_answers() {
    const obj = {
      'assessment_list': this.answers,
      'franchisee_id': this.route.snapshot.params['franchisee_Id'],
      'partner_id': this.pratner_id,
      'total_questions': this.assessment_types_list.length,
      'crm_status': true
    };
    this.spinner.show();
    this.httpService.answer(obj).subscribe(response => {
      if (response.state === 'success') {
        this.get_crm_folders(this.route.snapshot.params['franchisee_Id']);
        this.get_franchisee_data(this.route.snapshot.params['franchisee_Id']);
        swal(
          'Good job!',
          'Test Complete!',
          'success'
        );
        this.spinner.hide();
        // if(this.userData.user_role == 'franchisee'){
        this.get_reports(this.pratner_id);
        // }
      }
      if (response.state === 'failure') {
        this.get_franchisee_data(this.route.snapshot.params['franchisee_Id']);
        // this.get_business_type(this.franchisee_Id);
        this.spinner.hide();
      }
    });
  }

  setIndex(tab) {
    this.tabIndex = tab;
    if (this.tabIndex === 0) {
      this.router.navigate(['/apps/crm/franchisee-setup/' + this.route.snapshot.params['franchisee_Id'] + '/discussion']);
      this.get_question_list();
    }
    if (this.tabIndex === 1) {
      this.router.navigate(['/apps/crm/franchisee-setup/' + this.route.snapshot.params['franchisee_Id'] + '/kyc']);
    }
    if (this.tabIndex === 2) {
      this.assessment_types();
      this.router.navigate(['/apps/crm/franchisee-setup/' + this.route.snapshot.params['franchisee_Id'] + '/assessments']);
    }
    if (this.tabIndex === 3) {
      this.router.navigate(['/apps/crm/franchisee-setup/' + this.route.snapshot.params['franchisee_Id'] + '/agreement']);
    }
    if (this.tabIndex === 4) {
      this.router.navigate(['/apps/crm/franchisee-setup/' + this.route.snapshot.params['franchisee_Id'] + '/setup']);
    //  this.get_setup_checklist_list(this.setup_department_list[0]._id);
    }

  }

  filter_report_stats(qid) {
    this.datasource = [];
    this.datasource = _.filter(this.answer_response, function (o) {
      return o.question_type === qid;
    });
  }
  onClickReport(event: MatTabChangeEvent) {
    this.filter_report_stats(event.tab.textLabel);
  }

  // To get reports after the test finishes
  get_reports(partner_id) {
    console.log(partner_id);
    this.answer_response = [];
    if (partner_id) {
      this.pratner_id = partner_id;
    }
    this.httpService.get_reports(this.route.snapshot.params['franchisee_Id'], this.pratner_id).subscribe(response => {
      if (response.state === 'success') {
        this.circle = 0;
        this.horizantal_stats = [];
        this.graph_val = {
          heading: '',
          value: ''
        };
        this.answer_response = response.data.assessment_list;
        // for pagination
        for (let j = 0; j < this.answer_response.length; j++) {
          this.answer_response[j].flag = false;
          if (this.answer_response[j].correct_answer === this.answer_response[j].selected_option) {
            this.answer_response[j].flag = true;
          }
        }
        // for graph
        for (let i = 0; i < response.graph_data.length; i++) {
          if (response.graph_data[i].correct_opt > 0) {
            this.graph_val = {
              heading: response.graph_data[i].ques_head_val,
              value: Math.round((response.graph_data[i].correct_opt / response.graph_data[i].total_ques_by_type) * 100)
              // console.log('coreect anser', this.circle);
            };
          }
          else {
            this.graph_val = {
              heading: response.graph_data[i].ques_head_val,
              value: 0
              // console.log('coreect anser', this.circle);
            };
          }
          this.horizantal_stats.push(this.graph_val);
          this.circle = this.circle + response.graph_data[i].correct_opt;
          console.log('coreect anser', this.circle);

        }
        if (this.assessment_types_name.length > 0) {
          this.filter_report_stats(this.assessment_types_name[0].question_type_name);
        }
      }
      if (response.state === 'failure') {
        // this.get_business_type(this.franchisee_Id);
      }
    });
  }

  // get files by folder ID
  // tslint:disable-next-line:no-shadowed-variable
  get_files_by_folder(id) {
    this.httpService.getFolderFiles(id).subscribe(response => {
      if (response.state === 'success') {
        this.files_list = [];
        for (let i = 0; i < response.file.length; i++) {
          response.file[i].flag = false;
          this.files_list.push(response.file[i]);
        }
      }
      if (response.state === 'failure') {
        this.files_list = [];
      }
    },
      err => {
        const message = 'Error to load files.';
      });
  }

  get_stats(event: MatTabChangeEvent) {
    this.pratner_id = this.partners_list[event.index]._id;
    this.get_reports(this.pratner_id);
    // if (partner_id !== this.pratner_id){
    // this.pratner_id = partner_id;
    // this.answers = [];
    this.assessment_types();
    // }
  }



  // filter
  sort_array() {
    this.meeting_array.sort(function (a, b) {
      const aa = a._id,
        bb = b._id;
      return aa > bb ? -1 : (aa < bb ? 1 : 0);
    });
  }

  set_time() {
    setTimeout(() => {

      this.progress = this.progress + 10;
    }, 200);
  }

  // To validate stage
  validate_stage(stage_name) {
    if (stage_name === 'Discussion') {
      if (!this.file_link || !this.nda_file) {
        swal({
          title: 'Incomplete stage',
          text: ' Please complete this stage before moving to the next one',
          type: 'warning',
        });
        return this.stage_valid = true;
      }
    }

    if (stage_name === 'Kyc_Uploads') {
      for (let i = 0; i < this.file_link.length; i++) {
        if (!this.bg_verification_files || !this.meeting_data) {
          swal({
            title: 'Incomplete stage',
            text: ' Please complete this stage before moving to the next one',
            type: 'warning',
          });
          return this.stage_valid = true;
        }
      }
    }
    if (stage_name === 'Asessments') {
      for (let i = 0; i < this.assessment_questions.length; i++) {
        if (!this.assessment_types_name || !this.assessment_types_list) {
          swal({
            title: 'Incomplete stage',
            text: ' Please complete this stage before moving to the next one',
            type: 'warning',
          });
          return this.stage_valid = true;
        }
      }
    }
    if (stage_name === 'Agreement_Copy') {
      if (!this.final_paymnet_link || !this.agrement_file_link) {
        swal({
          title: 'Incomplete stage',
          text: ' Please complete this stage before moving to the next one',
          type: 'warning',
        });
        return this.stage_valid = true;
      }
    }

  }

  complete_stage(stage_name) {
    this.validate_stage(stage_name);
    const obj = {
      'franchisee_id': this.route.snapshot.params['franchisee_Id'],
      'stage_name': stage_name
    };
    if (!this.stage_valid) {
      this.httpService.update_stage(obj).subscribe(response => {
        if (response.state === 'success') {
          localStorage.setItem('state', JSON.stringify(response.franchiees));
          this.franchiseeData = JSON.parse(localStorage.getItem('state'));
          console.log(this.franchiseeData);
                this.stageCompleteMessagePop();
          // swal(
          //   'Good job!',
          //   'Stage Complete!',
          //   'success'
          // );

          this.get_crm_folders(this.route.snapshot.params['franchisee_Id']);
          this.get_franchisee_data(this.route.snapshot.params['franchisee_Id']);

        }
      });
    }
  }

  stageCompleteMessagePop(): void {
    const dialogRef = this.dialog.open(StagecompletepopComponent, {
      width: '400px',
      height: '350px',

    });
     dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  navigate() {
    this.router.navigate(['/apps/settings/settings-application']);
  }

  // get_question_list() {
  //   this.httpService.get_ques_by_franchisee_id(this.route.snapshot.params['franchisee_Id']).subscribe(response => {
  //     if (response.state === 'success') {
  //       if (response.questions_list.answers) {
  //         console.log('response.questions_list.answers', response.questions_list.answers);
  //         this.form_submitted = response.questions_list.application_status;
  //         return this.question_list = response.questions_list.answers;
  //       } else {
  //         this.question_list = response.questions_list;
  //         for (var i = 0; i < this.question_list.length; i++) {
  //           this.question_list[i].answer = '';
  //         }
  //       }

  //     }
  //     if (response.state === 'failure') {

  //     }
  //   });
  // }
  get_question_list() {
    this.httpService.get_ques_by_franchisee_id(this.route.snapshot.params['franchisee_Id']).subscribe(response => {
      if (response.state === 'success') {
        if (response.questions_list.answers) {
          this.form_submitted = response.questions_list.application_status;
          this.httpService.download_pdf(this.route.snapshot.params['franchisee_Id']).subscribe(res => {
            if (response.state === 'success') {
              console.log(response.questions_list);
              console.log(response.questions_list.answers);
              var lMargin=15; //left margin in mm
              var rMargin=15; //right margin in mm
              var pdfInMM=210;  // width of A4 in mm
              var doc = new jsPDF("p","mm","a4");
              var answer = response.questions_list.answers;
              answer.forEach((ans, i) => {
                doc.text(70, 10, "\t\t" + "APPLICATION FORM" + "\n\n");
                doc.text(10, 20 + (i * 35),
                  i+1 + ")" +
                  "Question Name:" + ans.question_EN +"\n" +
                  "Answer:" + ans.answer  + "\n\n\n\n\n" );
              });
              doc.save('test.pdf');
            }
          });
          return this.question_list = response.questions_list.answers;
        } else {
          this.question_list = response.questions_list;
          for (let i = 0; i < this.question_list.length; i++) {
            this.question_list[i].answer = '';
          }
        }

      }
      if (response.state === 'failure') {

      }
    });
  }


  send() {
    const obj = {
      'franchisee_Id': this.route.snapshot.params['franchisee_Id'],
      'application_list': this.question_list
    };
    for (let i = 0; i < this.question_list.length; i++) {
      if (this.question_list[i].isRequire && !this.question_list[i].answer) {
        return swal({
          title: 'Fill require questions',
          // text: ' Please complete this stage before moving to the next one',
          type: 'warning',
        });
      }
    }
    const fd = new FormData();
    for (let j = 0; j < this.question_list.length; j++) {
      if (this.question_list[j].question_type === 'File Upload') {
        fd.append('file_upload', this.question_list[j].answer);
      }
    }

    fd.append('data', JSON.stringify(obj));
    console.log('this.ques', this.question_list);
    this.spinner.show();
    this.httpService.submit_application(fd).subscribe(res => {
      console.log('res', res);
      this.question_list = [];
      this.get_question_list();
      this.spinner.hide();
    });
  }
  application_doc(files: FileList, i) {
    this.question_list[i].answer = files.item(0);
    console.log('application_doc', this.question_list[i]);
  }
  navigateApplication() {
    this.router.navigate(['/apps/settings/settings-application']);
  }
  navigateSetup() {
    this.router.navigate(['/apps/settings/settings-setup']);
  }
  interval() {
    setInterval(() => {
      this.business_type[0].progress_percentage = this.business_type[0].progress_percentage + 10;
    }, 200);
  }
  getPartnerId(event) {
    console.log('event', event);
    const partner_id = this.partners_list[event.index]._id;
    this.get_business_type_by_partner(partner_id);
  }

  remove_file_name(index) {
    this.question_list[index].answer = '';
    this.question_list[index].file_name = '';
  }
  // To upload third party files
  upload_third_party_files(files: FileList) {
    this.progress_percentage = this.progress_percentage + 10;
    this.obj = {
      'franchisee_id': this.route.snapshot.params['franchisee_Id'],
    };
    this.progress_percentage = this.progress_percentage + 30;
    const fd = new FormData();
    // const file = files.item(0);
    for (let i = 0; i < files.length; i++) {
      fd.append('file_upload', files[i], files[i]['name']);
    }
    this.progress_percentage = this.progress_percentage + 50;
    fd.append('file_details', JSON.stringify(this.obj));
    this.spinner.show();
    this.httpService.backgroundVerification(fd).subscribe(response => {
      this.bg_verification_files = response.files;
      if (response.status === 'success') {
        this.progress_percentage = this.progress_percentage + 20;
        const toast: Toast = {
          type: 'success',
          title: 'Success',
          timeout: 2000,
          body: '<h5>File uploaded</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
        this.spinner.hide();
        return this.getthirdpartyfile(this.franchisee_Id);
      }
    },
      err => {
        const message = 'Error to load franchisees.';
        this.spinner.hide();
      });
  }

  handleFileInput_kyc(files: FileList) {
    this.fileToUpload = files.item(0);
    this.upload_third_party_files(files);
  }
  getthirdpartyfile(franchisee_id) {
    this.httpService.getthirdpartyfile(franchisee_id).subscribe(response => {
      console.log(response);
      if (response.status === 'success') {
        this.bg_verification_files = response.files;
      }
      if (response.status === 'failure') {
      }
    },
      err => {
        const message = 'Error to load franchisee.';
      });
  }

  // Edit background file name
  edit_file_name(file, file_name, index) {
    // const obj = {
    //   franchise_id: this.franchisee_Id,
    // }
    this.spinner.show();
    this.httpService.editBgFile(file).subscribe(response => {
      if (response.state === 'success') {
        const toast: Toast = {
          type: 'success',
          title: 'Success',
          timeout: 2000,
          body: '<h5>File edited</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        const data = response['this.obj'];
        this.bg_file_name_mode = false;
        this.selected_file_row = null;
        this.edit_stage_file_name = 'echp';
        //  this.file[index].flag = false;
        // if (file.file_name !== response.file_name) {
        this.toasterService.pop(toast);
        // }
        this.spinner.hide();
      }
      if (response.state === 'failure') {
        const toast: Toast = {
          type: 'error',
          title: 'Error',
          timeout: 2000,
          body: '<h5>Error</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
        this.spinner.hide();

      }
    },
      err => {
        const message = 'Error to update file name.';
      });
  }
  make_file_edit_mode(file, index) {
    this.selected_file_row = index;
    // this.selected_row = index;
    this.bg_file_name_mode = index;
    // this.select_files(file, file.flag, index);
  }

  // Edit discussion file name
  edit_discussion_file_name(file, file_name, index) {
    this.spinner.show();
    const obj = {
      franchisee_id: this.franchisee_Id,
      payment_file_name: file
    };
    this.httpService.editDiscussionFile(obj).subscribe(response => {
      if (response.state === 'success') {


        const toast: Toast = {
          type: 'success',
          title: 'Success',
          timeout: 2000,
          body: '<h5>File edited</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.payment_file_name_edit_mode = false;
        const data = response['this.obj'];
        this.selected_file_row = null;
        this.edit_stage_file_name = 'echp';
        //  this.file[index].flag = false;
        // if (file.payment_file_name !== response.payment_file_name) {
        this.toasterService.pop(toast);
        // }

        this.spinner.hide();
      }
      if (response.state === 'failure') {
        const toast: Toast = {
          type: 'error',
          title: 'Error',
          timeout: 2000,
          body: '<h5>Error</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
        this.spinner.hide();

      }
    },
      err => {
        const message = 'Error to update file name.';
      });
  }

  make_discussion_file_edit_mode(file, index) {
    this.payment_file_name_edit_mode = index;
    // this.selected_file_row = index;
  }

  // to edit agreement file
  edit_agreement_file_name(file, file_name, index) {
    this.spinner.show();
    const obj = {
      franchisee_id: this.franchisee_Id,
      agreement_file_name: file
    };
    this.httpService.editAgreementFile(obj).subscribe(response => {
      if (response.state === 'success') {

        const toast: Toast = {
          type: 'success',
          title: 'Success',
          timeout: 2000,
          body: '<h5>File edited</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        const data = response['this.obj'];
        this.selected_file_row = null;
        this.edit_stage_file_name = 'echp';
        //  this.file[index].flag = false;
        // if (file.agreement_file_name !== response.agreement_file_name) {
        this.toasterService.pop(toast);
        // }
        this.agreement_final_payment = false;
        this.spinner.hide();
      }
      if (response.state === 'failure') {
        const toast: Toast = {
          type: 'error',
          title: 'Error',
          timeout: 2000,
          body: '<h5>Error</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
        this.spinner.hide();

      }
    },
      err => {
        const message = 'Error to update file name.';
      });
  }
  make_agreement_file_edit_mode(file, index) {
    this.agreement_final_payment = index;
  }
  // edit nda file name
  edit_nda_file_name(file, file_name, index) {
    this.spinner.show();
    const obj = {
      franchisee_id: this.franchisee_Id,
      nda_file_name: file
    };
    this.httpService.editNdaFile(obj).subscribe(response => {
      if (response.state === 'success') {


        const toast: Toast = {
          type: 'success',
          title: 'Success',
          timeout: 2000,
          body: '<h5>File edited</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.nda_file_edit_name_mode = false;
        const data = response['this.obj'];
        this.selected_file_row = null;
        this.edit_stage_file_name = 'echp';
        // if (file.nda_file_name !== response.nda_file_name) {
        this.toasterService.pop(toast);
        // }
        this.spinner.hide();
      }
      if (response.state === 'failure') {
        const toast: Toast = {
          type: 'error',
          title: 'Error',
          timeout: 2000,
          body: '<h5>Error</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
        this.spinner.hide();

      }
    },
      err => {
        const message = 'Error to update file name.';
      });
  }

  make_nda_file_edit_mode(file, index) {
    this.nda_file_edit_name_mode = index;
  }
  // edit agreement final file name
  edit_agreement_final_file_name(file, file_name, index) {
    this.spinner.show();
    const obj = {
      franchisee_id: this.franchisee_Id,
      final_agreement_file_name: file
    };
    this.httpService.editAgreementFinalFile(obj).subscribe(response => {
      if (response.state === 'success') {


        const toast: Toast = {
          type: 'success',
          title: 'Success',
          timeout: 2000,
          body: '<h5>File edited</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.fina_agreement_edit_mode = false;
        const data = response['this.obj'];
        this.selected_file_row = null;
        this.edit_stage_file_name = 'echp';

        //  this.file[index].flag = false;
        // if (file.final_agreement_file_name !== response.final_agreement_file_name) {
        this.toasterService.pop(toast);
        // }
        this.spinner.hide();
      }
      if (response.state === 'failure') {
        const toast: Toast = {
          type: 'error',
          title: 'Error',
          timeout: 2000,
          body: '<h5>Error</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
        this.spinner.hide();

      }
    },
      err => {
        const message = 'Error to update file name.';
      });
  }

  make_agreement_final_file_edit_mode(file, index) {
    this.fina_agreement_edit_mode = index;
  }
  make_stage_file_edit_mode(file, index) {
    this.edit_stage_file_name = index;
  }
  edit_form() {
    this.edit_application_form = true;
    // form_submitted = false;
    // application_response = false;
  }

  // To delete discussion(1lakh) payment file
  delete_discussion_file() {
    this.spinner.show();

    this.httpService.delete_dicussion_payment_file(this.franchisee_Id).subscribe(response => {
      if (response.state === 'success') {
        const toast: Toast = {
          type: 'success',
          title: 'Success',
          timeout: 2000,
          body: '<h5>File deleted</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
        this.get_franchisee_data(this.route.snapshot.params['franchisee_Id']);
        this.spinner.hide();
      }
      if (response.state === 'failure') {
        const toast: Toast = {
          type: 'error',
          title: 'Error',
          timeout: 2000,
          body: '<h5>Failed to deleted</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
        this.spinner.hide();
      }
    },
      err => {
        this.spinner.hide();
        const message = 'Error to delete file';
      });
  }

  // To delete discussion nda file
  delete_nda_file() {
    this.spinner.show();
    this.httpService.delete_nda_file(this.franchisee_Id).subscribe(response => {
      if (response.state === 'success') {
        const toast: Toast = {
          type: 'success',
          title: 'Success',
          timeout: 2000,
          body: '<h5>File deleted</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
        this.get_franchisee_data(this.route.snapshot.params['franchisee_Id']);
        this.spinner.hide();
      }
      if (response.state === 'failure') {
        const toast: Toast = {
          type: 'error',
          title: 'Error',
          timeout: 2000,
          body: '<h5>Failed to deleted</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
        this.spinner.hide();
      }
    },
      err => {
        this.spinner.hide();
        const message = 'Error to delete file';
      });
  }

  // To delete agreement(4lakhs)payment file
  delete_agreement_payment() {
    this.spinner.show();
    this.httpService.delete_agreement_payment(this.franchisee_Id).subscribe(response => {
      if (response.state === 'success') {
        const toast: Toast = {
          type: 'success',
          title: 'Success',
          timeout: 2000,
          body: '<h5>File deleted</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
        this.get_franchisee_data(this.route.snapshot.params['franchisee_Id']);
        this.spinner.hide();
      }
      if (response.state === 'failure') {
        const toast: Toast = {
          type: 'error',
          title: 'Error',
          timeout: 2000,
          body: '<h5>Failed to deleted</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
        this.spinner.hide();
      }
    },
      err => {
        this.spinner.hide();
        const message = 'Error to delete file';
      });
  }

  // To delete final agreement file
  delete_final_agreement() {
    this.spinner.show();
    this.httpService.delete_final_payment(this.franchisee_Id).subscribe(response => {
      if (response.state === 'success') {
        const toast: Toast = {
          type: 'success',
          title: 'Success',
          timeout: 2000,
          body: '<h5>File deleted</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
        this.get_franchisee_data(this.route.snapshot.params['franchisee_Id']);
        this.spinner.hide();
      }
      if (response.state === 'failure') {
        const toast: Toast = {
          type: 'error',
          title: 'Error',
          timeout: 2000,
          body: '<h5>Failed to deleted</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
        this.spinner.hide();
      }
    },
      err => {
        this.spinner.hide();
        const message = 'Error to delete file';
      });
  }

  // To delete kyc third party files
  delete_kyc_bg_files(file, i) {
    this.spinner.show();
    this.httpService.delete_kyc_bg_files(file._id).subscribe(response => {
      if (response.state === 'success') {
        const toast: Toast = {
          type: 'success',
          title: 'Success',
          timeout: 2000,
          body: '<h5>File deleted</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
        this.getthirdpartyfile(this.franchisee_Id);
        const index = this.array.indexOf(file);
        this.bg_verification_files.splice(index, 1);
        this.spinner.hide();
      }
      if (response.state === 'failure') {
        const toast: Toast = {
          type: 'error',
          title: 'Error',
          timeout: 2000,
          body: '<h5>Failed to delete</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
      }
    },
      err => {
        this.spinner.hide();
        const message = 'Error to delete file';
      });
  }

  scroll(el) {
    el.scrollIntoView();
  }

  // Get department list by franchisor id
  get_department_list(franchisor_id) {
    this.spinner.show();
    this.httpService.get_department_list(franchisor_id).subscribe(response => {
      console.log(response);
      if (response.state === 'success') {

        this.setup_department_list = response.data;
        this.spinner.hide();

      }
      if (response.state === 'failure') {
        this.spinner.hide();
      }
    },
      err => {
        const message = 'Error to load data';
        this.spinner.hide();
      });
  }
  // get setup checklist list department id
  get_setup_checklist_list(department_id) {
    this.spinner.show();
    this.httpService.get_setup_checklist_list(department_id).subscribe(response => {
      if (response.state === 'success') {
        this.setup_checklist_list = response.data;
        var checklist_array = this.setup_checklist_list;

        this.spinner.hide();
        this.httpService.get_task_checklist_length(department_id, this.route.snapshot.params['franchisee_Id']).subscribe(response_task_length => {
            var  completed_task_list_array = response_task_length.data;
            console.log(completed_task_list_array);
            this.setup_checklist_list = checklist_array.map(x => Object.assign(x, completed_task_list_array.find(y => y.setup_checklist_id == x._id)))
            console.log('setup_checklist_list',this.setup_checklist_list);
        })
      }
      if (response.state === 'failure') {
        this.setup_checklist_list = [];
        this.spinner.hide();
      }
    },
      err => {
        const message = 'Error to load data';
        this.spinner.hide();
      });
  }
  onSelectChange(event) {
    console.log(event.index);
    this.get_setup_checklist_list(this.setup_department_list[event.index]._id);
    this.checklist_opened = false;
  }
  // For Opening checklist
  open_checklist(checklist, i) {
    this.checklist_data = checklist;
    if(checklist.setup_checklist_id){
      this.get_setup_checklist_task(checklist.setup_checklist_id);
    }
    else {
      this.get_setup_checklist_task(checklist._id);
    }

    this.checklist_opened = true;
    this.departmentTabIndex = i;
    this.checklist_tasks_list = [];
  }
  // To get checklist task by checklist id
  get_setup_checklist_task(checklist_id) {
    // this.spinner.show();
    this.httpService.get_setup_checklists_task(checklist_id).subscribe(response => {
      if (response.state === 'success') {
        this.checklist_tasks_list = response.data;
        //  this.spinner.hide();
        var checklist_tasks_array = this.checklist_tasks_list;
        var completed_tasks_list = [];
        this.httpService.get_setup_checklists_completed_tasks(checklist_id, this.route.snapshot.params['franchisee_Id']).subscribe(response_completed => {
          completed_tasks_list = response_completed.data;

console.log(completed_tasks_list);
this.all_checklist_tasks_list = checklist_tasks_array.map(x => Object.assign(x, completed_tasks_list.find(y => y.task_id == x._id)));
console.log(this.all_checklist_tasks_list);
        });

      }
      if (response.state === 'failure') {
        //    this.spinner.hide();
      }
    },
      err => {
        const message = 'Error to load data';
        this.spinner.hide();
      });
  }

  knowledgeTransfer(): void {
    const dialogRef = this.dialog.open(KnowledgeTransferComponent, {
      width: '650px',
      height: '410px',
      panelClass: 'ktpopup1',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      // this.animal = result;
    });
  }

//to upload setup checklist task files
uploadSetupChecklistFiles(files: FileList) {
  this.obj = {
    'checklist_id': this.checklist_id
  };
  const fd = new FormData();
  // const file = files.item(0);
  for (let i = 0; i < files.length; i++) {
    fd.append('file_upload', files[i], files[i]['name']);
  }
  fd.append('file_details', JSON.stringify(this.obj));
  this.spinner.show();
  this.httpService.upload_setup_checklist_task_files(fd).subscribe(response => {
    // this.campaign = response.files;
    if (response.status === 'success') {
      this.getSetupChecklistTaskFiles('checklist_id');
      const toast: Toast = {
        type: 'success',
        title: 'Success',
        timeout: 2000,
        body: '<h5>File uploaded</h5>',
        bodyOutputType: BodyOutputType.TrustedHtml
      };
      this.toasterService.pop(toast);
      this.spinner.hide();
    }
  },
    err => {
      const message = 'Error to load franchisees.';
      this.spinner.hide();
    });
}

handleFileInput_setupChecklist_task_file(files: FileList) {
  this.fileToUpload = files.item(0);
  this.uploadSetupChecklistFiles(files);
}

getSetupChecklistTaskFiles(checklist_id) {
  this.httpService.get_Setup_Checklist_task_files(checklist_id).subscribe(response => {
    if (response.state === 'success') {

    }
    if (response.state === 'failure') {
    }
  },
    err => {
      const message = 'Error to load franchisee.';
    });
}


// title_box_checklist

title_box_checklist(){
  this.titleboxchecklist = !this.titleboxchecklist;
}

// activateClass(checklist){
//   checklist.active = !checklist.active;
// }
// this.setClickedRow = function(index){
//   this.selectedRow = index;
// }
activateClass(index){
  this.selectedListitem = index;

}

viewattachment(attach): void {
  localStorage.setItem('viewfileuploadSetup', JSON.stringify(attach));

  const dialogRef = this.dialog.open(ViewfilesetupstageComponent, {
    width: '400px',
    height: 'auto',
    panelClass: 'fileView'


  });
}

// completing setup task
// completeTask(task_data, event){
// this.spinner.show();
// console.log(task_data);
// //task_data.task_status = true;
//   task_data.task_id = task_data._id;
//   task_data.franchisee_id = this.user_data._id;
//    this.httpService.complete_task(task_data).subscribe(response => {
//     if (response.status === 'success') {
//       const toast: Toast = {
//         type: 'success',
//         title: 'Success',
//         timeout: 2000,
//         body: '<h5>Task success</h5>',
//         bodyOutputType: BodyOutputType.TrustedHtml
//       };
//       this.toasterService.pop(toast);
//       this.spinner.hide();
//     }
//   },
//     err => {
//       const message = 'Error to load tasks.';
//       this.spinner.hide();
//     });

// }

completeTask(task_data, event, setup_department_id, taskForm){
  var task = {
    'task_id': task_data._id,
    'franchisee_id' : this.route.snapshot.params['franchisee_Id'],
    'task_status': task_data.task_status,
    'task_answer': task_data.task_answer,
    'setup_checklist_id': task_data.setup_checklist_id,
    'complete_at': task_data.complete_at,
    'setup_department_id': setup_department_id
  };
  if(task_data.task_type == 'Short Answer' && !task_data.task_answer || task_data.task_type =='Radio Button' && !task_data.task_answer){
    const toast: Toast = {
      type: 'error',
      title: 'Error',
      timeout: 2000,
      body: '<h5>Answer not specified!</h5>',
      bodyOutputType: BodyOutputType.TrustedHtml
    };
    this.toasterService.pop(toast);
    task_data.task_status = false;
  }
  else{
    console.log(task_data);
    const fd = new FormData();
    fd.append('task', JSON.stringify(task));
    fd.append('task_file', this.fileToUpload);

  this.spinner.show();

  // swal("No", "Do you want to complete this task", "error");
   this.httpService.complete_task(fd).subscribe(response => {
    if (response.status === 'success') {
      const toast: Toast = {
        type: 'success',
        title: 'Success',
        timeout: 2000,
        body: '<h5>Task completed.</h5>',
        bodyOutputType: BodyOutputType.TrustedHtml
      };
      this.toasterService.pop(toast);
      this.spinner.hide();
    }
    if (response.status === 'failure'){
      task_data.task_status = true;
    }
  },
    err => {
      const message = 'Error to load tasks.';
      this.spinner.hide();
    });
}
}

// To upload checklist task file
checklist_task_file(files: FileList, val) {
  this.fileToUpload = files.item[val];
  // console.log("files" , files);
  console.log('fileToUpload setup', this.fileToUpload);
  this.fileNameInsetup = this.fileToUpload.name;

}
// To read the file
readUrl(event: any) {
  if (event.target.files && event.target.files[0]) {
    const reader = new FileReader();

    reader.onload = (event: any) => {
      this.url = event.target.result;
    };

    reader.readAsDataURL(event.target.files[0]);
  }
}

}
