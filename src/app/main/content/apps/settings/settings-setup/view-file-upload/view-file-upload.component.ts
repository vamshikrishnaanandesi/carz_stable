import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-file-upload',
  templateUrl: './view-file-upload.component.html',
  styleUrls: ['./view-file-upload.component.scss']
})
export class ViewFileUploadComponent implements OnInit {

  fileImagepath: any;

  constructor() {


    this.fileImagepath = JSON.parse(localStorage.getItem('viewfileuploadSEttings'));
  }

  ngOnInit() {

    this.fileImagepath = JSON.parse(localStorage.getItem('viewfileuploadSEttings'));

  }

}
