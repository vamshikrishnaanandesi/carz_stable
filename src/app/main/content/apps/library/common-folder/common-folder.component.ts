import { Component, OnInit } from '@angular/core';
import { LibraryService } from '../library.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'fuse-common-folder',
  templateUrl: './common-folder.component.html',
  styleUrls: ['./common-folder.component.scss']
})
export class CommonFolderComponent implements OnInit {
  folder_id: any;
  franchisees: any;
  id: any;
  folder_Id: any;
  folder: any;
  obj: any;
  folder_name: any;
  files_list: any;
  delete_files: any = [];
  fileToUpload: File = null;
  public userData: any;
  constructor(private httpService: LibraryService, private router: Router, private route: ActivatedRoute) { 
    
  }

  ngOnInit() {
    this.userData = JSON.parse(localStorage.getItem('user_data'));
    this.folder_Id = this.route.snapshot.params['id'];
    this.get_uploaded_files();
  }
  // To get uploaded files
  get_uploaded_files() {
    this.obj = {
      'folder_Id': this.folder_Id,
    };
    this.httpService.getCommonFolderFiles(this.obj).subscribe(response => {
      if (response.state === 'success') {
        console.log('response', this.obj);
        this.files_list = response.file;
        for (let i = 0; i < this.files_list.length; i++) {
          this.files_list.flag = false;
          this.files_list[i].flag = false;
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
      'uploaded_status': 4,
      'folder_Id': this.folder_Id
    };
    const fd = new FormData();
    for (let i = 0; i < files.length; i++) {
      fd.append('file_upload', files[i], files[i]['name']);
    }
    fd.append('file_details', JSON.stringify(this.obj));
    this.httpService.upload_folder_file(fd).subscribe(response => {
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
  select_files(file, flag, i) {
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
}

