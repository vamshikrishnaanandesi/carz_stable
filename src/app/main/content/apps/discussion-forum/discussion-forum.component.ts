import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DiscussionService } from '../discussion-forum/discussion.service';
import { resolve } from 'url';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToasterModule, ToasterService, ToasterConfig, BodyOutputType, Toast } from 'angular5-toaster';

import { DiscussionDialogViewComponent } from './discussion-dialog-view/discussion-dialog-view.component';
@Component({
  selector: 'fuse-app-discussion-forum',
  templateUrl: './discussion-forum.component.html',
  styleUrls: ['./discussion-forum.component.scss']
})
export class DiscussionForumComponent implements OnInit {

  approved_id: any;
  approved: any;
  question: any;
  filetouploadName: any;
  franchisee_members = [
    {
      name: 'Manish Surapaneni',
      location: 'Madhapur'
      ,
    },
    {
      name: 'Abhishek',
      location: 'Ameerpet',
    },
    {
      name: 'Hareesh',
      location: 'Yousufguda',
    }
  ];
  franchisee_data = [];
  private toasterService: ToasterService;
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
  fileToUpload: File = null;
  url: any;
  userData: any;
  discussion: any = {};
  discussion_question_list = [];
  approved_questions_list = [];
  unapproved_question_list = [];
  decline_question_list = [];
  constructor(private spinner: NgxSpinnerService, toasterService: ToasterService, private router: Router, private route: ActivatedRoute, private httpService: DiscussionService,
    private location: Location, public dialog: MatDialog) {
    this.toasterService = toasterService;
    this.userData = JSON.parse(localStorage.getItem('user_data'));
  }

  ngOnInit() {
    this.get_all_discussion_questions();
    this.get_all_franchisees();
  }
  create_discussion_question(discussion, discussionForm) {
  
    
    if (this.userData.user_role == 'franchisor') {
      console.log('68', this.userData);
      discussion.user_id = this.userData._id;
      discussion.user_name = this.userData.user_name;
      discussion.user_profile_pic = this.userData.user_profile_pic;
    }
    if (this.userData.user_role == 'franchisee') {
      discussion.user_id = this.userData._id;
      discussion.user_name = this.userData.franchisee_name;
      discussion.franchisee_address = this.userData.franchisee_address;
      discussion.user_profile_pic = this.userData.franchisee_profile_pic;
    }
    console.log('72', discussion);
    if(discussionForm.valid === true){
      this.spinner.show();
    const fd = new FormData();
    fd.append('discussionquestion', JSON.stringify(discussion));
    fd.append('discussion_question_img', this.fileToUpload);
    this.httpService.create_discussion_question(fd).subscribe(response => {
      console.log(response);
      if (response.state === 'success') {
        this.spinner.hide();
        const toast: Toast = {
          type: 'success',
          title: 'Success',
          timeout: 2000,
          body: '<h5>' + response.message + '</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
        this.get_all_discussion_questions();
        this.discussion = '';
      }
      if (response.state === 'failure') {
        this.spinner.hide();
        const toast: Toast = {
          type: 'error',
          title: 'Error',
          timeout: 2000,
          body: '<h5>' + response.message + '</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
      }
      err => {
        this.spinner.hide
      }
    },
      err => {
        this.spinner.hide();
        const message = 'Error to create question';
      });
    }
  }

  handleFileInputDiscussionQuestion(files: FileList, val) {

    this.fileToUpload = files.item(0);
    this.filetouploadName = this.fileToUpload.name;
    console.log(" this.fileToUploadsdfsdfsf ",  this.filetouploadName);
    const toast: Toast = {
      type: 'success',
      title: 'Success',
      timeout: 2000,
      body: '<h5>File uploded</h5>',
      bodyOutputType: BodyOutputType.TrustedHtml
    };
    this.toasterService.pop(toast);

  }
  readUrl(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();

      reader.onload = (event: any) => {
        this.url = event.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }
  // to approve question
  to_approve_question(question) {

    question.status = 1;
    this.httpService.question_status(question).subscribe(response => {
      if (response.state === 'success') {
        console.log('moderate paenl', response);
        // this.approved_questions_list = response.data;
        const toast: Toast = {
          type: 'success',
          title: 'Success',
          timeout: 2000,
          body: '<h5>Question Approved</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
        if (response.data.status == 1) {
          this.approved_questions_list.push(question);
          console.log(this.approved_questions_list);
        }
        this.get_all_discussion_questions();
        this.sort_array_approved();
      }
      if (response.state === 'failure') {

      }
    },
      err => {
        const message = 'Error to load data.'
      })
  }
  // sort data
  sort_array_approved() {
    this.approved_questions_list.sort(function (a, b) {
      const aa = a._id,
        bb = b._id;
      return aa > bb ? -1 : (aa < bb ? 1 : 0);
    });
  }
  // to decline question
  to_decline_question(question) {
    // console.log(question);
    question.status = 2;
    this.spinner.show();
    this.httpService.question_status(question).subscribe(response => {
      if (response.state === 'success') {
        const toast: Toast = {
          type: 'success',
          title: 'Success',
          timeout: 2000,
          body: '<h5>Question declined</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
        this.spinner.hide();
        if (response.data.status == 2) {
          console.log(question);
          const index = this.unapproved_question_list.indexOf(question);
          this.unapproved_question_list.splice(index, 1);
          console.log(index);
          // this.decline_question_list.push(response.data);
          this.get_all_discussion_questions();
          console.log(this.unapproved_question_list);
        }
        // this.get_all_discussion_questions();

      }
      if (response.state === 'failure') {
        this.spinner.hide();
      }
    },
      err => {
        this.spinner.hide();
        const message = 'Error to load data.'
      })
  }

  // Get all questions
  get_all_discussion_questions() {
    this.httpService.get_discussion_questions_list().subscribe(response => {
      if (response.state === 'success') {
        console.log(response);


        this.discussion_question_list = response.data;
        for (let i = 0; i < this.discussion_question_list.length; i++) {
          if (this.discussion_question_list[i].status == 0) {
            this.unapproved_question_list.push(this.discussion_question_list[i]);
            console.log(this.unapproved_question_list.length);
          }
          if (this.discussion_question_list[i].status == 1) {
            this.approved_questions_list.push(this.discussion_question_list[i]);
          }
        }
        this.sort_array();
      }
      if (response.state === 'failure') {

      }
    },
      err => {
        const message = 'Error to load data';
      })
  }
  //To edit question
  update_discussion_question() {
    this.spinner.show();
    const fd = new FormData();
    // fd.append('franchisee', JSON.stringify(this.createNew));
    fd.append('discussion_question_img', this.fileToUpload);
    this.httpService.update_discussion_question(fd).subscribe(response => {

      if (response.state === 'success') {
        const toast: Toast = {
          type: 'success',
          title: 'Success',
          timeout: 2000,
          body: '<h5>Edited Successfully</h5>',
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
          body: '<h5>Failed to edit</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
        this.spinner.hide();
      }
    },
      err => {
        this.spinner.hide();
        const message = 'Error to update franchisees.';
      });
  }

  // delete discussion question
  delete_discussion_question(id) {
    this.spinner.show();
    this.httpService.delete_discussion_question(id).subscribe(response => {
      this.spinner.hide();
      if (response.state === 'success') {
        const toast: Toast = {
          type: 'success',
          title: 'Success',
          timeout: 2000,
          body: '<h5>' + response.message + '</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
        const index = this.approved_questions_list.indexOf(id);
          this.approved_questions_list.splice(index, 1);
          console.log(index);
          this.get_all_discussion_questions();
      }
      if (response.state === 'failure') {
        this.spinner.hide();
        const toast: Toast = {
          type: 'error',
          title: 'Error',
          timeout: 2000,
          body: '<h5>' + response.message + '</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
      }
    },
      err => {
        this.spinner.hide();
        const message = 'Error to load'
      });
  }

  // filter
  sort_array() {
    this.unapproved_question_list.sort(function (a, b) {
      const aa = a._id,
        bb = b._id;
      return aa > bb ? -1 : (aa < bb ? 1 : 0);
    });
  }

  //Vote question
  question_vote(question_data) {
    const vote = {
      'question_id': question_data._id,
      'franchisee_id': this.userData._id,
    }
    this.httpService.question_vote_count(vote).subscribe(result => {
      if (result.state == "success") {

      }
      if (result.state == "failure") {


      }
    },
      err => {
        var message = "Something went wrong.";

      });
  }

  // get all franchisees
  get_all_franchisees() {
    this.httpService.getAllFranchisees().subscribe(response => {
      if (response.state === 'success') {
        console.log(response);
        this.franchisee_data = response.franchisees_list;
        console.log('311', this.franchisee_data);
        this.sort_array_franchisee();
      }
      if (response.state === 'failure') {
        this.franchisee_data = [];
      }
    },
      err => {
        const message = 'Error to load franchisees'
      })
  }
  // filter
  sort_array_franchisee() {
    this.franchisee_data.sort(function (a, b) {
      const aa = a._id,
        bb = b._id;
      return aa > bb ? -1 : (aa < bb ? 1 : 0);
    });
  }

  view_fileUpload(Uploadfile): void {
    localStorage.setItem('viewDiscussionFileUpload', JSON.stringify(Uploadfile));

    const dialogRef = this.dialog.open(DiscussionDialogViewComponent, {
      width: '400px',
      height: 'auto',
      panelClass: 'fileView'



    });
  }
}





