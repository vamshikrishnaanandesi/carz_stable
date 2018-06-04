import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-discussion-dialog-view',
  templateUrl: './discussion-dialog-view.component.html',
  styleUrls: ['./discussion-dialog-view.component.scss']
})
export class DiscussionDialogViewComponent implements OnInit {

  fileImagepath:any;
  constructor() { 
    this.fileImagepath = JSON.parse(localStorage.getItem('viewDiscussionFileUpload'));
    console.log("file image",  this.fileImagepath);
  }

  ngOnInit() {
    this.fileImagepath = JSON.parse(localStorage.getItem('viewDiscussionFileUpload'));
  }
}
