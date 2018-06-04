import { Component, OnInit } from '@angular/core';
import { CrmService } from '../crm.service';
@Component({
  selector: 'fuse-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss']
})
export class MeetingsComponent implements OnInit {
  stage_id: any;
  franchisee_id: any;
  route: any;
obj: any = {
  stage_id: 'qazwsc'
};
public services = [
  {
    'id': 'Travel',
    'service_type': 'Travel',
    'flag': false
  },
  {
    'id': 'Stay',
    'service_type': 'Stay',
    'flag': false
  }
];
  constructor(public httpService: CrmService) {
   }

  ngOnInit() {
    this.getMeeting();
    // this.franchisee_id = this.route.snapshot.params['franchisee_id'];
    // this.stage_id = this.route.snapshot.params['stage_id'];
  }


  getMeeting() {
    this.obj = {
      'franchisee_id': this.franchisee_id,
      'stage_id': this.stage_id
    };
    this.httpService.getMeetingById(this.obj).subscribe(response => {
      if (response.state === 'success') {
        this.obj = response.data;
      }
      if (response.state === 'failure') {
        this.obj = [];
      }
    },
      err => {
        const message = 'Error to load files.';
      });
  }

create_meeting() {
   this.httpService.createMeeting(this.obj).subscribe(response => {
     if (response.state === 'success'){
      this.getMeeting();  
        this.obj = response.data;
       }
       if (response.state === 'failure'){
       }
   },
   err => {
     const message = 'Error to create meetning.';
 });
 }

 edit_meeting(obj){
  this.httpService.editMeeting(obj).subscribe(response => {
    console.log('resposne', this.obj);
    if (response.state === 'success'){
     
      }
      if (response.state === 'failure'){

            }
  },
  err => {
    const message = 'Error to update meeting.';
}
);
}

 serviceType(i){
   if ( i === 0){
    this.obj.meeting_additional_services = 'Travel';
    this.services[1].flag = false;
   }
   if ( i === 1){
    this.obj.meeting_additional_services = 'Stay';
    this.services[0].flag = false;
  }
 }
  // getMeeting(id){
  //   this.httpService.getMeetingById(id).subscribe(response => {
  //     if (response.state === 'success') {
  //       this.obj = response.data;
  //       console.log('this.obj', this.obj);
  //     }
  //     if (response.state === 'failure') {
  //     }
  //   },
  //     err => {
  //       const message = 'Error to load meeting.';
  //     });
  // }
}
