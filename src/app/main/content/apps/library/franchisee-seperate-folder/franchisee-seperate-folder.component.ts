import { Component, OnInit, Input } from '@angular/core';
import { LibraryService } from '../library.service';
import { ActivatedRoute, Router } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
// import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';
import { DialogFileViewComponent } from '../dialog-file-view/dialog-file-view.component';

@Component({
  selector: 'fuse-franchisee-seperate-folder',
  templateUrl: './franchisee-seperate-folder.component.html',
  styleUrls: ['./franchisee-seperate-folder.component.scss']
})
export class FranchiseeSeperateFolderComponent implements OnInit {
  stored_file: string;
  franchisees: any;
  id: any;
  folder_Id: any;
  folder: any;
  obj: any;
  shiftKey: any;
  folder_name: any;
  franchisee_Id: any;
  files_list: any;
  saveUsername: any;
  delete_files: any = [];
  fileToUpload: File = null;


  constructor(private httpService: LibraryService, private router: Router, public dialog: MatDialog, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.viewFranchisee(this.route.snapshot.params['id']);
    this.franchisee_Id = this.route.snapshot.params['id'];
    this.folder_Id = this.route.snapshot.params['folder_Id'];
    this.get_uploaded_files();
  }
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
  // To get uploaded files
  get_uploaded_files() {
    this.obj = {
      'folder_Id': this.folder_Id,
      'franchisee_Id': this.franchisee_Id
    };
    this.httpService.getFolderFiles(this.obj).subscribe(response => {
      if (response.state === 'success') {
        this.files_list = response.file;
        for (let i = 0; i < this.files_list.length; i++) {
          this.files_list.flag = false;
          // this.files_list[i].flag = false;
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
  // To upload file
  upload_file_to_Serve(files) {
    this.obj = {
      'uploaded_status': 2,
      'folder_Id': this.folder_Id,
      'franchisee_Id': this.franchisee_Id
    };
    const fd = new FormData();
    for (let i = 0; i < files.length; i++) {
      fd.append('file_upload', files[i], files[i]['name']);
    }
    fd.append('file_details', JSON.stringify(this.obj));
    this.httpService.upload_file(fd).subscribe(response => {
      if (response.status === 'success') {
        this.get_uploaded_files();
      }
    },
      err => {
        const message = 'Error to load franchisees.';
      });
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.upload_file_to_Serve(files);
  }
  select_files(file, flag, i, event) {

    // select multile with shift key
    // if (event.shiftKey) {
    //   this.saveUsername = !this.saveUsername;

    // }

    // unselect multile with Control key

    // if (event.ctrlKey) {
    //   this.saveUsername = false;
    // }



    // WHETHER WE CAN CHECK , IS IT CHECKED OR NOT
    if (!flag) {
      console.log('deleted files', this.delete_files);
      const obj = {
        'key': file.key,
        'file_id': file._id
      };
      // this.files_list[i].flag = true;
      this.files_list.flag = true;
      this.delete_files.push(obj);
    }
    if (flag) {
      console.log('deleted files in flag', this.delete_files);
      this.files_list.flag = false;
      // this.files_list[i].flag = false;
      for (let j = 0; this.delete_files.length; j++) {
        if (this.delete_files[i].file_id === file._id) {
          this.delete_files.splice(j, 1);
          return;
        }
      }
    }
  }

  // DELETE FILES
  delete_selected_files() {
    this.httpService.deleteFiles(this.delete_files).subscribe(response => {
      if (response.state === 'success') {
        this.get_uploaded_files();
      }
    },
      err => {
        const message = 'Error to load franchisees.';
      });
  }


  // popuo model Dialog box

  openDialog(file) {
    console.log(file, 'file');
    this.stored_file = localStorage.getItem('dialogViewFile');
      console.log(this.stored_file, 'store file');
      if (this.stored_file){
        localStorage.setItem('dialogViewFile', null);

        localStorage.setItem('dialogViewFile', JSON.stringify(file));
      }
      else {

        localStorage.setItem('dialogViewFile', JSON.stringify(file));
      }
    this.dialog.open(DialogFileViewComponent, {
      height: '100%',
      width: 'auto',
      panelClass: 'fileView',
    });

  }
  // openDialog(): void {
  //   this.dialog.open(DialogFileViewComponent, {
  //     width: '250px',
  //     data: { name: this.hareeshname }
  //   });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    //   this.animal = result;
    // });
  }
