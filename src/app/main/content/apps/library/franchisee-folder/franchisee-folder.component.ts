import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { LibraryService } from '../library.service';
import { ActivatedRoute, Router } from '@angular/router';
// import { saveAs } from 'file-saver/FileSaver';
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogFileViewComponent } from '../dialog-file-view/dialog-file-view.component';
import { Validators, AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors } from '@angular/forms';
import { Ng4LoadingSpinnerModule, Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'fuse-franchisee-folder',
  templateUrl: './franchisee-folder.component.html',
  styleUrls: ['./franchisee-folder.component.scss']
})
export class FranchiseeFolderComponent implements OnInit {
  commonDriveSet: boolean;
  folders_list: any;
  file_item_type: string;
  common_files_list: any;
  key: any;
  franchisees: any;
  id: any;
  public obj: any;
  franchisee_Id: any;
  editFolderId: any;
  folder_name: any;
  folder_list: any;
  folder: any;
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
  foldergrid: any = 4;
  userData: any;
  spinnerConfig: object = {
    bdColor: '#333',
    size: 'medium',
    color: '#fff',
    type: 'ball-clip-rotate'
  };
  constructor(private spinner: NgxSpinnerService, private route: ActivatedRoute, private router: Router, public dialog: MatDialog, private httpService: LibraryService,
    private ng4LoadingSpinnerService: Ng4LoadingSpinnerService) {
    this.userData = JSON.parse(localStorage.getItem('user_data'));
    // this.form.valueChanges.subscribe(val => console.log(val));
  }

  ngOnInit() {
    this.viewFranchisee(this.route.snapshot.params['franchisee_Id']);

  }
  // To View Franchisee details by Franchisee ID
  viewFranchisee(id) {
    this.spinner.show(); // To show the spinner
    this.httpService.viewFranchiseeById(id).subscribe(response => {
      if (response.state === 'success') {
        this.spinner.hide(); // To hide the spinner
        this.franchisees = response.franchisees_data;
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

  // // To Create Folder by Franchisee ID
  // add_new(){
  //   this.create_flag = true;
  // }
  // createFolder() {
  //   this.obj = {
  //     'franchisee_Id': this.franchisee_Id,
  //     'folder_name': this.folder_name
  //   };

  //   this.httpService.createFolder(this.obj).subscribe(response => {
  //     if (response.state === 'success'){
  //         this.create_flag = false;
  //         this.folder_name = '';
  //         this.get_folder_list(this.franchisee_Id);
  //         sessionStorage.setItem('state', JSON.stringify(response.franchisees_data));
  //       }
  //       if (response.state === 'failure'){
  //       }
  //   },
  //   err => {
  //     const message = 'Error to create folder.';
  //   });
  // }

  // To get Folder List by Franchisee ID
  // get_folder_list(franchisee_id){
  //   this.httpService.getFolder(franchisee_id).subscribe(response => {
  //     if (response.state === 'success'){
  //       this.folder = [];
  //       this.folder = response.folder;
  //       this.sort_array();
  //     }
  //     if (response.state === 'failure'){
  //       this.folder = [];
  //     }
  //   },
  //   err => {
  //       const message = 'Error to load folder list.';
  //   });
  // }


  // To Delete folder by ID
  //  delete_folder(folder, flag, i){
  //   if (!flag){
  //     const obj = {
  //       'key': folder.key,
  //       'folder_id': this.folder_Id
  //     };
  //     this.folder_list.flag = true;
  //     // this.files_list[i].flag = true;
  //     //  return this.delete_folder.push(obj);
  //   }
  //   if (flag){
  //     this.folder_list.flag = false;
  //     // this.folder_list[i].flag = false;
  //     // tslint:disable-next-line:no-shadowed-variable
  //     for (let i = 0; this.delete_folder.length; i++){
  //       if (this.delete_folder[i].folder_Id === this.folder._Id){
  //         // this.delete_folder.splice(i, 1);
  //         return;
  //       }
  //     }
  //   }
  // }


  // TO get uploaded files
  // get_uploaded_files(){
  //   this.obj = {
  //     'uploaded_status': 1,
  //     'franchisee_Id': this.franchisee_Id
  //   };
  //   this.httpService.getFranchiseeFiles(this.obj).subscribe(response => {
  //     if (response.state === 'success'){
  //       // this.files_list = response.file;
  //       console.log(this.common_files_list);
  //       for (let i = 0; i < response.file.length; i++){
  //         this.files_list.push(response.file[i]);
  //           this.files_list.flag = false;
  //           // this.files_list[i].flag = false;
  //       }
  //       console.log(this.files_list);
  //     }
  //     if (response.state === 'failure'){
  //       this.files_list = [];
  //     }
  //   },
  //   err => {
  //       const message = 'Error to load files.';
  //   });
  // }

  // To upload file
  // upload_file_to_Serve(files){
  //   this.obj = {
  //     'uploaded_status': 1,
  //     'franchisee_Id': this.franchisee_Id,
  //     'folder_Id': this.folder_Id
  //   };
  //   const fd = new FormData();
  //   for (let i = 0; i < files.length; i++){
  //     fd.append('file_upload', files[i], files[i]['name']);
  //   }
  //   fd.append('file_details', JSON.stringify( this.obj));
  //   this.httpService.upload_file(fd).subscribe(response => {
  //       if (response.status === 'success'){
  //         this.get_uploaded_files();
  //       }
  //   },
  //   err => {
  //       const message = 'Error to load franchisees.';
  //   });
  // }

  // handleFileInput(files: FileList) {
  //   this.fileToUpload = files.item(0);
  //   this.upload_file_to_Serve(files);
  // }
  // downloadFile(file){
  //   const blob = new Blob([file.path]);
  //   saveAs(blob, 'file.jpg');
  // }
  // to get common list
  // get_common_files() {
  //   this.obj = {
  //     'upload_status': 0
  //   };
  //   this.httpService.getAllCommonFiles(this.obj).subscribe(response => {
  //     if (response.state === 'success') {
  //       this.files_list = response.file;
  //       this.common_files_list = response.file;
  //       for (let i = 0; i < this.files_list.length; i++) {

  //         this.files_list.flag = false;
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

  // popuo model Dialog box

  // openDialog(file) {

  //   this.dialog.open(DialogFileViewComponent, {
  //     height: 'auto',
  //     width: 'auto',
  //     data: { file: file }
  //   });

  //       sessionStorage.setItem('dialogViewFilefranchiseeDrive', JSON.stringify(file));
  //     }
  //     else {

  //       sessionStorage.setItem('dialogViewFilefranchiseeDrive', JSON.stringify(file));
  //     }
  //   this.dialog.open(DialogFileViewComponent, {
  //    height: '100%',
  //     width: 'auto',
  //   });

  // }
  // // To Edit Folder Name
  // edit_Folder(folders, fname) {
  //   this.httpService.editFolder(folders).subscribe(response => {

  //     if (response.state === 'success'){
  //       const data = response['this.obj'];
  //       }
  //       if (response.state === 'failure'){


  //             }
  //   },
  //   err => {
  //     const message = 'Error to update folder name.';
  // }
  // );
  // }

  // deleting selected files or folders
  // delete_selected_file() {
  //   if (this.file_item_type === 'file'){
  //     this.httpService.deleteFiles(this.delete_files).subscribe(response => {
  //       if (response.state === 'success') {
  //         this.get_uploaded_files();
  //       }
  //     },
  //       err => {
  //         const message = 'Error to load franchisees.';
  //       });
  //   }

  //     if (this.file_item_type === 'folder'){

  //       this.httpService.deleteFolder(this.delete_folders).subscribe(response => {
  //         if (response.state === 'success') {
  //         this.get_folder_list(this.franchisee_Id);
  //         }
  //       },
  //         err => {
  //           const message = 'Error to load franchisees.';
  //         });

  //     }
  // }

  // To Delete file by  ID
  // select_files(file, flag, i) {
  //   this.file_item_type = 'file';
  //     if (!flag) {
  //       const obj = {
  //         'key': file.key,
  //         'file_id': file._id
  //       };
  //       this.files_list.flag = true;
  //       // this.files_list[i].flag = true;
  //       this.delete_files.push(obj);
  //       console.log(this.delete_files);
  //     }
  //     if (flag) {
  //       const obj = {
  //         'key': file.key,
  //         'file_id': file._id
  //       };
  //       this.files_list.flag = false;
  //       // this.files_list[i].flag = false;
  //       const indexd_value = this.delete_files.indexOf(obj);
  //       if (indexd_value === -1){
  //         this.delete_files.splice(indexd_value, 1);
  //       }
  //     }
  //   }
  // deleting selected files or folders
  // delete_selected() {
  //   if (this.file_item_type === 'file'){
  //     this.httpService.deleteFiles(this.delete_files).subscribe(response => {
  //       if (response.state === 'success') {
  //         this.get_uploaded_files();
  //       }
  //     },
  //     err => {
  //       const message = 'Error to load franchisees.';
  //     });
  //   }

  //   if (this.file_item_type === 'folder'){
  //     this.httpService.deleteFolder(this.delete_folders).subscribe(response => {
  //       if (response.state === 'success') {
  //         this.get_folder_list(this.franchisee_Id);
  //       }
  //     },
  //     err => {
  //       const message = 'Error to load franchisees.';
  //     });
  //   }
  // }
  // // To delete Folder

  // select_folders(folder, flag, i) {
  //   this.file_item_type = 'folder';
  //     if (!flag) {
  //       console.log('deleted files', this.delete_folders);
  //       const obj = {
  //         'key': folder.key,
  //         'folder_id': folder._id
  //       };
  //       this.folder[i].flag = true;
  //       //this.folder.flag = true;
  //       this.delete_folders.push(obj);
  //     }
  //     if (flag) {

  //       const obj = {
  //         'key': folder.key,
  //         'file_id': folder._id
  //       };
  //       //this.folder.flag = false;
  //       this.folder[i].flag = false;
  //       const indexd_value = this.delete_folders.indexOf(obj);
  //       if (indexd_value === -1){
  //         this.delete_folders.splice(indexd_value, 1);
  //       }
  //     }
  //   }
  // toggle(val){
  //   this.editFolderId = val;
  // }
  // // to navigate inside folder
  // navigate(){
  //   this.router.navigate(['/apps/library/common-folder/ + folder._id']);
  // }

  //   if (this.file_item_type === 'folder'){
  //     this.httpService.deleteFolder(this.delete_folders).subscribe(response => {
  //       if (response.state === 'success') {
  //         this.get_folder_list(this.franchisee_Id);
  //       }
  //     },
  //     err => {
  //       const message = 'Error to load franchisees.';
  //     });
  //   }
  // }
  // To delete Folder

  // select_folders(folder, flag, i) {
  //   this.file_item_type = 'folder';
  //     if (!flag) {
  //       console.log('deleted files', this.delete_folders);
  //       const obj = {
  //         'key': folder.key,
  //         'folder_id': folder._id
  //       };
  //       this.folder[i].flag = true;
  //       // this.folder.flag = true;
  //       this.delete_folders.push(obj);
  //     }
  //     if (flag) {

  //       const obj = {
  //         'key': folder.key,
  //         'file_id': folder._id
  //       };
  //       // this.folder.flag = false;
  //       this.folder[i].flag = false;
  //       const indexd_value = this.delete_folders.indexOf(obj);
  //       if (indexd_value === -1){
  //         this.delete_folders.splice(indexd_value, 1);
  //       }
  //     }
  //   }
  //   toggle(val){
  //     this.editFolderId = val;
  //   }
  //   // to navigate inside folder
  //   navigate(){
  //     this.router.navigate(['/apps/library/common-folder/ + folder._id']);
  //   }

  // show settings

  // this.commonDriveSet = false;

  // commonDriveSetOff(){
  //   this.commonDriveSet = false;
  // }
  // commonDriveSetOn(){
  //   this.commonDriveSet = true;
  // }
  // sort_array(){
  //   this.folder.sort(function(a, b) {
  //        const aa = a._id,
  //        bb = b._id;
  //        return aa > bb ? -1 : (aa < bb ? 1 : 0);
  //    });
  // }

  // folder type grid responsive
  // onResize(event) {
  //   const element = event.target.innerWidth;
  //   console.log(element);

  //   if (element < 1660) {
  //     this.foldergrid = 3;
  //   }

  //   if (element < 1050) {
  //     this.foldergrid = 2;
  //   }

  //   if (element > 1661) {
  //     this.foldergrid = 4;
  //   }


  // }


}
