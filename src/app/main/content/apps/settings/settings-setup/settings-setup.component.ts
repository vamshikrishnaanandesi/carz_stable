import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { SettingService } from '../settings_service';
import { resolve } from 'url';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddChecklistComponent } from './add-checklist/add-checklist.component';
import { FormControl, Validators, FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToasterModule, ToasterService, ToasterConfig, BodyOutputType, Toast } from 'angular5-toaster';
import { ViewFileUploadComponent } from './view-file-upload/view-file-upload.component';

@Component({
  selector: 'fuse-app-settings-setup',
  templateUrl: './settings-setup.component.html',
  styleUrls: ['./settings-setup.component.scss']
})
export class SettingsSetupComponent implements OnInit {
  franchisee : any;
  checklist: any;
  task: any;
  task_edit_mode : boolean = false;
  checklist_data: any;
  setupChecklistTaskForm: NgForm;
  setup_department_list = [];
  setup_checklist_list = [];
  selected_department_id: any;
  array = [];
  data: any;
  uploaded_file_name: any;
  public selected_department_name: any;
  option_data: any = {
    'option': '',
    'selected': false
  };
  checklist_tasks_list = [];
  setup_task_radio_options = [
    {
      'option': '',
      'selected': false
    }
  ];
  task_radio_options = [];
  obj: any;
  url: any;
  checklist_id;
  department_id: any;
  checklist_opened = false;
  public favoriteSeason: string;
  public seasons: any;
  public task_id;
  public question_EN = '';
  public isRequire = false;
  titleboxchecklist = false;
  franchisee_file_upload_required = false;
  public is_edit = false;
  public userData: any;
  public question_list = [];
  public setup_task_types = [
    { 'value': 'Task', 'task_type': 'Task' },
    { 'value': 'Short Answer', 'task_type': 'Short Answer' },
    { 'value': 'Radio Button', 'task_type': 'Radio Button' },
  ];
  public task_type = this.setup_task_types[0].task_type;
  public task_data: any = {
    'task_name_EN': '',
    'task_type': this.setup_task_types[0].value

  };

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
  discussion = 0;
  public task_name_EN = '';
  visible_to: any;
  fileToUpload: File = null;
  checklistTask: any = {

  };
  update_order = {};
  public checklist_task_list_copy = [];
  setdiscussion(index: number) {
    this.discussion = index;
  }

  constructor(private spinner: NgxSpinnerService, toasterService: ToasterService, private router: Router,
    private route: ActivatedRoute, private httpService: SettingService, private location: Location, public dialog: MatDialog) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('user_data'));
    this.get_department_list('5a96815c66bace001435ec12');
    // for the time being added franchisor id manually
    // this.get_setup_checklist_task(this.checklist_id);
    this.update_order = setInterval(() => {
      for ( let m = 0; m < this.checklist_task_list_copy.length; m++ ) {
        for ( let n = 0; n < this.checklist_tasks_list.length; n++ ) {
          if (this.checklist_task_list_copy[m].task_name_EN !== this.checklist_tasks_list[n].question_EN) {
            m++;
            for (let i = 0; i < this.checklist_tasks_list.length; i++) {
              const obj = {
                'task_name_EN' : this.checklist_tasks_list[i].task_name_EN,
                'order' : i
              };
              // this.httpService.update_order(obj).subscribe(response => {
              //   if (response.state === 'success') {
              //     console.log('suces');
              //   }
              //   if (response.state === 'failure') {
              //
              //   }
              // });
            }
          }
        }
      }
    }, 1000);
  }


  navigateApplication() {
    this.router.navigate(['/apps/settings/settings-application']);
  }
  cancel_task_creation() {
    this.task_data = {}; // cancel the task data
  }
  cancel() {
    this.router.navigate(['/apps/franchisees/franchisee-list']);
  }

  navigate() {
    this.router.navigate(['/apps/settings/settings-setup/new-checklist']);
  }

  add_checklist(): void {
    const dialogRef = this.dialog.open(AddChecklistComponent, {
      width: '400px',
      height: 'auto',
      data: {
        department_id: this.selected_department_id
      }


    });
    dialogRef.afterClosed()
.subscribe(data => {
  if(data){
      this.setup_checklist_list.push(data.data)
    };
  })
  }
  get_department_list(franchisor_id) {
    console.log(franchisor_id);
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
  get_setup_checklist_list(department_id) {
    this.spinner.show();
    this.httpService.get_setup_checklist_list(department_id).subscribe(response => {
      console.log(response);
      if (response.state === 'success') {
        this.setup_checklist_list = response.data;
        this.spinner.hide();
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
    console.log(event);
    this.selected_department_id = this.setup_department_list[event.index]._id;
    this.get_setup_checklist_list(this.setup_department_list[event.index]._id);
    this.checklist_opened = false;
  }

  // For Opening checklist
  open_checklist(checklist) {
    this.checklist_data = checklist;
    this.get_setup_checklist_task(checklist._id);
    this.checklist_opened = true;
    this.checklist_tasks_list = [];
  }

  change_option(opt) {
    console.log(opt);
    this.task_data.task_type = opt;
    this.setup_task_radio_options = [
      {
        'option': '',
        'selected': false
      }
    ];
    this.task_radio_options = [];
  }
  // To create setup checklsit tasks
  create_setup_checklist_task(franchisee_file_upload_required, setupChecklistTaskForm) {
    for (let i = 0; i < this.setup_task_radio_options.length; i++) {
      if (this.setup_task_radio_options[i].option) {
        this.task_radio_options.push(this.setup_task_radio_options[i]);
      }

    }
    var task = {
      'task_name_EN': this.task_data.task_name_EN,
      'task_radio_options': this.task_radio_options,
      'task_type': this.task_data.task_type,
      'task_due_date': this.task_data.task_due_date,
      'setup_checklist_id': this.checklist_data._id,
      'franchisee_file_upload_required' : this.task_data.franchisee_file_upload_required
    };
    if(setupChecklistTaskForm.valid === true){
    this.spinner.show();
    const fd = new FormData();
    fd.append('task', JSON.stringify(task));
    fd.append('checklist_task_img', this.fileToUpload);

      this.httpService.create_setup_checklist_task(fd).subscribe(response => {
      if (response.state === 'success') {
        this.task_name_EN = '';
        this.setup_task_radio_options = [
          {
            'option': '',
            'selected': false
          }
        ];
        console.log(this.setup_task_radio_options);
        const toast: Toast = {
          type: 'success',
          title: 'Success',
          timeout: 2000,
          body: '<h5>Task Added</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
        this.task_data = {};
        this.spinner.hide();
        // this.task_data.task_type = this.setup_task_types[0].value;
        this.task_type = this.setup_task_types[0].task_type;
        this.setup_task_radio_options = [
          {
            'option': '',
            'selected': false
          }
        ];
        this.task_radio_options=[];
        this.checklist_tasks_list.push(this.task);
        this.get_setup_checklist_task(this.checklist_data._id);
        setupChecklistTaskForm.resetForm();
        this.fileToUpload = null;
        this.uploaded_file_name = '';
      }
      if (response.state === 'failure') {
        const toast: Toast = {
          type: 'error',
          title: 'Failed to add',
          timeout: 2000,
          body: '<h5>Task created already</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
        this.spinner.hide();
      }
    },
      err => {
        const message = 'Error to load data';
        this.spinner.hide();
      });
    }
  }


// to upload file
  handleFileInput(files: FileList, val) {
    this.fileToUpload = files.item(0);
    this.uploaded_file_name = this.fileToUpload.name;
    console.log(this.fileToUpload);
    const toast: Toast = {
      type: 'success',
      title: 'Success',
      timeout: 2000,
      body: '<h5>File uploded</h5>',
      bodyOutputType: BodyOutputType.TrustedHtml
    };
    this.toasterService.pop(toast);

  }
  delete_uploaded_file(file, saved_file){
    file = {};
    this.task_data.franchisor_task_file_attachment_file_name = ''
    this.uploaded_file_name = '';
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
  // To get checklist task by checklist id
  get_setup_checklist_task(checklist_id) {
    this.httpService.get_setup_checklists_task(checklist_id).subscribe(response => {
      if (response.state === 'success') {
        for (let i = 0; i < response.data.length; i++){
          response.data[i].order = i;
        }
        this.checklist_tasks_list = response.data;
        this.checklist_task_list_copy = response.data;
      }
      if (response.state === 'failure') {
      }
    },
      err => {
        const message = 'Error to load data';
      });
  }

  // To get checklist task length
  get_setup_checklist_task_length(checklist_id){
    this.httpService.get_setup_checklists_task(checklist_id).subscribe(response => {
      if (response.state === 'success') {

        return response.data.length;
      }
      if (response.state === 'failure') {
      }
    },
      err => {
        const message = 'Error to load data';
      });
  }
  add_more_option_task() {
    const lastIndexOfOption = this.setup_task_radio_options.length - 1;
    if (this.setup_task_radio_options[lastIndexOfOption].option) {
      this.setup_task_radio_options.push({ option: '', selected: false });
    }
  }

  // To delete setup checklist
  delete_setup_checklist(id, i) {
    this.spinner.show();
    this.httpService.delete_setup_checklist(id).subscribe(response => {
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
        // this.get_setup_checklist_list(id);
        const index = this.setup_checklist_list.indexOf(this.checklist);
        this.setup_checklist_list.splice(index, 1);
          // const index = this.setup_checklist_list.indexOf(id);
        // this.setup_checklist_list.splice(this.setup_checklist_list.indexOf(this.checklist), 1);
        // const index = this.array.indexOf(id);
        // this.setup_checklist_list.splice(index, 1);
        // if (this.setup_checklist_list.length === 1) {
        //   this.setup_checklist_list = [];
        // }
        // const indexd_value = this.setup_checklist_list.indexOf(id, i);
        // if (indexd_value === -1) {
        //   this.setup_checklist_list.splice(indexd_value, 1);
        // }
        console.log(index);
        console.log(this.setup_checklist_list);
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
        const message = 'Error to load';
      });
  }

  // To delete checklist task
  delete_checklist_task(task_id, i) {
    this.spinner.show();
    this.httpService.delete_checklist_task(task_id).subscribe(response => {
      if (response.state === 'success') {
        const toast: Toast = {
          type: 'success',
          title: 'Success',
          timeout: 2000,
          body: '<h5>' + response.message + '</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
        this.spinner.hide();
        // const index = this.checklist_tasks_list.indexOf(task_id);
        // if (this.checklist_tasks_list.length == 1){
        //   this.checklist_tasks_list = [];
        // }
        // this.checklist_tasks_list.splice(index, i);
        this.get_setup_checklist_task(task_id);
        const index = this.checklist_tasks_list.indexOf(task_id);
        this.checklist_tasks_list.splice(index, 1);

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
        const message = 'Error to load';
      });
  }

  create_edit_task(franchisee_file_upload_required, setupChecklistTaskForm){
    if(this.task_edit_mode == true){
      for(let i = 0; i < this.setup_task_radio_options.length; i++){
        if(this.setup_task_radio_options[i].option){
          this.task_radio_options.push(this.setup_task_radio_options[i]);
        }
      }
      const task = {
          'task_name_EN': this.task_data.task_name_EN,
          'task_radio_options': this.task_radio_options,
          'task_type': this.task_data.task_type,
          'setup_checklist_id': this.checklist_data._id,
          'franchisee_file_upload_required' : this.task_data.franchisee_file_upload_required,
          'task_id' : this.task_data._id
      }
      this.spinner.show();
      const fd = new FormData();
      fd.append('task', JSON.stringify(task));
      fd.append('checklist_task_img', this.fileToUpload);
      this.httpService.edit_setup_checklist_task(fd).subscribe(response => {
        if (response.state === 'success'){
          this.task_name_EN = '';
          this.setup_task_radio_options = [
            {
              'option': '',
              'selected': false
            }
          ];
          this.task_data = {};
          const toast: Toast = {
            type: 'success',
            title: 'Success',
            timeout: 2000,
            body: '<h5>Task updated</h5>',
            bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
        this.spinner.hide();
        this.task_radio_options = [];
        this.is_edit = false;
        this.get_setup_checklist_task(this.checklist_data._id);
        this.fileToUpload = null;
        this.uploaded_file_name = '';
        setupChecklistTaskForm.resetForm();
        this.task_edit_mode = false;
        }
        if (response.state === 'failure') {
          this.spinner.hide();
          const toast: Toast = {
            type: 'error ',
            title: 'Error',
            timeout: 2000,
            body: '<h5>Failed to update</h5>',
            bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
        }
      });
    }
    else {
      for (let i = 0; i < this.setup_task_radio_options.length; i++) {
        if (this.setup_task_radio_options[i].option) {
          this.task_radio_options.push(this.setup_task_radio_options[i]);
        }

      }
      var task = {
        'task_name_EN': this.task_data.task_name_EN,
        'task_radio_options': this.task_radio_options,
        'task_type': this.task_data.task_type,
        'task_due_date': this.task_data.task_due_date,
        'setup_checklist_id': this.checklist_data._id,
        'franchisee_file_upload_required' : this.task_data.franchisee_file_upload_required
      };
      if(setupChecklistTaskForm.valid === true){
      this.spinner.show();
      const fd = new FormData();
      fd.append('task', JSON.stringify(task));
      fd.append('checklist_task_img', this.fileToUpload);

        this.httpService.create_setup_checklist_task(fd).subscribe(response => {
        if (response.state === 'success') {
          this.task_name_EN = '';
          this.setup_task_radio_options = [
            {
              'option': '',
              'selected': false
            }
          ];
          console.log(this.setup_task_radio_options);
          const toast: Toast = {
            type: 'success',
            title: 'Success',
            timeout: 2000,
            body: '<h5>Task Added</h5>',
            bodyOutputType: BodyOutputType.TrustedHtml
          };
          this.toasterService.pop(toast);
          this.task_data = {};
          this.spinner.hide();
          // this.task_data.task_type = this.setup_task_types[0].value;
          this.task_type = this.setup_task_types[0].task_type;
          this.setup_task_radio_options = [
            {
              'option': '',
              'selected': false
            }
          ];
          this.task_radio_options=[];
          this.checklist_tasks_list.push(this.task);
          this.get_setup_checklist_task(this.checklist_data._id);
          setupChecklistTaskForm.resetForm();
          this.fileToUpload = null;
          this.uploaded_file_name = '';
        }
        if (response.state === 'failure') {
          const toast: Toast = {
            type: 'error',
            title: 'Failed to add',
            timeout: 2000,
            body: '<h5>Task created already</h5>',
            bodyOutputType: BodyOutputType.TrustedHtml
          };
          this.toasterService.pop(toast);
          this.spinner.hide();
        }
      },
        err => {
          const message = 'Error to load data';
          this.spinner.hide();
        });
      }
    }
  }

  // To edit setup checklist
  update_setup_checklist(checklist_data) {
    this.spinner.show();
    console.log(checklist_data);
    this.httpService.edit_setup_checklist(checklist_data).subscribe(response => {
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
        const message = 'Error to load';
      });
  }


  edit_selected(task_data) {
    console.log(task_data);
    // this.task_name_EN = task_data.task_name_EN;
    // this.setup_task_types = task_data.task_type;
    // this.setup_task_radio_options = task_data.setup_task_radio_options;
    // this.franchisee_file_upload_required = task_data.franchisee_file_upload_required;
    this.task_id = this.task_id;
    this.task_data = task_data;
    this.is_edit = true;
    this.task_edit_mode = true;
    this.uploaded_file_name = task_data.franchisor_task_file_attachment_file_name;
  }

  // to update setup checklist task
  update_setup_checklist_task(franchisee_file_upload_required, setupChecklistTaskForm){
  for(let i = 0; i < this.setup_task_radio_options.length; i++){
    if(this.setup_task_radio_options[i].option){
      this.task_radio_options.push(this.setup_task_radio_options[i]);
    }
  }
  const task = {
      'task_name_EN': this.task_data.task_name_EN,
      'task_radio_options': this.task_radio_options,
      'task_type': this.task_data.task_type,
      'setup_checklist_id': this.checklist_data._id,
      'franchisee_file_upload_required' : this.task_data.franchisee_file_upload_required,
      'task_id' : this.task_data._id
  }
  this.spinner.show();
  const fd = new FormData();
  fd.append('task', JSON.stringify(task));
  fd.append('checklist_task_img', this.fileToUpload);
  this.httpService.edit_setup_checklist_task(fd).subscribe(response => {
    if (response.state === 'success'){
      this.task_name_EN = '';
      this.setup_task_radio_options = [
        {
          'option': '',
          'selected': false
        }
      ];
      this.task_data = {};
      const toast: Toast = {
        type: 'success',
        title: 'Success',
        timeout: 2000,
        body: '<h5>Task updated</h5>',
        bodyOutputType: BodyOutputType.TrustedHtml
    };
    this.toasterService.pop(toast);
    this.spinner.hide();
    this.task_radio_options = [];
    this.is_edit = false;
    this.get_setup_checklist_task(this.checklist_data._id);
    this.fileToUpload = null;
    this.uploaded_file_name = '';
    setupChecklistTaskForm.resetForm;

    }
    if (response.state === 'failure') {
      this.spinner.hide();
      const toast: Toast = {
        type: 'error ',
        title: 'Error',
        timeout: 2000,
        body: '<h5>Failed to update</h5>',
        bodyOutputType: BodyOutputType.TrustedHtml
    };
    this.toasterService.pop(toast);
    }
  });
  }

  scroll(el) {
    console.log('el', el);
    el.scrollIntoView();
  }


  // To upload checklist task files
uploadSetupChecklistFiles(files: FileList) {
  //   this.obj = {
  //     'checklist_id': 'checklist_id',
  //   };
  //   const fd = new FormData();
  //   // const file = files.item(0);
  //   for (let i = 0; i < files.length; i++) {
  //     fd.append('file_upload', files[i], files[i]['name']);
  //   }
  //   fd.append('file_details', JSON.stringify(this.obj));
  //   this.spinner.show();
  //   this.httpService.upload_setup_checklist_task_files(fd).subscribe(response => {
  //     // this.campaign = response.data;
  //     if (response.status === 'success') {
  //       const toast: Toast = {
  //         type: 'success',
  //         title: 'Success',
  //         timeout: 2000,
  //         body: '<h5>File uploaded</h5>',
  //         bodyOutputType: BodyOutputType.TrustedHtml
  //       };
  //       this.toasterService.pop(toast);
  //       this.spinner.hide();
  //       return this.getSetupChecklistTaskFiles('task_id');
  //     }
  //   },
  //     err => {
  //       const message = 'Error to load franchisees.';
  //       this.spinner.hide();
  //     });
  // }

  // handleFileInput_setupChecklist_task_file(files: FileList) {
  //   this.fileToUpload = files.item(0);
  //   this.uploadSetupChecklistFiles(files);
  // }

  // getSetupChecklistTaskFiles(task_id) {
  //   this.httpService.get_Setup_Checklist_task_files(task_id).subscribe(response => {
  //     if (response.state === 'success') {
  //       // this.campaign = response.data;
  //     }
  //     if (response.state === 'failure') {
  //     }
  //   },
  //     err => {
  //       const message = 'Error to load franchisee.';
  //     });
  // }




}

// title_box_checklist
title_box_checklist(){
  this.titleboxchecklist = !this.titleboxchecklist;
}
view_fileUpload(Uploadfile): void {
  localStorage.setItem('viewfileuploadSEttings', JSON.stringify(Uploadfile));

  const dialogRef = this.dialog.open(ViewFileUploadComponent, {
    width: '400px',
    height: 'auto',
    panelClass: 'fileView'



  });
}

// Go back from history

cancelsettings(){
  history.back();
}


}
