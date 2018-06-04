import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DiscussionService } from '../../discussion-forum/discussion.service';
import { resolve } from 'url';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToasterModule, ToasterService, ToasterConfig, BodyOutputType, Toast } from 'angular5-toaster';
import { DiscussionDialogViewComponent } from '../discussion-dialog-view/discussion-dialog-view.component';
@Component({
  selector: 'fuse-app-discussion-forum-single',
  templateUrl: './discussion-forum-single.component.html',
  styleUrls: ['./discussion-forum-single.component.scss', '../discussion-forum.component.scss']
})
export class DiscussionForumSingleComponent implements OnInit {

 obj:any;
  url: any;
  userData: any;
  dddd: any;
  votesss: any;
  discussion_comments: any;
  question: any;
  question_data: any;
  fileToUpload: File = null;
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
  constructor(private spinner: NgxSpinnerService, toasterService: ToasterService, private router: Router, private route: ActivatedRoute, private httpService: DiscussionService,
    private location: Location, public dialog: MatDialog) {
      this.toasterService = toasterService;
      this.userData = JSON.parse(localStorage.getItem('user_data'));
     }

  ngOnInit() {
    this.getQuestionById(this.route.snapshot.params['question_id']);
  }
  // To View Franchisee details by Franchisee ID
  getQuestionById(question_id) {
    this.httpService.get_discussion_question_id(question_id).subscribe(response => {
      if (response.state === 'success'){
        this.question_data = response.data;
        // console.log('this', this.discussionquestion);
      }
      if (response.state === 'failure'){
      }
    },
    err => {
      const message = 'Error to load question.';
  });
  }

  addComment(question_data) {
    const obj = {
      'question_id': question_data._id,
      'comment': {
        'franchisee_id': this.userData._id,
        'comment_text': question_data.comment_text,
        'franchisee_name':question_data.franchisee_name,
        'franchisee_city':question_data.franchisee_city,
        'user_profile_pic':question_data.franchisee_profile_pic
      }
    }
    const fd = new FormData();
    fd.append('discussionquestion', JSON.stringify(obj));
    fd.append('comment_img', this.fileToUpload);
    console.log('58', question_data);
    console.log('66', obj);
    this.httpService.add_comments(fd).subscribe(response => {
      if (response.state === 'success'){
        const toast: Toast = {
          type: 'success',
          title: 'Success',
          timeout: 2000,
          body: '<h5>' + response.message + '</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
        this.question_data = '';
      }
      if (response.state === 'failure'){
      }
    },
    err => {
      const message = 'Error to load question.';
  });
  }

  handleFileInputComment(files: FileList, val) {
    this.fileToUpload = files.item(0);
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

  get_comments_by_id(question_id) {
    this.httpService.get_comments_by_id(question_id).subscribe(response => {
      if (response.state === 'success'){
        // this.question_data = response.data;
      }
      if (response.state === 'failure'){
      }
    },
    err => {
      const message = 'Error to load question.';
  });
  }

  //Vote question
  question_vote(question_data){
    const vote = {
      'question_id': question_data._id,
      'votedBy': this.userData._id,
    }
    console.log('Vote flag', vote);
    this.httpService.question_vote_count(vote).subscribe(result => {
      if(result.state == "success"){

        this.question_data = result.data;
        // this.votesss = result.data.votes;

        console.log("sfsfsfs", this.question_data );
        const toast: Toast = {
          type: 'success',
          title: 'Success',
          timeout: 2000,
          body: '<h5> Voted! </h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
      }
      if(result.state == "failure"){
        const toast: Toast = {
          type: 'success',
          title: 'Success',
          timeout: 2000,
          body: '<h5>You have already voted.</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);

      }
    },
    err => {
        var message = "Something went wrong.";

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
