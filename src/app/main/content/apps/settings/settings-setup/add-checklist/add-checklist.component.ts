import { Component, OnInit, Inject } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { SettingService } from '../../settings_service';
import { resolve } from 'url';
import {Location} from '@angular/common';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToasterModule, ToasterService, ToasterConfig, BodyOutputType, Toast } from 'angular5-toaster';
@Component({
  selector: 'app-add-checklist',
  templateUrl: './add-checklist.component.html',
  styleUrls: ['./add-checklist.component.scss']
})
export class AddChecklistComponent implements OnInit {
  setup_checklist_list = [];
  setup_department_list: any;
  SelDepartment = 'option1';
  newSetupChecklist = {
    setup_department_id: ''
  };
  SelVisibility = 'All';
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
  constructor(private spinner: NgxSpinnerService, toasterService: ToasterService, private router: Router, private route: ActivatedRoute, private httpService: SettingService,
     private location: Location, public dialogRef: MatDialogRef<AddChecklistComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.toasterService = toasterService;
      this.newSetupChecklist.setup_department_id = this.data.department_id;
    }

  ngOnInit() {

    this.get_department_list('5a96815c66bace001435ec12');
    this.get_setup_checklist_list('5a96815c66bace001435ec12');
  }

create_new_setup_checklist(checklistForm, addChecklistForm){
  console.log(addChecklistForm);

  if(addChecklistForm.valid === true){
    this.spinner.show();
  this.httpService.create_new_setup_checklist(checklistForm).subscribe(response => {
    if (response.state === 'success') {
      console.log(response);
        this.spinner.hide();
        const toast: Toast = {
          type: 'success',
          title: 'Success',
          timeout: 2000,
          body: '<h5>' + response.message + '</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
//        this.get_department_list(franchisor_id);
        this.dialogRef.close(response);
    }
    if (response.state === 'failure'){
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
    const message = 'Error to create checklist';
  });
  }
}
get_department_list(franchisor_id){
  this.httpService.get_department_list(franchisor_id).subscribe(response => {
    console.log(response);
    if (response.state === 'success'){

      this.setup_department_list = response.data;

    }
    if (response.state === 'failure'){
    }
  },
    err => {
      const message = 'Error in to load data';
    });
}
cancel() {
  this.dialogRef.close();
}

get_setup_checklist_list(department_id) {
  this.httpService.get_setup_checklist_list(department_id).subscribe(response => {
    console.log(response);
    if (response.state === 'success') {
      this.setup_checklist_list = response.data;
    }
    if (response.state === 'failure') {

    }
  },
  err => {
    const message = 'Error to load data';
  });
}
}
