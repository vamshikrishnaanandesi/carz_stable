import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { TicketingSystemService } from './ticketing-system.service';
import { resolve } from 'url';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { ToasterModule, ToasterService, ToasterConfig, BodyOutputType, Toast } from 'angular5-toaster';
@Component({
  selector: 'fuse-app-ticketing-system',
  templateUrl: './ticketing-system.component.html',
  styleUrls: ['./ticketing-system.component.scss']
})
export class TicketingSystemComponent implements OnInit {
  franchisee_name: any;
  name: any;
  subject: any;
  userData: any;
  ticket_list= [];
  type: any;
  description: any;
  ticketTypeselected = 'Problem' ;
  createTicketRightNav: any = false;
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

  constructor(private spinner: NgxSpinnerService, toasterService: ToasterService, private router: Router, private route: ActivatedRoute, private httpService: TicketingSystemService,
    private location: Location) {
      this.toasterService = toasterService;
      this.userData = JSON.parse(localStorage.getItem('user_data'));
     }

  ngOnInit() {
    this.get_all_tickets();
  }

  createTicket() {
      this.createTicketRightNav = !this.createTicketRightNav;


  }

create_ticket(ticketForm){
  const obj = {
    // 'custom_fields':{"Company Name": this.userData.user_name},
    'name': this.userData.user_name,

    'type': this.type,
    'subject': this.subject,
    'description' : this.description,
    'requester_id': 43000399263,
    'status': 2,
    'priority':1,

    // 'responder_id': this.userData._id,
    // 'comapny_id': this.userData._id,
    // 'unique_external_id ': this.userData._id
  }
  console.log(obj);
  if(ticketForm.valid === true) {
  this.spinner.show();
  this.httpService.create_ticket(obj).subscribe(response => {
    if (response.state === 'success'){
      console.log(response);
      this.spinner.hide();
      const toast: Toast = {
        type: 'success',
        title: 'Success',
        timeout: 2000,
        body: '<h5>' + response.message + '</h5>',
        bodyOutputType: BodyOutputType.TrustedHtml
      };
      this.toasterService.pop(toast);
      this.get_all_tickets();
      this.sort_array_ticket();
      this.createTicketRightNav = false;
    }
    if (response.state === 'failure') {
      this.spinner.hide();
      const toast: Toast = {
        type: 'error',
        title: 'Error',
        timeout: 2000,
        body: '<h5>' + response.message + '</h5>',
        bodyOutputType: BodyOutputType.TrustedHtml
      };
      this.toasterService.pop(toast);
    }
  },
err => {
  this.spinner.hide();
  const message = 'Error to load data'
})
}
}
update_ticket(data){
  this.httpService.update_ticket(data).subscribe(response => {
    if (response.state === 'success'){
     
    }
    if (response.state === 'failure') {


    }
  },
err => {
  const message = 'Error to load data'
})
}


  // get all tickets
  get_all_tickets(){
    this.httpService.get_all_ticket().subscribe(response => {
      // console.log(response);
      this.ticket_list = response;

      this.sort_array_ticket();

      if (response.status === 'success'){
        // this.ticket_list = response;
        console.log("ddddddd", this.ticket_list);
      }
      if (response.status === 'failure') {
      }
    },
  err => {
    const message = 'Error to load franchisees'
  })
  }

     // filter
     sort_array_ticket(){
      this.ticket_list.sort(function(a, b) {
          const aa = a._id,
          bb = b._id;
          return aa > bb ? -1 : (aa < bb ? 1 : 0);
     });
    }
}
