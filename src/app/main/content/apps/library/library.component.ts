import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LibraryService } from './library.service';
import { FranchiseesService } from '../franchisees/franchisees.service';
import { MatSnackBar } from '@angular/material';
import { DialogElementsExampleDialog } from '../../../../../assets/angular-material-examples/dialog-elements/dialog-elements-example';
import { DialogContentExample } from '../../../../../assets/angular-material-examples/dialog-content/dialog-content-example';
import { UploadEvent } from 'ngx-file-drop';
import { Response } from '@angular/http/src/static_response';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogFileViewComponent } from './dialog-file-view/dialog-file-view.component';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'fuse-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  stored_file: string;
  editFolderId: any;
  folders_list: any;
  files_list: any;
  folder_list: any;
  franchisees_list: any;
  folders: any;
  obj: any;
  files: any = [];
  fileToUpload: Array<File> = [];
  delete_files: any = [];
  delete_folders: any = [];
  create_flag = false;
  franchisee_Id: any;
  folder_name: any;
  folder_Id: any;
  folder: any;
  file_item_type: any;
  foldergrid: any = 6;
  userData: any;
  // tabNumber: any = -1;
  form: FormGroup;
  folderVal = new FormControl('', [Validators.required, Validators.required]);
  commonDriveSet = false;
  nRightClicks = 0;
  constructor(private httpService: LibraryService, private route: ActivatedRoute, private snackbar: MatSnackBar,
    public dialog: MatDialog, private router: Router, private formBuilder: FormBuilder) {


    this.get_franchisee_list();

  }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('user_data'));
    // this.get_common_folder();
    // this.get_common_files();
  }

  // get_common_files() {
  //   this.obj = {
  //     'upload_status': 0
  //   };
  //   this.httpService.getAllCommonFiles(this.obj).subscribe(response => {
  //     if (response.state === 'success') {
  //       this.files_list = response.file;
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

  get_franchisee_list() {
    this.httpService.getAllFranchisees().subscribe(response => {
      if (response.state === 'success') {
        this.franchisees_list = response.franchisees_list;
      }
      if (response.state === 'failure') {
        this.franchisees_list = [];
      }
    },
      err => {
        const message = 'Error to load franchisees.';
      });
  }

  navigate(folder_id){
      this.router.navigate(['/apps/library/franchisee-folder' + '/' + folder_id]);
  }
  // upload_file_to_Serve(files) {
  //   this.obj = {
  //     'uploaded_status': 0
  //   };
  //   const fd = new FormData();

  //   for (let i = 0; i < files.length; i++) {
  //     fd.append('file_upload', files[i], files[i]['name']);
  //   }
  //   fd.append('file_details', JSON.stringify(this.obj));
  //   this.httpService.upload_file(fd).subscribe(response => {
  //     if (response.status === 'success') {
  //       // this.get_common_files();
  //     }
  //   },
  //     err => {
  //       const message = 'Error to load franchisees.';
  //     });
  // }

  // handleFileInput(files: FileList) {
  //   // this.fileToUpload = files.item(0);
  //   // for(var i=0;i<files.length;i++){
  //   //   this.fileToUpload.push(files[i]);
  //   // }
  //   // console.log("this.fileToUpload",this.fileToUpload);
  //   //  this.fileToUpload = this.files;
  //   this.upload_file_to_Serve(files);
  // }


  // To Delete file by  ID
  // select_files(file, flag, i) {
  // this.file_item_type = 'file';
  //   if (!flag) {
  //     const obj = {
  //       'key': file.key,
  //       'file_id': file._id
  //     };
  //     this.files_list.flag = true;
  //     // this.files_list[i].flag = true;
  //     this.delete_files.push(obj);
  //     console.log(this.delete_files);
  //   }
  //   if (flag) {
  //     const obj = {
  //       'key': file.key,
  //       'file_id': file._id
  //     };
  //     this.files_list.flag = false;
  //     // this.files_list[i].flag = false;
  //     const indexd_value = this.delete_files.indexOf(obj);
  //     if (indexd_value === -1){
  //       this.delete_files.splice(indexd_value, 1);
  //     }
  //     // console.log(this.delete_files);
  //     // const selected_files = this.delete_files;
  //     // this.delete_files.forEach(function(value, index, object){
  //     //   selected_files.splice(index, 1);
  //     //   console.log(value, index)
  //     // })
  //     // this.delete_files = selected_files;
  //     // for (let j = 0; this.delete_files.length; j++) {
  //     //   if (this.delete_files[i].file_id === file._id) {
  //     //
  //     //     this.delete_files.splice(j, 1);

  //     //
  //     //   }
  //     // }
  //   }

  // }

// deleting selected files or folders
//   delete_selected_files() {
//     if (this.file_item_type === 'file'){
//       this.httpService.deleteFiles(this.delete_files).subscribe(response => {
//         if (response.state === 'success') {
//           // this.get_common_files();
//         }
//       },
//         err => {
//           const message = 'Error to load franchisees.';
//         });
//     }

//       if (this.file_item_type === 'folder'){

//         this.httpService.deleteFolder(this.delete_folders).subscribe(response => {
//           if (response.state === 'success') {
// // this.get_common_folder();
//           }
//         },
//           err => {
//             const message = 'Error to load franchisees.';
//           });

//       }
//   }

  // public dropped(event: UploadEvent) {
  //   this.files = event.files;
  //   for (const file of event.files) {
  //     file.fileEntry.file(info => {
  //       console.log(info);
  //     });
  //   }
  // }

  // public fileOver(event){
  //   console.log(event);
  // }

  // public fileLeave(event){
  //   console.log(event);
  // }

  // To create common folder
  // add_new_empty_folder(){
  //   this.create_flag = true;
  // }

  // create_common_folder() {

  //   this.obj = {
  //     'folder_name': this.folder_name,
  //   };

  //   this.httpService.createCommonFolder(this.obj).subscribe(response => {
  //     if (response.state === 'success'){
  //       console.log('this.obj', this.obj);
  //         this.create_flag = false;
  //         this.folder_name = '';
  //        // this.get_common_folder();
  //         sessionStorage.setItem('state', JSON.stringify(response.folder_name));
  //       }
  //       if (response.state === 'failure'){
  //         this.snackbar.open('Franchisee created successfully!', '', {duration: 2500});
  //       }
  //   },
  //   err => {
  //     const message = 'Error to create folder.';
  // });
  // }

  //  // To get Folder
  //  get_common_folder(){
  //   this.httpService.getCommonFolder().subscribe(response => {
  //     if (response.state === 'success'){
  //       this.folders_list = response.folder;
  //       this.sort_array();
  //       for (let i = 0; i < this.folders_list.length; i++) {
  //         this.folders_list.flag = false;
  //       }
  //   }
  //     if (response.state === 'failure'){
  //       this.folders = [];
  //     }
  //   },
  //   err => {
  //       const message = 'Error to load folder list.';
  //   });
  // }

// popuo model Dialog box
// openDialog(file) {
//     this.dialog.open(DialogFileViewComponent, {
//     height: 'auto',
//     width: 'auto',
//     data: { file: file }
//   });
// }

  // To delete Folder
  // select_folders(folder, flag, i) {
  // this.file_item_type = 'folder';
  //   if (!flag) {
  //     console.log('deleted files', this.delete_folders);
  //     const obj = {
  //       'key': folder.key,
  //       'folder_id': folder._id
  //     };
  //     // this.files_list[i].flag = true;
  //     this.folders_list.flag = true;
  //     this.delete_folders.push(obj);
  //   }
  //   if (flag) {

  //     const obj = {
  //       'key': folder.key,
  //       'file_id': folder._id
  //     };
  //     this.delete_folders.flag = false;
  //     // this.files_list[i].flag = false;
  //     const indexd_value = this.delete_folders.indexOf(obj);
  //     if (indexd_value === -1){
  //       this.delete_folders.splice(indexd_value, 1);
  //     }
  //   }
  // }
  // delete_selected_Folder() {
  //   this.httpService.deleteFolder(this.delete_folders).subscribe(response => {
  //     if (response.state === 'success') {
  //       // this.get_uploaded_files();
  //     }
  //   },
  //     err => {
  //       const message = 'Error to load franchisees.';
  //     });
  // }
  // toggle(val){
  //   this.editFolderId = val;
  // }
  // navigate(id){
  //   this.router.navigate(['/apps/library/common-folder' + '/' + id]);
  // }

// show settings

// this.commonDriveSet = false;

// commonDriveSetOff(){
//   this.commonDriveSet = false;
// }
// commonDriveSetOn(){
//   this.commonDriveSet = true;
// }

// Validations error messages
  // getErrorFolder() {
  //   return this.folderVal.hasError('required') ? 'Name cant be empty' :
  //       // this.folderVal.hasError('name') ? 'Not a valid name' :
  //           '';
  // }


  // To Edit Folder Name
  // edit_Folder(folder, fname) {
  //   this.httpService.editFolder(folder).subscribe(response => {

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
  // sorting get_list_array
// sort_array(){
//   this.folders_list.sort(function(a, b) {
//        const aa = a._id,
//        bb = b._id;
//        return aa > bb ? -1 : (aa < bb ? 1 : 0);
//    });
// }
// To disable right click
// onRightClick() {
//   this.nRightClicks++;
//   return false;
// }



// folder type grid responsive

// onResize(event) {
//   const element = event.target.innerWidth;
//   console.log(element);

//   if (element < 1400) {
//     this.foldergrid = 4;
//   }

//   if (element < 950) {
//     this.foldergrid = 3;
//   }

//   if (element > 1401) {
//     this.foldergrid = 4;
//   }
//   if (element > 1520) {
//     this.foldergrid = 5;
//   }
//   if (element > 1680) {
//     this.foldergrid = 6;
//   }


//   if (element < 750) {
//     this.foldergrid = 2;
//   }
// }




}
