import { Component, OnInit, Directive, ElementRef, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonServicesService } from '../common-services.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatTabChangeEvent, MatTabGroup } from '@angular/material';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { DialogFileViewComponent } from '../../library/dialog-file-view/dialog-file-view.component';
import { saveAs } from 'file-saver/FileSaver';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { ToasterModule, ToasterService, ToasterConfig, BodyOutputType, Toast } from 'angular5-toaster';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'app-common-drive',
  templateUrl: './common-drive.component.html',
  styleUrls: ['./common-drive.component.scss'],
  providers: [
    CommonServicesService
  ]
})
export class CommonDriveComponent implements OnInit {
  private focus = true;
  public save_route = '';
  public foldergrid = 7;
  public folder = [];
  public files_list = [];
  public delete_files: any = [];
  public delete_folders: any = [];
  public obj = {};
  public showfolderfile: boolean = false;
  public create_flag: boolean = false;
  public upload_status: boolean = false;
  public folder_name: any;
  public fileToUpload: File = null;
  public parent_id: any;
  public file_item_type: any;
  public folder_data = [];
  public zero_stat = false;
  public selected_file_row: any;
  public folder_edit_mode = false;
  public sub: any;
  public userData: any;
  public selected_row: any;
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

  constructor(private el: ElementRef, private spinner: NgxSpinnerService, toasterService: ToasterService, private httpService: CommonServicesService,
    private route: ActivatedRoute, private snackbar: MatSnackBar,
    public dialog: MatDialog, private router: Router, private formBuilder: FormBuilder, private ng4LoadingSpinnerService: Ng4LoadingSpinnerService) {
    this.userData = JSON.parse(localStorage.getItem('user_data'));
    this.save_route = this.route.snapshot.url[0].path;
    this.toasterService = toasterService;
  }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.save_route = this.route.snapshot.url[0].path;
      if (this.save_route === 'library-main' || this.save_route === 'franchisee-files') {
        this.get_common_folder();
        this.get_common_files();
      }
      if (this.save_route === 'common-folder') {
        this.parent_id = this.route.snapshot.params['id'];
        this.get_folder_data(this.route.snapshot.params['id']);
        this.get_folder_by_id(this.route.snapshot.params['id']);
        this.get_files_by_folder(this.route.snapshot.params['id']);
      }
    });
    if (this.focus) {
      // Otherwise Angular throws error: Expression has changed after it was checked.
      window.setTimeout(() => {
        this.el.nativeElement.focus(); // For SSR (server side rendering) this is not safe. Use: https://github.com/angular/angular/issues/15008#issuecomment-285141070)
      });
    }
  }

  @Input() set autofocus(condition: boolean) {
    this.focus = condition !== false;
  }
  // To get Folder
  get_common_folder() {
    this.httpService.getCommonFolder().subscribe(response => {
      if (response.state === 'success') {
        this.folder = response.folder;
        this.sort_array();
        for (let i = 0; i < this.folder.length; i++) {
          this.folder[i].flag = false;
        }
      }
      if (response.state === 'failure') {
        this.zero_stat = true;
        this.folder = [];
      }
    },
      err => {
        const message = 'Error to load folder list.';
      });
  }
  // sort data
  sort_array() {
    this.folder.sort(function (a, b) {
      const aa = a._id,
        bb = b._id;
      return aa > bb ? -1 : (aa < bb ? 1 : 0);
    });
  }
  // Get files list
  get_common_files() {
    this.obj = {
      'upload_status': 0
    };
    this.spinner.show(); // To show the spinner

    this.httpService.getAllCommonFiles(this.obj).subscribe(response => {

      if (response.state === 'success') {
        this.files_list = response.file;
        for (let i = 0; i < this.files_list.length; i++) {
          this.files_list[i].flag = false;
          this.spinner.hide(); // To hide the spinner
        }
      }
      if (response.state === 'failure') {
        this.zero_stat = true;
        this.files_list = [];
        this.spinner.hide(); // To hide the spinner
      }
    },
      err => {
        const message = 'Error to load files.';
        this.spinner.hide(); // To hide the spinner
      });
  }
  CreateID() {
    this.showfolderfile = !this.showfolderfile;
  }
  // To create common folder
  create_common_folder() {
    if (this.folder_name) {
      this.obj = {
        'folder_name': this.folder_name,
        'parent_folder_id': this.parent_id
      };
      this.spinner.show(); // To show the spinner
      this.httpService.createCommonFolder(this.obj).subscribe(response => {
        if (response.state === 'success') {
          this.create_flag = false;
          this.folder_name = '';
          this.get_common_folder();
          const toast: Toast = {
            type: 'success',
            title: 'Success',
            timeout: 2000,
            body: '<h5>Folder created</h5>',
            bodyOutputType: BodyOutputType.TrustedHtml
          };
          this.spinner.hide();
          this.toasterService.pop(toast);

        }
        if (response.state === 'failure') {
          this.spinner.hide();
          // this.snackbar.open('Error! Name exist', '', { duration: 2500 });
        }
      },
        err => {
          const message = 'Error to create folder.';
          // this.snackbar.open('Something went wrong!', '', { duration: 2500 });
        });
    }
    else {
      const toast: Toast = {
        type: 'error',
        title: 'Error',
        timeout: 2000,
        body: '<h5>Failed to create folder</h5>',
        bodyOutputType: BodyOutputType.TrustedHtml
      };
      this.toasterService.pop(toast);
      this.create_flag = false;
    }
  }

  renameFolder(index) {
    this.folder_edit_mode = true;
    this.selected_row = index;
    this.folder[index].flag = true;
  }
  make_file_edit_mode(file, index) {
    this.selected_file_row = index;
    this.select_files(file, file.flag, index);

  }
  // folder type grid responsive
  onResize(event) {
    const element = event.target.innerWidth;
    if (element < 1050) {
      this.foldergrid = 2;
    }
    if (element > 1661) {
      this.foldergrid = 7;
    }
    if (element < 1660) {
      this.foldergrid = 4;
    }
  }
  // To Create Folder by Franchisee ID
  add_new() {
    this.create_flag = true;
    this.upload_status = true;
    this.showfolderfile = false;

  }

  // Upload file to server
  handleFileInput(files: FileList, val) {
    this.fileToUpload = files.item(0);
    this.upload_file_to_Serve(files, val);
  }
  // To upload files
  upload_file_to_Serve(files, val) {
    this.obj = {
      'uploaded_status': val,
      'folder_Id': this.parent_id
    };
    const fd = new FormData();
    for (let i = 0; i < files.length; i++) {
      fd.append('file_upload', files[i], files[i]['name']);
    }
    fd.append('file_details', JSON.stringify(this.obj));
    this.httpService.upload_file(fd).subscribe(response => {
      if (response.status === 'success') {
        const toast: Toast = {
          type: 'success',
          title: 'Success',
          timeout: 2000,
          body: '<h5>File uploaded</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
        this.showfolderfile = false;
        if (this.save_route === 'library-main' || this.save_route === 'franchisee-files') {
          return this.get_common_files();
        }
        if (this.save_route === 'common-folder' || this.save_route === 'franchisee-sub-folder') {
          return this.get_files_by_folder(this.parent_id);
        }
      }
    },
      err => {
        const message = 'Error to load franchisees.';
      });
  }

  // for deleting file
  delete_file(file) {
    const obj = {
      'key': file.key,
      'file_id': file._id
    };
    this.delete_files.push(obj);
    this.delete_selected();
  }
  delete_folder(folder) {
    const obj = {
      'key': folder.key,
      'folder_id': folder._id
    };
    this.delete_folders.push(obj);
    this.delete_selected();
  }
  // To select files
  select_files(file, flag, i) {

    this.file_item_type = 'file';
    if (!flag) {
      const obj = {
        'key': file.key,
        'file_id': file._id
      };

      this.delete_files.push(obj);
    }
    if (flag) {
      const obj = {
        'key': file.key,
        'file_id': file._id
      };

      const indexd_value = this.delete_files.indexOf(obj);
      if (indexd_value === -1) {
        this.delete_files.splice(indexd_value, 1);
      }
    }
  }
  // To open dialog popup
  openDialog(file, i) {
    console.log('file', file);
    if (this.selected_file_row !== i) {
      this.dialog.open(DialogFileViewComponent, {
        height: 'auto',
        width: 'auto',
        panelClass: 'fileView',
        data: { file: file }
      });
    }
  }
  // To delete Folder
  select_folders(folder, flag, i) {
    this.file_item_type = 'folder';
    if (!flag) {
      const obj = {
        'key': folder.key,
        'folder_id': folder._id
      };
      this.folder[i].flag = true;
      this.delete_folders.push(obj);
    }
    if (flag) {
      const obj = {
        'key': folder.key,
        'file_id': folder._id
      };
      this.folder[i].flag = false;
      const indexd_value = this.delete_folders.indexOf(obj);
      if (indexd_value === -1) {
        this.delete_folders.splice(indexd_value, 1);
      }
    }
  }
  // To delete selected files and folders
  delete_selected() {
    if (this.delete_files.length > 0) {
      this.spinner.show(); // To show the spinner
      this.httpService.deleteFiles(this.delete_files).subscribe(response => {
        this.spinner.hide(); // To hide the spinner
        if (response.state === 'success') {
          this.delete_files = [];
          if (this.save_route === 'library-main') {
            const toast: Toast = {
              type: 'success',
              title: 'Success',
              timeout: 2000,
              body: '<h5>File deleted</h5>',
              bodyOutputType: BodyOutputType.TrustedHtml
            };
            this.toasterService.pop(toast);
            this.spinner.hide();
            this.get_common_files();
          }
          if (this.save_route === 'common-folder') {
            this.get_files_by_folder(this.route.snapshot.params['id']);
          }
        }
      },
        err => {
          this.spinner.hide();
          const message = 'Error to load franchisees.';
        });
    }
    if (this.delete_folders.length > 0) {
      this.httpService.deleteFolder(this.delete_folders).subscribe(response => {
        if (response.state === 'success') {
          this.delete_folders = [];
          if (this.save_route === 'library-main') {
            const toast: Toast = {
              type: 'success',
              title: 'Success',
              timeout: 2000,
              body: '<h5>Folder deleted</h5>',
              bodyOutputType: BodyOutputType.TrustedHtml
            };
            this.toasterService.pop(toast);
            this.get_common_folder();
          }
          if (this.save_route === 'common-folder') {
            this.get_folder_by_id(this.route.snapshot.params['id']);
          }
        }
      },
        err => {
          const message = 'Error to load franchisees.';
        });
    }
  }
  // Get folder by id
  get_folder_data(id) {
    this.httpService.get_folder_details(id).subscribe(response => {
      if (response.state === 'success') {
        this.folder_data = [];
        this.folder_data = response.data;
      }
      if (response.state === 'failure') {
        this.folder_data = [];
      }
    });
  }
  // To get list of folder by folder Id
  get_folder_by_id(id) {
    this.httpService.get_folder_by_id(id).subscribe(response => {
      if (response.state === 'success') {
        this.folder = [];
        for (let i = 0; i < response.data.length; i++) {
          response.data[i].flag = false;
          this.folder.push(response.data[i]);
        }
      }
      if (response.state === 'failure') {
        this.zero_stat = true;
        this.folder = [];
      }
    });
  }
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
        this.zero_stat = true;
        this.files_list = [];
      }
    },
      err => {
        const message = 'Error to load files.';
      });
  }

  navigate(folder_id, i) {
    this.upload_status = false;
    if (this.selected_row !== i) {
      this.router.navigate(['/apps/library/common-folder' + '/' + folder_id]);
    }
  }
  createFolder() {
    if (this.folder_name) {
      this.obj = {
        'folder_name': this.folder_name,
        'parent_folder_id': this.parent_id
      };
      this.httpService.createFolder(this.obj).subscribe(response => {
        if (response.state === 'success') {
          this.create_flag = false;
          this.showfolderfile = false;
          this.folder_name = '';
          const toast: Toast = {
            type: 'success',
            title: 'Success',
            timeout: 2000,
            body: '<h5>Folder created</h5>',
            bodyOutputType: BodyOutputType.TrustedHtml
          };
          this.toasterService.pop(toast);
          return this.get_folder_by_id(this.parent_id);
        }
        if (response.state === 'failure') {
        }
      },
        err => {
          const message = 'Error to create folder.';
        });
    }
    else {
      const toast: Toast = {
        type: 'error',
        title: 'Error',
        timeout: 2000,
        body: '<h5>Failed to create folder</h5>',
        bodyOutputType: BodyOutputType.TrustedHtml
      };
      this.toasterService.pop(toast);
    }
  }
  // To Edit Folder Name
  edit_Folder(folders, folder_name, index) {
    this.spinner.show();
    this.httpService.editFolder(folders).subscribe(response => {
      if (response.state === 'success') {
        this.create_flag = false;
        this.showfolderfile = false;
        this.folder_edit_mode = false;

        const toast: Toast = {
          type: 'success',
          title: 'Success',
          timeout: 2000,
          body: '<h5>Folder edited</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        const data = response['this.obj'];
        this.selected_row = null;
        this.folder[index].flag = false;
        if (folders.folder_name !== response.folder_name) {
          this.toasterService.pop(toast);
        }
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
        this.spinner.hide();

      }
    },
      err => {
        const message = 'Error to update folder name.';
      });
  }
  edit_file_name(file, file_name, index) {
    this.spinner.show();
    this.httpService.editFile(file).subscribe(response => {
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
        //  this.file[index].flag = false;
        if (file.file_name !== response.file_name) {
          this.toasterService.pop(toast);
        }
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
        this.spinner.hide();

      }
    },
      err => {
        const message = 'Error to update file name.';
      });
  }


}
