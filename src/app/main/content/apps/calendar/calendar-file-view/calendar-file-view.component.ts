import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calendar-file-view',
  templateUrl: './calendar-file-view.component.html',
  styleUrls: ['./calendar-file-view.component.scss']
})
export class CalendarFileViewComponent implements OnInit {
  fileImagepath: any;
  constructor() {
    this.fileImagepath = JSON.parse(localStorage.getItem('viewCalendarFileView'));
   }

  ngOnInit() {
    this.fileImagepath = JSON.parse(localStorage.getItem('viewCalendarFileView'));
  }

}
