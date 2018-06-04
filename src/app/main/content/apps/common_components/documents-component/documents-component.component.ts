import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonServicesService } from '../common-services.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { DialogFileViewComponent } from '../../library/dialog-file-view/dialog-file-view.component';
import { saveAs } from 'file-saver/FileSaver';
import { ToasterModule, ToasterService, ToasterConfig, BodyOutputType, Toast } from 'angular5-toaster';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'fuse-app-documents-component',
  templateUrl: './documents-component.component.html',
  styleUrls: ['./documents-component.component.scss'],
  providers: [
    CommonServicesService
  ]
})
export class DocumentsComponentComponent implements OnInit {
  commonDriveSet: boolean;
  folders_list: any;
  file_item_type: string;
  common_files_list: any;
  key: any;
  franchisees: any;
  sub: any;
  id: any;
  public obj: any;
  parent_id: any;
 public zero_stat = false;
  franchisee_Id: any;
  editFolderId: any;
  folder_name: any;
  folder_list: any;
  public folder_edit_mode = false;
  public selected_file_row: any;
  selected_row: any;
  folder = [];
  folder_Id: any;
  create_flag = false;
  delete_flag = false;
  fileToUpload: File = null;
  files_list: any = [];
  files: any;
  file_id: any;
  delete_folders: any = [];
  delete_files: any = [];
  PdfViewer: any;
  stored_file: any;
  folders: any;
  foldergrid: any = 5;
  save_route: string;
  franchisees_list: any;
  nRightClicks = 0;
  folder_data = [];
  showfolderfile: any = false;
  downloadIconShow: any = false;
  public upload_doc_status = false;
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

  constructor(private spinner: NgxSpinnerService, toasterService: ToasterService, private httpService: CommonServicesService, 
    private route: ActivatedRoute, private snackbar: MatSnackBar,
    public dialog: MatDialog, private router: Router, private formBuilder: FormBuilder) {
    this.save_route = this.route.snapshot.url[0].path;
    this.toasterService = toasterService;
  }

  ngOnInit() {

    this.sub = this.route.params.subscribe(params => {
      this.upload_doc_status = false;
      this.save_route = this.route.snapshot.url[0].path;
      this.franchisee_Id = this.route.snapshot.params['franchisee_Id'];
      this.viewFranchisee(this.franchisee_Id);
      if (this.save_route === 'franchisee-folder' || this.save_route === 'franchisee-files') {
        this.get_folder_list(this.franchisee_Id);
        this.get_uploaded_files();
      }
      if (this.save_route === 'franchisee-sub-folder') {
        this.parent_id = this.route.snapshot.params['id'];
        this.get_folder_data(this.route.snapshot.params['id']);
        this.get_folder_by_id(this.route.snapshot.params['id']);
        this.get_files_by_folder(this.route.snapshot.params['id']);

      }
    });

    this.get_common_files();
  }

  // To View Franchisee details by Franchisee ID
  viewFranchisee(id) {
    this.httpService.viewFranchiseeById(id).subscribe(response => {
      if (response.state === 'success') {
        this.franchisees = response.franchisees_data;
      }
      if (response.state === 'failure') {
      }
    },
      err => {
        const message = 'Error to load franchisees.';
      });
  }
  // Get folder by id
  get_folder_data(id) {
    this.httpService.get_folder_details(id).subscribe(response => {
      if (response.state === 'success') {
        this.folder_data = [];
        this.folder_data = response.data;
      }
      if (response.state === 'failure') {
        this.files_list = [];
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
        this.folder = [];
      }
    });
  }

  // get files by folder ID
  // get_files_by_folder(id) {
  //   this.httpService.getFolderFiles(id).subscribe(response => {
  //     if (response.state === 'success') {
  //       this.files_list = [];
  //       for (let i = 0; i < response.file.length; i++) {
  //         response.file[i].flag = false;
  //         this.files_list.push(response.file[i]);
  //       }
  //     }
  //     if (response.state === 'failure') {
  //       this.files_list = [];
  //     }
  //   },
  //     err => {
  //       const message = 'Error to load files.';
  //     });
  // }

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
  // To Create Folder by Franchisee ID
  add_new() {
    this.create_flag = true;
    this.upload_doc_status = true;
    this.showfolderfile = false;
  }
  createFolder() {
    if (this.folder_name) {
      this.obj = {
        'franchisee_Id': this.franchisee_Id,
        'folder_name': this.folder_name,
        'parent_folder_id': this.parent_id
      };
      this.spinner.show(); // To show the spinner
      this.httpService.createFolder(this.obj).subscribe(response => {
        setTimeout(() => {
          this.spinner.hide(); // To hide the spinner
        }, 2000);
        if (response.state === 'success') {
          this.create_flag = false;
          this.folder_name = '';
          const toast: Toast = {
            type: 'success',
            title: 'Success',
            timeout: 2000,
            body: '<h5>Folder created</h5>',
            bodyOutputType: BodyOutputType.TrustedHtml
          };
          this.toasterService.pop(toast);
          if (this.save_route === 'common-folder' || this.save_route === 'franchisee-sub-folder') {
            return this.get_folder_by_id(this.parent_id);
          }
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
      //  this.get_folder_list(this.franchisee_Id);
      this.create_flag = false;

    }
  }

  // To get Folder List by Franchisee ID
  get_folder_list(franchisee_id) {
    this.httpService.getFolder(franchisee_id).subscribe(response => {
      if (response.state === 'success') {
        this.folder = [];
        this.folder = response.folder;
        this.sort_array();
      }
      if (response.state === 'failure') {
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
  // folder type grid responsive
  onResize(event) {
    const element = event.target.innerWidth;
    if (element < 1050) {
      this.foldergrid = 2;
    }
    if (element > 1661) {
      this.foldergrid = 5;
    }
    if (element < 1660) {
      this.foldergrid = 3;
    }
  }
  // To open dialog popup
  openDialog(file, i) {
    if (this.selected_file_row !== i) {
    this.dialog.open(DialogFileViewComponent, {
      height: 'auto',
      width: 'auto',
      panelClass: 'fileView',
      data: { file: file }
    });
  }
  }

  // To select files
  select_files(file, flag, i) {
    this.file_item_type = 'file';

    if (!flag) {
      const obj = {
        'key': file.key,
        'file_id': file._id
      };
      this.files_list.flag = true;

      this.delete_files.push(obj);
    }
    if (flag) {
      const obj = {
        'key': file.key,
        'file_id': file._id
      };
      this.files_list.flag = false;


      const indexd_value = this.delete_files.indexOf(obj);
      if (indexd_value === -1) {
        this.delete_files.splice(indexd_value, 1);
      }
    }
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
  delete_selected_Folder() {
    this.httpService.deleteFolder(this.delete_folders).subscribe(response => {
      if (response.state === 'success') {
        // this.get_uploaded_files();
      }
    },
      err => {
        const message = 'Error to load franchisees.';
      });
  }
  // To Edit Folder Name
  edit_Folder(folders, fname) {
    this.httpService.editFolder(folders).subscribe(response => {
      if (response.state === 'success') {
        this.folder_edit_mode = false;
        this.selected_row = null;
        const toast: Toast = {
          type: 'success',
          title: 'Success',
          timeout: 2000,
          body: '<h5>Folder edited</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
        const data = response['this.obj'];
      }
      if (response.state === 'failure') {
        const toast: Toast = {
          type: 'error',
          title: 'Error',
          timeout: 2000,
          body: '<h5>Failed to update folder name</h5>',
          bodyOutputType: BodyOutputType.TrustedHtml
        };
        this.toasterService.pop(toast);
      }
    },
      err => {
        const message = 'Error to update folder name.';
      });
  }
  toggle(val) {
    this.editFolderId = val;
  }
  navigate(folder_id) {
    if (this.save_route === 'franchisee-folder' || this.save_route === 'franchisee-sub-folder') {
      this.router.navigate(['/apps/library/franchisee-sub-folder' + '/' + this.franchisee_Id + '/' + folder_id]);
    }
    else {
      this.router.navigate(['/apps/library/common-folder' + '/' + folder_id]);
    }
  }
  // To upload files
  upload_file_to_Serve(files, val) {
    this.obj = {
      'uploaded_status': val,
      'franchisee_Id': this.franchisee_Id,
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
        if (this.save_route === 'franchisee-sub-folder') {
          return this.get_files_by_folder(this.parent_id);
        }
        else {
          return this.get_uploaded_files();
        }
      }
    },
      err => {
        const message = 'Error to load franchisees.';
      });
  }

  handleFileInput(files: FileList, val) {
    this.fileToUpload = files.item(0);
    this.upload_file_to_Serve(files, val);
  }
  downloadFile(file) {
    const blob = new Blob([file.path]);
    saveAs(blob, 'file.jpg');
  }
  // To delete selected files and folders

  // delete_selected() {
  //   if (this.file_item_type === 'file') {
  //     this.httpService.deleteFiles(this.delete_files).subscribe(response => {
  //       if (response.state === 'success') {
  //         if (this.save_route === 'franchisee-sub-folder') {
  //           return this.get_files_by_folder(this.parent_id);
  //         }
  //         else {
  //           return this.get_uploaded_files();
  //         }
  //       }
  //     },
  //       err => {
  //         const message = 'Error to load franchisees.';
  //       });
  //   }

  //   if (this.file_item_type === 'folder') {
  //     this.httpService.deleteFolder(this.delete_folders).subscribe(response => {
  //       if (response.state === 'success') {
  //         this.get_folder_list(this.franchisee_Id);
  //       }
  //     },
  //       err => {
  //         const message = 'Error to load franchisees.';
  //       });
  //   }
  // }

 // To delete selected files and folders
 delete_selected() {

  if (this.delete_files.length > 0) {
    // this.spinner.show();
      this.httpService.deleteFiles(this.delete_files).subscribe(response => {

        setTimeout(() => {
          this.spinner.hide(); // To hide the spinner
        }, 2000);
        if (response.state === 'success') {
            this.delete_files = [];
            if (this.save_route === 'franchisee-folder') {
              const toast: Toast = {
                type: 'success',
                title: 'Success',
                timeout: 2000,
                 body: '<h5>File deleted</h5>',
                 bodyOutputType: BodyOutputType.TrustedHtml
            };
            this.toasterService.pop(toast);
              this.get_uploaded_files();
            }
            if (this.save_route === 'common-folder') {
              this.get_files_by_folder(this.route.snapshot.params['id']);
            }
        }
      },
    err => {
      const message = 'Error to load franchisees.';
    });
  }
  // if (this.delete_folders.length > 0) {
  //   this.httpService.deleteFolder(this.delete_folders).subscribe(response => {
  //     if (response.state === 'success') {
  //         this.delete_folders = [];
  //         if (this.save_route === 'franchisee-folder') {
  //           const toast: Toast = {
  //             type: 'success',
  //             title: 'Success',
  //             timeout: 2000,
  //              body: '<h5>Folder deleted</h5>',
  //              bodyOutputType: BodyOutputType.TrustedHtml
  //         };
  //         this.toasterService.pop(toast);
  //           this.get_common_folder();
  //         }
  //         if (this.save_route === 'franchisee-folder') {
  //           this.get_folder_by_id(this.route.snapshot.params['id']);
  //         }
  //     }
  //   },
  //     err => {
  //       const message = 'Error to load franchisees.';
  //     });
  // }
}

  // Get files list
  get_common_files() {
    this.obj = {
      'upload_status': 0
    };
    this.spinner.show(); // To show the spinner

    this.httpService.getAllCommonFiles(this.obj).subscribe(response => {

          setTimeout(() => {
        this.spinner.hide(); // To hide the spinner
      }, 2000);

      if (response.state === 'success') {

        this.files_list = response.file;
        for (let i = 0; i < this.files_list.length; i++) {
          this.files_list[i].flag = false;
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


  commonDriveSetOff() {
    this.commonDriveSet = false;
  }
  commonDriveSetOn() {
    this.commonDriveSet = true;
  }
  // To disable right click
  onRightClick() {
    this.nRightClicks++;
    return false;
  }
  CreateID() {
    this.showfolderfile = !this.showfolderfile;
  }

  // folder edit on click
  renameFolder(index) {
    this.folder_edit_mode = true;
    this.selected_row = index;
    this.folder[index].flag = true;
  }
  make_file_edit_mode(file, index) {
    this.selected_file_row = index;
    this.select_files(file, file.flag, index);

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
