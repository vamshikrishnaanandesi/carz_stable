import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonServicesService } from '../../common_components/common-services.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { DialogFileViewComponent } from '../../library/dialog-file-view/dialog-file-view.component';
import { saveAs } from 'file-saver/FileSaver';

@Component({
  selector: 'fuse-app-franchisee-view',
  templateUrl: './franchisee-view.component.html',
  styleUrls: ['./franchisee-view.component.scss'],
  providers: [
    CommonServicesService
  ]
})
export class FranchiseeViewComponent implements OnInit {
  public franchisee_Id="";
  public folder=[];
  public obj={};
  public files_list=[];
  constructor(private httpService: CommonServicesService, private route: ActivatedRoute, private snackbar: MatSnackBar,
    public dialog: MatDialog, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.franchisee_Id = this.route.snapshot.params['franchisee_Id'];
    this.get_folder_list(this.franchisee_Id);
    this.get_uploaded_files();
  }
  get_folder_list(franchisee_id) {
    this.httpService.getFolder(franchisee_id).subscribe(response => {
      if (response.state === 'success') {
        this.folder = [];
        this.folder = response.folder;
      }
      if (response.state === 'failure') {
        this.folder = [];
      }
    },
      err => {
        const message = 'Error to load folder list.';
      });
  };
    // TO get uploaded files
  get_uploaded_files() {
    this.obj = {
      'uploaded_status': 1,
      'franchisee_Id': this.franchisee_Id
    };
    this.httpService.getFranchiseeFiles(this.obj).subscribe(response => {
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

}
