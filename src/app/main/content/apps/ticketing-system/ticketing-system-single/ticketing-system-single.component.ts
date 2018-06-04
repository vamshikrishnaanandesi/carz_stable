import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { TicketingSystemService } from './../ticketing-system.service';
import { resolve } from 'url';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToasterModule, ToasterService, ToasterConfig, BodyOutputType, Toast } from 'angular5-toaster';
@Component({
  selector: 'app-ticketing-system-single',
  templateUrl: './ticketing-system-single.component.html',
  styleUrls: ['./ticketing-system-single.component.scss']
})
export class TicketingSystemSingleComponent implements OnInit {
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
  userData: any;
  constructor(private spinner: NgxSpinnerService, toasterService: ToasterService, private router: Router, private route: ActivatedRoute, private httpService: TicketingSystemService,
    private location: Location) {
      this.toasterService = toasterService;
      this.userData = JSON.parse(localStorage.getItem('user_data'));
     }

  ngOnInit() {
  }
  getTicketByid(question_id) {
    this.httpService.get_ticket_by_id(question_id).subscribe(response => {
      if (response.state === 'success'){
        // console.log('this', this.discussionquestion);
      }
      if (response.state === 'failure'){
      }
    },
    err => {
      const message = 'Error to load question.';
  });
  }
}
