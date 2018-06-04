import { Component, OnInit, Input, ViewChild  } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { SettingService } from '../settings_service';
import { resolve } from 'url';
import {Location} from '@angular/common';
import {ToasterModule, ToasterService, ToasterConfig, BodyOutputType, Toast} from 'angular5-toaster';
import { FormControl, Validators, FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import * as _ from 'lodash';
@Component({
  selector: 'fuse-app-settings-application',
  templateUrl: './settings-application.component.html',
  styleUrls: ['./settings-application.component.scss']
})
export class SettingsApplicationComponent implements OnInit {
  @Input() option: Object;
  private toasterService: ToasterService;
  public favoriteSeason: string;
  public seasons: any;
  public ques_id;
  public question_EN = '';
  public isRequire = false;
  public is_edit = false;
  public ques_options = [
    {
      'option': '',
      'isSelect': false
    }
  ];
  question_edit_mode: boolean = false;
  spinnerConfig: object = {
    bdColor: '#333',
    size: 'medium',
    color: '#fff',
    type: 'ball-clip-rotate'
  };
  hide_error_messages: boolean = true;
  update_order = {};
  applicationForm: NgForm;
  public options = [];
  public question_list = [];
  public question_list_copy = [];
  public question_types = [
    { 'value': 'Short Answer', 'question_type': 'Short Answer' },
    { 'value': 'Multiple Choice', 'question_type': 'Multiple Choice' },
    { 'value': 'File Upload', 'question_type': 'File Upload' },
    { 'value': 'Long Answer', 'question_type': 'Long Answer' },
  ];
  public question_type = this.question_types[0].value;

  discussion = 0;
  public config1: ToasterConfig = new ToasterConfig({
    limit: 7,
    tapToDismiss: false,
    showCloseButton: true,
    mouseoverTimerStop: true
  });

  setdiscussion(index: number) {
    this.discussion = index;
  }

  // nextdiscussion() {
  //   this.discussion++;
  // }

  constructor(private spinner: NgxSpinnerService, private router: Router, private route: ActivatedRoute,
    private httpService: SettingService, private location: Location, toasterService: ToasterService) {
    this.seasons = [
      'Winter',
      'Spring',
    ];
    this.toasterService = toasterService;

  }

  ngOnInit() {
    this.get_question_list();
    this.update_order = setInterval(() => {
      for ( let m = 0; m < this.question_list_copy.length; m++ ) {
        for ( let n = 0; n < this.question_list.length; n++ ) {
          if (this.question_list_copy[m].question_EN !== this.question_list[n].question_EN) {
            m++;
            for (let i = 0; i < this.question_list.length; i++) {
              const obj = {
                'question_EN' : this.question_list[i].question_EN,
                'order' : i
              };
            }
          }
        }
      }
    }, 1000);
  }

  get_question_list() {
    this.httpService.get_questions().subscribe(response => {
      if (response.state === 'success') {
        for (let i = 0; i < response.questions_list.length; i++){
          response.questions_list[i].order = i;
        }
        this.question_list = response.questions_list;
        this.question_list_copy = response.questions_list;
        console.log('_.isEqual(array1.sort(), array2.sort());', _.isEqual(this.question_list.sort(), this.question_list_copy.sort()));
      }
      if (response.state === 'failure') {

      }
    });
  }

  change_option(opt) {
    this.question_type = opt;
    this.ques_options = [
      {
        'option': '',
        'isSelect': false
      }
    ];
    this.options = [];
  }
  create_edit_question(isRequire, applicationForm){
    //for create //
    if(this.question_edit_mode == false){
    for (var i = 0; i < this.ques_options.length; i++) {
      if (this.ques_options[i].option) {
        this.options.push(this.ques_options[i]);
      }
    }
    const obj = {
      'question_EN': this.question_EN,
      'question_type': this.question_type,
      'isRequire': isRequire,
      'options': this.options
    }
     if(applicationForm.valid === true){
    this.spinner.show(); // To show the spinner
    this.httpService.post_question(obj).subscribe(response => {
      if (response.state === 'success') {
        this.question_EN = '';
        this.isRequire = false;
        this.ques_options = [
          {
            'option': '',
            'isSelect': false
          }
        ];
        const toast: Toast = {
            type: 'success',
            title: 'Success',
            timeout: 2000,
            body: '<h5>Question Added</h5>',
            bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
        this.spinner.hide();

        this.options = [];
        this.question_list.push(response.data);
        this.hide_error_messages = false;
        applicationForm.resetForm();
        this.question_type = this.question_types[0].value;
      }
      if (response.state === 'failure') {
        console.log('response', response);
        const toast: Toast = {
            type: 'error',
            title: 'Failed to add',
            timeout: 2000,
            body: '<h5>Application created already</h5>',
            bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
        this.spinner.hide();
      }
    });
  }
}else {
  for (let i = 0; i < this.ques_options.length; i++) {
    if (this.ques_options[i].option) {
      this.options.push(this.ques_options[i]);
    }
  }
  const obj = {
    'question_EN': this.question_EN,
    'question_type': this.question_type,
    'isRequire': isRequire,
    'options': this.options,
    'ques_id': this.ques_id
  };
   if(applicationForm.valid === true){
  this.spinner.show();
  this.httpService.update_question(obj).subscribe(response => {
    if (response.state === 'success') {
      this.question_EN = '';
      this.ques_options = [
        {
          'option': '',
          'isSelect': false
        }
      ];
      const toast: Toast = {
        type: 'success',
        title: 'Success',
        timeout: 2000,
        body: '<h5>Question Edited</h5>',
        bodyOutputType: BodyOutputType.TrustedHtml
    };
    this.toasterService.pop(toast);
      this.spinner.hide();
      this.options = [];
      this.is_edit = false;
      applicationForm.resetForm();
      this.question_edit_mode = false;
      this.get_question_list();
    }
    if (response.state === 'failure') {
      console.log('response', response);
      this.spinner.hide();
      const toast: Toast = {
        type: 'error ',
        title: 'Error',
        timeout: 2000,
        body: '<h5>Failed to edit</h5>',
        bodyOutputType: BodyOutputType.TrustedHtml
    };
    this.toasterService.pop(toast);
    }
  });
}
}

  };


  add_more(applicationForm) {
    var lastIndex = this.ques_options.length - 1;
    if (this.ques_options[lastIndex].option) {
      // const option = {
      //   'option': '',
      //   'isSelect': false
      // };
      this.ques_options.push({option: '', isSelect: false});
    }

    console.log(this.ques_options.length);

  }
  valueChange(event){
    console.log(event);
  }


  delete_question(ques_id, applicationForm) {
    this.spinner.show();
    this.httpService.delete_ques(ques_id).subscribe(response => {
      if (response.state === 'success') {
        this.get_question_list();
        this.spinner.hide();
        const toast: Toast = {
          type: 'success',
          title: 'Success',
          timeout: 2000,
          body: '<h5>Question deleted</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
      };
      this.toasterService.pop(toast);
      applicationForm.resetForm();
        this.question_edit_mode = false;
      }
      if (response.state === 'failure') {
        this.spinner.hide();
        const toast: Toast = {
          type: 'error',
          title: 'Error',
          timeout: 2000,
          body: '<h5>Failed to delete</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
      };
      this.toasterService.pop(toast);
      }
    });
  }

  edit_selected(question) {
    this.question_EN = question.question_EN;
    this.question_type = question.question_type;
    this.isRequire = question.isRequire;
    this.ques_options = question.options;
    this.ques_id = question._id;
    this.is_edit = true;
    this.question_edit_mode = true;
  }



navigateSetup(){
this.router.navigate(['/apps/settings/settings-setup']);
}
cancel() {
  this.location.back(); // <-- go back to previous location on cancel
}
scroll(el) {
  console.log('el', el);
  el.scrollIntoView();
}

// test(){
//   alert('qwerty');
//   console.log('this', this.question_list);
// }

cancelsettings(){
  history.back();
}
customTrackBy(index: number, obj: any): any {
  return index;
}
}
