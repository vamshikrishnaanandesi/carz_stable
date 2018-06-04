import {Component, OnInit, Inject} from '@angular/core';
import { LibraryService } from '../library.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer} from '@angular/platform-browser';
import {MatDialog, MatDialogRef, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material';
import { FileDropModule } from 'ngx-file-drop';


@Component({
  selector: 'fuse-app-dialog-file-view',
  templateUrl: './dialog-file-view.component.html',
  styleUrls: ['./dialog-file-view.component.scss']
})


export class DialogFileViewComponent implements OnInit {

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
  fileview: any;
  img_path: any;
  file: any;
  pdfUrl: any;
  file_path: any;
  nRightClicks = 0;
  constructor(private httpService: LibraryService, private router: Router, private domSanitizer: DomSanitizer,
    private route: ActivatedRoute, public dialogRef: MatDialogRef<DialogFileViewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.pdfUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.data.file.path);
  }

  ngOnInit() {
    
  }
  //   app.module('app').directive('disableRightClick', function() {  
  //     return {  
  //         restrict: 'A',  
  //         link: function(scope, element, attr) {  
  //             element.bind('contextmenu', function(e) {  
  //                 e.preventDefault();  
  //             });  
  //         }  
  //     };  
  // });
  onRightClick() {
    this.nRightClicks++;
    return false;
  }
}
