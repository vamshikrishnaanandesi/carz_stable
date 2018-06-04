import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewfilesetupstage',
  templateUrl: './viewfilesetupstage.component.html',
  styleUrls: ['./viewfilesetupstage.component.scss']
})
export class ViewfilesetupstageComponent implements OnInit {
public fileImagepathsetup: any;
  constructor() {

    this.fileImagepathsetup = JSON.parse(localStorage.getItem('viewfileuploadSetup'));
   }

  ngOnInit() {
  }

}
